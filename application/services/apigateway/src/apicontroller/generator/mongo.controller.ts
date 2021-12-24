import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';

export class MongoController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/mongoose/project').post(this.createProject);
    }

    createProject(req: Request, res: Response) {
        new ApiAdapter().post(
            `${Constants.mongoGenUrl}/mongoose/project`,
            req.body
        ).then((response) => {
            console.log('create mongoose response are ------  ', response);
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}