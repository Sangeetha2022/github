import { Request, Response } from 'express';
// import { gfcDao } from '../dao/gfcDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
import * as ncp from 'ncp';
import * as fs from 'fs';
import * as path from 'path';
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
            this.gfcGenFiles.featureServicePath = path.resolve(__dirname, `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/services/${serverlang}`+ '/');
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.servicesPath}`+ '/');
        } else if(gfcData.serverlanguage === 'python'){
            let serverlang = 'python'
            this.gfcGenFiles.featureServicePath = path.resolve(__dirname, `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/services/${serverlang}`+ '/');
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.servicesPath}`+ '/');
        }
        // this.gfcGenFiles.featureServicePath = path.resolve(__dirname, `/geppetto/template/seed/sharedfeatures/${gfcData.feature}/services/node/`);
        // this.gfcGenFiles.featureFolderPath = path.resolve(__dirname, '../../testing/services/');
        
        ncp.limit = 16;
        console.log("sharedFeatureService--->",this.gfcGenFiles.featureServicePath);
        console.log("sharedFeatureService--->",this.gfcGenFiles.featureGenFolderPath);

        await ncp(this.gfcGenFiles.featureServicePath, this.gfcGenFiles.featureFolderPath, { clobber: false }, async (err) => {
            console.log("sharedFeatureService-->",this.gfcGenFiles.featureServicePath);
            console.log("sharedFeatureService-->",this.gfcGenFiles.featureGenFolderPath);
            if (err) {
                console.error('---error occured in the ncp of sharedFeatureService----', err);
            }
            console.log('shared feature service');
            
        });

    }
}