import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import { ComponentWorker } from '../worker/ComponentWorker';
import { DependencyWorker } from '../worker/DependencyWorker';
import { CommonWorker } from '../worker/CommonWorker';

let commonWorker = new CommonWorker();
let componentWorker = new ComponentWorker();
let dependencyWorker = new DependencyWorker();

export class AngularTemplateService {

    private iterateData: any[] = [];
    private exec = childProcess.exec;
    private CLIENT_FOLDERNAME = 'client';
    private DESKTOP_FOLDERNAME = 'client';
    private details = null;
    private generationPath = '';
    private templatePath = '';
    private grapesjsCSS = '';
    private menuDetails = '';
    private apigatewayPortNumber = 0;

    initalizeDaoVariable() {

    }

    public createAngularTemplate(req: Request, callback: CallableFunction) {

        this.details = req.body;
        const grapesjsComponent = this.details.template[0]['gjs-components'][0];
        this.grapesjsCSS = this.details.template[0]['gjs-css'];
        this.menuDetails = this.details.menuBuilder[0].menuDetails;
        this.apigatewayPortNumber = this.details.apigatewayPortNumber;
        
        console.log('entering into create angular template in services ----  ', util.inspect(this.details, { showHidden: true, depth: null }));
        console.log('entering into grapejsCSSSSSSSSS --yes--  ', this.grapesjsCSS.indexOf(`home.jpg`));
        console.log('entering into grapejsCSSSSSSSSS --no--  ', this.grapesjsCSS.indexOf(`hometest.jpg`));
        this.generationPath = `${this.details.projectGenerationPath}/${this.CLIENT_FOLDERNAME}`;
        Common.createFolders(this.generationPath);
        this.generationPath += `/${this.DESKTOP_FOLDERNAME}`;
        Common.createFolders(this.generationPath);
        this.templatePath = this.details.project.templateLocation.frontendTemplate;
        this.exec(`cd ${this.generationPath} && ng new ${this.details.project.name} --style=scss`, (error, stdout, stderr) => {
            console.log('error exec ----->>>>    ', error);
            console.log('stdout exec ----->>>>    ', stdout);
            console.log('stderr exec ----->>>>    ', stderr);
            if (stdout || stderr) {
                this.iterateData = JSON.parse(grapesjsComponent);
                this.createLandingPage();
                callback('Angular Template Created');
            }
        });
    }

    public createLandingPage() {
        console.log('createLanding page function are ---------  ', this.iterateData);
        console.log('createLanding page function are ----length-----  ', this.iterateData.length);
        if (this.iterateData.length > 0) {
            this.generationPath += `/${this.details.project.name}`;
            var navInfo = this.iterateData.filter(function (element) {
                return element.tagName == 'nav';
            })
            var footerInfo = this.iterateData.filter(function (element) {
                return element.tagName == 'footer';
            })
            var templateInfo = this.iterateData.filter(function (element) {
                return element.tagName != 'nav' && element.tagName != 'footer';
            })
            if (navInfo.length > 0) {
                commonWorker.createHeaderHtml(navInfo, this.menuDetails);
            }
            if (footerInfo.length > 0) {
                commonWorker.createFooterHtml(footerInfo);
            }
            if (templateInfo.length > 0) {
                commonWorker.createTemplateHtml(templateInfo);
            }
            this.generateAngularApp();
        }
    }

    public generateAngularApp() {
        commonWorker.generateAngularTemplate(this.generationPath, this.templatePath, (response) => {
            dependencyWorker.generateAppRoutingFile(this.generationPath, this.templatePath, this.menuDetails, (response) => {
                commonWorker.generateMainFile(this.generationPath, this.templatePath, this.grapesjsCSS, (response) => {

                });
            })
        });
    }
}

