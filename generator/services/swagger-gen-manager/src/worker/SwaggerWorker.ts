


import * as util from 'util';
import { SwaggerSupportWorker } from '../supportworker/SwaggerSupportWorker';
import { response } from 'express';

export class SwaggerWorker {

    SwaggerSupportWorker = new SwaggerSupportWorker();

    createSwagger(swaggerDetails, swaggerPath, templatePath, callback) {
        const servers = swaggerDetails.servers;
        const tags = swaggerDetails.tags;
        const swaggerPaths =swaggerDetails.paths;
        const details = swaggerDetails.details;
        // const components = this.componentObject(swaggerDetails.components);
        this.SwaggerSupportWorker.createSwagger(details, servers, tags, swaggerPaths,
            swaggerDetails.components, swaggerPath, templatePath,  (response) => {
            callback(response);
        })
    }
}