import { Request, Response } from 'express';
import{GithubActions} from '../services/github_action'
let githubaction=new GithubActions()
export class githubactionController {

    public generategithubaction(req: Request, res: Response) {
        githubaction.Generate_GithubAction_Live(req, (response) => {
            res.status(200);
            console.log("Responce----", response)
            res.json(response);
        })
    }
    public generategithubaction_local(req: Request, res: Response) {
        githubaction.Generate_GithubAction_Local(req, (response) => {
            res.status(200);
            console.log("Responce----", response)
            res.json(response);
        })
    }
}