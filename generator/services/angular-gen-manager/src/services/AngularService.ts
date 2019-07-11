import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import {
    MenuManagerService,
} from '../apiservices/index';
import { GenerateHtmlWorker } from '../worker/GenerateHtmlWorker';

let generateHtmlWorker = new GenerateHtmlWorker();
export class AngularService {
    constructor() {
    }
    async createAngularProject(req: Request, callback: CallableFunction) {

        console.log('create angular project value are ----- ', util.inspect(req.body, { showHidden: true, depth: null }));
        callback();
        const details = req.body;
        // console.log('create angular html metadata ---@#$$$$-11---    ', req.body.desktop.length);
        // console.log('create angular html metadata ---@#$$$$-json-22--    ', JSON.parse(req.body.desktop[0]['gjs-components'][0]));

        const temp = JSON.parse(req.body.desktop[0]['gjs-components'][0]);
        console.log('create angular html metadata ---@#$$$$--full temp--    ', temp);
        generateHtmlWorker.generateHtml(temp, details);
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

