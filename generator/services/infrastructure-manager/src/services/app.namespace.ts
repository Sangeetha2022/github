import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';


export class NamespaceService {

    public generate_namespace(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/namespace';
        let templatePath = projectDetails.templateUrl + '/namespace';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate telemetry vault and prometheus deployment
        let generateTelemetry_deployment = st.loadGroup(require(templatePath + '/namespace_yaml_stg'));
        let telemetry = generateTelemetry_deployment.render("namespace_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/namespace.yaml', telemetry, function (err) {
            if (err) throw err;
            console.log('app namespace generated!!')
        })


        //callback("Success");

    }


}