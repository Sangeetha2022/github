
var vault = require("node-vault")({ apiVersion: 'v1', endpoint: process.env.VAULT_ENDPOINT , token: process.env.VAULT_TOKEN });
// var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'http://localhost:8500' , token: 'myroot' });
export class AwsConfig {
    awsConfig(callback) {
        vault.read('kv/cdnmanager/aws').then((result) => {
            console.log("Credentials successfully retrieved from Vault");
            callback(result.data);
        })
    }
}