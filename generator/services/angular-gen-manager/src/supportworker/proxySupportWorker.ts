import * as fs from 'fs';
import * as util from 'util'
import * as path from 'path';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';
import { DependencySupportWorker } from './dependencySupportWorker';
import { Constant } from '../config/Constant';

export class ProxySupportWorker {

    private dependencySupportWorker = new DependencySupportWorker();

    renderDetails(templatePath, templateName, information, proxyArray, isCommaSeparator) {
        templatePath = path.resolve(__dirname, templatePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information]);
        console.log('component file data are --for proxy configuration--- ', componentFileData);
        if (componentFileData) {
            if (isCommaSeparator) {
                componentFileData += ',';
            }
            proxyArray.push(componentFileData);
        }
        console.log('after pushed into proxyarray values are ----   ', proxyArray);
    }

    modifyFileInfo(applicationPath, proxyArray, PROXY_CONFIG_VARIABLENAME, PROXY_CONFIG_FILENAME) {
        let proxyIndex = null;
        if (proxyArray.length > 0) {
            const fileData = this.dependencySupportWorker.readFile(applicationPath, PROXY_CONFIG_FILENAME);
            const regex = new RegExp(PROXY_CONFIG_VARIABLENAME);
            if (PROXY_CONFIG_VARIABLENAME) {
                const index = fileData.findIndex(x => regex.test(x));
                proxyIndex = index + 1;
            } else {
                proxyIndex = fileData.length - 2;
            }
            if (proxyIndex) {
                fileData.splice(proxyIndex, 0, proxyArray.join('\n'));
                this.dependencySupportWorker.writeStaticFile(applicationPath, PROXY_CONFIG_FILENAME,
                    fileData.join('\n'), (response) => { });
            }
        }
    }
}