import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import { ComponentWorker } from '../worker/componentWorker/componentWorker';
import { DependencyWorker } from '../worker/dependency-worker/dependencyWorker';
import { CommonWorker } from '../worker/commonWorker/commonWorker';
import { Constant } from '../config/Constant';
import { Header } from '../strategy/HTML/Header';
import { GeppettoTemplateGenerator } from '../strategy/HTML/geppetto_template/GeppettoTemplateGenerator';
import { HpTemplateGenerator } from '../strategy/HTML/hp_template/HpTemplateGenerator'

let commonWorker = new CommonWorker();
let componentWorker = new ComponentWorker();
let dependencyWorker = new DependencyWorker();
let geppettoTemplate = new GeppettoTemplateGenerator();
let hpTemplate = new HpTemplateGenerator();
let header = new Header();
const componetWorker = new ComponentWorker();

export class AngularTemplateService {

    private iterateData: any;
    private exec = childProcess.exec;
    private details = null;
    private generationPath = '';
    private templatePath = '';
    private grapesjsCSS = '';
    private menuDetails = '';
    private menuList = [];
    public mainHTML = [];
    public grapesjsComponent : any = []
    private templateName = '';
    private apigatewayPortNumber = 0;
    private sharedObj = {
        className: 'Shared',
        variableName: 'DESKTOP_API',
        protocol: 'http',
        link: 'localhost',
        port: 0
    }
    private projectName = '';

    public createAngularTemplate(req: Request, callback: CallableFunction) {
        this.details = req.body;
        this.grapesjsComponent = this.details.template['gjs-components'][0];
        this.grapesjsCSS = this.details.template['gjs-css'];
        this.templateName = this.details.template.template_name;
        this.projectName = this.details.project.name
        if (this.details.menuBuilder.length > 0) {
            this.menuList = [];
            const primaryLanguageMenuList = this.details.menuBuilder.filter(x => x.language.toLowerCase() == this.details.project.defaultHumanLanguage.toLowerCase())
            this.menuList = primaryLanguageMenuList;
        }
        this.apigatewayPortNumber = this.details.apigatewayPortNumber;
        this.sharedObj.port = this.apigatewayPortNumber;
        this.details.project.name.split(" ").forEach((element, index) => {
            if (index === 0) {
                this.projectName = element;
            } else {
                this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
            }
        })
        this.generationPath = this.details.projectGenerationPath;
        Common.createFolders(this.generationPath);
        this.templatePath = this.details.project.templateLocation.frontendTemplate;
        this.exec(`cd ${this.generationPath.replace(/\s+/g, '\\ ')} && ng new ${this.projectName} --routing=false --skip-git --style=scss --skip-install`, (error, stdout, stderr) => {
            if (stdout || stderr) {
                const stringparsing = JSON.stringify(this.grapesjsComponent);
                this.iterateData = JSON.parse(stringparsing);
                // console.log('iterateData filter are -----  ', this.iterateData);
                this.generateAngularApp(this.details, (response) => {
                    this.createLandingPage(req.body, (res) => {
                        const temp = {
                            shared: {
                                className: this.sharedObj.className,
                                variableName: this.sharedObj.variableName,
                            },
                            applicationPath: this.generationPath
                        }
                        callback(temp);
                        console.log('after done all the workers');
                    });
                });
            }
        });
    }
    public createLandingPage(body, callback) {
        body = JSON.parse(JSON.stringify(body));
        this.generationPath += `/${this.projectName}`;
        let templateName = this.templateName;
        switch (templateName.toLowerCase()) {
            case 'geppetto template':
                geppettoTemplate.geppettoTemplateGeneration(body);
                break;
            case 'new hp template':
                hpTemplate.hpTemplateGeneration(body);
                break;
            default:
                break;
        }  
        componentWorker.generateComponent(this.generationPath, this.templateName.toLowerCase(), (response) => {
            callback(response)
        }) 
    }
    // public createLandingPage() {
    //     if (this.iterateData.length > 0) {
    //         const metadata = JSON.parse(this.iterateData);
    //         this.generationPath += `/${this.projectName}`;
    //         // commonWorker.initializeVariable();
    //         var navInfo = metadata.filter(function (element) {
    //             return element.tagName == 'nav';
    //         })
    //         var headerInfo = metadata.filter(function (element) {
    //             return element.tagName == 'header';
    //         })
    //         var footerInfo = metadata.filter(function (element) {
    //             return element.tagName == 'footer';
    //         })
    //         if(navInfo.length == 0 && headerInfo.length > 0){
    //             var templateInfo = metadata.filter(function (element) {
    //                 return element.tagName != 'nav' && element.tagName !='header' && element.tagName != 'footer';
    //             })

    //         }else{
    //             var templateInfo = metadata.filter(function (element) {
    //                 return element.tagName != 'nav' && element.tagName != 'footer' && element.tagName != 'meta' && element.tagName != 'link' 
    //                     && element.tagName != 'base' && element.tagName != 'title' && element.tagName != 'link' && element.tagName != 'script';
    //             })
    //         }

    //         console.log('----nav------',navInfo.length, headerInfo.length, templateInfo.length);
    //         if (navInfo.length > 0) {
    //         header.createHeaderHtml(navInfo, this.menuList);
    //         }
    //         if (navInfo.length == 0 && headerInfo.length > 0) {
    //         this.navigationvalue = 'topnav';
    //         header.createTopHeaderHtml(headerInfo, this.menuList, this.navigationvalue);
    //         }
    //         if (footerInfo.length > 0) {
    //         commonWorker.createFooterHtml(footerInfo);
    //         }
    //         if (templateInfo.length > 0) {
    //             landingpage.landingPageHTMLGeneration(templateInfo);
    //         }
    //     }
    // }

    public generateAngularApp(details, callback) {
        const generationPath = details.projectGenerationPath + '/' + this.projectName;
        dependencyWorker.generateIndexHtml(generationPath, this.projectName, this.templateName, this.grapesjsComponent, (res) => {
            const filePath = details.projectGenerationPath + '/' + this.projectName + '/' + Constant.SRC_FOLDERNAME;
            const grapesjsCSS = this.details.template['gjs-css'];
            commonWorker.generateStyleScss(filePath, grapesjsCSS, (res) => {
                callback();
            });
        });
    }
}
