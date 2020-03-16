import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
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

    createProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.backendGenUrl}/backend/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            console.log('project code generation error ----  ', err);
            res.send(err);
        });
    }

    generateApiGateway(req: Request, res: Response) {
        console.log('backend services apigateway -----   ');
        new ApiAdaptar().post(
            `${Constants.backendGenUrl}/backend/apigateway/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            console.log('project code generation error ----  ', err);
            res.send(err);
        });
    }

}