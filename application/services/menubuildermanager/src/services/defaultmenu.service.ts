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
        const elementKey = "" + key;
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
                    featuremenu: [
                        {
                            name: {
                                feature: "default",
                            },
                            description: {
                                feature: "default",
                            }
                        }
                    ],
                    screenmenu: [
                        {
                            name: {
                                screen: element[key]

                            },
                            description: {
                                screen: element[key]
                            }
                        }
                    ]
                }
            ],
        }
        return menuBuilderDao.addMenu(temp, (response) => { })
    }
}