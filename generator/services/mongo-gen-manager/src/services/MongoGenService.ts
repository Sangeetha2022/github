import { Request } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { MongoWorker } from '../worker/MongoWorker';
import { Common } from '../config/Common';

export class MongoGenService {
    mongoWorker = new MongoWorker();

    public async createProjectModel(req: Request, callback: CallableFunction) {
        const details = req.body;
        const schemaInfo = [];
        const srcPath = `${details.projectGenerationPath}/src`;
        const modelPath = `${srcPath}/models`;
        const templatePath = details.templateLocation.mongoTemplate;
        console.log('backend create project values are -----  ', details);
        // this.createFolder(srcPath);
        // this.createFolder(modelPath);
        Common.createFolders(srcPath);
        Common.createFolders(modelPath);
        asyncLoop(details.entities, (entityElement, entityNext) => {
            if (entityElement === undefined) {
                entityNext();
            } else {
                this.mongoWorker.createProjectModel(entityElement, modelPath, templatePath, (data) => {
                    schemaInfo.push(data);
                    entityNext();
                })
            }
        }, (err) => {
            if (err) {

            } else {
                callback(schemaInfo);
            }
        })

    }
}