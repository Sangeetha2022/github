import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class SefNodeController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/sefnode/project').post(this.createProjectSefNode);
        this.router.route('/sefnode/apigateway/project').post(this.generateApiGateway);
    }

    createProjectSefNode(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.sefnodeGenUrl}/sefnode/project`,
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
            `${Constants.sefnodeGenUrl}/sefnode/apigateway/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}