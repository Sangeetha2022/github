import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import { ComponentWorker } from '../worker/componentWorker';
import { DependencyWorker } from '../worker/dependencyWorker';
import { CommonWorker } from '../worker/commonWorker';

let commonWorker = new CommonWorker();
let componentWorker = new ComponentWorker();
let dependencyWorker = new DependencyWorker();

export class AngularTemplateService {

    private iterateData: any[] = [];
    private exec = childProcess.exec;
    private details = null;
    private generationPath = '';
    private templatePath = '';
    private grapesjsCSS = '';
    private menuDetails = '';
    private apigatewayPortNumber = 0;
    private sharedObj = {
        className: 'Shared',
        variableName: 'apiGateway',
        protocol: 'http',
        link: 'localhost',
        port: 0
    }
    private projectName = '';

    initalizeDaoVariable() {

    }

    public createAngularTemplate(req: Request, callback: CallableFunction) {

        this.details = req.body;
        console.log('entering into create angular template in services ----  ', util.inspect(this.details, { showHidden: true, depth: null }));
        const grapesjsComponent = this.details.template[0]['gjs-components'][0];
        this.grapesjsCSS = this.details.template[0]['gjs-css'];
        if (this.details.menuBuilder.length > 0) {
            this.menuDetails = this.details.menuBuilder[0].menuDetails;
        }
        this.apigatewayPortNumber = this.details.apigatewayPortNumber;
        this.sharedObj.port = this.apigatewayPortNumber;
        this.details.project.name.split(" ").forEach((element, index) => {
            console.log('each foldername are ---------  ', element, '  --indx---  ', index);
            if (index === 0) {
                this.projectName = element;
            } else {
                this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
            }
        })
        // console.log('entering into grapejsCSSSSSSSSS --yes--  ', this.grapesjsCSS.indexOf(`home.jpg`));
        // console.log('entering into grapejsCSSSSSSSSS --no--  ', this.grapesjsCSS.indexOf(`hometest.jpg`));
        this.generationPath = this.details.projectGenerationPath;
        console.log('generation path in angular template are -------- ', this.generationPath);
        Common.createFolders(this.generationPath);
        this.templatePath = this.details.project.templateLocation.frontendTemplate;
        this.exec(`cd ${this.generationPath.replace(/\s+/g, '\\ ')} && ng new ${this.projectName} --routing=false --style=scss --skip-install`, (error, stdout, stderr) => {
            // console.log('error exec ----->>>>    ', error);
            // console.log('stdout exec ----->>>>    ', stdout);
            // console.log('stderr exec ----->>>>    ', stderr);
            if (stdout || stderr) {
                // this.iterateData = grapesjsComponent;
                this.iterateData = JSON.parse(grapesjsComponent);
                // console.log('iterateData filter are -----  ', this.iterateData);
                this.createLandingPage();
                this.generateAngularApp((response) => {
                    // console.log('after await completed')
                    const temp = {
                        shared: {
                            className: this.sharedObj.className,
                            variableName: this.sharedObj.variableName,
                        },
                        applicationPath: this.generationPath
                    }
                    callback(temp);
                });
                console.log('after done all the workers');
            }
        });
    }

    public createLandingPage() {
        if (this.iterateData.length > 0) {
            console.log('iteratedata lengtha are ------- ', this.iterateData.length);
            this.generationPath += `/${this.projectName}`;
            commonWorker.initializeVariable();
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

        }
    }

    public generateAngularApp(callback) {
        return commonWorker.generateAngularTemplate(this.generationPath, this.templatePath, this.projectName, (response) => {
            return dependencyWorker.generateAppRoutingFile(this.generationPath, this.templatePath, this.menuDetails, (response) => {
                return commonWorker.generateMainFile(this.generationPath, this.templatePath, this.grapesjsCSS, this.sharedObj, this.projectName, (response) => {
                    callback(response);
                });
            });
        });
    }
}

