#!/bin/bash
# Sort package directories by dependency order using nx graph
# Usage: sort-by-deps.sh pkg1 pkg2 pkg3 ...
# Output: Package directories sorted so dependencies come before dependents
#
# Uses nx's project graph to determine correct publish order

set -e

PACKAGES="$@"

if [ -z "$PACKAGES" ]; then
  exit 0
fi

# Get package names from directories
PACKAGE_NAMES=""
declare -A NAME_TO_DIR
for pkg in $PACKAGES; do
  if [ -f "$pkg/package.json" ]; then
    name=$(jq -r '.name' "$pkg/package.json")
    PACKAGE_NAMES="$PACKAGE_NAMES $name"
    NAME_TO_DIR["$name"]="$pkg"
  fi
done

# Use nx to get the dependency-ordered list of projects
# nx print-affected gives projects in topological order
ORDERED_NAMES=$(nx show projects --json 2>/dev/null | jq -r '.[]' | while read project; do
  # Only include projects that are in our input list
  for name in $PACKAGE_NAMES; do
    if [ "$project" = "$name" ]; then
      echo "$project"
      break
    fi
  done
done)

# If nx didn't work, fall back to manual sorting
if [ -z "$ORDERED_NAMES" ]; then
  # Fallback: manual topological sort
  declare -A PKG_DEPS
  for pkg in $PACKAGES; do
    if [ -f "$pkg/package.json" ]; then
      deps=$(jq -r '(.dependencies // {}) | keys[]' "$pkg/package.json" 2>/dev/null || true)
      name=$(jq -r '.name' "$pkg/package.json")
      PKG_DEPS["$name"]="$deps"
    fi
  done

  SORTED=""
  REMAINING="$PACKAGE_NAMES"
  while [ -n "$(echo $REMAINING | tr -d ' ')" ]; do
    MADE_PROGRESS=false
    NEW_REMAINING=""
    for name in $REMAINING; do
      HAS_UNMET_DEPS=false
      for dep in ${PKG_DEPS[$name]}; do
        # Check if dep is in our list and not yet sorted
        if [[ " $PACKAGE_NAMES " =~ " $dep " ]] && [[ ! " $SORTED " =~ " $dep " ]]; then
          HAS_UNMET_DEPS=true
          break
        fi
      done
      if [ "$HAS_UNMET_DEPS" = false ]; then
        SORTED="$SORTED $name"
        MADE_PROGRESS=true
      else
        NEW_REMAINING="$NEW_REMAINING $name"
      fi
    done
    REMAINING="$NEW_REMAINING"
    if [ "$MADE_PROGRESS" = false ] && [ -n "$(echo $REMAINING | tr -d ' ')" ]; then
      SORTED="$SORTED $REMAINING"
      break
    fi
  done
  ORDERED_NAMES="$SORTED"
fi

# Convert names back to directories
SORTED_DIRS=""
for name in $ORDERED_NAMES; do
  dir="${NAME_TO_DIR[$name]}"
  if [ -n "$dir" ]; then
    SORTED_DIRS="$SORTED_DIRS $dir"
  fi
done

echo $SORTED_DIRS | sed 's/^ //'
