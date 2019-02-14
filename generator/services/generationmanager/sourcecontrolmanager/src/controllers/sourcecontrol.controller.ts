
import { Request, Response } from 'express';
import { SourceControlService } from '../services/sourcecontrol.service';
import SourceControlDto from '../dto/sourcecontrol.dto';

let sourceControlService = new SourceControlService()
let sourceControlDto = new SourceControlDto()

export class ProjectController {

    public deployToSourceRepositories(req: Request, res: Response) {
        const data = {
            username: "tibrahul",
            password: "Rahul6243",
            url: "http://www.apui.github.com/",
            description: "GitHub"
        }
        sourceControlDto.setUsername(data.username)
        sourceControlDto.setPassword(data.password)
        sourceControlDto.setDescription(data.description)
        sourceControlDto.setUrl(data.url)

        sourceControlService.checkIfRepoExist(req, sourceControlDto, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

}