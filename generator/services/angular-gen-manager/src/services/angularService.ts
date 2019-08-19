import { Request, response } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { GenerateHtmlWorker } from '../worker/generateHtmlWorker';

let generateHtmlWorker = new GenerateHtmlWorker();
export class AngularService {
    constructor() {
    }
    async createAngularProject(req: Request, callback: CallableFunction) {

        console.log('create angular project value are ----- ', util.inspect(req.body, { showHidden: true, depth: null }));
        const details = req.body;
        // console.log('create angular html metadata ---@#$$$$-11---    ', req.body.desktop.length);
        // console.log('create angular html metadata ---@#$$$$-json-22--    ', JSON.parse(req.body.desktop[0]['gjs-components'][0]));
        // more desktop screens in one features
        // const temp = JSON.parse(req.body.desktop[0]['gjs-components'][0]);
        // console.log('create angular html metadata ---@#$$$$--full temp--    ', details.desktop[0].screenName);
        // details.desktop.forEach((featureScreenElement, index) => {
        //     console.log('screen name ----  ', featureScreenElement.screenName);
        //     console.log('screen css ----  ', featureScreenElement['gjs-css']);
        //     generateHtmlWorker.generate(JSON.parse(featureScreenElement['gjs-components'][0]), featureScreenElement['gjs-css'], featureScreenElement, featureScreenElement.screenName, details, (response) => {
        //         console.log('angular service  response are -----  ', response);
        //         if (index == details.desktop.length - 1) {
        //             generateHtmlWorker.modifyDependency(details, (response) => {
        //                 callback(response);
        //             })
        //         }
        //     });
        // })
        asyncLoop(details.desktop, (featureScreenElement, next) => {
            generateHtmlWorker.generate(JSON.parse(featureScreenElement['gjs-components'][0]), featureScreenElement['gjs-css'], featureScreenElement, featureScreenElement.screenName, details, (response) => {
                next();
            });
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                generateHtmlWorker.modifyDependency(details, (response) => {
                    // callback(response);
                    callback({ Message: 'feature screens are generated successfully' });
                })
                // console.log({ Message: 'feature screens are generated successfully' });
            }
        })
        // generateHtmlWorker.generate(temp, details.desktop[0], details.desktop[0].screenName, details, (response) => {
        //     console.log('angular service  response are 0-----  ', response);
        //     callback(response);
        // });
        // console.log('create angular html metadata ---@#$$$$--33--    ', temp.length);
        // console.log('create angular html metadata ---@#$$$$--44--    ', temp[0]);

        // console.log('has own property in classes are -11-- ', temp[0].hasOwnProperty('classes'))
        // console.log('has own property in traits are -22-- ', temp[0].hasOwnProperty('traits'))
        // console.log('has own property in attributes are -2222-- ', temp[0].hasOwnProperty('attributes'))
        // console.log('has own property in components are -33-- ', temp[0].hasOwnProperty('components'))

        // let menuDetails = await this.getMenuByProjectId('330044c0-82c3-11e9-b9fc-5fd84bbf02f0')
        // let menuData = JSON.parse(menuDetails.toString()).body;
        // // console.log('=======================', util.inspect(menuData[0].menuDetails[0].screenmenu[0], { showHidden: true, depth: null }))
        // let projectGenerationPath = '../../originalcode/'
        // let templateLocation = '../../template'
        // let routeObj = menuData[0].menuDetails[0].screenmenu[0];
        // routeWorker.generateRouteFile(projectGenerationPath, templateLocation, routeObj);
    }



    // getMenuByProjectId(projectId) {
    //     return new Promise(resolve => {
    //         this.menuManagerService.getMenuByProjectId(projectId, (data) => {
    //             resolve(data);
    //         })
    //     });
    // }
}

