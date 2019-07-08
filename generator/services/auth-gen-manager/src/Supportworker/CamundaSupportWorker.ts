import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class CamundaSupportWorker {

    public camundaConfig(camundaFolder ,templatePath , callback){
        const configFolder = camundaFolder + `/config`;
        const generateModel = st.loadGroup(require(templatePath + '/camunda_stg'));
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