import { Request, response } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { GenerateHtmlWorker } from '../worker/generateHTMLWorker';

const generateHtmlWorker = new GenerateHtmlWorker();

export class SefService {
    constructor() {
    }
    async createSefProject(req: Request, callback: CallableFunction) {

        const details = req.body;
        console.log('details ===================+>>>>', details);
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

