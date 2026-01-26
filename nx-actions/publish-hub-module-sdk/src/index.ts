import camelCase from 'camelcase';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import yaml from 'js-yaml';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

const repository = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`;

// Helper to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const npmrc = `
@zerobias-org:registry=https://pkg.zerobias.org/
//pkg.zerobias.org/:always-auth=true
//pkg.zerobias.org/:_authToken=\${ZB_TOKEN}
@zerobias-com:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:always-auth=true
//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}
`;

interface Config {
  pkg: string;
  apiPath: string;
  moduleId: string;
  apiName: string;
  rawApiName: string;
  dryRun: boolean;
}

interface PackageInfo {
  publisher: string;
  packageName: string;
  apiFileName: string;
}

interface ModuleMetadata {
  moduleId: string;
  moduleRepository: string | undefined;
  zbPackageName: string;
  version: string;
}

interface PackageJsonConfig {
  packageName: string;
  publisher: string;
  version: string;
  moduleId: string;
  zbPackageName: string;
  apiFileName: string;
  moduleRepository: string | undefined;
}

function initConfig(): Config {
  if (process.env.LOCAL_MODE === 'true') {
    return {
      pkg: process.env.package || '',
      apiPath: process.env.apiPath || '',
      moduleId: process.env.moduleId || '',
      apiName: camelCase(process.env.apiName || ''),
      rawApiName: process.env.apiName || '',
      dryRun: process.env.dryRun !== 'false',
    };
  } else {
    if (!core.getInput('package')) {
      throw new Error('Not initialized');
    }
    return {
      pkg: core.getInput('package'),
      apiPath: core.getInput('apiPath'),
      moduleId: core.getInput('moduleId'),
      apiName: camelCase(core.getInput('apiName')),
      rawApiName: core.getInput('apiName'),
      dryRun: false,
    };
  }
}

function extractPackageInfoFromPackageName(pkg: string, rawApiName: string): PackageInfo {
  const splitPackage = pkg.split('/');
  let publisher = 'zerobias-org';
  if (splitPackage[0]?.startsWith('@')) {
    publisher = splitPackage[0].replace(/@/, '');
  }
  // Use hub-sdk suffix to distinguish from api-client SDK
  let packageName = `${rawApiName.replace(/-/g, '')}-hub-sdk`;
  let apiFileName = `${rawApiName}.yml`;
  if (splitPackage[1]?.startsWith('module-')) {
    if (splitPackage[1].includes('@')) {
      apiFileName = `${splitPackage[1].split('@')[0]}.yml`;
      packageName = `${splitPackage[1].split('@')[0]}-hub-sdk`;
    } else {
      apiFileName = `${splitPackage[1]}.yml`;
      packageName = `${splitPackage[1]}-hub-sdk`;
    }
  }

  return {
    publisher,
    packageName,
    apiFileName,
  };
}

function extractMetadataFromPackageJson(pkgJson: Record<string, unknown>, config: Config): ModuleMetadata {
  const moduleInfo = (pkgJson.zerobias || pkgJson.auditmation) as Record<string, string> | undefined;
  let zbPackageName = `zerobias.${config.rawApiName.replace(/-/g, '')}.hub.sdk`;
  let moduleRepository: string | undefined = undefined;
  let moduleId = config.moduleId;

  if (moduleInfo) {
    zbPackageName = moduleInfo.package?.replace('.module', '.hub.sdk') || zbPackageName;
    moduleRepository = (pkgJson.repository as Record<string, string>)?.url;
    if (!moduleId && pkgJson.moduleId) {
      moduleId = pkgJson.moduleId as string;
    }
  }

  return {
    moduleId,
    moduleRepository,
    zbPackageName,
    version: pkgJson.version as string,
  };
}

function generatePackageJson(moduleDir: string, config: PackageJsonConfig): void {
  const { packageName, publisher, version, moduleId, zbPackageName, apiFileName, moduleRepository } = config;

  const pkgJson = {
    name: `@${publisher}/${packageName}`,
    version,
    description: `${packageName} Hub SDK (with Hub routing support)`,
    moduleId,
    type: 'module',
    main: 'dist/api/index.js',
    types: 'dist/api/index.d.ts',
    scripts: {
      clean: 'rm -rf generated/ dist/ docs/',
      'sync-meta': "VERSION=$(npm run -s get-version) NAME=$(yq -oy e .name package.json) DESC=$(yq -oy e .description package.json) yq e -i '.info.version=strenv(VERSION) | .info.title=strenv(NAME) | .info.description=strenv(DESC)' generated/api.yml",
      validate: 'npx redocly lint generated/api.yml --config .redocly.yaml || true',
      'generate:full': "cd generated && cp api.yml full.yml && if test -f connectionProfile.yml; then yq e -i '.components.schemas.ConnectionProfile.$ref'=\\\"./connectionProfile.yml\\\" full.yml; fi",
      'generate:inflate': 'cd generated && npx redocly bundle -o full2.yml full.yml && mv full2.yml full.yml && cp full.yml api.yml',
      'generate:api': 'hub-generator generate -g hub-module -i generated/api.yml -o generated/ --skip-validate-spec',
      'generate:fix': 'bash fix-gen-code.sh',
      generate: 'npm run generate:full && npm run generate:inflate && npm run generate:api && npm run generate:fix',
      transpile: 'tsc -b',
      build: 'npm run generate && npm run validate && npm run transpile',
      'docs:redoc': 'npx redocly build-docs generated/api.yml -o docs/index.html',
      docs: 'npm run docs:redoc',
      test: "echo 'No tests defined'",
      'get-version': 'yq -oy e .version package.json',
    },
    author: 'team@zerobias.com',
    license: 'UNLICENSED',
    repository: {
      type: 'git',
      url: moduleRepository || repository,
    },
    publishConfig: {
      registry: 'https://npm.pkg.github.com/',
    },
    files: [
      'generated/api.yml',
      'generated/connectionProfile.yml',
      'dist',
      'generated/api/manifest.json',
      'generated/USAGE.md',
      'docs/',
      'CHANGELOG.md',
    ],
    zerobias: {
      package: zbPackageName,
      'dataloader-version': '1.0.0',
      'import-artifact': 'hub-sdk',
    },
    dependencies: {
      '@zerobias-org/util-connector': '^1.0.0',
    },
    devDependencies: {
      '@redocly/cli': '^2.14.5',
      '@zerobias-org/util-codegen': '^2.0.12',
      '@types/node': '^22.19.7',
      typescript: '^5.9.3',
    },
  };

  fs.writeFileSync(path.join(moduleDir, 'package.json'), JSON.stringify(pkgJson, null, 2));
}

function generateTsConfig(moduleDir: string): void {
  const tsconfig = {
    compilerOptions: {
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      target: 'ES2022',
      strict: true,
      noImplicitAny: false,
      declaration: true,
      esModuleInterop: true,
      lib: ['ES2022'],
      outDir: 'dist',
    },
    include: ['generated/**/*'],
    exclude: ['dist', 'node_modules'],
  };

  fs.writeFileSync(path.join(moduleDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
}

function generateFixGenCodeScript(moduleDir: string): void {
  const script = `#!/usr/bin/env bash

