import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import * as util from 'util';
import { exec } from 'child_process';
import * as ncp from 'ncp';
import { HelmSupportWorker } from '../supportWorkers/helm.supportworker.js';

let helmSupportWorker = new HelmSupportWorker();
export class HelmService {

    private projectDetails: any;
    private backendList: any[] = [];
    private destination: any;
    private templateStaticPath: any;
    private templateDynamicPath: any;
    private destinationLocal: any;
    private localtemplatePath: any;
    private localTemplateStaticPath: any;
    private localTemplateDynamicPath: any;

    // fileName
    private VALUE_YAML = 'values.yaml';
    private CHART_YAML = 'Chart.yaml';
    private APP_DEPLOYMENT_YAML = 'app-deployment.yaml';
    private APP_SERVICE_YAML = 'app-service.yaml';

    // type
    private LOCAL_TYPE = 'local';
    private CLOUD_TYPE = 'cloud';

    // templateName
    private TEMPLATE_VALUE_YAML = 'values_yaml';
    private TEMPLATE_CHART_YAML = 'chart_yaml';
    private TEMPLATE_APP_DEPLOYMENT = 'app_deployment';
    private TEMPLATE_APP_SERVICES = 'app_services';

    public generate_helm_templates(details, backendList, callback: CallableFunction) {

        this.projectDetails = details;
        this.backendList = backendList;
        console.log('backend list values in helms are -----  ', backendList);
        console.log('generate_helm begins --- ', util.inspect(this.projectDetails, { showHidden: true, depth: null }));
        this.destination = this.projectDetails.cloudUrl + '/helm';
        this.templateStaticPath = this.projectDetails.helmTemplateUrl + '/static_contents';
        this.templateDynamicPath = this.projectDetails.helmTemplateUrl + '/dynamic_contents';

        this.destinationLocal = this.projectDetails.localUrl + '/helm';
        this.localtemplatePath = this.projectDetails.templateUrl + '/helm';
        this.localTemplateStaticPath = this.localtemplatePath + '/static_contents';
        this.localTemplateDynamicPath = this.localtemplatePath + '/dynamic_contents';

        if (!fs.existsSync(this.destinationLocal)) {
            fs.mkdirSync(this.destinationLocal);
        }

        if (!fs.existsSync(this.destination)) {
            fs.mkdirSync(this.destination);
        }
        this.generate_static_contents();
        this.generate_static_contents_local();
    }

    generate_static_contents() {
        //copy template files for helm
        ncp.limit = 16;
        ncp(this.templateStaticPath, this.destination, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('helm templated copy done!');
            this.generate_dynamic_contents();
        });
    }

    generate_static_contents_local() {
        //copy template files for helm
        ncp.limit = 16;
        ncp(this.localTemplateStaticPath, this.destinationLocal, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('helm local template copy  for local!');
            this.generate_dynamic_contents_local();
        });
    }

    generate_dynamic_contents_local() {
        console.log("----dynamic");
        const temp = {
            project_name: this.projectDetails.project_lowercase,
            custom_node: this.backendList
        }

        // generate helm value.yaml file for local
        helmSupportWorker.generateFile(this.destinationLocal, this.localTemplateDynamicPath, temp,
            this.TEMPLATE_VALUE_YAML, this.VALUE_YAML, this.LOCAL_TYPE);

        // generate helm chart.yaml file for local
        helmSupportWorker.generateFile(this.destinationLocal, this.localTemplateDynamicPath, temp,
            this.TEMPLATE_CHART_YAML, this.CHART_YAML, this.LOCAL_TYPE);

        const app_pod_destination = `${this.destinationLocal}/templates/app-pod`;
        const app_pod_template = `${this.localTemplateDynamicPath}/templates/app-pod`;

        if (!fs.existsSync(app_pod_destination)) {
            fs.mkdirSync(app_pod_destination);
        }

        // generate app-deployment.yaml file for cloud
        helmSupportWorker.generateFile(app_pod_destination, app_pod_template, temp,
            this.TEMPLATE_APP_DEPLOYMENT, this.APP_DEPLOYMENT_YAML, this.LOCAL_TYPE);

        // generate app-service.yaml file for cloud
        helmSupportWorker.generateFile(app_pod_destination, app_pod_template, temp,
            this.TEMPLATE_APP_SERVICES, this.APP_SERVICE_YAML, this.LOCAL_TYPE);
    }

    generate_dynamic_contents() {

        const temp = {
            project_name: this.projectDetails.project_lowercase,
            custom_node: this.backendList
        }

        // generate helm value.yaml file for cloud
        helmSupportWorker.generateFile(this.destination, this.templateDynamicPath, temp,
            this.TEMPLATE_VALUE_YAML, this.VALUE_YAML, this.CLOUD_TYPE);

        // generate helm chart.yaml file for cloud
        helmSupportWorker.generateFile(this.destination, this.templateDynamicPath, temp,
            this.TEMPLATE_CHART_YAML, this.CHART_YAML, this.CLOUD_TYPE);

        const app_pod_destination = `${this.destination}/templates/app-pod`;
        const app_pod_template = `${this.templateDynamicPath}/templates/app-pod`;

        if (!fs.existsSync(app_pod_destination)) {
            fs.mkdirSync(app_pod_destination);
        }

        // generate app-deployment.yaml file for cloud
        helmSupportWorker.generateFile(app_pod_destination, app_pod_template, temp,
            this.TEMPLATE_APP_DEPLOYMENT, this.APP_DEPLOYMENT_YAML, this.CLOUD_TYPE);

        // generate app-service.yaml file for cloud
        helmSupportWorker.generateFile(app_pod_destination, app_pod_template, temp,
            this.TEMPLATE_APP_SERVICES, this.APP_SERVICE_YAML, this.CLOUD_TYPE);

    }

}