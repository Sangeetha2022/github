
import { Request, Response, response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';
import * as yaml from 'js-yaml';
import * as kubernetes from 'kubernetes-client';
import { exec } from 'child_process';
import * as deployConfig from '../../config/config.json';


const kubeConfigpath = deployConfig.KUBECONFIG.YAML;
const K8sConfig = kubernetes.config;
const Client = kubernetes.Client1_10;

//const Destination = deployConfig.LOCAL.DESTINATION_URL;
const Source = path.resolve(__dirname, deployConfig.AWS.TEMPLATE_URL);

import { RancherService } from '../../services/aws/rancher.service';
import { KubernetesService } from '../../services/aws/kubernetes.service';
import { AsyncResource } from 'async_hooks';

let rancherService = new RancherService()
let kubernetesService = new KubernetesService()

export class AWSDeploymentController {






    public async generateDeploymentAWS(req: Request, res: Response) {

        var projectDetails = req.body
        projectDetails.templateUrl = Source;
        const delay = ms => new Promise(res => setTimeout(res, ms));

         //use existing cluster
        if (projectDetails.existing_cluster) {
            rancherService.get_existing_rancherHost(projectDetails, async (response) => {
                if (response.status == "success") {
                    projectDetails.rancherHost = response.data;
                    console.log("rancher host url : " + projectDetails.rancherHost)
                    // console.log("waiting for rancher to be available....");
                    // await delay(60000);
                    // console.log("rancher is up!")
                    kubernetesService.connectRancher(projectDetails, (response) => {
                        //console.log("response-------->", response);
                    })
                } else {
                    console.log("failed in AWS nodes creation!");
                }
            })
        }

        //creating new cluster
        if (!projectDetails.existing_cluster) {
            rancherService.create_aws_nodes(projectDetails, async (response) => {
                if (response.status == "success") {
                    projectDetails.rancherHost = response.data;
                    console.log("rancher host url : " + projectDetails.rancherHost)
                    console.log("waiting for rancher to be available....");
                    await delay(60000);
                    console.log("rancher is up!")
                    kubernetesService.connectRancher(projectDetails, (response) => {
                        //console.log("response-------->", response);
                    })
                } else {
                    console.log("failed in AWS nodes creation!");
                }
            })
        }




        function checkHost(host) {
            return new Promise(resolve => {
                request({
                    uri: host + '/ping', method: "GET", headers: { 'Content-Type': 'text/plain' },
                    rejectUnauthorized: false,
                }, function (error, res, body) {
                    if (body === "pong") { return resolve(true) } if (error) { return resolve(false) }
                })
            });
        }


        res.send({ "status": "deployment requested!" });
    }
}








// rancherService.creat_test(projectDetails, async (response) => {
//     if (response.status == "success") {
//         let hostStatus: any;
//         projectDetails.rancherHost = response.data;
//         console.log("rancher host url : " + projectDetails.rancherHost)
//         for (let i = 0; i < 10; i++) {
//             console.log("checking rancher host....")
//             let check = checkHost(projectDetails.rancherHost);
//             check.then(function (result) {
//                 hostStatus = result;
//             });
//             if (hostStatus) {
//                 console.log("rancher is up!")
//                 kubernetesService.connectRancher(projectDetails, (response) => {
//                     //console.log("response-------->", response);
//                 })
//                 break;
//             }
//             await delay(1000);
//         }
//     } else {
//         console.log("failed in AWS nodes creation!");
//     }
// })