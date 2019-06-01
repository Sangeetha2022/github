import { Request } from 'mongoose';
import * as fs from 'fs';
import { ApiAdaptar } from '../config/ApiAdaptar';
import * as util from 'util';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { MongoGenManagerService } from '../apiservices/MongoGenManagerService';

export class DataStoreService {

    mongoService = new MongoGenManagerService();

    public async createProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        if(details.serverLanguage.name === 'Node.js' &&
        details.serverFramework.name === 'Express') {
            const mongo = await this.getMongo(details);
            callback(mongo);
        }
    }


    getMongo(details) {
        return new Promise(resolve => {
            this.mongoService.getMongo(details, (data) => {
                resolve(data);
            })
        })
    }

}