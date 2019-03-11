
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as deployConfig from '../../config/config.json';
import { AppService } from '../../services/local/app.service';
import { SystemEntryService } from '../../services/local/system-entry.service';
import { TelemetryService } from '../../services/local/telemetry.service';
import { DevOpsService } from '../../services/local/dev-ops.service';
import DeploymentDto from '../../dto/deployment.dto'
//import InfrastructureDto from '../dto/infrastructure.dto';

let appService = new AppService()
let systemEntryService = new SystemEntryService()
let telemetryService = new TelemetryService()
let devopsService = new DevOpsService()
//let infrastructureDto = new InfrastructureDto()


const Destination = deployConfig.LOCAL.DESTINATION_URL;

const Source = path.resolve(__dirname, deployConfig.LOCAL.TEMPLATE_URL);

export class DeploymentController {

  public generateDeploymentLocal(req: Request, res: Response) {

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


    // app db
    // if (projectDetails.app_db_pod) {
    //   appService.deploy_app_db_pod(projectDetails, (response) => {
    //     res.send(200);
    //   })
    // }

//     //app node service
//     if (projectDetails.app_pod) {
//       appService.generate_app_pod(projectDetails, (response) => {
//         //res.send(200);
//       })
//     }

    // app ui
    if (projectDetails.system_entry_pod) {
      systemEntryService.deploy_system_entry_pod(projectDetails, (response) => {
        res.send(200);
      })
    }

    //telemetry vault
    if (projectDetails.telemetry_pod.vault) {
      telemetryService.deploy_telemetry_entry_pod(projectDetails, (response) => {
        res.send(200);
      })
    }

    //telemetry logging EFK
    // if (projectDetails.telemetry_pod.EFK) {
    //   telemetryService.deploy_telemetry_entry_pod(projectDetails, (response) => {
    //     res.send(200);
    //   })
    // }

//     //dev-ops db
//     if (projectDetails.dev_ops_db_pod) {
//     }

//     //dev-ops
    if (projectDetails.dev_ops_pod) {
         devopsService.deploy_dev_ops_pod(projectDetails, (response) => {
         res.send(200);
    })
  }

//     res.send("Success!");
//   }
}
}
