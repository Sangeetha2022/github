import { defaultMenuModel } from './models/defaultmenu.model';
import { menus } from './assets/defaultMenus';

export class SeedService {

    constructor() { }

    public create(): void {
        menus.map(element => {
            defaultMenuModel.findOneAndUpdate({ _id: element._id },
                element, { new: true }, (err, data) => {
                    if (data === null) {
                        let defaultMenu = new defaultMenuModel(element);
                        defaultMenu.save();
                    }
                })
        })
    }
}
