
var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'http://3.84.173.148:30082', token: 'vault-geppetto-2019' });

export class GithubConfig {
    githubConfig(callback) {
        vault.read('kv/kubernetes/sourcecode/github').then((result) => {
            console.log("result->>>>", result.data);
            callback(result.data);
        })
    }
}