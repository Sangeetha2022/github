import { Request } from 'mongoose';
import * as fs from 'fs';

export class CodeGenerationService {

    public createProjectCode(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectid;
        const projectDetails = req.body;
        const projectPath = `${projectDetails.projectGenerationPath}/${projectDetails.name}`;
        console.log('create project code rae ----- ', projectId, ' ----- ', projectDetails);
        this.createFolders(projectPath);
        callback('success');
    }

    createFolders(pathElement) {
        if (!fs.existsSync(pathElement)) {
            fs.mkdirSync(pathElement)
        }
    };
}