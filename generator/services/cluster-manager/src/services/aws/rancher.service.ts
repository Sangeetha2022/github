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

export class RancherService {




    public create_aws_nodes(projectDetails, callback: CallableFunction) {


        let directryCmd = "cd " + terraformPlugin;
        let terraformInitCmd = "terraform init";
        let terraformCmd = "terraform apply -auto-approve";
        let rawData = null
        let rancherHost = null;
        let projectFolder = projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5)
        let filePath = Source + "/" + projectFolder + terraformPath;


        fsextra.copySync(filePath, './aws/terraform.tfvars');

        // init aws plugin
        console.log("running terraform...")
        exec(directryCmd + ' && ' + terraformInitCmd, function (error, stdout, stderr) {

            if (stderr) {
                callback({ "status": "failed", "data": "Error accured while initializing aws plugin!" });
            }
            else {
                if (stdout) {
                    // create  nodes in aws
                    console.log("creating nodes please wait...")
                    exec(directryCmd + ' && ' + terraformCmd, function (error, stdout, stderr) {
                        if (stderr) {
                            callback({ "status": "failed", "data": "Error accured Access Key or Seceret Key may be incorrect!" });
                        }
                        else {
                            if (stdout) {
                                rawData = stdout;
                                rancherHost = rawData.toString().split('rancher-url =')[1].replace("[", '').replace("]", '').replace(/\s/g,'');
                                console.log("nodes created!");
                                callback({ "status": "success", "data": rancherHost.replace('[0m','') });
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

    public get_existing_rancherHost(projectDetails, callback: CallableFunction) {
       
        let rancherHost2 = "https://54.84.232.129";
        callback({ "status": "success", "data":rancherHost2 });

    }

    public created_test(projectDetails, callback: CallableFunction) {
       
        let rancherHost2 = "https://54.84.232.129";
        callback({ "status": "success", "data":rancherHost2 });

    }

}
