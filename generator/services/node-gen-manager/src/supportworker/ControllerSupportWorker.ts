import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class ControllerSupportWorker {



    generateControllerFile(generationPath, templatePath, ControllerData, callback) {
        const ControllerPath = path.join(__dirname, `${generationPath}/src/controller`)
        const ControllerTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(ControllerPath);
        let generateController = st.loadGroup(require(ControllerTemplatePath + '/controller_stg'));
        let ControllerFile = generateController.render("controller", [ControllerData]);
        fs.writeFile(ControllerPath + `/${ControllerData.entityFileName.trim()}Controller.ts`, ControllerFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('controller file generated');
        })

    }

    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };

}