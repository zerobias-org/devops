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

# Handle hoisted node_modules - symlink missing packages from root
# Find workspace root with hoisted node_modules
ROOT_NODE_MODULES=""
search_dir="$package_path"
while [ "$search_dir" != "/" ]; do
  search_dir=$(dirname "$search_dir")
  if [ -d "$search_dir/node_modules" ] && [ -f "$search_dir/package.json" ]; then
    if jq -e '.workspaces' "$search_dir/package.json" > /dev/null 2>&1; then
      ROOT_NODE_MODULES="$search_dir/node_modules"
      break
    fi
  fi
done

# If we found a root and local node_modules exists but may be incomplete
if [ -n "$ROOT_NODE_MODULES" ]; then
  mkdir -p "$package_path/node_modules"

  # Symlink scoped packages from root if they don't exist locally
  for scope in "@zerobias-org" "@zerobias-com" "@auditlogic" "@auditmation"; do
    if [ -d "$ROOT_NODE_MODULES/$scope" ] && [ ! -d "$package_path/node_modules/$scope" ]; then
      echo "Symlinking $scope from root node_modules"
      ln -sf "$ROOT_NODE_MODULES/$scope" "$package_path/node_modules/$scope"
    fi
  done

  # Also symlink .bin if missing
  if [ -d "$ROOT_NODE_MODULES/.bin" ] && [ ! -d "$package_path/node_modules/.bin" ]; then
    echo "Symlinking .bin from root node_modules"
    ln -sf "$ROOT_NODE_MODULES/.bin" "$package_path/node_modules/.bin"
  fi
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