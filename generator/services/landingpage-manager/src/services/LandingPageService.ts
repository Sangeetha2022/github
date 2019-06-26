import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import {
    MenuManagerService,
    ScreenManagerService,
} from '../apiservices/index';
import { HtmlWorker } from '../worker/HtmlWorker';
import { ComponentWorker } from '../worker/ComponentWorker';
import { CssWorker } from '../worker/CssWorker';
import { SpecWorker } from '../worker/SpecWorker';

let htmlWorker = new HtmlWorker();
let componentWorker = new ComponentWorker();
let cssWorker = new CssWorker();
let specWorker = new SpecWorker();

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
        let headerObj = {
            name: "header",
            html: headerData
        };
        let footerObj =
        {
            name: "footer",
            html: footerData
        };
        if (headerObj) {
            htmlWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
            componentWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
            cssWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
            specWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
        }
        if (footerObj) {
            htmlWorker.generateRouteFile(projectGenerationPath, templateLocation, footerObj);
            componentWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
            cssWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
            specWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);

        }
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

