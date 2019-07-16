import * as util from 'util';
import { ScreenSupportWorker } from '../Supportworker/ScreenSupportWorker';
export class ScreenWorker {

    screensupportfile = new ScreenSupportWorker();

    createfile(menuobject, generationpath, templatepath, callback) {
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
                // console.log('-----menu----', element.menuDetails); 
                element.menuDetails.forEach(element2 => {
                    const screendetails = element2.screenmenu;
                    screendetails.forEach(element3 => {
                        // console.log('screens------',element3.description);
                        const screendescription = element3.description;
                        screendescription.screen.forEach(element4 => {
                            // console.log('-------screen----', typeof element4); 
                            screensname.push(element4);
                            // console.log('------screen----', screensname);
                        });
                    });
                });
            });
        } else {
            console.log('----else part----');
            screensname = ['Landing', 'admin'];
        }
        return screensname;
    }

}