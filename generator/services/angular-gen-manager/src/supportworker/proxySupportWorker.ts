import * as fs from 'fs';
import * as util from 'util'
import * as path from 'path';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';
import { DependencySupportWorker } from './dependencySupportWorker';
import { Constant } from '../config/Constant';

export class ProxySupportWorker {

    private proxyArray: any[] = [];
    private dependencySupportWorker = new DependencySupportWorker();

    createProxyInfo(templatePath, templateName, information) {
        templatePath = path.resolve(__dirname, templatePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information]);
        console.log('component file data are --for proxy configuration--- ', componentFileData);
        if (componentFileData) {
            componentFileData += ',';
            this.proxyArray.push(componentFileData);
        }
        console.log('after pushed into proxyarray values are ----   ', this.proxyArray);
    }

    modifyProxyFile(applicationPath) {
        if (this.proxyArray.length > 0) {
            console.log('after set all the proxyArray are --------   ', this.proxyArray);
            const proxyData = this.dependencySupportWorker.readFile(applicationPath, Constant.PROXY_CONFIG_FILENAME);
            const regex = new RegExp(Constant.PROXY_CONFIG_VARIABLENAME);
            const proxyIndex = proxyData.findIndex(x => regex.test(x));
            console.log('after finded proxy INdex are -----   ', proxyIndex);
            if (proxyIndex) {
                proxyData.splice(proxyIndex + 1, 0, this.proxyArray.join('\n'));
                this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.PROXY_CONFIG_FILENAME,
                    proxyData.join('\n'), (response) => { console.log('proxy file are modifieda') });
            }
            this.proxyArray = [];
        }
    }
}