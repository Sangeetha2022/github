import { Request, Response } from 'express';
// import { gfcDao } from '../dao/gfcDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
import * as ncp from 'ncp';
import * as fs from 'fs';
import * as path from 'path';
// let gepfeatureconfig = new gfcDao();

export class gfcClient {

    constructor() { }

    public gfcGenFiles: any = {
        featureClientPath: '',
        featureGenFolderPath: ''
    }

    public async createGepFeaturesClient(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureconfig')
        let gfcData = req.body;
        if(gfcData.webframework.includes('Angular')){
            this.gfcGenFiles.featureClientPath = path.resolve(__dirname,  `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/client/web/angular13`+'/');
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.applicationPath}/src/app`+ '/');
        } else if(gfcData.webframework === 'React'){
            this.gfcGenFiles.featureClientPath = path.resolve(__dirname,  `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/client/web/react1702` + '/');
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.applicationPath}/src/app`+ '/');
        }
        // this.gfcGenFiles.featureClientPath = path.resolve(__dirname,  `/geppetto/template/seed/sharedfeatures/${gfcData.feature}/client/web/angular13/`);
        // this.gfcGenFiles.featureFolderPath = path.resolve(__dirname, '../../testing/client/');
        
        ncp.limit = 16;
        console.log("sharedFeatureClient--->",this.gfcGenFiles.featureClientPath);
        console.log("sharedFeatureClient--->",this.gfcGenFiles.featureGenFolderPath);

        await ncp(this.gfcGenFiles.featureClientPath, this.gfcGenFiles.featureFolderPath, { clobber: false }, async (err) => {
            console.log("sharedFeatureClient-->",this.gfcGenFiles.featureClientPath);
            console.log("sharedFeatureClient-->",this.gfcGenFiles.featureGenFolderPath);
            if (err) {
                console.error('---error occured in the ncp of sharedFeatureClient----', err);
            }
            console.log('feature generate client');
            
        });
    }
}