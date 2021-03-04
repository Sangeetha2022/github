
import { Request, Response } from 'express';
import { PrivateGitHubService } from '../services/PrivateGithubService';

let privategithubService = new PrivateGitHubService()

export class ProjectController {

    public deployToSourceRepositories(req: Request, res: Response) {
        privategithubService.checkIfRepoExist(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}