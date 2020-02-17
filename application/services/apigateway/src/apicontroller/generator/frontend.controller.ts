import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class FrontendController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/frontend/project').post(this.frontendProject);
        this.router.route('/frontend/template/project').post(this.frontendTemplateProject);
        this.router.route('/frontend/template/ionic').post(this.frontendIonicTemplateProject);
    }

    frontendProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.frontendGenUrl}/frontend/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    frontendTemplateProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.frontendGenUrl}/frontend/template/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    frontendIonicTemplateProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.frontendGenUrl}/frontend/template/ionic`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }
}