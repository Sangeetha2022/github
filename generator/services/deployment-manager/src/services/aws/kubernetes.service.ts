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

let devOpsService = new DevOpsService();


const kubeConfigpath = deployConfig.KUBECONFIG.YAML;
const K8sConfig = kubernetes.config;
const Client = kubernetes.Client1_10;

const Source = path.resolve(__dirname, deployConfig.AWS.DESTINATION_URL);


export class KubernetesService {




    public async connectRancher(projectDetails, callback: CallableFunction) {


        this.getRancherAccessKey(projectDetails, (response) => {
            if (response.status == "success") {
                projectDetails.apiKey = response.data;
                this.getRancherClusterId(projectDetails, (response) => {
                    let clusterData = response.data;
                    projectDetails.clusterId = clusterData.id;
                    this.initKubernetes(projectDetails, (response) => {

                    })
                })
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
            body: { username: "admin", password: "*******" },
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

        const projectNameYaml = "/" + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5) + ".yaml"

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

            fs.writeFile(kubeConfigpath + projectNameYaml, body.config, function (err) {
                if (err) throw err;
                console.log('Kube Config generated!!')
                initKubernetes();
            })
            if (error) { console.log("error :" + error); }
        });


        function initKubernetes() {
            const config = K8sConfig.fromKubeconfig(kubeConfigpath + projectNameYaml)
            config.insecureSkipTlsVerify = true;
            const client = new Client({ config: config, version: '1.9' });

            //starts to deploy
            devOpsService.dev_ops_db_pod(projectDetails, client, (response) => { })
        }


        // kubctl api connect
        // function getAllNamespaces(client) {
        //     client.api.v1.namespaces.get().then((res, err) => {
        //         console.log("response------------------->", res.body.items);
        //         if (err) { console.log("err------------------->", err); }
        //     });

        // }



    }

}
