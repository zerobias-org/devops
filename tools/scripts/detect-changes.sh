#!/bin/bash
# Detect packages with actual source changes
# Usage: detect-changes.sh [BASE_REF] [--hoisted] [--uncommitted]
# Output: List of package directories with changes (one per line)
#
# Modes:
#   Default (non-hoisted): Ignores lock files, detects source changes only
#   --hoisted: For repos with hoisted deps - checks if lock file dep changes affect each project
#   --uncommitted: Include uncommitted changes (for local testing)
#
# Automatically reads workspaces from root package.json to determine package locations
set -e

BASE_REF="${1:-HEAD~1}"
HOISTED_MODE=false
UNCOMMITTED_MODE=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --hoisted)
      HOISTED_MODE=true
      ;;
    --uncommitted)
      UNCOMMITTED_MODE=true
      ;;
  esac
done

# Files/patterns to ignore in change detection (non-hoisted mode)
IGNORE_PATTERNS="package-lock.json|\.github/|\.claude/|\.md$"

# Build package pattern from workspaces in root package.json
if [ -f "package.json" ]; then
  WORKSPACES=$(jq -r '.workspaces // [] | .[] | gsub("/\\*\\*$"; "") | gsub("\\*\\*"; "")' package.json 2>/dev/null | tr '\n' '|' | sed 's/|$//')
  if [ -n "$WORKSPACES" ]; then
    PACKAGE_PATTERN="^($WORKSPACES)/"
  else
    PACKAGE_PATTERN="^package/"
  fi
else
  PACKAGE_PATTERN="^package/"
fi

# Get list of workspace directories
get_workspace_dirs() {
  if [ -f "package.json" ]; then
    jq -r '.workspaces // [] | .[]' package.json 2>/dev/null | while read -r ws; do
      # Remove glob patterns (both /* and /**)
      ws_clean=$(echo "$ws" | sed 's/\/\*\*$//' | sed 's/\/\*$//' | sed 's/\*\*//' | sed 's/\*$//')
      if [ -d "$ws_clean" ]; then
        # If it's a glob pattern (contains * or **), find subdirs with package.json
        if [[ "$ws" == *"*"* ]]; then
          find "$ws_clean" -maxdepth 4 -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \; 2>/dev/null
        else
          # Direct workspace path
          if [ -f "$ws_clean/package.json" ]; then
            echo "$ws_clean"
          fi
        fi
      fi
    done
  fi
}

# Filter a list of directories to only include valid, publishable workspace packages
# Usage: filter_to_workspace_packages "dir1 dir2 ..." or piped input
filter_to_workspace_packages() {
  local input="${1:-$(cat)}"
  local workspace_dirs=$(get_workspace_dirs | sort -u)

  for dir in $input; do
    # Only include if it's in the workspace directories list
    if echo "$workspace_dirs" | grep -qxF "$dir"; then
      # Skip private packages
      if [ -f "$dir/package.json" ] && jq -e ".private == true" "$dir/package.json" > /dev/null 2>&1; then
        continue
      fi
      echo "$dir"
    fi
  done
}

# Get list of workspace package names (for filtering out internal deps)
get_workspace_package_names() {
  for pkg_dir in $(get_workspace_dirs); do
    if [ -f "$pkg_dir/package.json" ]; then
      jq -r '.name // empty' "$pkg_dir/package.json" 2>/dev/null
    fi
  done
}

# Find all workspace packages that depend on the given package names
# Usage: find_dependents "pkg-name-1 pkg-name-2 ..."
# Output: List of package directories that depend on any of the input packages
find_dependents() {
  local changed_pkg_names="$1"

  if [ -z "$changed_pkg_names" ]; then
    return
  fi

  for pkg_dir in $(get_workspace_dirs); do
    if [ ! -f "$pkg_dir/package.json" ]; then
      continue
    fi

    # Get all dependencies from this package
    local all_deps=$(jq -r '(.dependencies // {}) + (.devDependencies // {}) + (.peerDependencies // {}) | keys[]' "$pkg_dir/package.json" 2>/dev/null || true)

    # Check if any of our changed packages are in the deps
    for changed_name in $changed_pkg_names; do
      if echo "$all_deps" | grep -qxF "$changed_name"; then
        echo "$pkg_dir"
        break
      fi
    done
  done
}

