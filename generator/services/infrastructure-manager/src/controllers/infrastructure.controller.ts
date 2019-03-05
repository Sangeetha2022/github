
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as deployConfig from '../config/config.json';
import { AppService } from '../services/app.service';
import { SystemEntryService } from '../services/system-entry.service';
import { TelemetryService } from '../services/telemetry.service';
import { NamespaceService } from '../services/app.namespace';
//import InfrastructureDto from '../dto/infrastructure.dto';


let namespaceService = new NamespaceService()
let appService = new AppService()
let systemEntryService = new SystemEntryService()
let telemetryService = new TelemetryService()
//let infrastructureDto = new InfrastructureDto()

//local
const Destination = deployConfig.LOCAL.DESTINATION_URL;
const Source = path.resolve(__dirname, deployConfig.LOCAL.TEMPLATE_URL);

//aws
const DestinationAWS = deployConfig.AWS.DESTINATION_URL;
const SourceAWS = path.resolve(__dirname, deployConfig.AWS.TEMPLATE_URL);



export class InfrastructureController {



  public generateInfrastructureLocal(req: Request, res: Response) {

    var projectDetails = req.body


    //create project folder if not exists
    let projectFolder = Destination + projectDetails.project_name;
    if (!fs.existsSync(projectFolder)) {
      fs.mkdirSync(projectFolder);
    }
    let deploymentFolder = projectFolder + "/deployment";
    if (!fs.existsSync(deploymentFolder)) {
      fs.mkdirSync(deploymentFolder);
    }
    let envFolder = deploymentFolder + "/local";
    if (!fs.existsSync(envFolder)) {
      fs.mkdirSync(envFolder);
    }


    projectDetails.destinationUrl = envFolder;
    projectDetails.templateUrl = Source;

    //app namsespace
    namespaceService.generate_namespace(projectDetails, (response) => {
      //res.send(200);
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

    }


    //dev-ops db
    if (projectDetails.dev_ops_db_pod) {

    }

    //dev-ops
    if (projectDetails.dev_ops_pod) {

    }


    res.send("Success!");

  }



  public generateInfrastructureAWS(req: Request, res: Response) {

    var projectDetails = req.body


    //create project folder if not exists
    let projectFolder = DestinationAWS + projectDetails.project_name;
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

    }


    //dev-ops db
    if (projectDetails.dev_ops_db_pod) {

    }

    //dev-ops
    if (projectDetails.dev_ops_pod) {

    }


    res.send("Success!");

  }


}