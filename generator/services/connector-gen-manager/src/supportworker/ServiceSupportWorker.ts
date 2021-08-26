import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';
export class ServiceSupportWorker {

    generateServiceFile(generationPath, templatePath, serviceData, callback) {
        const servicePath = `${generationPath}/src/service`;
        const serviceTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(servicePath);
        let generateService = st.loadGroup(require(serviceTemplatePath + '/service_stg'));
        let serviceFile = generateService.render("service", [serviceData]);
        fs.writeFile(servicePath + `/${serviceData.entityFileName.trim()}Service.ts`, serviceFile, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }

}