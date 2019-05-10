import { Request } from 'express';
import * as fs from 'fs';
import * as fsextra from 'fs-extra';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';
import { exec } from 'child_process';


const Source = path.resolve(__dirname, deployConfig.AWS.DESTINATION_URL);

const terraformPath = deployConfig.AWS.TERRAFORM_FILE;
const terraformPlugin = deployConfig.AWS.TERRAFORM_AWS_PLUGIN;

export class AwsClusterService {




    public create_aws_cluster(projectDetails, callback: CallableFunction) {


        let directryCmd = "cd " + terraformPlugin;
        let terraformInitCmd = "terraform init";
        let terraformCmd = "terraform apply -auto-approve";
        let rawData = null

        // init aws plugin
        console.log("running terraform...")
        exec(directryCmd + ' && ' + terraformInitCmd, function (error, stdout, stderr) {

            if (stderr) {
                callback({ "status": "failed", "data": "Error accured while initializing aws plugin!" });
            }
            else {
                if (stdout) {
                    // create  nodes in aws
                    console.log("creating cluster please wait it will take a while...")
                    exec(directryCmd + ' && ' + terraformCmd, function (error, stdout, stderr) {
                        if (stderr) {
                            callback({ "status": "failed", "data": "Error accured Access Key or Seceret Key may be incorrect!" });
                        }
                        else {
                            if (stdout) {
                                console.log("Cluster Logs:", stdout);
                                rawData = stdout;
                                console.log("cluster created!");
                                callback({ "status": "success", "data": "None" });
                            }
                        }
                        if (error !== null) {
                            console.log('exec error: ' + error);
                            callback({ "status": "failed", "data": "Error accured in exec!" });
                        }
                    });

                }
            }
            if (error !== null) {
                console.log('exec error: ' + error);
                callback({ "status": "failed", "data": "Error accured in exec!" });
            }
        });



    }


    public destroy_aws_cluster(projectDetails, callback: CallableFunction) {


        let directryCmd = "cd " + terraformPlugin;
        //let terraformInitCmd = "terraform init";
        let terraformCmd = "terraform destroy -auto-approve";
        let rawData = null

        console.log("running terraform...")
        // destroy cluster in aws
        console.log("destroying cluster please wait it will take a will...!")
        exec(directryCmd + ' && ' + terraformCmd, function (error, stdout, stderr) {
            if (stderr) {
                callback({ "status": "failed", "data": "Error accured Access Key or Seceret Key may be incorrect!" });
            }
            else {
                if (stdout) {
                    console.log("Cluster Logs:", stdout);
                    rawData = stdout;
                    console.log("cluster destroyed!");
                    callback({ "status": "success", "data": "None" });
                }
            }
            if (error !== null) {
                console.log('exec error: ' + error);
                callback({ "status": "failed", "data": "Error accured in exec!" });
            }
        });


    }


}
