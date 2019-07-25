import { Request, Response } from 'express';
import { DefaultMenuService } from '../services/defaultmenu.service';

let defaultMenuService = new DefaultMenuService()

export class DefaultMenuController {

    public createDefaultMenu(req: Request, res: Response) {
        defaultMenuService.createDefaultMenu(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }


}