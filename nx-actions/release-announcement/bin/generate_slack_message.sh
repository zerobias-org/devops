#!/bin/bash

# Get changed packages
# Uses SINCE env var if set, otherwise defaults to HEAD~1
since="${SINCE:-HEAD~1}"
all_packages=$(npx lerna list --since "$since" --json --no-progress 2>/dev/null | grep -v '^lerna' | jq -c '.[]')

if [ -z "$all_packages" ]; then
  echo "No packages published"
  exit 0
fi

# Filter to only include packages that were actually published in this run
# Lerna creates git tags when publishing, so we check if the tag was just created
# by comparing the tag's commit to HEAD
packages=""
while IFS= read -r pkg; do
  name=$(echo "$pkg" | jq -r '.name')
  version=$(echo "$pkg" | jq -r '.version')
  tag="${name}@${version}"

  # Check if this tag exists and points to HEAD (meaning it was just created)
  tag_commit=$(git rev-list -n 1 "$tag" 2>/dev/null || echo "")
  head_commit=$(git rev-parse HEAD 2>/dev/null || echo "")

  if [ -n "$tag_commit" ] && [ "$tag_commit" = "$head_commit" ]; then
    if [ -z "$packages" ]; then
      packages="$pkg"
    else
      packages="$packages"$'\n'"$pkg"
    fi
  fi
done <<< "$all_packages"

if [ -z "$packages" ]; then
  echo "No packages published"
  exit 0
fi

# Generate output
output=""

# Add actor info if available
if [ -n "$GITHUB_ACTOR" ]; then
  output+="Published by *@${GITHUB_ACTOR}*"
  output+=$'\n\n'
fi

output+="*:package: Packages*"
output+=$'\n'

while IFS= read -r pkg; do
  name=$(echo "$pkg" | jq -r '.name')
  version=$(echo "$pkg" | jq -r '.version')
  location=$(echo "$pkg" | jq -r '.location')
  changelog="https://github.com/${GITHUB_REPOSITORY}/blob/main/$(realpath --relative-to=. "$location")/CHANGELOG.md"

  output+="• \`${name}@${version}\` <${changelog}|changelog>"
  output+=$'\n'
done <<< "$packages"

printf '%s' "$output"
