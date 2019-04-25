import { Request } from 'express';
import { MenuBuilderDao } from '../daos/menubuilder.dao';

let menuBuilderDao = new MenuBuilderDao()

export class MenuBuilderService {

    public addMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.addMenu(req, (project) => {
            callback(project)
        })
    }

    public getAllMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.getAllMenu(req, (project) => {
            callback(project)
        })
    }

    public getMenuById(req: Request, callback: CallableFunction) {
        menuBuilderDao.getMenuById(req, (project) => {
            callback(project)
        })
    }

    public updateMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.updateMenu(req, (project) => {
            callback(project)
        })
    }

    public deleteMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.deleteMenu(req, (project) => {
            callback(project)
        })
    }

    public getMenuByProjectId(req: Request, callback: CallableFunction) {
        const userId = req.params.id;
        menuBuilderDao.getMenuByProjectId(userId, (project) => {
            callback(project);
        })
    }

}