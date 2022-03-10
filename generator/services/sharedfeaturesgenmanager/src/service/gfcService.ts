import { Request, Response } from 'express';
// import { gfcDao } from '../dao/gfcDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
import * as ncp from 'ncp';
// let gepfeatureconfig = new gfcDao();

export class gfcService {

    constructor() { }

    // public createGepFeatures(req: Request, callback) {
    //     new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureconfig')
    //     let gfcData = req.body;
    //     gepfeatureconfig.createGepFeatures(gfcData, (response) => {
    //         new CustomLogger().showLogger('info', 'Exit from gfcService.ts: GpCreate')
    //         callback(response);
    //     });
    // }

    public gfcGenFiles: any = {
        featureClientPath: '',
        featureServicePath: ''
    }

    public async createGepFeatures(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureconfig')
        let gfcData = req.body;
        // const screens = await this.getMenubuilder();
        // console.log('-----screens-----', screens);
        
        this.gfcGenFiles.featureClientPath = '';
        this.gfcGenFiles.featureServicePath = '';
        
        ncp.limit = 16;
        console.log("fluentdService--->",this.gfcGenFiles.featureClientPath);
        console.log("fluentdService--->",this.gfcGenFiles.featureServicePath);

        // await ncp(this.authGenFiles.fluentdPath, this.authGenFiles.fluentdFolder, { clobber: false }, async (err) => {
        //     console.log("fluentd-->",this.authGenFiles.fluentdPath);
        //     console.log("fluentd-->",this.authGenFiles.fluentdFolder);
        //     if (err) {
        //         console.error('---error occured in the ncp of fluentd----', err);
        //     }
        // });

        // await ncp(this.authGenFiles.fluentdPath, this.authGenFiles.fluentdFolder, { clobber: false }, async (err) => {
        //     console.log("fluentd-->",this.authGenFiles.fluentdPath);
        //     console.log("fluentd-->",this.authGenFiles.fluentdFolder);
        //     if (err) {
        //         console.error('---error occured in the ncp of fluentd----', err);
        //     }
        // });

    }
}