import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import { ComponentWorker } from '../worker/componentWorker/componentWorker';
import { DependencyWorker } from '../worker/dependency-worker/dependencyWorker';
import { CommonWorker } from '../worker/commonWorker/commonWorker';
import { Constant } from '../config/Constant';
import { Header } from '../strategy/HTML/Header';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { SideNav } from '../strategy/HTML/SideNav';


let commonWorker = new CommonWorker();
let componentWorker = new ComponentWorker();
let dependencyWorker = new DependencyWorker();
const header = new Header();
const sideNav = new SideNav();

export class AngularTemplateService {

    private iterateData: any;
    private exec = childProcess.exec;
    private details = null;
    private generationPath = '';
    private templatePath = '';
    private grapesjsCSS = '';
    private menuDetails = '';
    private menuList = [];
    public grapesjsComponent: any = []
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
        console.log('entering into create angular template in services ----  ', util.inspect(this.details, { showHidden: true, depth: null }));
        this.grapesjsComponent = this.details.template['gjs-components'][0];
        this.grapesjsCSS = this.details.template['gjs-css'];
        this.templateName = this.details.template.template_name;
        this.projectName = this.details.project.name
        if (this.details.menuBuilder.length > 0) {
            this.menuList = [];
            console.log('menudetails before length are ---- ', this.details.menuBuilder.length);
            const primaryLanguageMenuList = this.details.menuBuilder.filter(x => x.language.toLowerCase() == this.details.project.defaultHumanLanguage.toLowerCase())
            this.menuList = primaryLanguageMenuList;
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
        this.generationPath = this.details.projectGenerationPath;
        console.log('generation path in angular template are -------- ', this.generationPath);
        Common.createFolders(this.generationPath);
        this.templatePath = this.details.project.templateLocation.frontendTemplate;
        this.exec(`cd ${this.generationPath.replace(/\s+/g, '\\ ')} && ng new ${this.projectName} --routing=false --skip-git --style=scss --skip-install`, (error, stdout, stderr) => {
            // console.log('error exec ----->>>>    ', error);
            // console.log('stdout exec ----->>>>    ', stdout);
            // console.log('stderr exec ----->>>>    ', stderr);
            if (stdout || stderr) {
                const stringparsing = JSON.stringify(this.grapesjsComponent);
                this.iterateData = JSON.parse(stringparsing);
                this.createLandingPage(req.body);
                this.generateAngularApp(this.details, (response) => {
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
    public createLandingPage(body) {
        body = JSON.parse(JSON.stringify(body));
        let gjsComponents = body.template['gjs-components'][0];
        gjsComponents = JSON.parse(gjsComponents);
        if (gjsComponents.length > 0) {
            const navInfo = gjsComponents.filter((e: any) => e.tagName == 'nav');
            header.generateHeader(navInfo, (headerRes: any, headerErr: any) => {
                if (!headerErr) {
                    const templatePath = path.resolve(__dirname, '../strategy/HTML/template/TemplateHeader.handlebars');
                    this.handleBarsFile(templatePath, headerRes, (handlebarsRes, handlebarsErr) => {
                        if (!handlebarsErr) {
                            console.log('handlebarsRes--->>>>', handlebarsRes);
                            if (handlebarsRes.includes('<div id="MainMenu">')) {
                                // Call the sidenav generate function
                                const sideNavHtml = sideNav.generateSideNav(body);
                                const handlebarsResArray = handlebarsRes.split('\n');
                                for(let i = 0; i < handlebarsResArray.length; i++) {
                                    if(handlebarsResArray[i].includes('<div id="MainMenu">')) {
                                        handlebarsResArray.splice(i + 1, 0, '\t\t' + sideNavHtml);
                                        break;
                                    }
                                }
                                for(let i = 0; i < handlebarsResArray.length; i++) {
                                    if(handlebarsResArray[i].includes('</nav>')) {
                                        handlebarsResArray.splice(i + 1, 0, Constant.HTML_TAG);
                                        break;
                                    }
                                }
                                const final = handlebarsResArray.join('\n');
                                console.log('finalHtml---->>>>>', final);
                            }
                        }
                    });
                }
            });
        }
    }
    public handleBarsFile(filePath, fileData, callback) {
        try {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
                    switch (operator) {
                        case "==":
                            return (v1 == v2) ? options.fn(this) : options.inverse(this);

                        case "!=":
                            return (v1 != v2) ? options.fn(this) : options.inverse(this);

                        case "===":
                            return (v1 === v2) ? options.fn(this) : options.inverse(this);

                        case "!==":
                            return (v1 !== v2) ? options.fn(this) : options.inverse(this);

                        case "&&":
                            return (v1 && v2) ? options.fn(this) : options.inverse(this);

                        case "||":
                            return (v1 || v2) ? options.fn(this) : options.inverse(this);

                        case "<":
                            return (v1 < v2) ? options.fn(this) : options.inverse(this);

                        case "<=":
                            return (v1 <= v2) ? options.fn(this) : options.inverse(this);

                        case ">":
                            return (v1 > v2) ? options.fn(this) : options.inverse(this);

                        case ">=":
                            return (v1 >= v2) ? options.fn(this) : options.inverse(this);

                        default:
                            return eval("" + v1 + operator + v2) ? options.fn(this) : options.inverse(this);
                    }
                });
                if (data) {
                    const source = data;
                    const template = Handlebars.compile(source);
                    const result = template(fileData);
                    callback(result, null);
                }
            });
        } catch (error) {
            callback(null, error);
        }
    }

    public generateAngularApp(details, callback) {
        dependencyWorker.generateIndexHtml(this.generationPath, this.projectName, this.templateName, this.grapesjsComponent, (res) => {

        })
        const filePath = details.projectGenerationPath + '/' + this.projectName + '/' + Constant.SRC_FOLDERNAME;
        const grapesjsCSS = this.details.template['gjs-css'];
        commonWorker.generateStyleScss(filePath, grapesjsCSS, (res) => {

        });
    }
}
