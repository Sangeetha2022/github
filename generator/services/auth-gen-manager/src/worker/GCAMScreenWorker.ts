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
        if (menu.length > 0) {
            menu.forEach(element => {
                if (element.menu_option === true && element.language === 'English') {
                    element.menuDetails.forEach(element2 => {
                        const screendetails = element2.screenmenu;
                        screendetails.forEach(element3 => {
                            const screendescription = element3.name;
                            screendescription.screen.forEach(element4 => {
                                var screenobj = { resources: element4, role: "user" }
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
            && screen.resources !== 'logout' && screen.resources !== 'managecontrol'){
                this.screenarray.push({ resources: `${screen.resources}`, role: `${screen.role}` },);
            }
        });
        let getResources = {
            arrayData : this.screenarray
        }
        gcamscreensupport.gcamScreenSupportWorker(getResources, generationpath, templatepath, (response) => {
            callback(response);
        })
    }
}