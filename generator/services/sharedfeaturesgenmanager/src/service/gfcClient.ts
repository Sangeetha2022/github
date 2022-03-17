import { Request, Response } from 'express';
// import { gfcDao } from '../dao/gfcDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
import * as ncp from 'ncp';
import * as fs from 'fs';
import * as path from 'path';
import * as fsextra from 'fs-extra';
import { SharedFeatureManagerService } from '../apiservices/SharedFeatureManagerService';
import { FeatureSupportWorker } from '../componentworker/featureSupportWorker';
import * as util from 'util';
// let gepfeatureconfig = new gfcDao();

export class gfcClient {

    constructor() { }

    private getFeatureData = new SharedFeatureManagerService();
    private featureservice = new FeatureSupportWorker();

    public gfcGenFiles: any = {
        featureClientPath: '',
        featureGenFolderPath: ''
    }
    public FEATURESERVICES_TS = 'featureservices.ts'
    public FEATURESERVICES_TS_HANDLEBARS = 'featureservices.hbs'
    public async createGepFeaturesClient(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcclient.ts: gepfeatureconfig');
        let gfcData = req.body;
        let listOfFeatureJson:any = {
            arrayData: []
        }


        if(gfcData.webframework.includes('Angular')){
            let framework = 'angular13';
            this.gfcGenFiles.featureClientPath = path.resolve(__dirname,  `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/client/web/${framework}/`);
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.applicationPath}/src/app/`);
        } else if(gfcData.webframework === 'React'){
            let framework = 'react1702';
            this.gfcGenFiles.featureClientPath = path.resolve(__dirname,  `${gfcData.seedPath}/sharedfeatures/${gfcData.feature}/client/web/${framework}/`);
            this.gfcGenFiles.featureGenFolderPath = path.resolve(__dirname, `${gfcData.applicationPath}/src/app/`);
        }
        
        ncp.limit = 16;
        console.log("sharedFeatureClient--->",this.gfcGenFiles.featureClientPath);
        console.log("sharedFeatureClient--->",this.gfcGenFiles.featureGenFolderPath);

        // await ncp(this.gfcGenFiles.featureClientPath, this.gfcGenFiles.featureFolderPath, { clobber: false }, async (err) => {
        //     console.log("sharedFeatureClient-->",this.gfcGenFiles.featureClientPath);
        //     console.log("sharedFeatureClient-->",this.gfcGenFiles.featureGenFolderPath);
        //     if (err) {
        //         console.error('---error occured in the ncp of sharedFeatureClient----', err);
        //     }
        //     console.log('feature generate client');
            
        // });

        fsextra.copy(this.gfcGenFiles.featureClientPath, this.gfcGenFiles.featureGenFolderPath, { overwrite: true }).then((data) => {
            new CustomLogger().showLogger('info', 'Create a generation app client feature ')
            // replace the data into check the feature from shared folder to generated app
        });

        // feature name
        let getfeaturedata = `${gfcData.feature}`;

        await this.getFeatureData.sharedFeatureGenClient(getfeaturedata, async (data) => {

            // data array push into feature
            let temp = JSON.parse(data);
            console.log('demo into the data', temp.body[0]);
            let listFeatureJSON = {
                name: temp.body[0].feature_name,
                component_name: temp.body[0].configuration.admin_ui_feature_component,
                routes: temp.body[0].configuration.admin_ui_entry_point
            }
            listOfFeatureJson.arrayData.push(listFeatureJSON);


            let clientFeatures = await this.clientAdminFeatureServices(listOfFeatureJson, this.gfcGenFiles.featureGenFolderPath, callback);
        });
    }

    public async clientAdminFeatureServices(featureData, generationPath, callback) {
        const applicationPath = generationPath + '';
        const templatePath = path.resolve(__dirname, '../../template');
        console.log('template path to write a file', templatePath);
        this.featureservice.featureSupportWorker(templatePath + '/' + this.FEATURESERVICES_TS_HANDLEBARS, featureData, applicationPath, this.FEATURESERVICES_TS).then(tsData => {
            callback();
        });
    }
}