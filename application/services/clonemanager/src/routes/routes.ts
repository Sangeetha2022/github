import { cloneController } from "../controllers/clone.Controller";
import { Request, Response, NextFunction } from "express";
import * as multer from 'multer';
import * as fs from 'fs';
import * as YAML from 'yamljs'



export class Routes {
    public cloneController: cloneController = new cloneController()

    public routes(app): void {
        app.route('/health/clone-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/clone/getbyproject/:id/user/:userid').get(this.cloneController.getCloneProjectById);
    }
}