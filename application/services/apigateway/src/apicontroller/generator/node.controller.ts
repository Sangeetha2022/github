import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class NodeController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/node/project').post(this.createProjectNode);
        this.router.route('/node/apigateway/project').post(this.generateApiGateway);
    }

    createProjectNode(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.nodeGenUrl}/node/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    generateApiGateway(req: Request, res: Response) {
        console.log('node services apigateway -----   ');
        new ApiAdaptar().post(
            `${Constants.nodeGenUrl}/node/apigateway/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}