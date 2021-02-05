import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import * as util from 'util'
import { Common } from '../config/Common';


export class FrontendSupportWorker {

    private readFile = util.promisify(fs.readFile);
    private writeFile = util.promisify(fs.writeFile);

    public generateStaticFile(applicationPath, seedFilePath, fileName, callback) {
        console.log('generate support worker applicationpaht ---- ', applicationPath);
        console.log('generate support worker seedfilepath ---- ', seedFilePath);
        this.readFile(`${seedFilePath}/${fileName}`, 'utf8')
            .then((result) => {
                this.writeFile(applicationPath + `/${fileName}`, result, null)
                    .then(() => {
                        callback('successfully written the file');
                    }).catch(error => {
                        callback('cannot able to written the file');
                    });
            }).catch(error => {
                callback('cannot able to read the file');
            });
        //  fs.readFile(`${seedFilePath}/${fileName}`, 'utf8', (err, result) => {
        //     if (result) {
        //         fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
        //             if (err) throw err;
        //             console.log(`${fileName} file generated`);
        //         })
        //     }
        // })
    }

    public async generateFile(applicationPath, authTemplatePath, fileName, templateName, information, callback) {
        console.log(`generate file aof informat ion are -${fileName}---  `, information, ' --- foldername ---  ', fileName);
        authTemplatePath = path.resolve(__dirname, authTemplatePath);
        Common.createFolders(applicationPath);
        let renderTemplate = st.loadGroup(require(authTemplatePath + `/${templateName}_stg`));
        let fileData = renderTemplate.render(templateName, [information]);
        console.log('fileData---->>>>', fileData);
        await this.writeFile(applicationPath + `/${fileName}`, fileData, null)
            .then(() => {
                console.log('1111111111111-------');
                callback('successfully written the file');
            }).catch(error => {
                callback('cannot able to written the file');
            });
        // fs.writeFile(applicationPath + `/${fileName}`, fileData, function (err) {
        //     if (err) throw err;
        //     console.log(`${fileName} file generated`);
        // })

    }

    public writeStaticFile(applicationPath, fileName, information, callback) {
        this.writeFile(`${applicationPath}/${fileName}`, information.join("\n"), null)
            .then(() => {
                callback('successfully written the file');
            }).catch(error => {
                callback('cannot able to written the file');
            });
        //  fs.writeFile(`${applicationPath}/${fileName}`, information.join("\n"), function (err) {
        //     if (err) throw err;
        //     console.log('package.json file generated');
        // })
    }

}