if [ -f "generated/api/NodeApi.ts" ]; then
  if [ "$(uname)" == "Darwin" ]; then
    sed -i '' "s/danaOrgId: ObjectSerializer/'dana-org-id': ObjectSerializer/g" generated/api/NodeApi.ts
  else
    sed -i "s/danaOrgId: ObjectSerializer/'dana-org-id': ObjectSerializer/g" generated/api/NodeApi.ts
  fi
fi

# If this is dana, got to fix up the org constructor
if [ -f "generated/model/HydraOrg.ts" ]; then
  if [ "$(uname)" == "Darwin" ]; then
    sed -i '' 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/Org.ts
    sed -i '' 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/UserMembershipInfo.ts
  else
    sed -i 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/Org.ts
    sed -i 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/UserMembershipInfo.ts
  fi
fi

# If this is anything with AppOrgProfileView, got to fix up the constructor
if [ -f "generated/model/AppOrgProfileView.ts" ]; then
  if [ "$(uname)" == "Darwin" ]; then
    sed -i '' 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/AppOrgProfileView.ts
  else
    sed -i 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/AppOrgProfileView.ts
  fi
fi
`;

  fs.writeFileSync(path.join(moduleDir, 'fix-gen-code.sh'), script, { mode: 0o755 });
}

function addYamlExtensions(ymlPath: string, apiName: string): void {
  const content = fs.readFileSync(ymlPath, 'utf-8');
  const yml = yaml.load(content) as Record<string, unknown>;
  const info = yml.info as Record<string, unknown>;

  // Add x-impl-name with capitalized apiName
  info['x-impl-name'] = capitalize(apiName);

  fs.writeFileSync(ymlPath, yaml.dump(yml, { lineWidth: -1 }));
}

function addHubFactoryFunction(generatedDir: string, apiName: string): void {
  const indexPath = path.join(generatedDir, 'api', 'index.ts');
  const implClassName = `${capitalize(apiName)}HubImpl`;
  const connectorType = `${capitalize(apiName)}HubConnector`;
  const factoryFnName = `new${capitalize(apiName)}Hub`;

  const factoryCode = `
