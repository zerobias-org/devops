#!/bin/sh

set -e
DB_USER=$PGUSER
DB_PASSWORD=$PGPASSWORD
DB_DB=$PGDATABASE

PGUSER=$SU_USER
PGPASSWORD=$SU_PASSWORD
PGDATABASE=$SU_DB

if [ "$( psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_DB'" )" = '1' ]
then
  echo "Database already exists"
else
  echo "Database does not exist"
  psql -c "CREATE DATABASE $DB_DB"
fi

if [ "$( psql -d $DB_DB -tAc "SELECT 1 FROM pg_user WHERE usename='$DB_USER'" )" = '1' ]
then
  echo "User already exists"
else
  echo "User does not exist"
  psql -d $PGDATABASE -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD'"
fi

psql -d $PGDATABASE -tc "GRANT CREATE, CONNECT ON DATABASE $DB_DB TO $DB_USER"
psql -tc "alter role $DB_USER with createrole"

psql -d $DB_DB -tc "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\" WITH SCHEMA public"
psql -d $DB_DB -tc "CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public"
psql -d $DB_DB -tc "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public"
psql -d $DB_DB -tc "CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public"
psql -d $DB_DB -tc "CREATE EXTENSION IF NOT EXISTS plv8 WITH SCHEMA pg_catalog"
psql -d $DB_DB -tc "CREATE DOMAIN public.nmtoken AS text CHECK (VALUE ~* '^[A-Z0-9\.\_\-\:]+$')"
psql -d $DB_DB -tc "CREATE DOMAIN hostname AS text CHECK (VALUE ~* '(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]')"