import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
import * as yaml from 'js-yaml';

const Destination = deployConfig.LOCAL.DESTINATION_URL;
const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })


export class AppService {

    public app_pod(projectDetails, callback: CallableFunction) {

        projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/local"
        let namespace = (projectDetails.project_name.toLowerCase() + "-" + projectDetails.user_id.substring(0, 5))


        async function applyDeployDB() {
            try {

                let appDbYaml = projectDetails.yamlSource + "/app-db-pod";

                // deploy mongo pv
                let mongoPvManifest = yaml.safeLoad(fs.readFileSync(appDbYaml + '/mongo-pv.yaml', 'utf8'));
                const pvData = await client.api.v1.pv.post({ body: mongoPvManifest });
                await delay(10000);

                // deploy mongo pvc
                let mongoPvcManifest = yaml.safeLoad(fs.readFileSync(appDbYaml + '/mongo-pvc.yaml', 'utf8'));
                const pvcData = await client.api.v1.namespaces(namespace).pvc.post({ body: mongoPvcManifest });
                await delay(5000);

                //deploy db
                let deployDbManifest = yaml.safeLoad(fs.readFileSync(appDbYaml + '/app-db-deployment.yaml', 'utf8'));
                const deployDbData = await client.apis.extensions.v1beta1.namespaces(namespace).deployments.post({ body: deployDbManifest });
                await delay(10000);

                //service db
                let serviceDbManifest = yaml.safeLoad(fs.readFileSync(appDbYaml + '/app-db-service.yaml', 'utf8'));
                console.log("serviceDbManifest",serviceDbManifest)
                const serviceDbData = await client.api.v1.namespaces(namespace).service.post({ body: serviceDbManifest });
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
                const deployAppData = await client.apis.extensions.v1beta1.namespaces(namespace).deployments.post({ body: deployAppManifest });
                await delay(5000);

                //service for app
                let serviceAppManifest = yaml.safeLoad(fs.readFileSync(appYaml + '/app-service.yaml', 'utf8'));
                const serviceAppData = await client.api.v1.namespaces(namespace).service.post({ body: serviceAppManifest });
                if (serviceAppData.statusCode == 201) {
                    applyDeployAppUI();
                }

            } catch (err) {
                console.error('Error: ', err)
            }
        }

        async function applyDeployAppUI() {
            try {

                let appUiYaml = projectDetails.yamlSource + "/system-entry-pod";

                //deploy app ui
                let deployAppUIManifest = yaml.safeLoad(fs.readFileSync(appUiYaml + '/system-entry-deployment.yaml', 'utf8'));
                const deployAppUIData = await client.apis.extensions.v1beta1.namespaces(namespace).deployments.post({ body: deployAppUIManifest });
                await delay(5000);

                //service for app ui
                let serviceAppUIManifest = yaml.safeLoad(fs.readFileSync(appUiYaml + '/system-entry-service.yaml', 'utf8'));
                const serviceAppUIData = await client.api.v1.namespaces(namespace).service.post({ body: serviceAppUIManifest });
                if (serviceAppUIData.statusCode == 201) {
                    console.log("SUCCESS APPLICATION DEPLOYED!")
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }
}