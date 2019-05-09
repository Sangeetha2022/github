import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';
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

public telemetry_EFK(projectDetails, callback: CallableFunction) {

    projectDetails.yamlSource = Destination + "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + "/deployment/local"

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

            //deploy elasticsearch pv
            let elsaticPvManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/elasticsearch-pv.yaml', 'utf8'));
            const pvData = await client.api.v1.pv.post({ body: elsaticPvManifest });
            console.log("pvData", pvData)
            await delay(5000);

            //deploy elasticsearch pvc
            let elsaticPvcManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/elasticsearch-pvc.yaml', 'utf8'));
            const pvcData = await client.api.v1.namespaces(projectDetails.logNamespace).pvc.post({ body: elsaticPvcManifest });
            console.log("pvcData", pvcData)
            await delay(5000);

            //deploy elasticsearch statefulset
            let elasticStatefulsetManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/elasticsearch_statefulset.yaml', 'utf8'));
            const elasticStatefulsetVaultData = await client.apis.apps.v1.namespaces(projectDetails.logNamespace).statefulset.post({ body: elasticStatefulsetManifest });
            console.log("elasticStatefulsetVaultData", elasticStatefulsetVaultData)
            await delay(10000);
            //console.log("deployDevOpsData------>", deployDevOpsData)

            //service for elasticsearch
            let elasticsearchServiceManifest = yaml.safeLoad(fs.readFileSync(loggingYaml + '/elasticsearch_svc.yaml', 'utf8'));
            const elasticsearchserviceData = await client.api.v1.namespaces(projectDetails.logNamespace).service.post({ body: elasticsearchServiceManifest });
            console.log("elasticsearchserviceData", elasticsearchserviceData)
            await delay(5000);

            deployFluentd();

            // if (serviceData.statusCode == 201) {
            //     // move to next pods...
            //     console.log("SUCCESS TELEMETRY VAULT-PROMETHUES DEPLOYED!");
            // }

        } catch (err) {
            console.error('Error: ', err)
        }
    }


    async function deployFluentd() {
        try {

            const projectNameYaml = "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + ".yaml"

            var fluentdManifest = fs.readFileSync(loggingYaml + '/fluentd.yaml', 'utf8')
            var fluentdManifestArr = fluentdManifest.split('\n')

            // fluentd service account 
            var ServiceAccountArr = fluentdManifestArr.splice(0, 7);
            var ServiceAccountManifest = yaml.safeLoad(ServiceAccountArr.join('\n'));
            console.log('ServiceAccountManifest--------->', ServiceAccountManifest)
            const ServiceAccountData = await client.api.v1.namespaces(projectDetails.logNamespace).serviceaccount.post({ body: ServiceAccountManifest });
            console.log("ServiceAccountData", JSON.stringify(ServiceAccountData))
            await delay(5000);

            //fluentd clusterRole 
            var ClusterRoleArr = fluentdManifestArr.splice(1, 16);
            var ClusterRoleManifest = yaml.safeLoad(ClusterRoleArr.join('\n'));
            console.log('ClusterRoleManifest--------->', ClusterRoleManifest)
            const CluserRoleData = await client.apis['rbac.authorization.k8s.io'].v1.clusterroles.post({ body: ClusterRoleManifest });
            console.log("CluserRoleData", CluserRoleData)
            await delay(10000);

            // fluentd clusterRoleBinding 
            var ClusterRoleBindingArr = fluentdManifestArr.splice(2, 12);
            var ClusterRoleBindingManifest = yaml.safeLoad(ClusterRoleBindingArr.join('\n'));
            console.log('ClusterRoleBindingManifest--------->', ClusterRoleBindingManifest)
            const CluserRoleBindingData = await client.apis['rbac.authorization.k8s.io'].v1.clusterrolebindings.post({ body: ClusterRoleBindingManifest });
            console.log("CluserRoleBindingData", CluserRoleBindingData)
            await delay(10000);

            // //fluentd DaemonSet 
            var DaemonSetArr = fluentdManifestArr.splice(3, 56);
            var DaemonSetManifest = yaml.safeLoad(DaemonSetArr.join('\n'));
            console.log('DaemonSetManifest--------->', DaemonSetManifest)
            const DaemonSetBindingData = await client.apis.apps.v1.namespaces(projectDetails.logNamespace).daemonset.post({ body: DaemonSetManifest });
            console.log("DaemonSetBindingData", DaemonSetBindingData)
            await delay(10000);
            deployKibana();

        } catch (err) {
            console.error('Error: ', err)
        }
    }

    async function deployKibana() {
        try {

            var kibanaManifest = fs.readFileSync(loggingYaml + '/kibana.yaml', 'utf8')
            var kibanaManifestArr = kibanaManifest.split('\n')

            //kibana service
            var kibanaService = kibanaManifestArr.splice(0, 13);
            var kibanaServiceManifest = yaml.safeLoad(kibanaService.join('\n'));
            const kibanaServiceData = await client.api.v1.namespaces(projectDetails.logNamespace).service.post({ body: kibanaServiceManifest });
            console.log('kibanaServiceData--------->', kibanaServiceData)

            //kibana deployment
            var kibanaDeployment = kibanaManifestArr.splice(1, 30);
            var kibanaDeploymentManifest = yaml.safeLoad(kibanaDeployment.join('\n'));
            console.log('kibanaDeploymentManifest--------->', kibanaDeploymentManifest)
            const deployDbData = await client.apis.apps.v1.namespaces(projectDetails.logNamespace).deployments.post({ body: kibanaDeploymentManifest });
            await delay(5000);
            console.log('EFK DEPLOYED SUCCESSFULLY');


        } catch (err) {
            console.error('Error: ', err)
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

}
}


