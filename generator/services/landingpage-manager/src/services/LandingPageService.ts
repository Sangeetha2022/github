import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import {
    MenuManagerService,
    ScreenManagerService,
} from '../apiservices/index';
import { RouteWorker } from '../worker/RouteWorker';

let routeWorker = new RouteWorker();
export class LandingPageService {
    private menuManagerService = new MenuManagerService();
    private screenManagerService = new ScreenManagerService();
    constructor() {
    }
    async getLandingPage(req: Request, callback: CallableFunction) {
        let projectId = req.params.projecId;
        let menuDetails = await this.getScreenByProjectId(projectId)
        let menuData = JSON.parse(menuDetails.toString()).body;
        let data = JSON.stringify(menuData[0]['gjs-html']);
        let headerData = data.match(/<\s*header[^>]*>(.*?)<\s*\/header>/g);
        let sectionData = data.match(/<\s*section[^>]*>(.*?)<\s*\/section>/g);
        let footerData = data.match(/<\s*footer[^>]*>(.*?)<\s*\/footer>/g);
        // console.log('===========================', data)
        console.log('=========================== header', headerData)
        console.log('=========================== footer', footerData)

        console.log('======================= section ', sectionData)
        // console.log('=======================', util.inspect(menuData[0], { showHidden: true, depth: null }))

    }


    getMenuByProjectId(projectId) {
        return new Promise(resolve => {
            this.menuManagerService.getMenuByProjectId(projectId, (data) => {
                resolve(data);
            })
        });
    }

    getScreenByProjectId(projectId) {
        return new Promise(resolve => {
            this.screenManagerService.getScreenByProjectId(projectId, (data) => {
                resolve(data);
            })
        });
    }
}

