import { Request, Response } from 'express';
// import { gfcDao } from '../dao/gfcDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import * as fsextra from 'fs-extra';
// let gepfeatureconfig = new gfcDao();

export class gfcService {

    constructor() { }

    public gfcGenFiles: any = {
        featureServicePath: '',
        featureGenFolderPath: ''
    }

    public async createGepFeaturesServices(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureconfig')
        let gfcData = req.body;
        
        if(gfcData.serverlanguage === 'NodeJS'){
            let serverlang = 'node';
            this.gfcGenFiles.featureServicePath = path.resolve(__dirname, `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/services/${serverlang}/`);
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.servicesPath}/`);
        } else if(gfcData.serverlanguage === 'python'){
            let serverlang = 'python'
            this.gfcGenFiles.featureServicePath = path.resolve(__dirname, `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/services/${serverlang}/`);
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.servicesPath}/`);
        }
        
        // ncp.limit = 16;
        console.log("sharedFeatureService--->",this.gfcGenFiles.featureServicePath);
        console.log("sharedFeatureService--->",this.gfcGenFiles.featureGenFolderPath);

        // await ncp(this.gfcGenFiles.featureServicePath, this.gfcGenFiles.featureFolderPath, { clobber: false }, async (err) => {
        //     console.log("sharedFeatureService-->",this.gfcGenFiles.featureServicePath);
        //     console.log("sharedFeatureService-->",this.gfcGenFiles.featureGenFolderPath);
        //     if (err) {
        //         console.error('---error occured in the ncp of sharedFeatureService----', err);
        //     }
        //     console.log('shared feature service');
            
        // });

        fsextra.copy(this.gfcGenFiles.featureServicePath, this.gfcGenFiles.featureGenFolderPath, { overwrite: true }).then((data) => {
            new CustomLogger().showLogger('info', 'Create a generation file manager');
            // replace the data into check the feature from shared folder to generated app
        });
    }
}