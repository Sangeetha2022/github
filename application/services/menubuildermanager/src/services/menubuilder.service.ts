import { Request } from 'express';
import { MenuBuilderDao } from '../daos/menubuilder.dao';

let menuBuilderDao = new MenuBuilderDao()

export class MenuBuilderService {

    public addMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.addMenu(req, (menuBuilder) => {
            callback(menuBuilder)
        })
    }

    public getAllMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.getAllMenu(req, (menuBuilder) => {
            callback(menuBuilder)
        })
    }

    public getMenuById(req: Request, callback: CallableFunction) {
        menuBuilderDao.getMenuById(req, (menuBuilder) => {
            callback(menuBuilder)
        })
    }

    public updateMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.updateMenu(req, (menuBuilder) => {
            callback(menuBuilder)
        })
    }

    public updateMenuByProjectId(req: Request, callback: CallableFunction) {
        menuBuilderDao.updateMenuByProjectId(req, (menuBuilder) => {
            callback(menuBuilder)
        })
    }

    public deleteMenu(req: Request, callback: CallableFunction) {
        menuBuilderDao.deleteMenu(req, (menuBuilder) => {
            callback(menuBuilder)
        })
    }

    public getMenuByProjectId(req: Request, callback: CallableFunction) {
        const projectId = req.params.projectId;
        menuBuilderDao.getMenuByProjectId(projectId, (menuBuilder) => {
            callback(menuBuilder);
        })
    }

}