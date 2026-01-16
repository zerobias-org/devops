#!/bin/bash
set -e
set -x

NAME=$(jq -r '.name' package.json)
VERSION=$(jq -r '.version' package.json)
TAG="${DISTTAG:-latest}"

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

LATEST=$(npm view "$NAME" dist-tags."$TAG" 2>/dev/null) || echo ""

if [ "$VERSION" != "$LATEST" ]; then
  # Use READ_TOKEN for npm install (to fetch private deps)
  # but preserve NPM_TOKEN for publish (set by workflow to GITHUB_TOKEN with write access)
  PUBLISH_TOKEN="$NPM_TOKEN"
  export NPM_TOKEN="$READ_TOKEN"
  retry npm i
  export NPM_TOKEN="$PUBLISH_TOKEN"
  retry npm publish --tag "$TAG"
fi
