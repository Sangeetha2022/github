
import { Request, Response, response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';
import * as yaml from 'js-yaml';
import * as kubernetes from 'kubernetes-client';
import { exec } from 'child_process';
import * as deployConfig from '../../config/config.json';


//const Destination = deployConfig.LOCAL.DESTINATION_URL;
const Source = path.resolve(__dirname, deployConfig.AWS.TEMPLATE_URL);

import { AwsClusterService } from '../../services/aws/aws-cluster.service';
import { AsyncResource } from 'async_hooks';

let awsClusterService = new AwsClusterService()

export class AWSClusterController {


    public async createClusterAWS(req: Request, res: Response) {

        var projectDetails = req.body
        projectDetails.templateUrl = Source;
        const delay = ms => new Promise(res => setTimeout(res, ms));

        awsClusterService.create_aws_cluster(projectDetails, async (response) => {
                if (response.status == "success") {
                    console.log("AWS Cluster Created Successfully!");
                } else {
                    console.log("AWS Cluster Creation Failed!");
                }
            })
        


        res.send({ "status": "Create aws Cluster requested!" });
    }

    public async destroyClusterAWS(req: Request, res: Response) {

        var projectDetails = req.body
        projectDetails.templateUrl = Source;
        const delay = ms => new Promise(res => setTimeout(res, ms));

        awsClusterService.destroy_aws_cluster(projectDetails, async (response) => {
                if (response.status == "success") {
                    console.log("AWS Cluster Destroyed Successfully!");
                } else {
                    console.log("AWS Cluster Destroy Failed!");
                }
            })
        


        res.send({ "status": "Destroy aws Cluster requested!" });
    }


}