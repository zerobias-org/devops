#!/bin/bash
# Output npm package names for changed packages
# Usage: get-changed-package-names.sh [BASE_REF]
# Output: List of npm package names (one per line)
set -e

BASE_REF="${1:-HEAD~1}"
SCRIPT_DIR="$(dirname "$0")"

for pkg_dir in $("$SCRIPT_DIR/detect-changes.sh" "$BASE_REF"); do
  jq -r '.name' "$pkg_dir/package.json"
done
