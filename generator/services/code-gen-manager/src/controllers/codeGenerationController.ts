
import { Request, Response } from 'mongoose';
import { CodeGenerationService } from '../services/codeGenerationService';

let codeService = new CodeGenerationService();

export class CodeGenerationController {

    public createProjectCode(req: Request, res: Response) {
        console.log('coder serbvice in controller ---- ', codeService)
        codeService.createProjectCode(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}