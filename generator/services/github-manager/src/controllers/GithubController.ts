
import { Request, Response } from 'express';
import { GitHubService } from '../services/GithubService';

let githubService = new GitHubService()

export class ProjectController {

    public deployToSourceRepositories(req: Request, res: Response) {
        githubService.checkIfRepoExist(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}