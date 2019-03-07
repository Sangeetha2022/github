import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const yaml = require('js-yaml');


export class DevOpsService {

    public deploy_dev_ops_pod(projectDetails, callback: CallableFunction) {

        try {
            var deploymentManifest = yaml.safeLoad(fs.readFileSync('/Users/10decoders/Desktop/geppetto-new/dev-ops/dev-ops-deployment.yaml', 'utf8'));
            console.log("deploymentManifest", JSON.stringify(deploymentManifest));
        } catch (e) {
            console.log(e);
        }
        
        async function applyDeploy() {
            const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })
            try {
        
                //get the namespaces
                const namespaces = await client.api.v1.namespaces.get()
                console.log('Namespaces: ', JSON.stringify(namespaces));
        
                //create a new deployment
                const createDeployment = await client.apis.extensions.v1beta1.namespaces('default').deployments.post({ body: deploymentManifest })
                console.log('CreateDeployment: ', createDeployment)
        
                //fetch the deployment we created
                const deployment = await client.apis.extensions.v1beta1.namespaces('default').deployments(deploymentManifest.metadata.name).get()
                console.log('Deployment: ', deployment)
        
                // //remove the deployment we created
                // const removed = await client.apis.extensions.v1beta1.namespaces('default').deployments(deploymentManifest.metadata.name).delete()
                // console.log('Removed: ', removed)
            } catch (err) {
                console.error('Error: ', err)
            }
        }
        applyDeploy()    
    }

    public deploy_dev_ops_db_pod(projectDetails, callback: CallableFunction) {

        try {
            var deploymentManifest = yaml.safeLoad(fs.readFileSync('/Users/10decoders/Desktop/geppetto-new/dev-ops-db/dev-ops-db-deployment.yaml', 'utf8'));
            console.log("deploymentManifest", JSON.stringify(deploymentManifest));
        } catch (e) {
            console.log(e);
        }
        
        async function applyDeploy() {
            const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })
            try {
        
                //create a new deployment
                const createDeployment = await client.apis.extensions.v1beta1.namespaces('default').deployments.post({ body: deploymentManifest })
                console.log('CreateDeployment: ', createDeployment)
        
                //fetch the deployment we created
                const deployment = await client.apis.extensions.v1beta1.namespaces('default').deployments(deploymentManifest.metadata.name).get()
                console.log('Deployment: ', deployment)
        
                // //remove the deployment we created
                // const removed = await client.apis.extensions.v1beta1.namespaces('default').deployments(deploymentManifest.metadata.name).delete()
                // console.log('Removed: ', removed)
            } catch (err) {
                console.error('Error: ', err)
            }
        }
        applyDeploy()    
    }
    }