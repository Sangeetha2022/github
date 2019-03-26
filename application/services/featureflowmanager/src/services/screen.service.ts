import { Request, NextFunction } from 'express';
import { ScreenDao } from '../daos/screen.dao';

let screenDao = new ScreenDao()

export class ScreenService {

    public saveScreen(req: Request, callback: CallableFunction) {
        const flow = req.body;
        screenDao.saveScreen(flow, (response) => {
            callback(response);
        })
    }

    public getAllScreen(req: Request, callback: CallableFunction) {
        screenDao.getAllScreen(req, (flow) => {
            callback(flow);
        })
    }

    public getScreenByID(req: Request, next: NextFunction, callback: CallableFunction) {
        screenDao.getScreenByID(req, next, (flow) => {
            callback(flow);
        })
    }

    public getScreenByFeatureName(req: Request, next: NextFunction, callback: CallableFunction) {
        screenDao.getScreenByFeatureName(req, next, (flow) => {
            callback(flow);
        })
    }

    

    public deleteScreen(req: Request, next: NextFunction, callback: CallableFunction) {
        const flowID = req.params.id;
        screenDao.deleteScreen(flowID, next, (response) => {
            callback(response);
        })
    }

    updateScreen = (req: Request, next: NextFunction, callback: CallableFunction) => {
        screenDao.updateScreen(req, next, (response) => {
            callback(response);
        })
    }
}