import * as fs from 'fs';
import * as util from 'util'
import * as path from 'path';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class ComponentSupportWorker {

    private writeFile = util.promisify(fs.writeFile);

    generateComponent(applicationPath, templatePath, fileName, templateName, information, callback) {
        const filePath = `${applicationPath}/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        console.log(`before css content is create ----- `, information);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information]);
        // console.log('component file data are ----- ', componentFileData);
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
}