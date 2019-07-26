import { Request, response } from 'express';
import { MenuBuilderDao } from '../daos/menubuilder.dao';
import { DefaultMenuDao } from '../daos/defaultmenu.dao';

let menuBuilderDao = new MenuBuilderDao();
let defaultMenuDao = new DefaultMenuDao()

export class DefaultMenuService {

    private projectId = '';
    private primaryLanguage = '';
    private secondaryLanguage = '';

    public createDefaultMenu(req: Request, callback: CallableFunction) {
        this.projectId = req.query.projectId;
        this.primaryLanguage = req.query.primaryLanguage;
        this.secondaryLanguage = req.query.secondaryLanguage;
        defaultMenuDao.getAllMenu(req, (response) => {
            // callback(response)
            console.log('get all default menus are ---   ', response);
            response.forEach(menuElement => {
                console.log('elemnet -------  ', menuElement.toObject());
                console.log('elemnet keys ---------  ', Object.keys(menuElement.toObject()));
                const menuKeys = Object.keys(menuElement.toObject());
                menuKeys.forEach(elementKey => {
                    if (elementKey != '_id') {
                        this.insertMenu(elementKey, menuElement, callback);
                    }
                })
            })
        })
        callback({ Message: 'default menus are successfully added' });
    }

    public async insertMenu(key, element, callback) {
        // console.log('insert menyu keys are ------ ', key);
        // console.log('insert menyu keys are ----typeof-- ', typeof (key));
        const elementKey = "" + key;
        // console.log('insert menyu keys are ----typeof-- ', typeof (key));
        console.log('insert menyu keys are ----typeof-- ', elementKey.toString().toLowerCase() == this.primaryLanguage.toString().toLowerCase() ? true : false);
        console.log('insert menyu keys are ----elementKey-- ', elementKey.toString().toLowerCase());
        console.log('insert menyu keys are ----primaryLanguage-- ', this.primaryLanguage.toString().toLowerCase());
        const temp = {
            menu_option: elementKey.toString().toLowerCase() == this.primaryLanguage.toString().toLowerCase() ? true : false,
            language: `${elementKey.charAt(0).toUpperCase() + elementKey.slice(1).toLowerCase()}`,
            project: this.projectId,
            project_languages: [
                this.primaryLanguage,
                this.secondaryLanguage
            ],
            menuDetails: [
                {
                    screenmenu: [
                        {
                            name: {
                                screen: [
                                    element[key]
                                ]
                            },
                            description: {
                                screen: [
                                    element[key]
                                ]
                            }
                        }
                    ]
                }
            ],
        }
        return menuBuilderDao.addMenu(temp, (response) => { })
    }
}