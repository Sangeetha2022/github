import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import {
    MenuManagerService,
    ScreenManagerService,
} from '../apiservices/index';
import { HeaderWorker } from '../worker/HeaderWorker';
import { FooterWorker } from '../worker/FooterWorker';

let headerWorker = new HeaderWorker();
let footerWorker = new FooterWorker();
export class LandingPageService {
    private menuManagerService = new MenuManagerService();
    private screenManagerService = new ScreenManagerService();
    constructor() {
    }
    async getLandingPage(req: Request, callback: CallableFunction) {
        let projectId = req.params.projecId;
        let menuDetails = await this.getScreenByProjectId(projectId)
        let menuData = JSON.parse(menuDetails.toString()).body;
        let htmlData = JSON.stringify(menuData[0]['gjs-html']);
        let cssData = JSON.stringify(menuData[0]['gjs-css']);
        let stylesData = JSON.stringify(menuData[0]['gjs-styles']);
        let headerData = htmlData.match(/<\s*header[^>]*>(.*?)<\s*\/header>/g);
        let sectionData = htmlData.match(/<\s*section[^>]*>(.*?)<\s*\/section>/g);
        let footerData = htmlData.match(/<\s*footer[^>]*>(.*?)<\s*\/footer>/g);
        console.log('=========================== header', headerData)
        console.log('=========================== footer', footerData)
        // console.log('=========================== css', cssData)
        // console.log('=========================== styles', stylesData)

        // console.log('======================= section ', sectionData)
        // console.log('=======================', util.inspect(menuData[0], { showHidden: true, depth: null }))
        let projectGenerationPath = '../../originalcode/'
        let templateLocation = '../../template'
        let routeObj = headerData;
        let footerObj = footerData;
        headerWorker.generateRouteFile(projectGenerationPath, templateLocation, routeObj);
        footerWorker.generateRouteFile(projectGenerationPath, templateLocation, footerObj)

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

