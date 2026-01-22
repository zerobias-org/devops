#!/bin/bash
### This scripts is invoked by the nx:prepublish target on each of the publishable schemas
### It creates a fresh database from the template created by `prepublish-init`
### The schema is loaded using dataloader and typescript interfaces are generated under a `ts` directory inside of the schema's location
set -e
set -x

package_path=$(pwd)

cd $(dirname $0)
CURRENT=$(pwd)
echo $CURRENT

if [ ! -f "$package_path/package.json" ]; then
  echo "Unable to locate package.json $package_path"
  exit 1
fi

# Handle hoisted node_modules - create symlink if local node_modules doesn't exist
if [ ! -d "$package_path/node_modules" ]; then
  # Search up for root node_modules (hoisted monorepo setup)
  search_dir="$package_path"
  while [ "$search_dir" != "/" ]; do
    search_dir=$(dirname "$search_dir")
    if [ -d "$search_dir/node_modules" ] && [ -f "$search_dir/package.json" ]; then
      # Check if this is a workspace root (has workspaces in package.json)
      if jq -e '.workspaces' "$search_dir/package.json" > /dev/null 2>&1; then
        echo "Hoisted node_modules detected at $search_dir, creating symlink"
        ln -sf "$search_dir/node_modules" "$package_path/node_modules"
        break
      fi
    fi
  done
fi

packagejson=$package_path/package.json
PGOPTIONS='--client-min-messages=warning'

# PGDATABASE=nfa_catalog_template
# echo "Using DB nfa_catalog_template to build schema"

PGDATABASE=$(jq -r '.["name"]' $packagejson)
echo "Creating DB $PGDATABASE from template"
dropdb --if-exists $PGDATABASE
createdb $PGDATABASE -T nfa_catalog_template


# load schema and generate code
# `postpublish.sh` will handle publication of ts artifacts.
echo "loading schemas at $package_path"
dataloader -d $package_path --skip-pgboss
status=$?
if [ $status -ne 0 ]; then
  echo "failed loading artifact $package_path"
  dropdb $PGDATABASE
  exit 1
fi;

echo "Successfully loaded artifact $package_path"
dropdb $PGDATABASE