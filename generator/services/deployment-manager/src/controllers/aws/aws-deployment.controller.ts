
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
let rancherService = new RancherService()

export class AWSDeploymentController {






    public generateDeploymentAWS(req: Request, res: Response) {

        var projectDetails = req.body
        projectDetails.templateUrl = Source;

        //Get document, or throw exception on error
        //var doc = yaml.safeLoad(fs.readFileSync('test.yaml', 'utf8'));


       
          rancherService.create_aws_nodes(projectDetails, (response) => {
                    // console.log("response-------->", response);
                    if(response.status == "success"){
                        // console.log("response-data------->", response.data);
                    }else{}

            })

        res.send({ "status": "deployment requested!" });
    }
}
