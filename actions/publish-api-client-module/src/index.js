import camelCase from 'camelcase';
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');
const core = require('@actions/core');
const exec = require('@actions/exec');

const repository = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`;

const npmrc = `
@auditmation:registry=https://npm.pkg.github.com/
@auditlogic:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:always-auth=true
//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}
@zerobias-org:registry=https://pkg.zerobias.org
//pkg.zerobias.org/:always-auth=true
//pkg.zerobias.org/:_authToken=\${ZB_TOKEN}
`;

function copyAndReplace(fileName, destPath, apiName, version, connectionPath, moduleId, publisher, packageName, auditmationPackageName, repo, hubConnector) {
  /* Substitutions:
   * - __PACKAGE_NAME__
   * - __IMPL_NAME__
   * - __VERSION__
   * - __REPOSITORY__
   * - __API_FILENAME__ (e.g. module-dana-client.yml)
   * - __API_PATH__
   * - __MODULE_ID__
   */
  const f = fs.readFileSync(path.join(__dirname, 'resources', fileName));
  let str = f.toString();
  const implName = `${apiName.charAt(0).toUpperCase()}${apiName.substring(1)}`;
  str = str.replace(/__PACKAGE_NAME__/g, `@${publisher}/${packageName}`);
  str = str.replace(/__IMPL_NAME__/g, implName);
  str = str.replace(/__VERSION__/g, version);
  str = str.replace(/__REPOSITORY__/g, repo);
  str = str.replace(/__API_FILENAME__/g, `${packageName}.yml`);
  str = str.replace(/__API_PATH__/g, connectionPath);
  str = str.replace(/__MODULE_ID__/g, moduleId);
  str = str.replace(/__API_NAME__/g, auditmationPackageName);
  str = str.replace(/__PUBLISHER__/g, publisher[0].toUpperCase() + publisher.slice(1));
  str = str.replace(/__IMPORT_ARTIFACT__/g, hubConnector === true ? 'module-client-ts' : 'module');

  console.debug(`Writing file ${fileName}:\n${str}`);
  fs.writeFileSync(destPath, str);
}

function initConfig() {
  if (process.env.LOCAL_MODE === 'true') {
    return {
      pkg: process.env.package,
      apiPath: process.env.apiPath,
      moduleId: process.env.moduleId,
      apiName: camelCase(process.env.apiName),
      rawApiName: process.env.apiName,
      dryRun: process.env.dryRun !== 'false',
    }
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
      dryRun: false
    }
  }
}

function extractPackageInfofromPackageName(pkg, rawApiName) {
  const splitPackage = pkg.split('/');
  let publisher = 'auditmation';
  if (splitPackage[0]?.startsWith('')) {
    publisher = splitPackage[0].replace(/@/, '');
  }
  let packageName = `module-auditmation-auditmation-${rawApiName.replace(/-/g, '')}`;
  let apiFileName = `${rawApiName}.yml`;
  if (splitPackage[1]?.startsWith('module-')) {
    if (splitPackage[1].includes('@')) {
      apiFileName = `${splitPackage[1].split('@')[0]}.yml`;
      packageName = `${splitPackage[1].split('@')[0]}-client-ts`;
    } else {
      apiFileName = `${splitPackage[1]}.yml`;
      packageName = `${splitPackage[1]}-client-ts`;
    }    
  }

  return {
    publisher,
    packageName,
    apiFileName,
  }
}

function extractMetadataFromPackageJson(pkgJson, config) {
  const auditmationInfo = pkgJson.auditmation;
  let auditmationPackageName = `auditmation.auditmation.${config.rawApiName.replace(/-/g, '')}.module`;
  let moduleRepository = undefined;
  let hubConnector = false;
  let moduleId = config.moduleId;
  if (auditmationInfo && auditmationInfo['import-artifact'] === 'module') {
    auditmationPackageName = auditmationInfo.package;
    moduleRepository = pkgJson.repository?.url
    if (!moduleId && pkgJson.moduleId) {
      moduleId = pkgJson.moduleId
    }
    hubConnector = true;
  }
  return {
    hubConnector,
    moduleId,
    moduleRepository,
    auditmationPackageName,
    version: pkgJson.version
  }
}

async function main() {
  // get arguments
  const config = initConfig();
  const {
    pkg,
    rawApiName,
    apiName,
    apiPath,
  } = config;

  const {
    publisher,
    packageName,
    apiFileName
  } = extractPackageInfofromPackageName(pkg, rawApiName);
  
  let connPath = apiPath;
  if (!apiPath.startsWith('/')) {
    connPath = `/${apiPath}`;
  }

  const execOptions = {};
  execOptions.listeners = {
    stdout: (data) => {
      console.info(data.toString());
    },
    stderr: (data) => {
      console.error(data.toString());
    }
  };
  execOptions.env = {
    ...process.env,
    NPM_TOKEN: process.env.READ_TOKEN,
  };

  console.info(`Creating Hub Module API client for ${pkg} at ${apiPath} (connecting to ${connPath})`);

  // install target module to extract API
  const apiDir = fs.mkdtempSync(path.join(os.tmpdir(), 'auditmation-'));
  console.info(`Created temporary directory ${apiDir}`);
  fs.writeFileSync(path.join(apiDir, '.npmrc'), npmrc);
  execOptions.cwd = apiDir;
  await exec.exec('npm', ['pack', pkg], execOptions);
  console.info(`execOptions: ${JSON.stringify(execOptions)}`);
  const tarballName = fs.readdirSync(apiDir).find((f) => f.endsWith('.tgz'));
  console.info(`Extracting tarball ${tarballName}`);
  console.info(`Directory listing for ${apiDir}: ${fs.readdirSync(apiDir)}`);
  await exec.exec('tar', ['xfv', tarballName], execOptions);

  console.debug(`Directory listing for ${apiDir}: ${fs.readdirSync(apiDir)}`);
  const pkgDir = path.join(apiDir, 'package');
  console.debug(`Directory listing for ${pkgDir}: ${fs.readdirSync(pkgDir)}`);
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json')));
  console.info(`Found version ${pkgJson.version}`);

  const {
    auditmationPackageName,
    hubConnector,
    moduleId,
    moduleRepository,
    version
  } = extractMetadataFromPackageJson(pkgJson, config);
  console.info(`Generating Hub Module API client for ${pkg} with ${apiFileName}. auditmation package info = ${auditmationPackageName}, repository = ${moduleRepository}`);
  
  // build structure
  const moduleDir = fs.mkdtempSync(path.join(os.tmpdir(), `${publisher}-`));
  const srcDir = path.join(moduleDir, 'src');
  fs.mkdirSync(srcDir);

  // set outputs
  core.setOutput('packageId', `@${publisher}/${packageName}@${pkgJson.version}`);
  core.setOutput('packageName', `@${publisher}/${packageName}`);
  core.setOutput('packageVersion', `${pkgJson.version}`);
  core.setOutput('dir', moduleDir);
  
  const jsonataSnippet = `
  x-auto-generate: true
  x-input-pipeline-registry:
    ensureRequestPrototype:
      methodName: ensureRequestPrototype
      module: ../../src/PipelineUtil
  `;

  // copy API definition w/ jsonata annotations
  const f = fs.readFileSync(path.join(apiDir, 'package', apiFileName));
  let str = f.toString();
  str += jsonataSnippet;
  let yml = yaml.load(str);
  if (yml['x-input-pipeline'] === undefined) {
    yml['x-input-pipeline'] = ['ensureRequestPrototype']
  } else {
    yml['x-input-pipeline'].push('ensureRequestPrototype');
  }

  yml.info['x-impl-name'] = apiName;
  yml.info['x-product-infos'] = [{ '$ref': './node_modules/@auditlogic/product-auditmation-auditmation/catalog.yml#/Product' }];
  fs.writeFileSync(path.join(moduleDir, 'api.yml'), yaml.dump(yml));

  // copy files that don't need modification
  fs.writeFileSync(path.join(moduleDir, '.npmrc'), npmrc);
  fs.copyFileSync(path.join(__dirname, 'resources', 'Common.ts'), path.join(srcDir, 'Common.ts'));
  fs.copyFileSync(path.join(__dirname, 'resources', 'PipelineUtil.ts'), path.join(srcDir, 'PipelineUtil.ts'));
  fs.copyFileSync(path.join(__dirname, 'resources', 'tsconfig.json'), path.join(moduleDir, 'tsconfig.json'));
  fs.copyFileSync(path.join(__dirname, 'resources', 'connectionProfile.yml'), path.join(moduleDir, 'connectionProfile.yml'));
  fs.copyFileSync(path.join(__dirname, 'resources', 'fix-gen-code.sh'), path.join(moduleDir, 'fix-gen-code.sh'));

  // files w/ subs:
  // - package.json
  // - Impl.ts
  // - index.ts
  // - PipelineUtil.ts
  const implName = `${apiName.charAt(0).toUpperCase()}${apiName.substring(1)}`;
  copyAndReplace('package.json', path.join(moduleDir, 'package.json'), apiName, version, connPath, moduleId, publisher, packageName, auditmationPackageName, moduleRepository ?? repository, hubConnector);
  copyAndReplace('PipelineUtil.ts', path.join(moduleDir, 'src', 'PipelineUtil.ts'), apiName, version, connPath, moduleId, publisher, packageName, auditmationPackageName, moduleRepository ?? repository, hubConnector);
  if (hubConnector === true) {
    copyAndReplace('hub/index.ts', path.join(moduleDir, 'src', 'index.ts'), apiName, version, connPath, moduleId, publisher, packageName, auditmationPackageName, moduleRepository ?? repository, hubConnector);  
  } else {
    copyAndReplace('Impl.ts', path.join(moduleDir, 'src', `${implName}Impl.ts`), apiName, version, connPath, moduleId, publisher, packageName, auditmationPackageName, moduleRepository ?? repository, hubConnector);
    copyAndReplace('index.ts', path.join(moduleDir, 'src', 'index.ts'), apiName, version, connPath, moduleId, publisher, packageName, auditmationPackageName, moduleRepository ?? repository, hubConnector);  
  }
  
  console.info(`Directory listing for ${moduleDir}: ${fs.readdirSync(moduleDir)}`);

  // install, build, and publish
  execOptions.cwd = moduleDir;
  console.info('Running npm install');
  await exec.exec('npm', ['install'], execOptions);
  console.info('Running npm run sync-meta');
  await exec.exec('npm', ['run', 'sync-meta'], execOptions);

  const yamlContents = fs.readFileSync(path.join(moduleDir, `api.yml`));
  console.info(`Final API definition:\n${yamlContents}`);

  console.info('Running npm run build');
  await exec.exec('npm', ['run', 'build'], execOptions);
  await exec.exec('npm', ['run', 'docs'], execOptions);

  if (config.dryRun === false) {
    console.info('Running npm publish');
    execOptions.env = {
      ...process.env,
      NPM_TOKEN: core.getInput('publishToken')
    };
    await exec.exec('npm', ['publish'], execOptions);
  } else {
    console.info('Skippubg npm publish, as dryMode enabled');
  }
}

main();
