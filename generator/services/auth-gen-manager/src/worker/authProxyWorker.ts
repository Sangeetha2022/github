import { AuthProxySupportWorker } from '../Supportworker/authProxySupportWorker'

export class AuthProxyWorker {

    public proxySupportWorker = new AuthProxySupportWorker();

    public proxyConfig(templatePath, folderPath, projectName, callback) {
        this.proxySupportWorker.proxyConfig(templatePath, folderPath, projectName, (data) => {
            callback(data);
        })
    }

}