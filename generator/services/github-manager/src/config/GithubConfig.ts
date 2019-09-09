
var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'http://gep-dev-telemetry.gep-dev-201902.svc.cluster.local:8200', token: 'vault-geppetto-2019' });

export class GithubConfig {
    githubConfig(callback) {
        vault.read('kv/kubernetes/sourcecode/github').then((result) => {
            callback(result.data);
        })
    }
}