import { Request } from 'express';
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
            try {
                if (entityElement === undefined) {
                    entityNext();
                } else {
                    this.mongoWorker.createProjectModel(entityElement, modelPath, templatePath, (data) => {
                        schemaInfo.push(data);
                        entityNext();
                    })
                }
            } catch (error) {
                return callback('Something went wrong in Mongo Generation MicroServices');
            }
        }, (err) => {
            if (err) {

            } else {
                callback(schemaInfo);
            }
        })

    }
}