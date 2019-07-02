import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { exec } from 'child_process';
import * as fs from 'fs';
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

        // console.log(util.inspect(menuData), { showHidden: true, depth: null, color: true })

        let htmlData = JSON.stringify(menuData[0]['gjs-html']);
        htmlData = htmlData.replace(/\\/g, "");
        let cssData = JSON.stringify(menuData[0]['gjs-css']);
        let stylesData = JSON.stringify(menuData[0]['gjs-styles']);
        let headerData = htmlData.match(/<\s*header[^>]*>(.*?)<\s*\/header>/g);
        let footerData = htmlData.match(/<\s*footer[^>]*>(.*?)<\s*\/footer>/g);
        let projectGenerationPath = '../../originalcode/'
        let frontendGenPath = './originalcode/'
        let templateLocation = '../../template'
        let projectName = "billing";
        await this.createFolders(frontendGenPath)
        await exec(`cd ${frontendGenPath} && ng new ${projectName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            if (stdout) {
                let headerObj = {
                    name: { lower: "header", upper: "Header" },
                    html: headerData
                };
                let footerObj = {
                    name: { lower: "footer", upper: "Footer" },
                    html: footerData
                };
                let cssObj = {
                    name: { lower: "header", upper: "Header" },
                    css: cssData
                }
                cssWorker.generateRouteFile(projectGenerationPath, templateLocation, cssObj);

                if (headerObj) {
                    htmlWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
                    componentWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
                    specWorker.generateRouteFile(projectGenerationPath, templateLocation, headerObj);
                }
                if (footerObj) {
                    htmlWorker.generateRouteFile(projectGenerationPath, templateLocation, footerObj);
                    componentWorker.generateRouteFile(projectGenerationPath, templateLocation, footerObj);
                    specWorker.generateRouteFile(projectGenerationPath, templateLocation, footerObj);

                }
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        })
    }


    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };


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

