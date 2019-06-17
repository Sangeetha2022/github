import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class ControllerSupportWorker {



    generateControllerFile(generationPath, templatePath, controllerData, callback) {
        const ControllerPath = `${generationPath}/src/controller`;
        const ControllerTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(ControllerPath);
        let generateController = st.loadGroup(require(ControllerTemplatePath + '/controller_stg'));
        let ControllerFile = generateController.render("controller", [controllerData]);
        fs.writeFile(ControllerPath + `/${controllerData.entityFileName.trim()}Controller.ts`, ControllerFile, function (err) {
            if (err) throw err;
            callback('controller file generated');
        })

    }
}