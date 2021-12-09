import { Response, response } from 'express';
import { GCAMScreenSupportWorker } from '../Supportworker/GCAMScreenSupportWorker';
import * as generate from 'nanoid/generate';
import * as dictionary from 'nanoid-dictionary';
let gcamscreensupport = new GCAMScreenSupportWorker();
export class GCAMWorkerFile {

    private screenarray = [];
    private screenarr = [];


    public GcamScreenJson(screens, generationpath, templatepath, callback) {
        let screensjson = JSON.parse(screens);
        let menu = screensjson.body;
        this.screenarr = [];
        console.log('-------menu---nnnnn--', menu[0].menu_option);
        console.log('-------language---nnnnn--', menu[0].language);
        if (menu.length > 0) {
            menu.forEach(element => {
                if (element.menu_option === true && element.language === 'English') {
                    console.log('---foreach--menu--nnnn--', element);
                    element.menuDetails.forEach(element2 => {
                        const screendetails = element2.screenmenu;
                        screendetails.forEach(element3 => {
                            console.log('screens----nnnn--', element3.description);
                            const screendescription = element3.name;
                            screendescription.screen.forEach(element4 => {
                                console.log('eachj descriptions are -nnnn---  ', element4);
                                var screenobj = { resources: element4, role: "User" }
                                this.screenarr.push(screenobj);
                            });
                        });
                    });
                }
            });
        }
        console.log("screenarr------------->", this.screenarr)
        this.screenarray = [];
        this.screenarr.forEach(screen => {
            console.log('test a elememt screen', screen);
            if(screen.resources !== 'admin' && screen.resources !== 'authorization' 
            && screen.resources !== 'manageroles' && screen.resources !== 'home' 
            && screen.resources !== 'manageusers' && screen.resources !== 'sefscreen' && screen.resources !== 'login'
            && screen.resources !== 'logout'){
                this.screenarray.push({ resources: `${screen.resources}`, role: `${screen.role.toLowerCase()}` },);
            }
        });
        console.log('get all data from screenarray', this.screenarray);
        gcamscreensupport.gcamScreenSupportWorker(this.screenarray, generationpath, templatepath, (response) => {
            callback(response);
        })
    }
}