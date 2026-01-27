#!/bin/bash
# Sort package directories by dependency order
# Usage: sort-by-deps.sh pkg1 pkg2 pkg3 ...
# Output: Package directories sorted so dependencies come before dependents
#
# Uses topological sort based on package.json dependencies

set -e

PACKAGES="$@"

if [ -z "$PACKAGES" ]; then
  exit 0
fi

# Get package names from directories and build lookup tables
PACKAGE_NAMES=""
declare -A NAME_TO_DIR
declare -A PKG_DEPS

for pkg in $PACKAGES; do
  if [ -f "$pkg/package.json" ]; then
    name=$(jq -r '.name' "$pkg/package.json")
    PACKAGE_NAMES="$PACKAGE_NAMES $name"
    NAME_TO_DIR["$name"]="$pkg"
    deps=$(jq -r '(.dependencies // {}) | keys[]' "$pkg/package.json" 2>/dev/null || true)
    PKG_DEPS["$name"]="$deps"
  fi
done

# Topological sort: packages with no unmet internal dependencies first
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
  # Break cycle if no progress made (shouldn't happen with valid deps)
  if [ "$MADE_PROGRESS" = false ] && [ -n "$(echo $REMAINING | tr -d ' ')" ]; then
    SORTED="$SORTED $REMAINING"
    break
  fi
done

# Convert names back to directories
SORTED_DIRS=""
for name in $SORTED; do
  dir="${NAME_TO_DIR[$name]}"
  if [ -n "$dir" ]; then
    SORTED_DIRS="$SORTED_DIRS $dir"
  fi
done

echo $SORTED_DIRS | sed 's/^ //'
