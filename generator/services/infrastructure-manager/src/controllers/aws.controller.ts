
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as deployConfig from '../config/config.json';
import { AppService } from '../services/app.service';
import { SystemEntryService } from '../services/system-entry.service';
import { TelemetryService } from '../services/telemetry.service';
import { NamespaceService } from '../services/app.namespace';
import {TerraformService} from '../services/terraform.service';
import {DevOpsService} from '../services/dev-ops.service';
import {DockerService} from '../services/docker.service';
import { IPAService } from '../services/ios.service';
import { AndroidService } from '../services/android.service';
//import InfrastructureDto from '../dto/infrastructure.dto';


let namespaceService = new NamespaceService()
let appService = new AppService()
let systemEntryService = new SystemEntryService()
let telemetryService = new TelemetryService()
let terraformService = new TerraformService()
let devOpsService = new DevOpsService()
let dockerService = new DockerService()
let ipaService = new IPAService()
let androidService = new AndroidService()
//let infrastructureDto = new InfrastructureDto()


//aws
const DestinationAWS = deployConfig.AWS.DESTINATION_URL;
const SourceAWS = path.resolve(__dirname, deployConfig.AWS.TEMPLATE_URL);



export class AWSInfrastructureController {



  public generateInfrastructureAWS(req: Request, res: Response) {

    var projectDetails = req.body
    projectDetails.project = projectDetails.project_name+ "-" + projectDetails.user_id.substring(0, 5);
    projectDetails.project_lowercase = projectDetails.project.toLowercase();


    //create project folder if not exists
    let projectFolder = DestinationAWS + projectDetails.project;
    if (!fs.existsSync(projectFolder)) {
      fs.mkdirSync(projectFolder);
    }
    let deploymentFolder = projectFolder + "/deployment";
    if (!fs.existsSync(deploymentFolder)) {
      fs.mkdirSync(deploymentFolder);
    }
    let envFolder = deploymentFolder + "/aws";
    if (!fs.existsSync(envFolder)) {
      fs.mkdirSync(envFolder);
    }


    projectDetails.destinationUrl = envFolder;
    projectDetails.templateUrl = SourceAWS;


    //app namsespace
    namespaceService.generate_namespace(projectDetails, (response) => {
      //res.send(200);
    })


    //terraform for aws
    terraformService.generate_aws_terraform(projectDetails, (response) => {
        if (response.status === "success") {
        }
    })



    //app db
    if (projectDetails.app_db_pod) {
      appService.generate_app_db_pod(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //app node service
    if (projectDetails.app_pod) {
      appService.generate_app_pod(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //app ui
    if (projectDetails.system_entry_pod) {
      systemEntryService.generate_system_entry_pod(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //telemetry vault
    if (projectDetails.telemetry_pod.vault) {
      telemetryService.generate_telemetry_pod_vault(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //telemetry logging EFK
    if (projectDetails.telemetry_pod.EFK) {
      telemetryService.generate_telemetry_pod_EFK(projectDetails, (response) => {
        //res.send(200);
      })
    }


    //dev-ops db
    if (projectDetails.dev_ops_db_pod) {
      devOpsService.generate_devops_db(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //dev-ops
    if (projectDetails.dev_ops_pod) {
      devOpsService.generate_devops(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //generate script for system entry pod image
    if (projectDetails.system_entry_pod) {
      dockerService.generate_build_script_system_entry_pod(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //generate script for app pod image
    if (projectDetails.app_pod) {
      dockerService.generate_build_script_app_pod(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //generate script for ios build
    if (projectDetails.ios_build) {
      ipaService.generate_build_script_ios(projectDetails, (response) => {
        //res.send(200);
      })
    }

     //generate script for android build
     if (projectDetails.android_build) {
      androidService.generate_build_script_android(projectDetails, (response) => {
        //res.send(200);
      })
    }


    res.send("Success!");

  }


}