# Expand changed packages to include dependents (recursively)
# Usage: expand_with_dependents "dir1 dir2 ..."
# Output: Original dirs plus any workspace packages that depend on them
expand_with_dependents() {
  local changed_dirs="$1"
  local all_changed="$changed_dirs"
  local prev_count=0
  local curr_count=$(echo "$all_changed" | wc -w)

  # Keep expanding until no new packages are found
  while [ "$curr_count" -gt "$prev_count" ]; do
    prev_count=$curr_count

    # Get package names for currently changed dirs
    local changed_names=""
    for dir in $all_changed; do
      if [ -f "$dir/package.json" ]; then
        local name=$(jq -r '.name // empty' "$dir/package.json" 2>/dev/null)
        if [ -n "$name" ]; then
          changed_names="$changed_names $name"
        fi
      fi
    done

    # Find packages that depend on these
    local dependents=$(find_dependents "$changed_names")

    # Add to our list (convert spaces to newlines for proper dedup)
    if [ -n "$dependents" ]; then
      all_changed=$(printf "%s\n%s" "$(echo "$all_changed" | tr ' ' '\n')" "$dependents" | grep -v '^$' | sort -u | tr '\n' ' ')
    fi

    curr_count=$(echo "$all_changed" | wc -w)
  done

  echo "$all_changed"
}

if [ "$HOISTED_MODE" = true ]; then
  # Hoisted mode: Check if package-lock.json changed and which projects are affected

  if [ "$UNCOMMITTED_MODE" = true ]; then
    CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || true)
    UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null || true)
    CHANGED_FILES=$(printf "%s\n%s" "$CHANGED_FILES" "$UNTRACKED" | sort -u)
  else
    CHANGED_FILES=$(git diff --name-only "$BASE_REF" HEAD 2>/dev/null || true)
  fi

  LOCK_CHANGED=$(echo "$CHANGED_FILES" | grep -E "^package-lock\.json$" || true)
  ROOT_PKG_CHANGED=$(echo "$CHANGED_FILES" | grep -E "^package\.json$" || true)

  # Get packages with direct source changes (excluding lock files)
  SOURCE_CHANGED_PKGS=$(echo "$CHANGED_FILES" | \
    grep -v -E "$IGNORE_PATTERNS" | \
    grep -E "$PACKAGE_PATTERN" | \
    while read -r file; do
      dir=$(dirname "$file")
      while [ "$dir" != "." ] && [ ! -f "$dir/package.json" ]; do
        dir=$(dirname "$dir")
      done
      if [ -f "$dir/package.json" ]; then
        echo "$dir"
      fi
    done | sort -u || true)

  # Collect all changed packages (from lock file deps + source changes)
  ALL_CHANGED_PKGS="$SOURCE_CHANGED_PKGS"

  # If package-lock.json or root package.json changed, check which projects are affected
  if [ -n "$LOCK_CHANGED" ] || [ -n "$ROOT_PKG_CHANGED" ]; then
    CHANGED_DEPS=""

    # Get internal package names to filter them out (we only care about external dep changes)
    INTERNAL_PKGS=$(get_workspace_package_names | tr '\n' '|' | sed 's/|$//')

    if [ -n "$LOCK_CHANGED" ]; then
      if [ "$UNCOMMITTED_MODE" = true ]; then
        CHANGED_DEPS=$(git diff HEAD -- package-lock.json 2>/dev/null | \
          grep -E '^\+\s*"[^"]+":' | \
          grep -oE '"[^"]+":' | \
          sed 's/"//g' | sed 's/://g' | \
          grep -v "^version$\|^resolved$\|^integrity$\|^dev$\|^optional$\|^requires$\|^dependencies$\|^packages$\|^node_modules$" | \
          sort -u || true)
      else
        CHANGED_DEPS=$(git diff "$BASE_REF" HEAD -- package-lock.json 2>/dev/null | \
          grep -E '^\+\s*"[^"]+":' | \
          grep -oE '"[^"]+":' | \
          sed 's/"//g' | sed 's/://g' | \
          grep -v "^version$\|^resolved$\|^integrity$\|^dev$\|^optional$\|^requires$\|^dependencies$\|^packages$\|^node_modules$" | \
          sort -u || true)
      fi
    fi

    if [ -n "$ROOT_PKG_CHANGED" ]; then
      if [ "$UNCOMMITTED_MODE" = true ]; then
        PKG_DEPS=$(git diff HEAD -- package.json 2>/dev/null | \
          grep -E '^\+.*"@?[a-zA-Z]' | \
          grep -oE '"@?[a-zA-Z][^"]*"' | \
          sed 's/"//g' | \
          grep -v "^name$\|^version$\|^description$" | \
          sort -u || true)
      else
        PKG_DEPS=$(git diff "$BASE_REF" HEAD -- package.json 2>/dev/null | \
          grep -E '^\+.*"@?[a-zA-Z]' | \
          grep -oE '"@?[a-zA-Z][^"]*"' | \
          sed 's/"//g' | \
          grep -v "^name$\|^version$\|^description$" | \
          sort -u || true)
      fi
      CHANGED_DEPS=$(printf "%s\n%s" "$CHANGED_DEPS" "$PKG_DEPS" | sort -u)
    fi

    # Filter out internal workspace package names - their changes are handled by SOURCE_CHANGED_PKGS
    if [ -n "$INTERNAL_PKGS" ] && [ -n "$CHANGED_DEPS" ]; then
      CHANGED_DEPS=$(echo "$CHANGED_DEPS" | grep -v -E "^($INTERNAL_PKGS)$" || true)
    fi

    # For each workspace, check if it uses any of the changed deps
    for pkg_dir in $(get_workspace_dirs); do
      if [ ! -f "$pkg_dir/package.json" ]; then
        continue
      fi

      # Use npx to run prepublish-standalone since devops-tools should be available
      PROJECT_DEPS=$(npx prepublish-standalone "$pkg_dir" "." --dry-run 2>/dev/null | \
        grep -E "^\s+[@a-zA-Z]" | \
        sed 's/:.*//g' | \
        tr -d ' ' || true)

      if [ -n "$CHANGED_DEPS" ] && [ -n "$PROJECT_DEPS" ]; then
        for dep in $CHANGED_DEPS; do
          if echo "$PROJECT_DEPS" | grep -qF "$dep"; then
            ALL_CHANGED_PKGS=$(printf "%s\n%s" "$ALL_CHANGED_PKGS" "$pkg_dir")
            break
          fi
        done
      fi
    done
  fi

  # Deduplicate initial list
  INITIAL_CHANGED=$(echo "$ALL_CHANGED_PKGS" | sort -u | grep -v '^$' || true)

  # Expand to include packages that depend on changed packages
  if [ -n "$INITIAL_CHANGED" ]; then
    EXPANDED=$(expand_with_dependents "$INITIAL_CHANGED")
    # Filter to only valid workspace packages (excludes root and non-workspace dirs)
    echo "$EXPANDED" | tr ' ' '\n' | grep -v '^$' | filter_to_workspace_packages | sort -u
  fi

