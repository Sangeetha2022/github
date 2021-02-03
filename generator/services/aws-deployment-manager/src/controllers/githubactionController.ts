import { Request, Response } from 'express';
import { AwsEc2Instance } from '../services/aws_ec2_instance';
import { Github_Actions_Local } from '../services/aws_ec2_instance_local'
let AWS_EC2_INSTANCE = new AwsEc2Instance();
let GITHUB_ACTIONS_LOCAL = new Github_Actions_Local()
export class githubactionController {

    public generategithubaction(req: Request, res: Response) {
        AWS_EC2_INSTANCE.create_ec2_instance_workflows(req, (response) => {
            res.status(200);
            console.log("Responce----", response)
            res.json(response);
        })
    }
    public generategithubaction_local(req: Request, res: Response) {
        GITHUB_ACTIONS_LOCAL.create_ec2_instance_workflows_local(req, (response) => {
            res.status(200);
            console.log("Responce----", response)
            res.json(response);
        })
    }
}