/**
 * ${capitalize(apiName)} Hub Connector type
 * Combines the API interface with Hub connection management
 */
export type ${connectorType} = ${capitalize(apiName)} & HubCoreHubConnector;

/**
 * Create a new ${capitalize(apiName)} Hub client instance
 *
 * @example
 * \`\`\`typescript
 * import { ${factoryFnName} } from 'sdk';
 *
 * const client = ${factoryFnName}();
 * await client.connect({
 *   hubUrl: 'https://hub.example.com',
 *   targetId: 'target-uuid',
 *   apiKey: 'your-api-key',
 *   orgId: 'org-uuid'
 * });
 *
 * const result = await client.getSomeApi().someMethod();
 *
 * await client.disconnect();
 * \`\`\`
 */
export function ${factoryFnName}(): ${implClassName} {
  return new ${implClassName}();
}

// Re-export model types for convenience
export * from '../model/index.js';

// Re-export HubConnectionProfile for consumers
export { HubConnectionProfile } from '@zerobias-org/types-core-js';
`;

  const content = fs.readFileSync(indexPath, 'utf-8');
  fs.writeFileSync(indexPath, content + factoryCode);
}

function generateRedoclyConfig(moduleDir: string, config: PackageJsonConfig): void {
  const { apiFileName } = config;
  const redoclyConfig = `
# Redocly configuration for OpenAPI validation
# Migrated from Spectral

apis:
  main:
    root: ./generated/api.yml

extends:
  - recommended

rules:
  # Disabled rules (not applicable to interface definitions)
  no-empty-servers: off
  security-defined: off
  operation-4xx-response: off
  no-unused-components: off
  info-contact: off
  info-license: off
  operation-description: off
  tag-description: off

  # Structural rules
  struct: error
  no-unresolved-refs: error
  no-invalid-media-type-examples: warn

  # Operation rules (from Spectral operationMustHaveSummary)
  operation-summary: error
  operation-operationId: error
  operation-operationId-unique: error

  # Schema rules
  no-invalid-schema-examples: warn
  boolean-parameter-prefixes: off

  # Path rules
  no-ambiguous-paths: error
  no-http-verbs-in-paths: error
  no-path-trailing-slash: error
  path-not-include-query: error

  # Parameter rules
  parameter-description: warn

  # Server rules
  no-server-example.com: error
  no-server-trailing-slash: error

  # Custom naming conventions (from Spectral propertyNamesShouldBeCamel)
  rule/property-names-camelCase:
    subject:
      type: SchemaProperties
    assertions:
      casing: camelCase
    severity: error
    message: Property names must be camelCase.

  rule/parameter-names-camelCase:
    subject:
      type: Parameter
      property: name
      filterInParentKeys:
        - query
        - path
    assertions:
      casing: camelCase
    severity: error
    message: Parameter names must be camelCase.

  # Properties should have descriptions (from Spectral propertiesShouldHaveDescriptions)
  rule/properties-have-description:
    subject:
      type: Schema
      property: description
    where:
      - subject:
          type: SchemaProperties
        assertions:
          defined: true
    assertions:
      defined: true
    severity: warn
    message: Properties should have a description.

  # Note: reqBodyMustBeRefedOrHaveAtitle from Spectral not migrated
  # (requires custom plugin - add to util-redocly-plugin when needed)

  # Enums: snake_case disabled per local config
  # rule/enum-values-snake_case:
  #   subject:
  #     type: Schema
  #     property: enum
  #   assertions:
  #     casing: snake_case
  #   severity: error
  #   message: Enum values must be snake_case.

