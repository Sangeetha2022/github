import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class ServiceSupportWorker {

    generateServiceFile(generationPath, templatePath, serviceData, callback) {
        // const servicePath = path.join(__dirname, `${generationPath}/src/service`)
        const servicePath = `${generationPath}/src/service`;
        const serviceTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(servicePath);
        let generateService = st.loadGroup(require(serviceTemplatePath + '/service_stg'));
        let serviceFile = generateService.render("service", [serviceData]);
        fs.writeFile(servicePath + `/${serviceData.entityFileName.trim()}Service.ts`, serviceFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('file generated');
        })

    }

    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };

}