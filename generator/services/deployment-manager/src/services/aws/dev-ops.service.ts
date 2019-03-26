import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

import * as yaml from 'js-yaml';

const Destination = deployConfig.AWS.DESTINATION_URL;

export class DevOpsService {

    public dev_ops_pod(projectDetails, client, callback: CallableFunction) {

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
                    applyDeployDB();
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }
        createNameSpace()

        async function applyDeployDB() {
            try {

                let devOpsDbYaml = projectDetails.yamlSource + "/dev-ops-db-pod";

                //deploy postgres pv
                let sonarPvManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/sonar-pv-postgres.yaml', 'utf8'));
                const pvData = await client.api.v1.pv.post({ body: sonarPvManifest });
                await delay(5000);

                //deploy postgres pvc
                let sonarPvcManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/sonar-pvc-postgres.yaml', 'utf8'));
                const pvcData = await client.api.v1.namespaces(projectDetails.namespace).pvc.post({ body: sonarPvcManifest });
                await delay(5000);

                //deploy db
                let deployDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/dev-ops-db-deployment.yaml', 'utf8'));
                const deployDbData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployDbManifest });
                await delay(10000);

                //service db
                let serviceDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/dev-ops-db-service.yaml', 'utf8'));
                const serviceDbData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceDbManifest });
                if (serviceDbData.statusCode == 201) {
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
                //console.log("deployDevOpsData------>", deployDevOpsData)


                //service db
                let serviceDbManifest = yaml.safeLoad(fs.readFileSync(devOpsDbYaml + '/dev-ops-service.yaml', 'utf8'));
                const serviceDbData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceDbManifest });
                if (serviceDbData.statusCode == 201) {
                    // move to next pods...
                    console.log("SUCCESS DEV-OPS DEPLOYED!")
                }


            } catch (err) {
                console.error('Error: ', err)
            }
        }

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }


}