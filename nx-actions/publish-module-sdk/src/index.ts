import camelCase from 'camelcase';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import yaml from 'js-yaml';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

const repository = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`;

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
  let packageName = `${rawApiName.replace(/-/g, '')}-sdk`;
  let apiFileName = `${rawApiName}.yml`;
  if (splitPackage[1]?.startsWith('module-')) {
    if (splitPackage[1].includes('@')) {
      apiFileName = `${splitPackage[1].split('@')[0]}.yml`;
      packageName = `${splitPackage[1].split('@')[0]}-sdk`;
    } else {
      apiFileName = `${splitPackage[1]}.yml`;
      packageName = `${splitPackage[1]}-sdk`;
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
  let zbPackageName = `zerobias.${config.rawApiName.replace(/-/g, '')}.sdk`;
  let moduleRepository: string | undefined = undefined;
  let moduleId = config.moduleId;

  if (moduleInfo) {
    zbPackageName = moduleInfo.package?.replace('.module', '.sdk') || zbPackageName;
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
    description: `${packageName} SDK`,
    moduleId,
    type: 'module',
    main: 'dist/api/index.js',
    types: 'dist/api/index.d.ts',
    scripts: {
      clean: `rm -rf generated/ dist/ docs/ ${apiFileName}`,
      'sync-meta': "VERSION=$(npm run -s get-version) NAME=$(yq -oy e .name package.json) DESC=$(yq -oy e .description package.json) yq e -i '.info.version=strenv(VERSION) | .info.title=strenv(NAME) | .info.description=strenv(DESC)' generated/api.yml",
      validate: 'npx redocly lint generated/api.yml --config .redocly.yaml || true',
      'generate:full': `cp generated/api.yml generated/full.yml && if test -f connectionProfile.yml; then yq e -i '.components.schemas.ConnectionProfile.$ref'=\\"../connectionProfile.yml\\" generated/full.yml; fi`,
      'generate:inflate': `npx redocly bundle -o generated/full2.yml generated/full.yml && mv generated/full2.yml generated/full.yml && cp generated/full.yml ${apiFileName}`,
      'generate:api': 'hub-generator generate -g api-client -i generated/full.yml -o generated/ --skip-validate-spec',
      generate: 'npm run generate:full && npm run generate:inflate && npm run generate:api',
      transpile: 'tsc -b',
      build: 'npm run generate && npm run validate && npm run transpile',
      'docs:redoc': `npx redocly build-docs ${apiFileName} -o docs/index.html`,
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
      apiFileName,
      'connectionProfile.yml',
      'dist',
      'generated/api/manifest.json',
      'generated/USAGE.md',
      'docs/',
      'CHANGELOG.md',
    ],
    zerobias: {
      package: zbPackageName,
      'dataloader-version': '1.0.0',
      'import-artifact': 'sdk',
    },
    dependencies: {
      '@zerobias-org/util-api-client-base': '^1.0.10',
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
      strict: false,
      strictNullChecks: false,
      noImplicitAny: false,
      declaration: true,
      esModuleInterop: true,
      skipLibCheck: true,
      lib: ['ES2022'],
      outDir: 'dist',
    },
    include: ['generated/**/*'],
    exclude: ['dist', 'node_modules'],
  };

  fs.writeFileSync(path.join(moduleDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
}

function generateRedoclyConfig(moduleDir: string): void {
  const config = `
# Redocly configuration for OpenAPI validation
# Migrated from Spectral

apis:
  main:
    root: ./api.yml

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
  fs.writeFileSync(path.join(moduleDir, '.redocly.yaml'), config);
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

  console.info(`Creating SDK client for ${pkg}`);

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
  console.info(`Generating SDK client for ${pkg} with ${apiFileName}`);

  // Build SDK structure
  const moduleDir = fs.mkdtempSync(path.join(os.tmpdir(), `${publisher}-sdk-`));
  const generatedDir = path.join(moduleDir, 'generated');
  fs.mkdirSync(generatedDir);

  // Set outputs
  core.setOutput('packageId', `@${publisher}/${packageName}@${version}`);
  core.setOutput('packageName', `@${publisher}/${packageName}`);
  core.setOutput('packageVersion', version);
  core.setOutput('dir', moduleDir);

  // Copy API spec to generated directory
  fs.copyFileSync(path.join(pkgDir, apiFileName), path.join(generatedDir, 'api.yml'));

  // Copy connectionProfile if it exists
  const connProfilePath = path.join(pkgDir, 'connectionProfile.yml');
  if (fs.existsSync(connProfilePath)) {
    fs.copyFileSync(connProfilePath, path.join(moduleDir, 'connectionProfile.yml'));
  }

  // Generate config files
  fs.writeFileSync(path.join(moduleDir, '.npmrc'), npmrc);
  generatePackageJson(moduleDir, { packageName, publisher, version, moduleId, zbPackageName, apiFileName, moduleRepository });
  generateTsConfig(moduleDir);
  generateRedoclyConfig(moduleDir);

  console.info(`Directory listing for ${moduleDir}: ${fs.readdirSync(moduleDir)}`);

  // Install, build, and publish
  execOptions.cwd = moduleDir;
  console.info('Running npm install');
  await exec.exec('npm', ['install'], execOptions);

  console.info('Running npm run sync-meta');
  await exec.exec('npm', ['run', 'sync-meta'], execOptions);

  console.info('Running npm run build');
  await exec.exec('npm', ['run', 'build'], execOptions);

  console.info('Running npm run docs');
  await exec.exec('npm', ['run', 'docs'], execOptions);

  if (!config.dryRun) {
    console.info('Running npm publish');
    execOptions.env = {
      ...process.env,
      NPM_TOKEN: core.getInput('publishToken') || '',
    };
    await exec.exec('npm', ['publish'], execOptions);
  } else {
    console.info('Skipping npm publish, dryRun enabled');
  }
}

main().catch((error) => {
  core.setFailed(error.message);
});
