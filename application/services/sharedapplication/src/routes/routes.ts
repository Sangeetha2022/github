import { sharedController } from "../controllers/shared.Controller";
import { Request, Response, NextFunction } from "express";
import * as multer from 'multer';
import * as fs from 'fs';
import * as YAML from 'yamljs'



export class Routes {
    public sharedController: sharedController = new sharedController()

    public routes(app): void {
        app.route('/health/shared-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/shared/getbyproject/:id').get(this.sharedController.getSharedProjectById);
        app.route('/shared/details').post(this.sharedController.create);
        app.route('/shared/upload').post(this.sharedController.upload);
    }
}