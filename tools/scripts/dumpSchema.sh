#!/bin/bash

set -e

BASEDIR=$(pwd)

while getopts "s:t:c" option; do
  case ${option} in
    c)
      CLEANUP=1
      ;;
    \?)
    echo "usage: ${0} [-s schema package] [-t test timeout (ms)]"
      ;;
  esac
done

SCHEMA_PACKAGE=$(jq -r .name ${BASEDIR}/package.json)

if [[ $CLEANUP ]]; then
  echo "### Cleaning up temporary databases for ${SCHEMA_PACKAGE}"
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

echo "### Applying schema for ${SCHEMA_PACKAGE}"
echo

which direnv && direnv allow . && eval "$(direnv export bash)"

export PGDATABASE=${PGDATABASE}_$(date +%s%n)

echo "### Applying schema ${SCHEMA_PACKAGE} to database ${PGDATABASE}"
PGOPTIONS='--client-min-messages=warning'
echo "### Dropping DB if exists: $PGDATABASE"
cd $BASEDIR
./drop.sh

echo "### (Re-)Creating DB $PGDATABASE"
./create.sh

echo "### Applying schema ${SCHEMA_PACKAGE}"
./apply.sh

echo "### Creating schema dump"
cd $BASEDIR
pg_dump -s -f dist/schema.sql -O -x
pg_dump -f dist/baseline.sql

if [[ -n "${SCHEMA_PACKAGE}" ]]; then
  echo "### Dropping database $PGDATABASE"
  cd $BASEDIR
  ./drop.sh
fi
