import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import * as deployConfig from "../../config/config.json";
import { AppService } from "../../services/local/app.service";
import { SystemEntryService } from "../../services/local/system-entry.service";
import { TelemetryService } from "../../services/local/telemetry.service";
import { DevOpsService } from "../../services/local/dev-ops.service";
import DeploymentDto from "../../dto/deployment.dto";

let appService = new AppService();
let systemEntryService = new SystemEntryService();
let telemetryService = new TelemetryService();
let devopsService = new DevOpsService();

const Client = require("kubernetes-client").Client;
const config = require("kubernetes-client").config;

const Destination = deployConfig.LOCAL.DESTINATION_URL;

const Source = path.resolve(__dirname, deployConfig.LOCAL.TEMPLATE_URL);

export class DeploymentController {
  public generateDeploymentLocal(req: Request, res: Response) {
    var projectDetails = req.body;

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

    devopsService.deploy_dev_ops_pod(projectDetails, response => {
      res.send(200);
    });
  }
}
