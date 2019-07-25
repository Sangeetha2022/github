import { defaultMenuModel } from '../models/defaultmenu.model';
import { Request } from 'express';


export class DefaultMenuDao {

    public getAllMenu(req: Request, callback: CallableFunction) {
        defaultMenuModel.find({}, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }
}