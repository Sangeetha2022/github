import { Request, NextFunction } from 'express';
import { ProjectgenDao } from '../daos/projectgen.dao';

let projectgenDao = new ProjectgenDao()

export class ProjectgenService {

    public saveProjectgen(req: Request, callback: CallableFunction) {
        const projectgen = req.body;
        projectgenDao.saveProjectgen(projectgen, (response) => {
            callback(response);
            // if(response.status==="gen_requested"){
            //     this.startGenerate(response);
            // }
        })
    }

    public getProjectgenByProjectId(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.getProjectgenByProjectId(req, next, (projectgen) => {
            callback(projectgen);
        })
    }

    public getProjectgenByUserId(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.getProjectgenByUserId(req, next, (projectgen) => {
            callback(projectgen);
        })
    }


    public getAllProjectgen(req: Request, callback: CallableFunction) {
        projectgenDao.getAllProjectgen(req, (projectgen) => {
            callback(projectgen);
        })
    }

    public getProjectgenByID(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.getProjectgenByID(req, next, (projectgen) => {
            callback(projectgen);
        })
    }

    public deleteProjectgen(req: Request, next: NextFunction, callback: CallableFunction) {
        const projectgenID = req.params.id;
        projectgenDao.deleteProjectgen(projectgenID, next, (response) => {
            callback(response);
        })
    }

    public updateProjectgen(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.updateProjectgen(req, next, (response) => {
            callback(response);
        })
    }


}