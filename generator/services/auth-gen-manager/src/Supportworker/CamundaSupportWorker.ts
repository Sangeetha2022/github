import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class CamundaSupportWorker {

    public camundaConfig(camundaFolder, templatePath,projectName, callback) {
        const configFolder = camundaFolder + `/src/config`;
        let pathfile = path.resolve(__dirname, templatePath);
        const generateModel = st.loadGroup(require(pathfile + '/camunda_stg'));
        let modelData = generateModel.render("camunda");
        if (!fs.existsSync(configFolder)) {
            fs.mkdirSync(configFolder);
        }

        fs.writeFile(configFolder + `/camundaService.ts`, modelData, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }
}