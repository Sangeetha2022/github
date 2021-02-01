import { Request, Response } from 'express';
import { aws_ec2_instance } from '../services/aws_ec2_instance';
import { github_actions_local } from '../services/aws_ec2_instance_local'
let AWS_EC2_INSTANCE = new aws_ec2_instance();
let GITHUB_ACTIONS_LOCAL = new github_actions_local()
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