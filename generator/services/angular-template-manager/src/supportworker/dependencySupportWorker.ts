import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';
import { english, spanish, tamil, translator } from '../assets/translator';

export class DependencySupportWorker {



    generateIndexHtml(generationPath, templatePath, templateName, information, callback) {
        const filePath = `${generationPath}/src`;
        console.log('before generate index.html file ---  ', information)
        console.log('before generate index.html file -baseTag string--  ', information.baseTag.join(`\n`))
        console.log('before generate index.html file -scriptTag string--  ', information.scriptTag.join(`\n`))
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let renderTemplate = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let fileData = renderTemplate.render(templateName, [information.baseTag.join(`\n`), information.scriptTag.join(`\n`)]);
        fs.writeFile(filePath + `/index.html`, fileData, function (err) {
            if (err) throw err;
            callback(`index.html file generated`);
        })

    }

    public async generateStaticFile(applicationPath, seedFilePath, fileName) {
        seedFilePath = path.resolve(__dirname, seedFilePath);
        await fs.readFile(`${seedFilePath}/${fileName}`, 'utf8', (err, result) => {
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                })
            }
        })
    }

    generateFiles(templatePath, filePath, fileName, templateName, information, callback) {
        // const filePath = `${generationPath}/src`;
        console.log(`generate file ----${fileName}---  `, fileName, ' --information--  ', information);
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let renderTemplate = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let fileData = renderTemplate.render(templateName, [information]);
        fs.writeFile(filePath + `/${fileName}`, fileData, function (err) {
            if (err) throw err;
            callback(`${fileName} file generated`);
        })

    }

    generateTranslateJsonFiles(filePath, langFolderName, fileName, source, callback) {
        // const filePath = `${generationPath}/src`;
        langFolderName.forEach(folderName => {
            const languageFolderPath = filePath + `/` + folderName;
            Common.createFolders(languageFolderPath);
            let translationObj = JSON.parse(source);
            if (folderName === 'en') {
                translationObj.source = english;
            } else if (folderName === 'es') {
                translationObj.source = spanish;
            } else if (folderName === 'ta') {
                translationObj.source = tamil;
            }
            var translationJson = translationObj;
            var errorSource = translator.error;
            var validationSource = translator.validation;
            fs.writeFile(languageFolderPath + `/${translator.fileName[1]}`, errorSource, function (err) {
                if (err) throw err;
            })
            fs.writeFile(languageFolderPath + `/${translator.fileName[2]}`, validationSource, function (err) {
                if (err) throw err;
            })
            fs.writeFile(languageFolderPath + `/${fileName}`, JSON.stringify(translationJson), function (err) {
                if (err) throw err;
            })
        });
        callback(`${fileName} file generated`);
    }
}