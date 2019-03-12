import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

import * as yaml from 'js-yaml';

const Destination = deployConfig.AWS.DESTINATION_URL;

export class TelemetryService {

    public telemetry_vault(projectDetails, client, callback: CallableFunction) {

        projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/aws"

        let namespaceYaml = projectDetails.yamlSource + "/namespace";
        let namespaceManifest = yaml.safeLoad(fs.readFileSync(namespaceYaml + '/namespace.yaml', 'utf8'));
        console.log("deployment started...")
        async function createNameSpace() {
            try {

                //create name space
                const namespaceData = await client.api.v1.namespace.post({ body: namespaceManifest });
                if (namespaceData.statusCode == 201) {
                    projectDetails.namespace = namespaceData.body.metadata.name
                    applyVault()
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        createNameSpace()


        async function applyVault() {
            try {

                let devOpsDbYaml = projectDetails.yamlSource + "/telemetry-pod";


                //deploy vault and promethuis
                let deployManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/telemetry-deployment.yaml', 'utf8'));
                const deployTelemetyVaultData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployManifest });
                //console.log("deployDevOpsData------>", deployDevOpsData)


                //service for vault and promethuis
                let serviceManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/telemetry-service.yaml', 'utf8'));
                const serviceData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceManifest });
                if (serviceData.statusCode == 201) {
                    // move to next pods...
                    console.log("SUCCESS TELEMETRY VAULT-PROMETHUES DEPLOYED!");
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }


      

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }

    public telemetry_EFK(projectDetails, client, callback: CallableFunction) {


        let loggingYaml = projectDetails.yamlSource + "/telemetry-pod/EFK";
        
        async function createLoggingNameSpace() {
            try {

                let loggingNamespaceManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/kube-logging.yaml', 'utf8'));
                //create name space
                const namespaceData = await client.api.v1.namespace.post({ body: loggingNamespaceManifest });
                if (namespaceData.statusCode == 201) {
                    projectDetails.logNamespace = namespaceData.body.metadata.name
                    applyDeployEFK()
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        createLoggingNameSpace();


        async function applyDeployEFK() {
            try {

        
                //deploy pvc
                let elsaticPvcManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/elasticsearch-pv.yaml', 'utf8'));
                const pvcData = await client.api.v1.namespaces(projectDetails.logNamespace).pvc.post({ body: elsaticPvcManifest });
                await delay(5000);

                //deploy elasticsearch statefulset
                let elasticStatefulsetManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/elasticsearch-statefulset.yaml', 'utf8'));
                const elasticStatefulsetVaultData = await client.apis.extensions.v1beta1.namespaces(projectDetails.logNamespace).statefulsets.post({ body: elasticStatefulsetManifest });
                await delay(10000);
                //console.log("deployDevOpsData------>", deployDevOpsData)


                //service for elasticsearch
                let elasticsearchServiceManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/elasticsearch-svc.yaml', 'utf8'));
                const elasticsearchserviceData = await client.api.v1.namespaces(projectDetails.logNamespace).service.post({ body: elasticsearchServiceManifest });
                
                
                // if (serviceData.statusCode == 201) {
                //     // move to next pods...
                //     console.log("SUCCESS TELEMETRY VAULT-PROMETHUES DEPLOYED!");
                // }

            } catch (err) {
                console.error('Error: ', err)
            }
        }
   
        const delay = ms => new Promise(res => setTimeout(res, ms));

    }


}