#! /usr/bin/env bash

PKG_TEMPLATE='
{
  "name": "@zerobias-org/${REPO_NAME}-bundle",
  "version": "0.0.0",
  "description": "All installable ${REPO_NAME}s",
  "author": "team@zerobias.com",
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "git@github.com:zerobias-org/${REPO_NAME}.git",
    "directory": "bundle/"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  },
  "zerobias": {
    "package": "bundle.all-${REPO_NAME}s",
    "import-artifact": "bundle",
    "dataloader-version": "1.0.0"
  }
}
'

mkdir -p bundle
if [ ! -f bundle/package.json ]; then
  echo $PKG_TEMPLATE | envsubst > bundle/package.json
  cd bundle
  ln -s ../.npmrc .
  cd ..
fi

PACKAGES=$(npx lerna list --ndjson)
DEPS=$(npx lerna list --json  | jq 'reduce .[] as $i ({}; .[$i.name] = $i.version)')

# Get current dependencies before update
OLD_DEPS=$(cat bundle/package.json | jq -S '.dependencies // {}')

cat bundle/package.json | jq --argjson deps "$DEPS" '.dependencies = $deps' > bundle/package.json.new
mv bundle/package.json.new bundle/package.json

# Get new dependencies after update
NEW_DEPS=$(cat bundle/package.json | jq -S '.dependencies // {}')

# Only publish if dependencies changed
if [ "$OLD_DEPS" = "$NEW_DEPS" ]; then
  echo "No dependency changes detected, skipping bundle publish"
  exit 0
fi

echo "Dependencies changed, publishing bundle update"
cd bundle
npm version patch
npm i
NPM_TOKEN=$PUBLISH_TOKEN npm publish
cd ..
