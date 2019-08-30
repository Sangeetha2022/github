
var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'http://gep-stage-telemetry.gep-stage-201908.svc.cluster.local:8200', token: 'vault-geppetto-2019' });

export class GithubConfig {
    githubConfig(callback) {
        vault.read('kv/kubernetes/sourcecode/github').then((result) => {
            callback(result.data);
        })
    }
}