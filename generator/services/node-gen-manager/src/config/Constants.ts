export const LOCALURL = 'http://localhost:';
export const APIGATEWAYURL = 'http://apigateway' + ":3000";

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
        data: `getCredentialsData(connectorName) {
        return new Promise(resolve => {
            new ApiAdapter().get('http://localhost:8000/desktop/scmbyname?connector_name=' + connectorName).then(
                data => {
                    resolve(data);
                }
            )
        })
    }`}
];

export const urlencodedFunction = `const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}`;
