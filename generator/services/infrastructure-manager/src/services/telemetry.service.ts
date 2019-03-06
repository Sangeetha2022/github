import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';


export class TelemetryService {

    public generate_telemetry_pod_vault(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/telemetry-pod';
        let templatePath = projectDetails.templateUrl + '/telemetry-pod';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate telemetry vault and promethues deployment
        let generateTelemetry_deployment = st.loadGroup(require(templatePath + '/telemetry_deployment_yaml_stg'));
        let telemetry = generateTelemetry_deployment.render("telemetry_deployment_yaml", [projectName]);
        fs.writeFile(destination + '/telemetry-deployment.yaml', telemetry, function (err) {
            if (err) throw err;
            console.log('vault and promethues deployment generated!!')
        })

        //generate telemetry vault and promethues service
        let generateTelemetry__service = st.loadGroup(require(templatePath + '/telemetry_service_yaml_stg'));
        let telemetrySer = generateTelemetry__service.render("telemetry_service_yaml", [projectName]);
        fs.writeFile(destination + '/telemetry-service.yaml', telemetrySer, function (err) {
            if (err) throw err;
            console.log('vault and promethues service generated!!')
        })

        //callback("Success");

    }


}