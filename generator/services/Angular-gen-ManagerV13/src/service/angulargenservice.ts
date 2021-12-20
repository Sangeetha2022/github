import { Request, response } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { GenerateHtmlWorker } from '../worker/generateHTMLWorker';
import { SefFrontendManagerServices } from '../apiServices/seffrontendmanagerservice';

const generateHtmlWorker = new GenerateHtmlWorker();

export class AngularService {
    constructor() {
    }
    sefFrontendServices = new SefFrontendManagerServices();
    async createAngularProject(req: Request, callback: CallableFunction) {

        const details = req.body;
        //console.log('details ===================+>>>>', details);
        if(details.featureName == 'systementry'){
            console.log('details ===================+>>>>', details);
                // return new Promise(resolve => {
                    const featureName = details.featureName.toLowerCase();
                    console.log('angular generate manager ang gen', details, featureName);
                    this.sefFrontendServices.generateDefaultServices(details, featureName, (data) => {
                        callback({ Message: 'Default feature screens are generated successfully' });
                    })
                // })
        } else {
            console.log("entering else part",details);
            
            const primaryScreens = details.desktop.filter(x => x.route_info.length > 0 || x["special-events"].length > 0);
            const secondaryScreens = details.desktop.filter(x => x.route_info.length == 0 && x["special-events"].length == 0);
            this.iterateScreens(primaryScreens, details, (response) => {
                this.iterateScreens(secondaryScreens, details, (response) => {
                    generateHtmlWorker.modifyDependency(details, (response, err) => {
                        callback({ Message: 'feature screens are generated successfully' });
                    })
                })
            });
            // routeWorker.generateRouteWorker(details , (res , err) => {
                
            // })
            // generateHtmlWorker.generateComponent(details, callback);
        }
        
    }

    iterateScreens(screenInfo, details, callback) {
        console.log(screenInfo.length);
        asyncLoop(screenInfo, 0, screenInfo.length-1, (featureScreenElement, next) => {
            if (featureScreenElement) {
                generateHtmlWorker.generate(featureScreenElement, details, (response) => {
                    next();
                });
            } else {
                next();
            }
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                callback({ Message: 'feature screens are generated successfully' });
            }
        })
    }


}

