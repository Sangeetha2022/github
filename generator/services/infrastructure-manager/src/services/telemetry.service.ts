import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';


export class TelemetryService {

    public generate_telemetry_pod_vault(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/telemetry-pod';
        let templatePath = projectDetails.templateUrl + '/telemetry-pod';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate telemetry vault and promethues deployment
        let generateTelemetry_deployment = st.loadGroup(require(templatePath + '/telemetry_deployment_yaml_stg'));
        let telemetry = generateTelemetry_deployment.render("telemetry_deployment_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/telemetry-deployment.yaml', telemetry, function (err) {
            if (err) throw err;
            console.log('vault and promethues deployment generated!!')
        })

        //generate telemetry vault and promethues service
        let generateTelemetry__service = st.loadGroup(require(templatePath + '/telemetry_service_yaml_stg'));
        let telemetrySer = generateTelemetry__service.render("telemetry_service_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/telemetry-service.yaml', telemetrySer, function (err) {
            if (err) throw err;
            console.log('vault and promethues service generated!!')
        })

        //callback("Success");

    }


    public generate_telemetry_pod_EFK(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/telemetry-pod/EFK';
        let templatePath = projectDetails.templateUrl + '/telemetry-pod/EFK';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate telemetry EFK namespace
        let generateEFK_namespace = st.loadGroup(require(templatePath + '/kube_logging_yaml_stg'));
        let telemetryEFK_namespace = generateEFK_namespace.render("kube_logging_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/kube-logging.yaml', telemetryEFK_namespace, function (err) {
            if (err) throw err;
            console.log('EFK namespace generated!!')
        })

        //generate telemetry elastic search pvc
        let generateTelemetry_elasticPVC = st.loadGroup(require(templatePath + '/elasticsearch_pv_yaml_stg'));
        let telemetry_elasticPVC = generateTelemetry_elasticPVC.render("elasticsearch_pv_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/elasticsearch-pv.yaml', telemetry_elasticPVC, function (err) {
            if (err) throw err;
            console.log('elasticsearch_pv generated!!')
        })

        //generate telemetry elasticsearch statefullset
        let generateTelemetry_elasticStatefulSet = st.loadGroup(require(templatePath + '/elasticsearch_statefulset_yaml_stg'));
        let telemetry_elasticStatefulSet = generateTelemetry_elasticStatefulSet.render("elasticsearch_statefulset_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/elasticsearch-statefulset.yaml', telemetry_elasticStatefulSet, function (err) {
            if (err) throw err;
            console.log('elasticsearch_statefulset generated!!')
        })

        //generate telemetry elasticsearch service
        let generateTelemetry_elasticService = st.loadGroup(require(templatePath + '/elasticsearch_svc_yaml_stg'));
        let telemetry_elasticService = generateTelemetry_elasticService.render("elasticsearch_svc_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/elasticsearch-svc.yaml', telemetry_elasticService, function (err) {
            if (err) throw err;
            console.log('elasticsearch_service generated!!')
        })


        //generate telemetry fluentd
        let generateTelemetry_fluentd = st.loadGroup(require(templatePath + '/fluentd_yaml_stg'));
        let telemetry_fluentd = generateTelemetry_fluentd.render("fluentd_yaml", [projectName.toLowerCase()]);
        fs.writeFile(destination + '/fluentd.yaml', telemetry_fluentd, function (err) {
            if (err) throw err;
            console.log('fluentd generated!!')
        })


         //generate telemetry Kibana
         let generateTelemetry_Kibana = st.loadGroup(require(templatePath + '/kibana_yaml_stg'));
         let telemetry_Kibana = generateTelemetry_Kibana.render("kibana_yaml", [projectName.toLowerCase()]);
         fs.writeFile(destination + '/kibana.yaml', telemetry_Kibana, function (err) {
             if (err) throw err;
             console.log('Kibana generated!!')
         })



        //callback("Success");

    }


}