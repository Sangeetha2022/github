import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

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

    generateFiles(templatePath, filePath, fileName, templateName, information, callback) {
        // const filePath = `${generationPath}/src`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let renderTemplate = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let fileData = renderTemplate.render(templateName, [information]);
        fs.writeFile(filePath + `/${fileName}`, fileData, function (err) {
            if (err) throw err;
            callback(`${fileName} file generated`);
        })

    }
}