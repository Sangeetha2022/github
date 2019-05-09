import { Request } from 'express';
import * as fs from 'fs';
import * as fsextra from 'fs-extra';
import * as path from 'path';
import * as request from 'request';
import * as st from 'stringtemplate-js';
import * as yaml from 'js-yaml';
import * as kubernetes from 'kubernetes-client';
import * as deployConfig from '../../config/config.json';
import { exec } from 'child_process';

import { DevOpsService } from './dev-ops.service';
import { TelemetryService } from './telemetry.service';
import { AppPodService } from './gep.service';

let devOpsService = new DevOpsService();
let telemetryService = new TelemetryService();
let appPodService = new AppPodService();


const kubeConfigpath = deployConfig.KUBECONFIG.YAML;
const K8sConfig = kubernetes.config;
const Client = kubernetes.Client1_10;

const Source = path.resolve(__dirname, deployConfig.AWS.DESTINATION_URL);



export class GepKubernetesService {




    public async connectRancher(projectDetails, callback: CallableFunction) {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        console.log("connecting to rancher...")
        this.getRancherAccessKey(projectDetails, (response) => {
            if (response.status == "success") {
                projectDetails.apiKey = response.data;
                this.getRancherClusterId(projectDetails, async (response) => {
                    let clusterData = response.data;
                    //let clusterState: any;
                    projectDetails.clusterId = clusterData.id;

                    console.log("checking cluster status....")   
                    this.checkClusterState(projectDetails, (response) => {
                        if (response.data === "active") {
                            console.log("cluster is active!")
                            this.initKubernetes(projectDetails, (response) => { })
                        } else { console.log("cluster is not active!") }
                    })

                })
            }

        })

    }


    public async checkClusterState(projectDetails, callback: CallableFunction) {
        request({
            uri: projectDetails.rancherHost + '/v3/clusters?limit=-1&sort=name', method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + projectDetails.apiKey
            }, json: true,
            rejectUnauthorized: false,
        }, function (error, res, body) {
            if (body) {
                callback({ "status": "success", "data": body.data[0].state })
            } if (error) {
                callback({ "status": "error", "data": error })
            }
        })
    }



    public async getRancherAccessKey(projectDetails, callback: CallableFunction) {

        //login to rancher
        request({
            uri: projectDetails.rancherHost + "/v3-public/localProviders/local?action=login",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: { username: "admin", password: "xxxx" },
            json: true,
            rejectUnauthorized: false, //requestCert: true, //agent: false
        }, function (error, res, body) {
            if (body) {
                //generate api key
                request({
                    uri: projectDetails.rancherHost + "/v3/token",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + body.token
                    },
                    json: true,
                    body: { type: "token", description: "automation" },
                    rejectUnauthorized: false, //requestCert: true, //agent: false
                }, function (error, res, body) {
                    if (body) {
                        callback({ "status": "success", "data": body.token })
                    }
                    if (error) {
                        console.log("error :" + error);
                    }
                });

            }
            if (error) {
                console.log("error :" + error);
            }
        });
    }



    public getRancherClusterId(projectDetails, callback: CallableFunction) {

        // get cluster id from rancher
        request({
            uri: projectDetails.rancherHost + "/v3/clusters?limit=-1&sort=name",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + projectDetails.apiKey
            },
            json: true,
            rejectUnauthorized: false, //requestCert: true, //agent: false
        }, function (error, res, body) {
            if (body) {
                callback({ "status": "success", "data": body.data[0] })
            }
            if (error) {
                console.log("error :" + error);
            }
        });

    }


    public initKubernetes(projectDetails, callback: CallableFunction) {

        // configure kubernetes
        let KubeConfigYaml

        if (projectDetails.environment === 'dev') {
            KubeConfigYaml = "gep-dev-kube-config.yaml"
        }
        request({
            uri: projectDetails.rancherHost + `/v3/clusters/${projectDetails.clusterId}?action=generateKubeconfig`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + projectDetails.apiKey
            },
            json: true,
            rejectUnauthorized: false, //requestCert: true, //agent: false
        }, function (error, res, body) {

            fs.writeFile(kubeConfigpath + "/geppetto/" + KubeConfigYaml, body.config, function (err) {
                if (err) throw err;
                console.log('Kube Config for geppetto generated!!')
                initKubernetes();
            })
            if (error) { console.log("error :" + error); }
        });


        async function initKubernetes() {
            const config = K8sConfig.fromKubeconfig(kubeConfigpath + "/geppetto/" + KubeConfigYaml)
            config.insecureSkipTlsVerify = true;
            const client = new Client({ config: config, version: '1.9' });

            //start redeployment



            //App pod
            if (projectDetails.app_pod) {
                appPodService.app_pod(projectDetails, client, (response) => { });
            }

            if (projectDetails.generater_pod) {
                appPodService.generator_pod(projectDetails, client, (response) => { });
            }

            if (projectDetails.system_entry_pod) {
                appPodService.system_entry_pod(projectDetails, client, (response) => { });
            }



        }


        const delay = ms => new Promise(res => setTimeout(res, ms));
    }

}
