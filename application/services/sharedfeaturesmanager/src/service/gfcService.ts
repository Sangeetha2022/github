import { Request, Response } from 'express';
import { gfcDao } from '../dao/gfcDao';
import { CustomLogger } from '../config/Logger';
import * as jwt from 'jsonwebtoken';
let gfc = new gfcDao();

export class gfcService {

    constructor() { }

    public gepfeatureConfDelete(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureConfDelete')
        let gfcId = req.params.id;
        gfc.gepfeatureConfDelete(gfcId, (response) => {
            new CustomLogger().showLogger('info', 'Exit from gfcService.ts: gepfeatureConfDelete')
            callback(response);
        });
    }

    public gepfeatureConfGetAllValues(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureConfGetAllValues')

        gfc.gepfeatureConfGetAllValues((response) => {
            new CustomLogger().showLogger('info', 'Exit from gfcService.ts: gepfeatureConfGetAllValues')
            callback(response);
        });
    }

    public gepfeatureConfCreate(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureConfCreate')
        let gfcData = req.body;
        gfc.gepfeatureConfCreate(gfcData, (response) => {
            new CustomLogger().showLogger('info', 'Exit from gfcService.ts: gepfeatureConfCreate')
            callback(response);
        });
    }

    public gepfeatureConfUpdate(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureConfUpdate')
        let gfcData = req.body;
        gfc.gepfeatureConfUpdate(gfcData, (response) => {
            new CustomLogger().showLogger('info', 'Exit from gfcService.ts: gepfeatureConfUpdate')
            callback(response);
        });
    }

    public gepfeatureConfSearch(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureConfSearch')
        let gfcData = req.query;
        gfc.gepfeatureConfSearch(gfcData, (response) => {
            new CustomLogger().showLogger('info', 'Exit from gfcService.ts: gepfeatureConfSearch')
            callback(response);
        });
    }

    public gepfeatureConfSearchForUpdate(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureConfSearchForUpdate')
        let gfcData = req.body;
        gfc.gepfeatureConfSearchForUpdate(gfcData, (response) => {
            new CustomLogger().showLogger('info', 'Exit from gfcService.ts: gepfeatureConfSearchForUpdate')
            callback(response);
        });
    }

    public gepfeatureConfGetNounById(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into gfcService.ts: gepfeatureConfGetNounById')
        let gfcId = req.params.id;
        gfc.gepfeatureConfGetNounById(gfcId, (response) => {
            new CustomLogger().showLogger('info', 'Exit from gfcService.ts: gepfeatureConfGetNounById')
            callback(response);
        });
    }




}