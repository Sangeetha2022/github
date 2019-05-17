import { Request, Response } from 'express';
import { MenuBuilderService } from '../services/menubuilder.service';

let menuBuilderService = new MenuBuilderService()

export class MenuBuilderController {

    public addMenu(req: Request, res: Response) {

        menuBuilderService.addMenu(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getAllMenu(req: Request, res: Response) {
        menuBuilderService.getAllMenu(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getMenuById(req: Request, res: Response) {
        menuBuilderService.getMenuById(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public updateMenu(req: Request, res: Response) {
        menuBuilderService.updateMenu(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public updateMenuByProjectId(req: Request, res: Response) {
        menuBuilderService.updateMenuByProjectId(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public deleteMenu(req: Request, res: Response) {
        menuBuilderService.deleteMenu(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getMenuByProjectId(req: Request, res: Response) {
        menuBuilderService.getMenuByProjectId(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

}