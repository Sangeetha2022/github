import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import {
    MenuManagerService,
} from '../apiservices/index';
import { RouteWorker } from '../worker/RouteWorker';

let routeWorker = new RouteWorker();
export class AngularService {
    private menuManagerService = new MenuManagerService();
    constructor() {
    }
    async createAngularProject(req: Request, callback: CallableFunction) {
        let menuDetails = await this.getMenuByProjectId('330044c0-82c3-11e9-b9fc-5fd84bbf02f0')
        let menuData = JSON.parse(menuDetails.toString()).body;
        // console.log('=======================', util.inspect(menuData[0].menuDetails[0].screenmenu[0], { showHidden: true, depth: null }))
        let projectGenerationPath = '../../originalcode/'
        let templateLocation = '../../template'
        let routeObj = menuData[0].menuDetails[0].screenmenu[0];
        routeWorker.generateRouteFile(projectGenerationPath, templateLocation, routeObj);
    }


    getMenuByProjectId(projectId) {
        return new Promise(resolve => {
            this.menuManagerService.getMenuByProjectId(projectId, (data) => {
                resolve(data);
            })
        });
    }
}

