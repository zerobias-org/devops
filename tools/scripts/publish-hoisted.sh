#!/bin/bash
# Publish a hoisted workspace package to npm registry
# Usage: publish-hoisted.sh [--tag <tag>]
#   --tag <tag>  - npm dist-tag to use (default: latest)
#
# Must be run from within a package directory containing package.json
# Requires NPM_TOKEN environment variable for authentication
#
# Output: On success, prints JSON with published package info:
#   {"name": "@scope/pkg", "version": "1.0.0", "location": "/path/to/pkg"}

set -e

# Retry function for transient npm errors (ENOTEMPTY, network issues, etc.)
retry() {
  local max_attempts=3
  local delay=5
  local attempt=1

  while [ $attempt -le $max_attempts ]; do
    echo "Attempt $attempt of $max_attempts: $*"
    if "$@"; then
      return 0
    fi

    if [ $attempt -lt $max_attempts ]; then
      echo "Command failed, retrying in ${delay}s..."
      sleep $delay
      delay=$((delay * 2))
    fi
    attempt=$((attempt + 1))
  done

  echo "Command failed after $max_attempts attempts"
  return 1
}

TAG="latest"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --tag)
      TAG="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

# Verify we're in a package directory
if [ ! -f "package.json" ]; then
  echo "Error: No package.json found in current directory" >&2
  exit 1
fi

# Verify NPM_TOKEN is set
if [ -z "$NPM_TOKEN" ]; then
  echo "Error: NPM_TOKEN environment variable is required" >&2
  exit 1
fi

PACKAGE_DIR=$(pwd)
NAME=$(jq -r '.name' package.json)
VERSION=$(jq -r '.version' package.json)

echo "Publishing $NAME@$VERSION with tag $TAG"

# Create temp directory for clean publish
TEMP_PUBLISH_DIR=$(mktemp -d)
trap "rm -rf $TEMP_PUBLISH_DIR" EXIT

# Copy package files to temp dir
cp -r ./* "$TEMP_PUBLISH_DIR/"

pushd "$TEMP_PUBLISH_DIR" > /dev/null

# Copy .npmrc for registry auth if exists in home
if [ -f "$HOME/.npmrc" ]; then
  cp "$HOME/.npmrc" .npmrc
fi

# Publish with retry for transient errors
if retry timeout 120 npm publish --tag "$TAG"; then
  echo "Successfully published $NAME@$VERSION"
  # Output JSON for workflow consumption with marker prefix for reliable parsing
  echo "PUBLISH_RESULT:{\"name\": \"$NAME\", \"version\": \"$VERSION\", \"location\": \"$PACKAGE_DIR\"}"
else
  echo "Error: Failed to publish $NAME" >&2
  exit 1
fi

popd > /dev/null
