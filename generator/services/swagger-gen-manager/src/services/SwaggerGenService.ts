import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { SwaggerWorker } from '../worker/SwaggerWorker';
import { Common } from '../config/Common';

export class SwaggerGenService {
    swaggerWorker = new SwaggerWorker();

    public async createSwagger(req: Request, callback: CallableFunction) {
        const details = req.body;
        console.log('details---------->>', details);
        const srcPath = `${details.projectPath}/src`;
        const swaggerPath = `${srcPath}/swagger`;
        const templatePath = "../../template";
        Common.createFolders(swaggerPath);
        this.swaggerWorker.createSwagger(details, swaggerPath, templatePath, (data, err) => {
            if (err){
                callback(err);
            } 
            else {
                callback(data);
            }           
        })

    }
}