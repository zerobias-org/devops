#!/bin/bash

set -e

BASEDIR=$(pwd)
TIMEOUT=5000

while getopts "s:t:c" option; do
  case ${option} in
    s)
      SCHEMA_PACKAGE=$OPTARG
      ;;
    t)
      TIMEOUT=$OPTARG
      ;;
    c)
      CLEANUP=1
      ;;
    \?)
    echo "usage: ${0} [-s schema package] [-t test timeout (ms)]"
      ;;
  esac
done

cd $BASEDIR/test/integration/
which direnv && direnv allow . && eval "$(direnv export bash)"

if [[ $CLEANUP ]]; then
  echo "### Cleaning up temporary databases for $(jq -r .name ${BASEDIR}/package.json)"
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

echo "### Running integration tests for $(jq -r .name ${BASEDIR}/package.json)"
echo

export PGDATABASE=${PGDATABASE}_$(date +%s%n)

if [[ -n "${SCHEMA_PACKAGE}" ]]; then
  echo "### Applying schema ${SCHEMA_PACKAGE} to database ${PGDATABASE}"
  PGOPTIONS='--client-min-messages=warning'
  echo "### Dropping DB if exists: $PGDATABASE"
  cd $BASEDIR/node_modules/$SCHEMA_PACKAGE
  ./drop.sh

  echo "### (Re-)Creating DB $PGDATABASE"
  ./create.sh

  cd $BASEDIR
  if [ -f "integrationTest-dump.sql" ]; then
    echo "Found integrationTest-dump, using it"
    psql < ./integrationTest-dump.sql > /dev/null
  fi

  cd $BASEDIR/node_modules/$SCHEMA_PACKAGE
  echo "### Applying schema ${SCHEMA_PACKAGE}"
  ./apply.sh

  cd $BASEDIR
  if [ ! -f "integrationTest-dump.sql" ]; then
    echo "Dumping test database for re-use"
    pg_dump -f integrationTest-dump.sql
  fi
fi

echo "### Running integration test suite"
cd $BASEDIR
npx mocha --exit --inline-diffs --reporter=list "test/integration/**" --timeout $TIMEOUT

if [[ -n "${SCHEMA_PACKAGE}" ]]; then
  echo "### Dropping database $PGDATABASE"
  cd $BASEDIR/node_modules/$SCHEMA_PACKAGE
  ./drop.sh
fi
