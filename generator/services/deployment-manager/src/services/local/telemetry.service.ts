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

export class TelemetryService {

    public telemetry_vault(projectDetails, callback: CallableFunction) {

        projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/local"
        let namespaceYaml = projectDetails.yamlSource + "/namespace";
        let namespaceManifest = yaml.safeLoad(fs.readFileSync(namespaceYaml + '/namespace.yaml', 'utf8'));
        console.log("deployment started...")

        async function createNameSpace() {
            try {
                //create namespace
                const namespaceData = await client.api.v1.namespace.post({ body: namespaceManifest });
                await delay(10000);
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

                let telemetryYaml = projectDetails.yamlSource + "/telemetry-pod";

                //deploy vault and promethuis
                let deployManifest = yaml.safeLoad(fs.readFileSync(telemetryYaml + '/telemetry-deployment.yaml', 'utf8'));
                const deployTelemetyVaultData = await client.apis.extensions.v1beta1.namespaces(projectDetails.namespace).deployments.post({ body: deployManifest });

                //service for vault and promethuis
                let serviceManifest = yaml.safeLoad(fs.readFileSync(telemetryYaml + '/telemetry-service.yaml', 'utf8'));
                const serviceData = await client.api.v1.namespaces(projectDetails.namespace).service.post({ body: serviceManifest });
                if (serviceData.statusCode == 201) {
                    // move to next pods...
                    // console.log("SUCCESS TELEMETRY VAULT-PROMETHUES DEPLOYED!");
                    await delay(5000);
                    loadVaultData()
                }

            } catch (err) {
                console.error('Error: ', err)
            }
        }    

        async function loadVaultData() {
            try {
                await delay(5000);
                const svcData = await client.api.v1.namespaces(projectDetails.namespace).service.get();
                const vaultPort = svcData.body.items[0].spec.ports[0].nodePort
                await delay(5000);
                
                var vaultHost = '';
                var cmd = require('node-command-line'),
                Promise = require('bluebird');

                    try {                        
                        var promise1 = Promise.resolve(cmd.run('minikube ip'));
                        promise1.then(function(value) {
                        vaultHost = value.message.replace(/\n/g, '') 
                      });
                    } catch (err) {
                        console.error('Error: ', err)
                    }
                    await delay(10000);
                
                var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'http://' + vaultHost + ':' + vaultPort, token: 'vault-geppetto-2019' });
                vault.mounts()
                
                    .then(() => vault.mount({ mount_point: 'kv', type: 'generic', description: 'mongo connection string' }))

                    .then(() => vault.write('kv/kuberentes/database/mongo/connection', { mongo_connection_string: 'mongodb://gep-dev-app-db/' + projectDetails.namespace }))
   
                console.log("SUCCESS TELEMETRY VAULT-PROMETHUES DEPLOYED!");

            } catch (err) {
                console.error('Error: ', err)
            }
        }
        
        const delay = ms => new Promise(res => setTimeout(res, ms));

    }
}