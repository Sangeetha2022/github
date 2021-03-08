import * as util from 'util';
import { ScreenSupportWorker } from '../Supportworker/ScreenSupportWorker';
export class ScreenWorker {

    screensupportfile = new ScreenSupportWorker();

    createfile(menuobject, generationpath, templatepath, callback) {
        console.log('createfile ----->>  ', menuobject);
        let listofscreens = this.ScreenName(menuobject);
        console.log('------screenname----', listofscreens);
        this.screensupportfile.screenfilegenerate(listofscreens, generationpath, templatepath, (response) => {
            callback(response);
        })
    }

    ScreenName(value) {
        let screensname = [];
        let screens = JSON.parse(value);
        let menu = screens.body;
        console.log('-------menu-----', menu.length);
        if (menu.length > 0) {
            menu.forEach(element => {
                console.log('--language--', element.language); 
                if (element.language == 'English'){
                    element.menuDetails.forEach(element2 => {
                        const screendetails = element2.screenmenu;
                        screendetails.forEach(element3 => {
                            const screendescription = element3.name;
                            screendescription.screen.forEach(element4 => {
                                // console.log('-------screen----', typeof element4); 
                                if (element4 !== 'login' && element4 !== 'logout' && element4 !== 'authorization' && element4 !== 'manageroles' && element4 !== 'manageusers'){
                                    screensname.push(element4);
                                    console.log('------screensname----', screensname);
                                }
                            });
                        });
                    });
                }
            });
        } else {
            console.log('----else part----');
            screensname = ['home'];
        }
        return screensname;
    }

}