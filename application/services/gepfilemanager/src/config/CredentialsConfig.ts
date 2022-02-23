
var vault = require("node-vault")({ apiVersion: 'v1', endpoint: process.env.vault, token: 'vault-geppetto-2021' });

export class CredentialConfig {
    credentialsConfig(callback) {
        vault.read('kv/kubernetes/sourcecode/github').then((result) => {
            callback(result.data);
        })
    }
}