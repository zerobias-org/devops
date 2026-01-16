#! /usr/bin/env node

import { Octokit } from '@octokit/rest';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readFileSync } from 'fs';
import * as path from 'path';

const main = async() => {
  const argv = yargs(hideBin(process.argv)).argv;

  const token = process.env.DISPATCH_TOKEN;
  const event_type = 'trigger-schema-docs'
  const repo = 'internal-docs'

  const packageConf = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));

  const client_payload = {
    schemas: argv.schemas,
    package: packageConf.name,
    version: packageConf.version,
  };

  const ocktokit = new Octokit({
    auth: token,
  });

  console.log(`Event Type: ${event_type}`);
  console.log(`Payload: ${JSON.stringify(client_payload)}`);
  const response = await ocktokit.repos.createDispatchEvent({
    owner: 'zerobias',
    repo,
    event_type,
    client_payload,
  });
  console.log(`${response.status}: ${response.data}`);
}

main();
