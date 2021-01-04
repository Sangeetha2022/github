import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import { ComponentWorker } from '../worker/componentWorker/componentWorker';
import { DependencyWorker } from '../worker/dependency-worker/dependencyWorker';
import { CommonWorker } from '../worker/commonWorker/commonWorker';
import { Constant } from '../config/Constant';

let commonWorker = new CommonWorker();
let componentWorker = new ComponentWorker();
let dependencyWorker = new DependencyWorker();

export class AngularTemplateService {

    private iterateData: any;
    private exec = childProcess.exec;
    private details = null;
    private generationPath = '';
    private templatePath = '';
    private grapesjsCSS = '';
    private menuDetails = '';
    private menuList = [];
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
    private DEFAULT_FEATURENAME = 'default';
    private navigationvalue: any;

    initalizeDaoVariable() {

    }

    public createAngularTemplate(req: Request, callback: CallableFunction) {

        this.details = req.body;
        // console.log('entering into create angular template in services ----  ', util.inspect(this.details, { showHidden: true, depth: null }));
        this.grapesjsComponent = this.details.template['gjs-components'][0];
        this.grapesjsCSS = this.details.template['gjs-css'];
        this.templateName = this.details.template.template_name;
        if (this.details.menuBuilder.length > 0) {
            this.menuList = [];
            // this.menuDetails = this.details.menuBuilder[0].menuDetails;
            console.log('menudetails before length are ---- ', this.details.menuBuilder.length);
            const primaryLanguageMenuList = this.details.menuBuilder.filter(x => x.language.toLowerCase() == this.details.project.defaultHumanLanguage.toLowerCase())
            console.log('menudetails after length are ---- ', primaryLanguageMenuList.length);
            console.log('menudetails after length are -add--- ', util.inspect(primaryLanguageMenuList, { showHidden: true, depth: null }));
            this.menuList = primaryLanguageMenuList;
            //             primaryLanguageMenuList.forEach(element => {
            //                 console.log('each array of menus are --------   ', element);
            //                 if (element && element.menuDetails.length > 0) {
            //                     element.menuDetails.forEach(menuElement => {
            //                         const menu = {
            //                             parent: [],
            //                             children: []
            //                         }
            //                         if (menuElement.featuremenu[0].name.feature != this.DEFAULT_FEATURENAME) {
            //                             menu.parent.push(menuElement.featuremenu[0].description.feature);
            //                         }
            //                         if (menuElement.screenmenu && menuElement.screenmenu.length > 0) {
            //                             menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
            //                                 const temp = {
            //                                     route: '',
            //                                     name: ''
            //                                 }
            //                                 temp.route = screenElement;
            //                                 temp.name = menuElement.screenmenu[0].description.screen[screenIndex];
            //                                 menu.children.push(temp);
            //                             })
            //                         }
            //                         this.menuList.push(menu);
            //                     })
            // }
            //             })
            console.log('after added outside ----  ', util.inspect(this.menuList, { showHidden: true, depth: null }));
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
        this.exec(`cd ${this.generationPath.replace(/\s+/g, '\\ ')} && ng new ${this.projectName} --routing=false --skip-git --style=scss --skip-install`, (error, stdout, stderr) => {
            // console.log('error exec ----->>>>    ', error);
            // console.log('stdout exec ----->>>>    ', stdout);
            // console.log('stderr exec ----->>>>    ', stderr);
            if (stdout || stderr) {
                // this.iterateData = grapesjsComponent;
                const stringparsing = JSON.stringify(this.grapesjsComponent);
                this.iterateData = JSON.parse(stringparsing);
                // console.log('iterateData filter are -----  ', this.iterateData);
                // this.createLandingPage();
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

    // public createLandingPage() {
    //     if (this.iterateData.length > 0) {
    //         console.log('iteratedata lengtha are ------- ', this.iterateData.length);
    //         const metadata = JSON.parse(this.iterateData);
    //         this.generationPath += `/${this.projectName}`;
    //         commonWorker.initializeVariable();
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
    //                 return element.tagName != 'nav' && element.tagName != 'footer';
    //             })
    //         }

    //         console.log('----nav------',navInfo.length, headerInfo.length, templateInfo.length);
    //         if (navInfo.length > 0) {
    //             commonWorker.createHeaderHtml(navInfo, this.menuList);
    //         }
    //         if (navInfo.length == 0 && headerInfo.length > 0) {
    //             this.navigationvalue = 'topnav';
    //             commonWorker.createTopHeaderHtml(headerInfo, this.menuList, this.navigationvalue);
    //         }
    //         if (footerInfo.length > 0) {
    //             commonWorker.createFooterHtml(footerInfo);
    //         }
    //         if (templateInfo.length > 0) {
    //             commonWorker.createTemplateHtml(templateInfo);
    //         }

    //     }
    // }

    public generateAngularApp(callback) {
        return dependencyWorker.generateIndexHtml(this.generationPath, this.templatePath, this.templateName ,this.grapesjsComponent , (res) =>{

        } )
        //     return commonWorker.generateAngularTemplate(this.generationPath, this.templatePath, this.templateName, this.menuList, (response) => {
        //         return dependencyWorker.generateAppRoutingFile(this.generationPath, this.templatePath, this.menuList, (response) => {
        //             console.log('--------checking assets file generation------',this.generationPath, this.templatePath, this.grapesjsCSS, this.sharedObj, this.projectName)
        // return commonWorker.generateMainFile(this.generationPath, this.templatePath, this.grapesjsCSS, this.sharedObj, this.projectName, (response) => {
        //     callback(response);
        // });
        //         });
        //     });
        // }
    }
}
