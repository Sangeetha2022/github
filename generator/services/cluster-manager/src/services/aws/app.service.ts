import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

import * as yaml from 'js-yaml';

const Destination = deployConfig.AWS.DESTINATION_URL;

export class AppService {

    public app_pod(projectDetails, client, callback: CallableFunction) {

        projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/aws"


        async function applyDeployDB() {
            try {

                let devOpsDbYaml = projectDetails.yamlSource + "/app-db-pod";

                //deploy mongo pvc
                let mongoPvManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/mongo-pv.yaml', 'utf8'));
                const pvData = await client.api.v1.pv.post({ body: mongoPvManifest });
                await delay(5000);

                let mongoPvcManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/mongo-pvc.yaml', 'utf8'));
                const pvcData = await client.api.v1.namespaces(projectDetails.namespace).pvc.post({ body: mongoPvcManifest });
                await delay(5000);

                //deploy db
                let deployDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/app-db-deployment.yaml', 'utf8'));
                const deployDbData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployDbManifest });
                await delay(10000);

                //service db
                let serviceDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/app-db-service.yaml', 'utf8'));
                const serviceDbData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceDbManifest });
                if (serviceDbData.statusCode == 201) {
                    applyDeployApp()
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        applyDeployDB();


        async function applyDeployApp() {
            try {

                let appYaml = projectDetails.yamlSource + "/app-pod";


                //deploy node app
                let deployAppManifest = yaml.safeLoad(fs.readFileSync(appYaml + '/app-deployment.yaml', 'utf8'));
                const deployAppData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployAppManifest });
                //console.log("deployDevOpsData------>", deployDevOpsData)
                await delay(5000);

                //service for app
                let serviceAppManifest = yaml.safeLoad(fs.readFileSync(appYaml + '/app-service.yaml', 'utf8'));
                const serviceAppData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceAppManifest });
                if (serviceAppData.statusCode == 201) {
                    //applyDeployAppUI();
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }


        const delay = ms => new Promise(res => setTimeout(res, ms));

    }


    public system_entry_pod(projectDetails, client, callback: CallableFunction) {

        projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/aws"

        async function applyDeployAppUI() {
            try {

                let appYaml = projectDetails.yamlSource + "/system-entry-pod";


                //deploy app ui
                let deployAppUIManifest = yaml.safeLoad(fs.readFileSync(appYaml + '/system-entry-deployment.yaml', 'utf8'));
                const deployAppUIData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployAppUIManifest });
                //console.log("deployDevOpsData------>", deployDevOpsData)
                await delay(5000);

                //service for app ui
                let serviceAppUIManifest = yaml.safeLoad(fs.readFileSync(appYaml + '/system-entry-service.yaml', 'utf8'));
                const serviceAppUIData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceAppUIManifest });
                if (serviceAppUIData.statusCode == 201) {
                    console.log("SUCCESS APPLICATION DEPLOYED!")
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        applyDeployAppUI();

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }


}