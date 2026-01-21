#!/bin/bash

# Get published packages
# If PACKAGES_FILE is provided, use it; otherwise use lerna list --since
if [ -n "$PACKAGES_FILE" ] && [ -f "$PACKAGES_FILE" ]; then
  packages=$(cat "$PACKAGES_FILE" | jq -c '.[]')
else
  since="${SINCE:-HEAD~1}"
  packages=$(npx lerna list --since "$since" --json --no-progress 2>/dev/null | grep -v '^lerna' | jq -c '.[]')
fi

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
