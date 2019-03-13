import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const yaml = require('js-yaml');

const Destination = deployConfig.LOCAL.DESTINATION_URL;
const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })

export class DevOpsService {

    public deploy_dev_ops_pod(projectDetails, callback: CallableFunction) {   

        projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/local"

        let namespaceYaml = projectDetails.yamlSource + "/namespace";
        let namespaceManifest = yaml.safeLoad(fs.readFileSync(namespaceYaml + '/namespace.yaml', 'utf8'));

        async function createNameSpace() {
            try {
                //create namespace
                const namespaceData = await client.api.v1.namespace.post({ body: namespaceManifest });
                if (namespaceData.statusCode == 201) {
                    projectDetails.namespace=namespaceData.body.metadata.name
                    applyDeployDB()
                }
            }
             catch (err) {
                console.error('Error: ', err)
            }
        }
        createNameSpace()

        async function applyDeployDB() {
            try {
                        
                let devOpsDbYaml = projectDetails.yamlSource + "/dev-ops-db-pod";
                
                //deploy pvc
                let sonarPvcManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/sonar-pv-postgres.yaml', 'utf8'));
                const pvcData = await client.api.v1.namespaces(projectDetails.namespace).pvc.post({ body: sonarPvcManifest });
                console.log("pvcData", pvcData)
                await delay(5000);

                //deploy db
                let deployDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/dev-ops-db-deployment.yaml', 'utf8'));
                const deployDbData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployDbManifest });
                console.log("deployDbData", deployDbData)
                await delay(10000);

                //service db
                let serviceDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/dev-ops-db-service.yaml', 'utf8'));
                const serviceDbData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceDbManifest });
                if(serviceDbData.statusCode == 201) {
                    applyDeployDevOps()
                }

            } catch (err) {
                console.error('Error: ', err)
            }
        }

        async function applyDeployDevOps() {
            try {
                        
                let devOpsDbYaml = projectDetails.yamlSource + "/dev-ops-pod";
                
                //deploy dev-ops
                let deployDevOpsManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/dev-ops-deployment.yaml', 'utf8'));
                const deployDevOpsData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployDevOpsManifest });
                console.log("deployDevOpsData------>",deployDevOpsData)
                

                //service db
                let serviceDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/dev-ops-service.yaml', 'utf8'));
                const serviceDbData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceDbManifest });
                if(serviceDbData.statusCode == 201) {
                    // move to next pods...
                }

            } catch (err) {
                console.error('Error: ', err)
            }
        }

        const delay = ms => new Promise(res => setTimeout(res, ms));
    }
}


  