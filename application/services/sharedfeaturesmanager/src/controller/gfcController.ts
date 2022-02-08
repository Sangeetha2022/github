import { Request, Response } from 'express';
import { gfcService } from '../service/gfcService';
import { CustomLogger } from '../config/Logger'
let gfc = new gfcService();

export class gfcController {

    constructor() { }

    public gepfeatureConfDelete(req: Request, res: Response) {
        gfc.gepfeatureConfDelete(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: gepfeatureConfDelete');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: gepfeatureConfDelete');
        })
    }
    public gepfeatureConfGetAllValues(req: Request, res: Response) {
        gfc.gepfeatureConfGetAllValues(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: gepfeatureConfGetAllValues');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: gepfeatureConfGetAllValues');
        })
    }
    public gepfeatureConfCreate(req: Request, res: Response) {
        gfc.gepfeatureConfCreate(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: gepfeatureConfCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: gepfeatureConfCreate');
        })
    }
    public gepfeatureConfUpdate(req: Request, res: Response) {
        gfc.gepfeatureConfUpdate(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: gepfeatureConfUpdate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: gepfeatureConfUpdate');
        })
    }
    public gepfeatureConfSearch(req: Request, res: Response) {
        gfc.gepfeatureConfSearch(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: gepfeatureConfSearch');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: gepfeatureConfSearch');
        })
    }
    public gepfeatureConfSearchForUpdate(req: Request, res: Response) {
        gfc.gepfeatureConfSearchForUpdate(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: gepfeatureConfSearchForUpdate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: gepfeatureConfSearchForUpdate');
        })
    }
    public gepfeatureConfGetNounById(req: Request, res: Response) {
        gfc.gepfeatureConfGetNounById(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: gepfeatureConfGetNounById');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: gepfeatureConfGetNounById');
        })
    }


}