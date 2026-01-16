#!/bin/sh
set -e

# This script prepares a workspace package for standalone deployment by:
# 1. Scanning source files for imports
# 2. Adding required dependencies from root package.json to service package.json
# 3. The updated package.json is included in the published artifact
#
# Usage: prepublish-standalone.sh [ROOT_DIR] [OPTIONS]
#   ROOT_DIR  - Path to the monorepo root (defaults to finding package.json with workspaces)
#   OPTIONS   - Passed through to prepublish-standalone.js (--dry-run, --restore, --library)
#
# Note: Shrinkwrap generation is skipped due to chicken-and-egg issue with
# workspace packages not being published yet. Docker builds will generate
# their own package-lock.json via npm install.

SCRIPT_DIR=$(dirname "$(realpath "$0")")
SERVICE_DIR=$(pwd)

# Parse arguments - first non-option arg is ROOT_DIR
ROOT_DIR=""
OPTIONS=""
for arg in "$@"; do
  case "$arg" in
    --*)
      OPTIONS="$OPTIONS $arg"
      ;;
    *)
      if [ -z "$ROOT_DIR" ]; then
        ROOT_DIR="$arg"
      fi
      ;;
  esac
done

# If ROOT_DIR not provided, find it by looking for package.json with workspaces
if [ -z "$ROOT_DIR" ]; then
  SEARCH_DIR="$SERVICE_DIR"
  while [ "$SEARCH_DIR" != "/" ]; do
    if [ -f "$SEARCH_DIR/package.json" ]; then
      # Check if this package.json has workspaces
      if grep -q '"workspaces"' "$SEARCH_DIR/package.json" 2>/dev/null; then
        ROOT_DIR="$SEARCH_DIR"
        break
      fi
    fi
    SEARCH_DIR=$(dirname "$SEARCH_DIR")
  done
fi

if [ -z "$ROOT_DIR" ]; then
  echo "Error: Could not find monorepo root (package.json with workspaces)"
  echo "Usage: prepublish-standalone.sh [ROOT_DIR] [OPTIONS]"
  exit 1
fi

echo "=== Preparing standalone package for publishing ==="
echo "Service directory: $SERVICE_DIR"
echo "Root directory: $ROOT_DIR"

# Run the Node.js script to update dependencies
node "$SCRIPT_DIR/prepublish-standalone.js" "$SERVICE_DIR" "$ROOT_DIR" $OPTIONS

echo "=== Standalone package preparation complete ==="
