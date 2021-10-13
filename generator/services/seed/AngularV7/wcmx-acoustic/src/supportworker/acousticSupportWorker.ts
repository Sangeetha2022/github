import * as fs from 'fs';
import * as util from 'util'
import * as path from 'path';
import * as st from 'stringtemplate-js';
import { Common } from '../config/common';


export class AcousticSupportWorker {

    private writeFile = util.promisify(fs.writeFile);
    // read file and return
    public readFile(applicationPath, fileName) {
        return fs.readFileSync(`${applicationPath}/${fileName}`).toString().split("\n");
    }


    generateComponent(applicationPath, templatePath, fileName, templateName, information, callback) {
        const filePath = `${applicationPath}/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information]);
        this.writeFile(filePath + `/${fileName}`, componentFileData, null)
            .then(() => {
                console.log(`${fileName} created successfully`);
                callback(`${fileName} created successfully`);
            })
            .catch(error => {
                console.log(error);
                callback();
            });
    }


    // write file
    public writeStaticFile(applicationPath, fileName, information, callback) {
        this.writeFile(applicationPath + `/${fileName}`, information, null)
            .then(() => {
                callback(`${fileName} modified successfully`);
            })
            .catch(error => {
                callback();
            });
    }


    // render details
    renderDetails(templatePath, templateName, information, infoArray, isCommaSeparator) {
        templatePath = path.resolve(__dirname, templatePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information]);
        console.log('component file data are --for proxy configuration--- ', componentFileData);
        if (componentFileData) {
            if (isCommaSeparator) {
                componentFileData += ',';
            }
            if (!infoArray.find(x => x === componentFileData)) {
                infoArray.push(componentFileData);
            }
        }
        console.log('after pushed into proxyarray values are ----   ', infoArray);
    }
}