else
  # Non-hoisted mode: Simple detection - ignore lock files, find changed packages
  if [ "$UNCOMMITTED_MODE" = true ]; then
    # Include uncommitted changes (staged + unstaged + untracked)
    CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || true)
    UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null || true)
    CHANGED_FILES=$(printf "%s\n%s" "$CHANGED_FILES" "$UNTRACKED")
  else
    CHANGED_FILES=$(git diff --name-only "$BASE_REF" HEAD 2>/dev/null || true)
  fi

  INITIAL_CHANGED=$(echo "$CHANGED_FILES" | \
    grep -v -E "$IGNORE_PATTERNS" | \
    grep -E "$PACKAGE_PATTERN" | \
    while read -r file; do
      dir=$(dirname "$file")
      while [ "$dir" != "." ] && [ ! -f "$dir/package.json" ]; do
        dir=$(dirname "$dir")
      done
      if [ -f "$dir/package.json" ]; then
        echo "$dir"
      fi
    done | sort -u || true)

  # Expand to include packages that depend on changed packages
  if [ -n "$INITIAL_CHANGED" ]; then
    EXPANDED=$(expand_with_dependents "$INITIAL_CHANGED")
    # Filter to only valid workspace packages (excludes root and non-workspace dirs)
    echo "$EXPANDED" | tr ' ' '\n' | grep -v '^$' | filter_to_workspace_packages | sort -u
  fi
fi
