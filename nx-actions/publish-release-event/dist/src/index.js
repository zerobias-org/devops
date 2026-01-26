"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@zerobias-org/logger");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const child_process_1 = require("child_process");
const crypto_1 = require("crypto");
const logger = logger_1.LoggerEngine.root();
const repository = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`;
const pullRequestId = process.env.PR_ID;
const pullRequestUrl = process.env.PR_URL;
const pullRequestLabels = process.env.PR_LABELS;
const commitHash = process.env.GITHUB_SHA;
const actionRunUrl = `${repository}/actions/runs/${process.env.GITHUB_RUN_ID}`;
const client = new client_lambda_1.LambdaClient({});
async function main() {
    const packages = process.env.PACKAGE_DIRS ?
        JSON.parse(process.env.PACKAGE_DIRS) :
        JSON.parse(node_fs_1.default.readFileSync(process.env.PUBLISHED_PKGS_FILE || '', 'utf8'));
    packages.forEach(async (dir) => {
        const pkgJson = JSON.parse(node_fs_1.default.readFileSync(node_path_1.default.join(dir, 'package.json'), 'utf-8'));
        const { name, version, zerobias, auditmation } = pkgJson;
        logger.info(`Sending event for ${name}@${version}`);
        const changelogUrl = `${repository}/${node_path_1.default.relative('../../', dir)}/CHANGELOG.md`;
        const changelogPath = node_path_1.default.join(dir, 'CHANGELOG.md');
        const changelogText = node_fs_1.default.existsSync(changelogPath) ? node_fs_1.default.readFileSync(changelogPath, 'utf-8') : '';
        let changelog = changelogText !== '' ? changelogText.match(/^#+ \[[\s\S]+?(?=^#+ \[)/m) : '';
        if (Array.isArray(changelog)) {
            changelog = changelog[0].trim();
        }
        const tags = (0, child_process_1.execSync)(`npm view ${name}@${version} dist-tags --json`, { encoding: 'utf8' });
        const distTags = JSON.parse(tags);
        const message = {
            body: {
                id: (0, crypto_1.randomUUID)(),
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
        const command = new client_lambda_1.InvokeCommand({
            FunctionName: 'auditmation-event-router-events',
            Payload: Buffer.from(JSON.stringify(message)),
        });
        console.log(`Publishing message: ${JSON.stringify(message)}`);
        await client.send(command);
    });
}
main();
//# sourceMappingURL=index.js.map