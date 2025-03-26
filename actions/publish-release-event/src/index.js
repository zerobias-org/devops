const { getLogger } = require('@auditmation/util-logger');
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { randomUUID } = require('crypto');

const logger = getLogger('console');

const repository = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`;
const pullRequestId = process.env.PR_ID;
const pullRequestUrl = process.env.PR_URL;
const pullRequestLabels = process.env.PR_LABELS;
const commitHash = process.env.GITHUB_SHA;
const actionRunUrl = `${repository}/actions/runs/${process.env.GITHUB_RUN_ID}`;

const client = new LambdaClient({});

async function main() {
  const packages = process.env.PACKAGE_DIRS ?
    JSON.parse(process.env.PACKAGE_DIRS) :
    JSON.parse(fs.readFileSync(process.env.PUBLISHED_PKGS_FILE, 'utf8'));
  packages.forEach(async (dir) => {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf-8'));
    const {
      name,
      version,
      auditmation,
    } = pkgJson;
    logger.info(`Sending event for ${name}@${version}`);

    const changelogUrl = `${repository}/${path.relative('../../', dir)}/CHANGELOG.md`
    const changelogPath = path.join(dir, 'CHANGELOG.md');
    const changelogText = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, 'utf-8') : ''
    let changelog = changelogText !== '' ? changelogText.match(/^#+ \[[\s\S]+?(?=^#+ \[)/m) : '';
    if (Array.isArray(changelog)) {
      changelog = changelog[0].trim();
    }

    const distTags = JSON.parse(execSync(`npm view ${name}@${version} dist-tags --json`));

    const message = {
      body: {
        id: randomUUID(),
        service: 'release',
        eventType: 'release',
        name, 
        version,
        repository,
        pullRequestId,
        pullRequestUrl,
        pullRequestLabels,
        commitHash,
        actionRunUrl,
        changelog,
        changelogUrl,
        auditmation,
        distTags,
      },
    };

    const command = new InvokeCommand({
      FunctionName: 'auditmation-event-router-events',
      Payload: Buffer.from(JSON.stringify(message)),
    })
    console.log(`Publishing message: ${JSON.stringify(message)}`);
    await client.send(command);
  });
}

main();
