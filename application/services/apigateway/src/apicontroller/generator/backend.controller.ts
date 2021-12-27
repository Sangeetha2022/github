import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';

export class BackendController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/backend/project').post(this.createProject);
        this.router.route('/backend/apigateway/project').post(this.generateApiGateway);
    }

    public async createProject(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdapter().post(
                `${Constants.backendGenUrl}/backend/project`, req.body));
            res.send(response);
        } catch (err) {
            console.log('project code generation error ----  ', err);
            res.send(err);
        }
    }

    public async generateApiGateway(req: Request, res: Response) {
        try {
            console.log('backend services apigateway -----   ');
            let response = await Promise.resolve(new ApiAdapter().post(
                `${Constants.backendGenUrl}/backend/apigateway/project`, req.body));
            res.send(response);
        } catch (err) {
            console.log('project code generation error ----  ', err);
            res.send(err);
        }
    }

}