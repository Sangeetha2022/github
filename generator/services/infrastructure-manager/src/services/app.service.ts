import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';


export class AppService {

    public generate_app_db_pod(projectDetails, callback: CallableFunction) {


        let destination = projectDetails.destinationUrl + '/app-db-pod';
        let templatePath = projectDetails.templateUrl + '/app-db-pod';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate mongo pv
        let generatemongoPV = st.loadGroup(require(templatePath + '/mongo_pv_yaml_stg'));
        let mongoPV = generatemongoPV.render("mongo_pv_yaml", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/mongo-pv.yaml', mongoPV, function (err) {
            if (err) throw err;
            console.log('mongo pv generated!!')
        })

        //generate mongo pvc
        let generatemongoPVC = st.loadGroup(require(templatePath + '/mongo_pvc_yaml_stg'));
        let mongoPVC = generatemongoPVC.render("mongo_pvc_yaml", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/mongo-pvc.yaml', mongoPVC, function (err) {
            if (err) throw err;
            console.log('mongo pvc generated!!')
        })

        //generate app-db-deployment
        let generate_app_db_deployment = st.loadGroup(require(templatePath + '/app_db_deployment_yaml_stg'));
        let app_db_deployment = generate_app_db_deployment.render("app_db_deployment_yaml", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/app-db-deployment.yaml', app_db_deployment, function (err) {
            if (err) throw err;
            console.log('app-db-deployment generated!!')
        })


        //generate app-db-service
        let generate_app_db_service = st.loadGroup(require(templatePath + '/app_db_service_yaml_stg'));
        let app_db_service = generate_app_db_service.render("app_db_service_yaml", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/app-db-service.yaml', app_db_service, function (err) {
            if (err) throw err;
            console.log('app-db-service generated!!')
        })



        //callback("Success");

    }



    public generate_app_pod(projectDetails, callback: CallableFunction) {

        let destination = projectDetails.destinationUrl + '/app-pod';
        let templatePath = projectDetails.templateUrl + '/app-pod';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate node app deployment
        let generateApp_deployment = st.loadGroup(require(templatePath + '/app_deployment_yaml_stg'));
        let app_deployment = generateApp_deployment.render("app_deployment_yaml", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/app-deployment.yaml', app_deployment, function (err) {
            if (err) throw err;
            console.log('app_deployment_yaml generated!!')
        })

        //generate node app service
        let generateApp_service = st.loadGroup(require(templatePath + '/app_service_yaml_stg'));
        let app_service = generateApp_service.render("app_service_yaml", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/app-service.yaml', app_service, function (err) {
            if (err) throw err;
            console.log('app_service_yaml generated!!')
        })


        //callback("Success");

    }






}