import { Request, response } from 'express';
import { Github_Actions_Local } from '../strategy/Github_Action/aws_ec2_instance_local'
import { Github_Actions_Live } from '../strategy/Github_Action/aws_ec2_instance_live'
import { Readme_Githubaction } from '../strategy/Github_Action/readme'
import { Github_Action_Task_Defination } from '../strategy/Github_Action/aws_task_configuration'
import { callbackify } from 'util';
let GithubActionsLocal = new Github_Actions_Local()
let GithubActionsLive = new Github_Actions_Live()
let ReadmeGithubaction = new Readme_Githubaction()
let GithubActionTaskDefination = new Github_Action_Task_Defination()

export class GithubActions {

    public Generate_GithubAction_Live(req: Request, callback: CallableFunction) {
        GithubActionsLive.create_ec2_instance_workflows_live(req, (res) => {
            GithubActionTaskDefination.create_fargate_task_defination(req, (res) => {
                callback({ Message: 'github action for live  are generated successfully' })
            })
        })
    }

    public Generate_GithubAction_Local(req: Request, callback: CallableFunction) {
        GithubActionsLocal.create_ec2_instance_workflows_local(req, (res) => {
            GithubActionTaskDefination.create_fargate_task_defination(req, (res) => {
                ReadmeGithubaction.create_readme(req, (res) => {
                    callback({ Message: 'github action & Readme for local are generated successfully' })
                })
            })
        })
    }
}