#! /bin/bash

set -e

PACKAGES=$(npx lerna list --since $SINCE --ndjson | jq -c | grep -v article-update-utility) || $(echo "")
ROOT=$(pwd)

for package in $(echo $PACKAGES | jq -r -c '.location'); do
  cd $package

  NAME=$(cat package.json | jq -r '.name')
  VERSION=$(cat package.json | jq -r '.version')

  echo "Checking dist-tags for $NAME@$VERSION"
  TAGS=$(npm view --json $NAME@$VERSION | jq -r '."dist-tags"')

  for tag in $(echo $TAGS | jq -r 'keys[]'); do
    tagVersion=$(echo $TAGS | jq --arg tag "$tag" -r '.[$tag]')
    echo "Checking $tag $tagVersion against $VERSION"
    if [ "$tagVersion" = "$VERSION" ]; then
      echo "Version matches, uploading new version to cdn"
      code=$(jq -r '.name | split("-")[1]' package.json)
      if [ "$tag" = "latest" ]; then
        echo "Would do something to latest"
      elif [ "$tag" = "rc" ]; then
        echo "Skipping rc"
      else
        echo "Would do something to $tag"
      fi
    fi
  done

  cd $ROOT
done
