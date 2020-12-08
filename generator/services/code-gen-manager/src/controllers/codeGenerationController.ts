
import { Request, Response } from 'express';
import { CodeGenerationService } from '../services/codeGenerationService';

let codeService = new CodeGenerationService();

export class CodeGenerationController {

    public createProject(req: Request, res: Response) {
        console.log('coder serbvice in controller ---- ', codeService)
        codeService.createProject(req, (response, status) => {
            console.log('code genetor response are ---- ', response, ' --status-- ', status);
            if (status) {
                res.status(status);
            } else {
                res.status(200);
            }
            res.json(response);
        })
    }
}