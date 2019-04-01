import {Request} from 'mongoose';


export class CodeGenerationService {

    public createProjectCode(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectid;
        const projectDetails = req.body;
        console.log('create project code rae ----- ', projectId, ' ----- ', projectDetails);
    }
}