
import { Request, Response } from 'mongoose';
import { CodeGenerationService } from '../services/codeGenerationService';

let codeService = new CodeGenerationService();

export class CodeGenerationController {

    public createProject(req: Request, res: Response) {
        console.log('coder serbvice in controller ---- ', codeService)
        codeService.createProject(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}