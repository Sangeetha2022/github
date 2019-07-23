
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as deployConfig from '../config/config.json';
import { AppService } from '../services/app.service';
import { SystemEntryService } from '../services/system-entry.service';
import { TelemetryService } from '../services/telemetry.service';
import { NamespaceService } from '../services/app.namespace';
import { TerraformService } from '../services/terraform.service';
import { DevOpsService } from '../services/dev-ops.service';
import { DockerService } from '../services/docker.service';
import { HelmService } from '../services/helm.service';
//import InfrastructureDto from '../dto/infrastructure.dto';


let namespaceService = new NamespaceService()
let appService = new AppService()
let systemEntryService = new SystemEntryService()
let telemetryService = new TelemetryService()
let terraformService = new TerraformService()
let devOpsService = new DevOpsService()
let dockerService = new DockerService()
//let infrastructureDto = new InfrastructureDto()
let helmService = new HelmService()

//local
const Destination = deployConfig.LOCAL.DESTINATION_URL;
const Source = path.resolve(__dirname, deployConfig.LOCAL.TEMPLATE_URL);
const helmSource = path.resolve(__dirname, deployConfig.HELM_TEMPLATE);


export class LocalInfrastructureController {



  public generateInfrastructureLocal(req: Request, res: Response) {

    var projectDetails = req.body
    //projectDetails.project = projectDetails.project_name+ "-" + projectDetails.user_id.substring(0, 5);
    //projectDetails.project_lowercase = projectDetails.project.toLowerCase();
    projectDetails.project = projectDetails.name;
    projectDetails.project_lowercase = projectDetails.project.toLowerCase();

    //create project folder if not exists
    let projectFolder = projectDetails.projectGenerationPath +"/"+ projectDetails.project;

    if (!fs.existsSync(projectFolder)) {
      fs.mkdirSync(projectFolder);
    }
    let deploymentFolder = projectFolder + "/devops";
    if (!fs.existsSync(deploymentFolder)) {
      fs.mkdirSync(deploymentFolder);
    }
    let envFolder = deploymentFolder + "/local";
    if (!fs.existsSync(envFolder)) {
      fs.mkdirSync(envFolder);
    }


    projectDetails.destinationUrl = envFolder;
    projectDetails.templateUrl = Source;
    projectDetails.projectUrl = projectFolder;

    // //app namsespace
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
      telemetryService.generate_telemetry_pod_EFK(projectDetails, (response) => {
        //res.send(200);
      })
    }


    // //dev-ops db
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


     projectDetails.destinationUrl = deploymentFolder;
    //generate script for local
    if (projectDetails.system_entry_pod) {
      dockerService.generate_build_script_local(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //generate script for cloud
    if (projectDetails.app_pod) {
      dockerService.generate_build_script_cloud(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //generate helm templates
    projectDetails.templateUrl = helmSource;
    helmService.generate_helm_templates(projectDetails, (response) => {
      //res.send(200);
    })


    res.send({ "status": "building infrastructure started!" });

  }


}