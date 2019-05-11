import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

import * as yaml from 'js-yaml';

const Source = deployConfig.GEPPETTO.DEV.URL;

export class AppPodService {

    public system_entry_pod(projectDetails, client, callback: CallableFunction) {

        projectDetails.yamlSource = Source; 


        async function applyReDeploySytemEntry() {
            try {

                let deploySystemEntryManifest = yaml.safeLoad(fs.readFileSync(projectDetails.yamlSource + "/gep-dev-system-entry-deployment.yaml", 'utf8'));

                //delete app_pod deployment
                const deleteSystemEntryData = await client.apis.apps.v1.namespaces(deploySystemEntryManifest.metadata.namespace).deployments(deploySystemEntryManifest.metadata.name).delete();
                //console.log("deleteSystemEntryData------>", deleteSystemEntryData)
                await delay(5000);

                //redeploy app_pod
                const deploySystemEntryData = await client.apis.extensions.v1beta1.namespaces(deploySystemEntryManifest.metadata.namespace).deployments.post({ body: deploySystemEntryManifest });
                //console.log("deployDevOpsData------>", deployDevOpsData)
                console.log("System-entry-pod deployed!");
                await delay(5000);


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        applyReDeploySytemEntry();

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }


    public app_pod(projectDetails, client, callback: CallableFunction) {

        projectDetails.yamlSource = Source; 


        async function applyReDeployApp() {
            try {

                let deployAppManifest = yaml.safeLoad(fs.readFileSync(projectDetails.yamlSource + "/gep-dev-app-deployment.yaml", 'utf8'));
               
                //delete app_pod deployment
                const deleteAppData = await client.apis.apps.v1.namespaces(deployAppManifest.metadata.namespace).deployments(deployAppManifest.metadata.name).delete();
                // console.log("deleteAppData------>", deleteAppData)
                await delay(5000);

                //redeploy app_pod
                const deployAppData = await client.apis.extensions.v1beta1.namespaces(deployAppManifest.metadata.namespace).deployments.post({ body: deployAppManifest });
                //console.log("deployDevOpsData------>", deployDevOpsData)
                console.log("App-pod deployed!");
                await delay(5000);


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        applyReDeployApp();

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }



    public generator_pod(projectDetails, client, callback: CallableFunction) {

        projectDetails.yamlSource = Source; 


        async function applyReDeployGenerator() {
            try {

                let deployGeneratorManifest = yaml.safeLoad(fs.readFileSync(projectDetails.yamlSource + "/gep-dev-generater-deployment.yaml", 'utf8'));
                
                //delete app_pod deployment
                const deleteGeneratorData = await client.apis.apps.v1.namespaces(deployGeneratorManifest.metadata.namespace).deployments(deployGeneratorManifest.metadata.name).delete();
                //console.log("deleteGeneratorData------>", deleteGeneratorData)
                await delay(5000);

                //redeploy app_pod
                const deployGeneratorData = await client.apis.extensions.v1beta1.namespaces(deployGeneratorManifest.metadata.namespace).deployments.post({ body: deployGeneratorManifest });
                //console.log("deployDevOpsData------>", deployDevOpsData)
                console.log("Generater-pod deployed!");
                await delay(5000);


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        applyReDeployGenerator();

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }


}