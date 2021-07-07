export const LOCALURL = 'http://localhost:';
export const APIGATEWAYURL = process.env.localsystementryBaseUrl + ":3000";

export const SWAGGERBASEDETAILS: any = {
    version: '1.3.0',
    contactName: 'ContactName',
    contactEmail: 'hello@wolox.co',
    contactUrl: 'https://www.wolox.com.ar/',
    licenseName: 'Apache 2.0',
    licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    termsOfService: 'http://api_url/terms/'
}

export const VAULT_REQUEST = [
    {
        data: `getVaultData(credentials) {
        return new Promise(resolve => {
            var vault = require("node-vault")({ apiVersion: 'v1', endpoint: process.env.vault, token: process.env.vault_token });
            vault.read('kv/kubernetes/sourcecode/github').then((result) => {
                resolve(result.data);
            })
        })
    }`},
    {
        data: `getCredentialsData(connectorName) {
        return new Promise(resolve => {
            new ApiAdaptar().get('http://localhost:8000/desktop/scm?connector_name=' + connectorName).then(
                data => {
                    resolve(data);
                }
            )
        })
    }`}
];
