
import { Request, Response } from 'express';
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

let rancherService = new RancherService()
let kubernetesService = new KubernetesService()

export class AWSDeploymentController {






    public generateDeploymentAWS(req: Request, res: Response) {

        var projectDetails = req.body
        projectDetails.templateUrl = Source;

        //Get document, or throw exception on error
        //var doc = yaml.safeLoad(fs.readFileSync('test.yaml', 'utf8'));



        // rancherService.create_aws_nodes(projectDetails, (response) => {
        //     if (response.status == "success") {
        //         projectDetails.rancherHost = response.data;
        //         kubernetesService.initKubernetes(projectDetails, (response) => {
        //             console.log("response-------->", response);
        //         })
        //     } else {

        //     }
        // })

        projectDetails.rancherHost = "https://54.84.232.129";
        kubernetesService.connectRancher(projectDetails, (response) => {
            console.log("response-------->", response);
        })





        res.send({ "status": "deployment requested!" });
    }
}
