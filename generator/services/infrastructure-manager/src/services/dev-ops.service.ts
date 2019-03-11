import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';


export class DevOpsService {

    public generate_devops_db(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/dev-ops-db-pod';
        let templatePath = projectDetails.templateUrl + '/dev-ops-db-pod';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate dev-ops-db pvc
        let generatedevops_dbPVC = st.loadGroup(require(templatePath + '/sonar_pv_postgres_yaml_stg'));
        let telemetrydevops_dbPVC = generatedevops_dbPVC.render("sonar_pv_postgres_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/sonar-pv-postgres.yaml', telemetrydevops_dbPVC, function (err) {
            if (err) throw err;
            console.log('devops sonar-pv-postgres generated!!')
        })

        //generate dev-ops-db deployment
        let generatedevops_dbDeployment = st.loadGroup(require(templatePath + '/dev_ops_db_deployment_yaml_stg'));
        let telemetrydevops_dbDeployment = generatedevops_dbDeployment.render("dev_ops_db_deployment_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/dev-ops-db-deployment.yaml', telemetrydevops_dbDeployment, function (err) {
            if (err) throw err;
            console.log('app-db-deployment generated!!')
        })

        //generate dev-ops-db service
        let generatedevops_dbService = st.loadGroup(require(templatePath + '/dev_ops_db_service_yaml_stg'));
        let telemetrydevops_dbService = generatedevops_dbService.render("dev_ops_db_service_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/dev-ops-db-service.yaml', telemetrydevops_dbService, function (err) {
            if (err) throw err;
            console.log('dev-ops-db-service generated!!')
        })


        //callback("Success");

    }

    public generate_devops(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/dev-ops-pod';
        let templatePath = projectDetails.templateUrl + '/dev-ops-pod';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate telemetry dev-ops-deployment
        let generate_devopsDeployment = st.loadGroup(require(templatePath + '/dev_ops_deployment_yaml_stg'));
        let telemetry_devopsDeployment = generate_devopsDeployment.render("dev_ops_deployment_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/dev-ops-deployment.yaml', telemetry_devopsDeployment, function (err) {
            if (err) throw err;
            console.log('dev-ops-deployment generated!!')
        })

        //generate telemetry dev-ops-service
        let generate_devopsService = st.loadGroup(require(templatePath + '/dev_ops_service_yaml_stg'));
        let telemetry_devopsService = generate_devopsService.render("dev_ops_service_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/dev-ops-service.yaml', telemetry_devopsService, function (err) {
            if (err) throw err;
            console.log('dev-ops-deployment generated!!')
        })


        //callback("Success");

    }


}