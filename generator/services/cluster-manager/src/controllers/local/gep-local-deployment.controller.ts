
import { Request, Response, response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';
import * as yaml from 'js-yaml';
import * as kubernetes from 'kubernetes-client';
import { exec } from 'child_process';
import * as deployConfig from '../../config/config.json';
import { AppPodService } from '../../services/local/gep.service';

let appPodService = new AppPodService();

//const Destination = deployConfig.LOCAL.DESTINATION_URL;
const Source = path.resolve(__dirname, deployConfig.LOCAL.TEMPLATE_URL);

const Client = require("kubernetes-client").Client;
const config = require("kubernetes-client").config;

export class GeppettoLocalDeploymentController {

    public async ReDeploymentLocal(req: Request, res: Response) {

        var projectDetails = req.body
        console.log("projectDetails", projectDetails)
        projectDetails.templateUrl = Source;
        console.log("projectDetails.templateUrl", projectDetails.templateUrl)
        const delay = ms => new Promise(res => setTimeout(res, ms));

        if (projectDetails.app_pod) {
            appPodService.app_pod(projectDetails, (response) => { });
        }

        if (projectDetails.generater_pod) {
            appPodService.generator_pod(projectDetails, (response) => { });
        }

        if (projectDetails.system_entry_pod) {
            appPodService.system_entry_pod(projectDetails, (response) => { });
        }

        res.send({ "status": "redeployment requested!" });
    }
}
