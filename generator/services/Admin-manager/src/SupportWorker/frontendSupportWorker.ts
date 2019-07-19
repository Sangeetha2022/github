import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';


export class FrontendSupportWorker {

    public async generateStaticFile(applicationPath, seedFilePath, fileName) {
        console.log('generate support worker applicationpaht ---- ', applicationPath);
        console.log('generate support worker seedfilepath ---- ', seedFilePath);
        await fs.readFile(`${seedFilePath}/${fileName}`, 'utf8', (err, result) => {
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                })
            }
        })
    }

    public async generateFile(applicationPath, authTemplatePath, fileName, templateName, information) {
        console.log(`generate file aof informat ion are -${fileName}---  `, information, ' --- foldername ---  ', fileName);
        authTemplatePath = path.resolve(__dirname, authTemplatePath);
        Common.createFolders(applicationPath);
        let renderTemplate = st.loadGroup(require(authTemplatePath + `/${templateName}_stg`));
        let fileData = renderTemplate.render(templateName, [information]);
        fs.writeFile(applicationPath + `/${fileName}`, fileData, function (err) {
            if (err) throw err;
            console.log(`${fileName} file generated`);
        })

    }

    public async writeStaticFile(applicationPath, fileName, information) {
        await fs.writeFile(`${applicationPath}/${fileName}`, information.join("\n"), function (err) {
            if (err) throw err;
            console.log('package.json file generated');
        })
    }
    
}