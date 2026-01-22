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
      # Remove glob patterns
      ws_clean=$(echo "$ws" | sed 's/\/\*\*$//' | sed 's/\*\*//')
      if [ -d "$ws_clean" ]; then
        # If it's a glob pattern like "package/**", find all subdirs with package.json
        if [[ "$ws" == *"**"* ]]; then
          find "$ws_clean" -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \; 2>/dev/null
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

if [ "$HOISTED_MODE" = true ]; then
  # Hoisted mode: Check if package-lock.json changed and which projects are affected

  if [ "$UNCOMMITTED_MODE" = true ]; then
    # Include uncommitted changes (staged + unstaged + untracked)
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

  # If package-lock.json or root package.json changed, check which projects are affected
  if [ -n "$LOCK_CHANGED" ] || [ -n "$ROOT_PKG_CHANGED" ]; then
    # Get changed dependencies from package-lock.json
    CHANGED_DEPS=""
    if [ -n "$LOCK_CHANGED" ]; then
      # Extract package names that changed in the lock file
      CHANGED_DEPS=$(git diff "$BASE_REF" HEAD -- package-lock.json 2>/dev/null | \
        grep -E '^\+\s*"[^"]+":' | \
        grep -oE '"[^"]+":' | \
        sed 's/"//g' | sed 's/://g' | \
        grep -v "^version$\|^resolved$\|^integrity$\|^dev$\|^optional$\|^requires$\|^dependencies$" | \
        sort -u || true)
    fi

    # For each workspace, check if it uses any of the changed deps
    SCRIPT_DIR="$(dirname "$0")"
    for pkg_dir in $(get_workspace_dirs); do
      if [ ! -f "$pkg_dir/package.json" ]; then
        continue
      fi

      # Run prepublish-standalone in dry-run mode to get actual deps
      if [ -x "$SCRIPT_DIR/prepublish-standalone.sh" ] || [ -f "$SCRIPT_DIR/prepublish-standalone.js" ]; then
        # Get the deps that would be bundled for this package
        PROJECT_DEPS=$(node "$SCRIPT_DIR/prepublish-standalone.js" "$pkg_dir" "." --dry-run 2>/dev/null | \
          grep -E "^\s+[a-zA-Z@]" | \
          sed 's/:.*//g' | \
          tr -d ' ' || true)

        # Check if any changed dep is used by this project
        if [ -n "$CHANGED_DEPS" ] && [ -n "$PROJECT_DEPS" ]; then
          for dep in $CHANGED_DEPS; do
            if echo "$PROJECT_DEPS" | grep -qE "^${dep}$"; then
              echo "$pkg_dir"
              break
            fi
          done
        fi
      else
        # Fallback: if prepublish-standalone not available, include all workspaces when lock changes
        echo "$pkg_dir"
      fi
    done | sort -u
  fi

  # Also include packages with direct source changes
  if [ -n "$SOURCE_CHANGED_PKGS" ]; then
    echo "$SOURCE_CHANGED_PKGS"
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

  echo "$CHANGED_FILES" | \
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
    done | sort -u || true
fi
