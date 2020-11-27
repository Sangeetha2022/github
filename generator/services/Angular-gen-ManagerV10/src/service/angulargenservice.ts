import { Request, response } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { GenerateHtmlWorker } from '../worker/generateHTMLWorker';

let generateHtmlWorker = new GenerateHtmlWorker();
export class AngularService {
    constructor() {
    }
    async createAngularProject(req: Request, callback: CallableFunction) {

        const details = req.body;
        const primaryScreens = details.desktop.filter(x => x.route_info.length > 0 || x["special-events"].length > 0);
        const secondaryScreens = details.desktop.filter(x => x.route_info.length == 0 && x["special-events"].length == 0);
        this.iterateScreens(primaryScreens, details, (response) => {
            this.iterateScreens(secondaryScreens, details, (response) => {
                // generateHtmlWorker.modifyDependency(details, (response) => {
                //     callback({ Message: 'feature screens are generated successfully' });
                // })
            })
        });
    }

    iterateScreens(screenInfo, details, callback) {
        asyncLoop(screenInfo, (featureScreenElement, next) => {
            if (featureScreenElement) {
                console.log('feature  element data------------>>', featureScreenElement);
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

