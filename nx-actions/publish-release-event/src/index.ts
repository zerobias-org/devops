import { LoggerEngine } from '@zerobias-org/logger';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';

const logger = LoggerEngine.root();

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
    JSON.parse(fs.readFileSync(process.env.PUBLISHED_PKGS_FILE || '', 'utf8'));
  packages.forEach(async (dir: string) => {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf-8'));
    const {
      name,
      version,
      zerobias,
      auditmation
    } = pkgJson;
    logger.info(`Sending event for ${name}@${version}`);

    const changelogUrl = `${repository}/${path.relative('../../', dir)}/CHANGELOG.md`
    const changelogPath = path.join(dir, 'CHANGELOG.md');
    const changelogText = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, 'utf-8') : ''
    let changelog = changelogText !== '' ? changelogText.match(/^#+ \[[\s\S]+?(?=^#+ \[)/m) : '';
    if (Array.isArray(changelog)) {
      changelog = changelog[0].trim();
    }

    const tags = execSync(`npm view ${name}@${version} dist-tags --json`, { encoding: 'utf8' });
    const distTags = JSON.parse(tags);

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
        zerobias,
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
