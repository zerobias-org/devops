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

/** One entry of the list of published packages: a package directory, or a record of what was published. */
type PackageEntry = string | { name?: string; version?: string; location: string; releaseEventSent?: boolean };

/** A package to announce: its directory, plus the published name and version when its entry gave them. */
interface PublishedPackage {
  dir: string;
  name?: string;
  version?: string;
}

/**
 * The packages to announce, from PACKAGE_DIRS (a JSON array) or from the JSON file that
 * PUBLISHED_PKGS_FILE names. An entry is a package directory, or the `{ name, version, location }`
 * record that zbb and the publish actions write for each package they published.
 *
 * The record's version is the one to announce. package.json can't be trusted for it: a branch
 * publish sends `1.0.7-dev.3` to npm from a package.json that still says `1.0.6`, the last release.
 *
 * A record marked `releaseEventSent` is left out. zbb sent that package's event itself during the
 * publish, and a second event makes every environment load the release a second time.
 */
function publishedPackages(): PublishedPackage[] {
  const entries: PackageEntry[] = process.env.PACKAGE_DIRS ?
    JSON.parse(process.env.PACKAGE_DIRS) :
    JSON.parse(fs.readFileSync(process.env.PUBLISHED_PKGS_FILE || '', 'utf8'));
  const packages: PublishedPackage[] = [];
  for (const entry of entries) {
    if (typeof entry === 'string') {
      packages.push({ dir: entry });
    } else if (entry.releaseEventSent === true) {
      logger.info(`Not sending an event for ${entry.name}@${entry.version}: zbb already sent it`);
    } else {
      packages.push({ dir: entry.location, name: entry.name, version: entry.version });
    }
  }
  return packages;
}

/**
 * The link to a package's CHANGELOG.md on GitHub. The directory may be absolute, as zbb writes
 * it, or relative to the repository root.
 */
function changelogUrlFor(dir: string): string {
  const root = process.env.GITHUB_WORKSPACE || process.cwd();
  const inRepo = path.relative(root, path.resolve(dir)).split(path.sep).join('/');
  return `${repository}/blob/main/${inRepo ? `${inRepo}/` : ''}CHANGELOG.md`;
}

async function main() {
  publishedPackages().forEach(async (published) => {
    const { dir } = published;
    const pkgJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf-8'));
    const { zerobias, auditmation } = pkgJson;
    const name = published.name || pkgJson.name;
    const version = published.version || pkgJson.version;
    logger.info(`Sending event for ${name}@${version}`);

    const changelogUrl = changelogUrlFor(dir);
    const changelogPath = path.join(dir, 'CHANGELOG.md');
    const changelogText = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, 'utf-8') : ''
    let changelog = changelogText !== '' ? changelogText.match(/^#+ \[[\s\S]+?(?=^#+ \[)/m) : '';
    if (Array.isArray(changelog)) {
      changelog = changelog[0].trim();
    }

    let distTags = {};
    try {
      const tags = execSync(`npm view ${name}@${version} dist-tags --json`, { encoding: 'utf8' });
      distTags = JSON.parse(tags);
    } catch {
      // Package may not be published yet (skipped, failed, or new)
      logger.info(`Could not fetch dist-tags for ${name}@${version} — continuing without tags`);
    }

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
