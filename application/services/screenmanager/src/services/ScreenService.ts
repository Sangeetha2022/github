import { Request } from 'express';
import { ScreenDao } from '../daos/ScreenDao';

let screenDao = new ScreenDao();

export class ScreenService {

    public createScreen(req: Request, callback) {
        const template = req.body;
        screenDao.createScreen(template, (response) => {
            callback(response);
        });
    }

    public getAllScreen(req: Request, callback) {
        screenDao.getAllScreen((response) => {
            callback(response);
        });
    }


    public getAllScreenByProjectId(req: Request, callback) {
        screenDao.getAllScreenByProjectId(req,(response) => {
            callback(response);
        });
    }

    public getAllScreenByProjectAndFeatureId(req: Request, callback) {
        screenDao.getAllScreenByProjectAndFeatureId(req,(response) => {
            callback(response);
        });
    }

    public getAllScreenByFeatureId(req: Request, callback) {
        screenDao.getAllScreenByFeatureId(req,(response) => {
            callback(response);
        });
    }
}