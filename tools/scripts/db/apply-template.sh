#!/bin/sh

set -e

# set some reasonable defaults
if test -z "$PGSSLMODE"; then
  PGSSLMODE=disable
fi
if test -z "$PGPORT"; then
  PGPORT=5432
fi

BASEDIR=$(dirname $(realpath $0))
SCHEMAS="@zerobias-org/hydra-schema-principal
  @zerobias-org/hydra-schema-resource
"

for schema in $SCHEMAS; do
  SCHEMA_DIR=${BASEDIR}/node_modules/${schema}
  if test ! -d $SCHEMA_DIR; then
    SCHEMA_DIR=${BASEDIR}/../${schema}
  fi
  echo "Applying $schema from $SCHEMA_DIR"
  cd $SCHEMA_DIR
  eval ./apply.sh
  echo "${schema} applied"
  cd $BASEDIR
done

echo "Applying $(jq -r .name ${BASEDIR}/package.json)"
URL=postgres://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE?sslmode=$PGSSLMODE
sem-apply --url $URL
