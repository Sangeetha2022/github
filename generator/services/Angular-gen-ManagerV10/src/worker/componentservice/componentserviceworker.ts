import * as fs from 'fs';
import { Constant } from '../../assets/Constant';

export class ComponentServiceWorker {
    public generateComponentService(applicationPath, templatePath, componentName, information, callback) {
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            importDependency: [],
            importComponent: [],
            serviceVariable: null,
            serviceConstructorParams: [],
            serviceMethod: []
        }
        flowServiceWorker.generateServiceComponentFlow(information, temp, templatePath);
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.SERVICE_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.SERIVCE_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }
}
