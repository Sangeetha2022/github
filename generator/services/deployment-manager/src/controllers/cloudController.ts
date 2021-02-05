
import { Request, Response } from 'express';
import { CloudService } from '../services/cloudservice';

let cloudservice = new CloudService();

export class DeploymentManager {

    public generate_deployment(req: Request, res: Response) {
        // console.log("Calling the generate_deployment --->>>>", req.body)
        // console.log("Calling the deploymentType --->>>>", req.body.deploymentType)
        // console.log("Calling the deploymentType fo label --->>>>", req.body.deploymentType.label)
        cloudservice.createProject(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}