`;
  fs.writeFileSync(path.join(moduleDir, '.redocly.yaml'), redoclyConfig);
}

async function main(): Promise<void> {
  const config = initConfig();
  const { pkg, rawApiName } = config;

  const { publisher, packageName, apiFileName } = extractPackageInfoFromPackageName(pkg, rawApiName);

  const execOptions: exec.ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => console.info(data.toString()),
      stderr: (data: Buffer) => console.error(data.toString()),
    },
    env: {
      ...process.env,
      NPM_TOKEN: process.env.READ_TOKEN || '',
      ZB_TOKEN: process.env.ZB_TOKEN || '',
    },
  };

  console.info(`Creating Hub Module SDK client for ${pkg}`);

  // Extract source module to get API spec
  const apiDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zerobias-'));
  console.info(`Created temporary directory ${apiDir}`);
  fs.writeFileSync(path.join(apiDir, '.npmrc'), npmrc);
  execOptions.cwd = apiDir;

  await exec.exec('npm', ['pack', pkg], execOptions);
  const tarballName = fs.readdirSync(apiDir).find((f) => f.endsWith('.tgz'));
  console.info(`Extracting tarball ${tarballName}`);
  await exec.exec('tar', ['xfv', tarballName!], execOptions);

  const pkgDir = path.join(apiDir, 'package');
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf-8')) as Record<string, unknown>;
  console.info(`Found version ${pkgJson.version}`);

  const { zbPackageName, moduleId, moduleRepository, version } = extractMetadataFromPackageJson(pkgJson, config);
  console.info(`Generating Hub Module SDK client for ${pkg} with ${apiFileName}`);

  // Build SDK structure
  const moduleDir = fs.mkdtempSync(path.join(os.tmpdir(), `${publisher}-hub-sdk-`));
  const generatedDir = path.join(moduleDir, 'generated');
  fs.mkdirSync(generatedDir);

  // Set outputs
  core.setOutput('packageId', `@${publisher}/${packageName}@${version}`);
  core.setOutput('packageName', `@${publisher}/${packageName}`);
  core.setOutput('packageVersion', version);
  core.setOutput('dir', moduleDir);

  // Copy API spec to generated directory
  fs.copyFileSync(path.join(pkgDir, apiFileName), path.join(generatedDir, 'api.yml'));

  // Copy connectionProfile to generated directory if it exists
  const connProfilePath = path.join(pkgDir, 'connectionProfile.yml');
  if (fs.existsSync(connProfilePath)) {
    fs.copyFileSync(connProfilePath, path.join(generatedDir, 'connectionProfile.yml'));
  }

  // Add x-impl-name YAML extension to API spec
  addYamlExtensions(path.join(generatedDir, 'api.yml'), config.apiName);

  // Generate config files
  fs.writeFileSync(path.join(moduleDir, '.npmrc'), npmrc);
  generatePackageJson(moduleDir, { packageName, publisher, version, moduleId, zbPackageName, apiFileName, moduleRepository });
  generateTsConfig(moduleDir);
  generateRedoclyConfig(moduleDir, { packageName, publisher, version, moduleId, zbPackageName, apiFileName, moduleRepository });
  generateFixGenCodeScript(moduleDir);

  console.info(`Directory listing for ${moduleDir}: ${fs.readdirSync(moduleDir)}`);

  // Install, build, and publish
  execOptions.cwd = moduleDir;
  console.info('Running npm install');
  await exec.exec('npm', ['install'], execOptions);

  console.info('Running npm run sync-meta');
  await exec.exec('npm', ['run', 'sync-meta'], execOptions);

  console.info('Running npm run generate');
  await exec.exec('npm', ['run', 'generate'], execOptions);

  // Add factory function after code generation
  console.info('Adding Hub factory function');
  addHubFactoryFunction(generatedDir, config.apiName);

  console.info('Running npm run validate');
  await exec.exec('npm', ['run', 'validate'], execOptions);

  console.info('Running npm run transpile');
  await exec.exec('npm', ['run', 'transpile'], execOptions);

  console.info('Running npm run docs');
  await exec.exec('npm', ['run', 'docs'], execOptions);

  if (!config.dryRun) {
    // Check if package version already exists
    const fullPackageName = `@${publisher}/${packageName}@${version}`;
    let versionExists = false;
    try {
      await exec.exec('npm', ['view', fullPackageName, 'version'], {
        ...execOptions,
        ignoreReturnCode: true,
        silent: true,
        listeners: {
          stdout: (data: Buffer) => {
            if (data.toString().trim() === version) {
              versionExists = true;
            }
          },
        },
      });
    } catch {
      // Package doesn't exist, which is fine
    }

    if (versionExists) {
      console.info(`Package ${fullPackageName} already exists, skipping publish`);
      core.setOutput('published', 'false');
      core.setOutput('skipped', 'true');
    } else {
      console.info('Running npm publish');
      execOptions.env = {
        ...process.env,
        NPM_TOKEN: core.getInput('publishToken') || '',
      };
      await exec.exec('npm', ['publish'], execOptions);
      core.setOutput('published', 'true');
      core.setOutput('skipped', 'false');
    }
  } else {
    console.info('Skipping npm publish, dryRun enabled');
    core.setOutput('published', 'false');
    core.setOutput('skipped', 'true');
  }
}

main().catch((error) => {
  core.setFailed(error.message);
});
