
import { Request, Response } from 'express';
import { GitHubService } from '../services/github.service';
import GitHubDto from '../dto/github.dto';

let githubService = new GitHubService()
let gitHubDto = new GitHubDto()

export class ProjectController {

    public deployToSourceRepositories(req: Request, res: Response) {
        const data = {
            username: "",
            password: "",
            url: "http://www.apui.github.com/",
            description: "GitHub"
        }
        gitHubDto.setUsername(data.username)
        gitHubDto.setPassword(data.password)
        gitHubDto.setDescription(data.description)
        gitHubDto.setUrl(data.url)

        githubService.checkIfRepoExist(req, gitHubDto, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

}