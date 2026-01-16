# Hydra Tools
Collection of utilities for devops / ci / environment management

# src/
Scripts which using environment variables and vault to populate credentials for AWS, RDS(psql),
and terraform / terragrunt

## Configuration 

### Environment Variables
- VAULT_ADDR: HashiCorp Vault address (eg https://vault.devsupply.com:8200)
- GITHUB_TOKEN: GitHub personal access token
- AWS_AUTH_ENGINE: Name of the vault aws secret engine
- AWS_AUTH_ROLE: Name of the aws vault role to use
- KUBECTX: Name of the kubectl context to use
- VAULT_MOUNT: The vault kv mount with database secrets to use
- VAULT_BASE_PATH: The base path for the environment to pull database secrets from

## aws.js
Drop in wrapper on the `aws-cli`, auto-populating credentials from a vault aws secret engine.

## getAWSCreds.js
Ensures the cache is populated with valid credentials for the given engine / role and returns them.

## getKubeConfig.js
Populates the `$KUBECONFIG` with configuration from the `aws eks update-kubeconfig` command

## rds.js
Connects to a RDS PostgreSQL database using credentials from vault.  
Usage:
```
rds (namespace) [service]
Args:
namespace: Optional namespace, defaults to `default`
service: Name of the service to use credentials for
```

## repositoryDispatch.js
Triggers a GitHub repository dispatch using a `DISPATCH_TOKEN` environment variable.
Usage:
```
repositoryDispatch --event_type [event type] --event_repo [event repo] ...args
Args:
event_type: Name of the event to trigger
event_repo: Repo to trigger the event in
args: Any other free form arguments will be passed on the object to the workflow
```

## terragrunt.js
Wrapper on terragrunt which sets vault and aws credentials as environment variables on the command.

# Scripts

In the `scripts/` directory are various utility shell scripts.

## `db/`

Scripts in this directory are for managing a database for schema application. There is one template, `apply-template.sh`, which should be copied to `apply.sh` and customized by modifying the `SCHEMAS` variable to specify which schemas this one depends on.

All of these scripts are expected to be idempotent. Environment variables are expected as per `libpq`, with the addition of `SU_USER`, `SU_PASSWORD`, and `SU_DATABASE`, which define superuser credentials to use in the `create.sh` and `drop.sh` scripts.

### `db/create.sh`

This script will create the DB defined in `$PGDATABASE` and the user defined in `$PGUSER`, if they do not exist. It will also install all the DB extensions we use across the organization.

### `db/drop.sh`

This script will drop the DB defined in `$PGDATABASE`, if it exists. It will not attempt to drop `$PGUSER`, however, as other DB objects may depend on it.

## `husky/`

Scripts in this directory are for Husky commit hooks. You can link the entire directory to `.husky` in your repository root.

### `husky/commit-msg`

Husky script to run `commitlint` on commit messages.

### `husky/pre-commit`

Husky script to ensure the build completes and tests run before a commit.

## `integrationTest.sh`

Runs integration tests, optionally applying a schema to a database. Usage is as follows:

    integrationTest.sh [-s schema package] [-t test timeout (ms)]

The schema package, if provided, will be applied via the DB scripts in said package. After this, integration tests will be run and the test database dropped.
