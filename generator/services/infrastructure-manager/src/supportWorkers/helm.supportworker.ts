import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class HelmSupportWorker {

    public generateFile(applicationPath, templatePath, information, templateName, fileName, fileType) {
        let generateChartFile = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let chartYaml = generateChartFile.render(templateName, [information]);
        fs.writeFile(applicationPath + `/${fileName}`, chartYaml, function (err) {
            if (err) throw err;
            console.log(`${fileName} for ${fileType} env generated!!`);

        })
    }
}