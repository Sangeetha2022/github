import { Request, Response } from 'express';
// import { gfcDao } from '../dao/gfcDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
import * as ncp from 'ncp';
import * as fs from 'fs';
import * as path from 'path';
import * as fsextra from 'fs-extra';
// let gepfeatureconfig = new gfcDao();

export class gfcClient {

    constructor() { }

    public gfcGenFiles: any = {
        featureClientPath: '',
        featureGenFolderPath: ''
    }

    public async createGepFeaturesClient(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcclient.ts: gepfeatureconfig')
        let gfcData = req.body;
        if(gfcData.webframework.includes('Angular')){
            console.log('enter into the angular file path');
            let framework = 'angular13';
            this.gfcGenFiles.featureClientPath = path.resolve(__dirname,  `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/client/web/${framework}/`);
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.applicationPath}/src/app/`);
        } else if(gfcData.webframework === 'React'){
            let framework = 'react1702';
            this.gfcGenFiles.featureClientPath = path.resolve(__dirname,  `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/client/web/${framework}/`);
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.applicationPath}/src/app/`);
        }
        
        ncp.limit = 16;
        console.log("sharedFeatureClient--->",this.gfcGenFiles.featureClientPath, typeof this.gfcGenFiles.featureClientPath);
        console.log("sharedFeatureClient--->",this.gfcGenFiles.featureGenFolderPath, typeof this.gfcGenFiles.featureGenFolderPath);

        // await ncp(this.gfcGenFiles.featureClientPath, this.gfcGenFiles.featureFolderPath, { clobber: false }, async (err) => {
        //     console.log("sharedFeatureClient-->",this.gfcGenFiles.featureClientPath);
        //     console.log("sharedFeatureClient-->",this.gfcGenFiles.featureGenFolderPath);
        //     if (err) {
        //         console.error('---error occured in the ncp of sharedFeatureClient----', err);
        //     }
        //     console.log('feature generate client');
            
        // });

        fsextra.copy(this.gfcGenFiles.featureClientPath, this.gfcGenFiles.featureGenFolderPath, { overwrite: true }).then((data) => {
            new CustomLogger().showLogger('info', 'Create a generation client')
            // replace the data into check the feature from shared folder to generated app
        });
    }
}