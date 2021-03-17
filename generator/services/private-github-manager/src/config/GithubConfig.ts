import { eventNames } from "winston-daily-rotate-file";

var vault = require("node-vault")({ apiVersion: 'v1', endpoint: process.env.vault, token: 'vault-geppetto-2021' });

export class GithubConfig {
    githubPrivateConfig(callback) {
        vault.read('private/privateGit/credentials/githubactions').then((credentials) => {
            callback(credentials.data);
        })
    }
}