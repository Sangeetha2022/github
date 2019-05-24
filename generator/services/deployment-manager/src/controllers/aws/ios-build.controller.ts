
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

//const Source = path.resolve(__dirname, deployConfig.AWS.TEMPLATE_URL);

const Destination = deployConfig.AWS.DESTINATION_URL;

import { RancherService } from '../../services/aws/rancher.service';
import { KubernetesService } from '../../services/aws/kubernetes.service';
import { AsyncResource } from 'async_hooks';
import {IPAService } from '../../services/aws/ios-build.service';

let ipaService = new IPAService()
let kubernetesService = new KubernetesService()

export class IPAController {


    public async generateIPA(req: Request, res: Response) {

        var projectDetails = req.body


        let projectName = projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5)
        projectDetails.destinationUrl = Destination + projectName + '/deployment/aws/mobile';
    
        const delay = ms => new Promise(res => setTimeout(res, ms));

         
         ipaService.build_ipa(projectDetails, (response) => {
            console.log("response-------->", response);
         })


        res.send({ "status": "ipa generation requested!" });
    }
}
