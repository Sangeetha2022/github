import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';

export class SwaggerController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/swagger/create').post(this.createSwagger);
    }

    createSwagger(req: Request, res: Response) {
        console.log(`swagger url---------------->>>> ${Constants.swaggerGenUrl}/swagger/create`);
        new ApiAdapter().post(`${Constants.swaggerGenUrl}/swagger/create`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}