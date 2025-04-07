#!/bin/bash

set -e

npm i -g @auditmation/platform-dataloader@latest

BASEDIR=$(pwd)
ROOTDIR=$(git rev-parse --show-toplevel)

while getopts ":c" option; do
  case ${option} in
    c)
      CLEANUP=1
      ;;
    \?)
    echo "usage: ${0}"
      ;;
  esac
done

CONTENT_PACKAGE="@auditmation/platform-content"

if [[ $CLEANUP ]]; then
  echo "### Cleaning up temporary databases for ${CONTENT_PACKAGE}"
  DB_USER=$PGUSER
  DB_PASSWORD=$PGPASSWORD
  DB_DB=$PGDATABASE

  PGUSER=$SU_USER
  PGPASSWORD=$SU_PASSWORD
  PGDATABASE=$SU_DB

  STALE=$(psql -tc "SELECT datname FROM pg_database WHERE datname LIKE '${DB_DB}_%' AND datistemplate=false")
  for S in $STALE; do
    echo "dropping DB $S..."
    psql -tc "DROP DATABASE IF EXISTS $S"
  done

  SU_USER=$PGUSER
  SU_PASSWORD=$PGPASSWORD
  SU_DB=$PGDATABASE

  PGUSER=$DB_USER
  PGPASSWORD=$DB_PASSWORD
  PGDATABASE=$DB_DB
fi

echo "### Applying schema for ${CONTENT_PACKAGE}"
echo

which direnv && direnv allow . && eval "$(direnv export bash)"

export PGDATABASE=${PGDATABASE}_$(date +%s%n)
psql -d $SU_DB -c 'CREATE ROLE "00000000-0000-0000-0000-000000000000"' || echo "NilUUID role already exists"

TMPDIR=$(mktemp -d)

cd $TMPDIR
npm pack $CONTENT_PACKAGE@latest
tar xvf auditmation-platform-content*.tgz

echo "### Applying schema ${CONTENT_PACKAGE} to database ${PGDATABASE}"
PGOPTIONS='--client-min-messages=warning'
echo "### Dropping DB if exists: $PGDATABASE"
${ROOTDIR}/node_modules/@auditmation/devops-tools/scripts/db/drop.sh

echo "### (Re-)Creating DB $PGDATABASE"
${ROOTDIR}/node_modules/@auditmation/devops-tools/scripts/db/create.sh

echo "### Loading ${CONTENT_PACKAGE}"
psql < package/dist/content-full.sql
psql < package/dist/content-data.sql

cd $BASEDIR
echo "### Loading $(jq -r .name package.json)"
# npx lerna run test:integration --since

npx lerna run generate --since
npx lerna exec "npx dataloader --skip-dynamo" --since

cd $TMPDIR
echo "### Dropping database $PGDATABASE"
${ROOTDIR}/node_modules/@auditmation/devops-tools/scripts/db/drop.sh

cd $BASEDIR
