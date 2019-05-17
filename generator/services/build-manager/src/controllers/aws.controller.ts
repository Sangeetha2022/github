
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as deployConfig from '../config/config.json';

import { DockerService } from '../services/docker.service';
//import InfrastructureDto from '../dto/infrastructure.dto';


let dockerService = new DockerService()
//let infrastructureDto = new InfrastructureDto()

//local
const Destination = deployConfig.AWS.DESTINATION_URL;
const Source = path.resolve(__dirname, deployConfig.AWS.TEMPLATE_URL);


export class AWSBuildController {



  public generateBuildAWS(req: Request, res: Response) {

    var projectDetails = req.body


    //create project folder if not exists
    let projectFolder = Destination + projectDetails.project_name + "_" + projectDetails.user_id.substring(0, 5);
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
    projectDetails.templateUrl = Source;
    projectDetails.projectUrl = projectFolder;



    //trigger build for system entry pod image
    if (projectDetails.system_entry_pod) {
      dockerService.build_system_entry_pod(projectDetails, (response) => {
        //res.send(200);
      })
    }

    //trigger build for app pod image
    if (projectDetails.app_pod) {
      dockerService.build_app_pod(projectDetails, (response) => {
        //res.send(200);
      })
    }


    res.send({ "status": "building docker images started!" });

  }


}