import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class FrontendSupportWorker {
    public async generateStaticFile(applicationPath, seedFilePath, fileName, callback) {
        console.log('generate support worker applicationpaht ---- ', applicationPath);
        console.log('generate support worker seedfilepath ---- ', seedFilePath);
        fs.readFile(`${seedFilePath}/${fileName}`, 'utf8', async (err, result) => {
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                    callback();
                })
            } else {
                callback();
            }
        })
    }

    public async generateFile(applicationPath, authTemplatePath, fileName, templateName, information, callback) {
        console.log(`generate file aof informat ion are -${fileName}---  `, information, ' --- foldername ---  ', fileName);
        authTemplatePath = path.resolve(__dirname, authTemplatePath);
        Common.createFolders(applicationPath);
        let renderTemplate = st.loadGroup(require(authTemplatePath + `/${templateName}_stg`));
        let fileData = renderTemplate.render(templateName, [information]);
        console.log('fileData--->>>>', fileData);
        fs.writeFile(applicationPath + `/${fileName}`, fileData, function (err) {
            if (err) throw err;
            console.log(`${fileName} file generated`);
            callback();
        });
    }

    public async writeStaticFile(applicationPath, fileName, information, callback) {
        await fs.writeFile(`${applicationPath}/${fileName}`, information.join("\n"), function (err) {
            if (err) throw err;
            console.log('package.json file generated');
            callback();
        })
    }

    public async writeAssetsImageFile(applicationPath, templatePath, fileName) {
        await fs.readFile(`${templatePath}/${fileName}`, (err, result) => {
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                })
            }
        })
    }
}