import { Request, response } from 'express';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import { ComponentWorker } from '../worker/componentWorker/componentWorker';
import { DependencyWorker } from '../worker/dependency-worker/dependencyWorker';
import { CommonWorker } from '../worker/commonWorker/commonWorker';
import { Constant } from '../config/Constant';
import { Header } from '../strategy/HTML/Header';
import { GeppettoTemplateGenerator } from '../strategy/HTML/geppetto_template/GeppettoTemplateGenerator';
import { HpTemplateGenerator } from '../strategy/HTML/hp_template/HpTemplateGenerator';
import { RedHpTemplateGenerator } from '../strategy/HTML/red_template/RedTemplateGenerator';
import { AppModuleWorker } from '../worker/dependency-worker/AppModuleWorker';
import { ComponentSupportWorker } from '../supportworker/componentSupportWorker';
import * as asyncLoop from 'node-async-loop';
import { GeppettoSideNav } from '../strategy/HTML/geppetto_template/GeppettoSideNav';
import { ConfimModalPopup } from '../assets/headerComponent';
import * as beautify from 'beautify';
import { GeppettoHeader } from '../strategy/HTML/geppetto_template/GeppettoHeader';
import { GeppettoLanding } from '../strategy/HTML/geppetto_template/GeppettoLanding';
import { Footer } from '../strategy/HTML/geppetto_template/GeppettoFooter';
//SideNav path
import { TemplateSideNav } from '../strategy/HTML/generateNavigation/SideNav';
import { TemplateHeader } from '../strategy/HTML/generateNavigation/Header';
import { TemplateLanding } from '../strategy/HTML/generateNavigation/Landing';
import { TemplateGenerator } from '../strategy/HTML/generateNavigation/TemplateGenerator';
import { TemplateFooter } from '../strategy/HTML/generateNavigation/Footer';
//TopNav path
import { TemplateTopNav } from '../strategy/HTML/generateTopNavigation/TopNav';
import { TopTemplateHeader } from '../strategy/HTML/generateTopNavigation/TopNavHeader';
import { TopTemplateLanding } from '../strategy/HTML/generateTopNavigation/TopNavLanding';
import { TopTemplateGenerator } from '../strategy/HTML/generateTopNavigation/TopNavTemplateGenerator';
import { TopTemplateFooter } from '../strategy/HTML/generateTopNavigation/TopNavFooter';
let commonWorker = new CommonWorker();
let componentWorker = new ComponentWorker();
let dependencyWorker = new DependencyWorker();
let geppettoTemplate = new GeppettoTemplateGenerator();
let redHpTemplate = new RedHpTemplateGenerator();
let hpTemplate = new HpTemplateGenerator();
let header = new Header();
const componetWorker = new ComponentWorker();
const appModuleWorker = new AppModuleWorker();
const componentSupportWorker = new ComponentSupportWorker();
const geppettoSideNav = new GeppettoSideNav();

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
    private htmlContent: string = '';

    public createAngularTemplate(req: Request, callback: CallableFunction) {
        this.details = req.body;
        const data = this.details.template['gjs-components'][0];
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
        this.generateHtml(body, templateName);
        // switch (templateName.toLowerCase()) {
        //     case 'geppetto template':
        //         geppettoTemplate.geppettoTemplateGeneration(body);
        //         break;
        //     case 'new hp template':
        //         hpTemplate.hpTemplateGeneration(body);
        //         break;
        //     case 'red template':
        //         redHpTemplate.redHpTemplateGeneration(body);
        //         break;
        //     default:
        //         break;
        // }
        componentWorker.generateComponent(this.generationPath, this.templateName.toLowerCase(), (response) => {
            appModuleWorker.importComponentModules(body, (res) => {
                callback(response)
            });
        })
    }

    /**
     * 
     * @param gjsElement 
     * @param body 
     * @param tagName 
     * @param callback 
     */
    generateWeConnectTemplate(gjsElement, body, tagName, callback) {
        const projectName = body.project.name;
        const templateGenerationPath = body.projectGenerationPath + '/' + projectName + '/'
                    + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/';
        if (tagName === 'header') {
            // Generating Header Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const filePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.html';
                Common.createFolders(templateGenerationPath + Constant.HEADER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), (res) => {
                    this.htmlContent = '';
                    callback();
                });
                // Generate Header SCSS File
                const cssData = '';
                const cssFilePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'section') {
            // Generate Template Component
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                Common.createFolders(templateGenerationPath + Constant.TEMPLATE_FOLDERNAME);
                const filePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.html';
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    callback();
                });
                // Generate Template SCSS File
                const cssData = '';
                const cssFilePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'footer') {
            // Generate Footer Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const filePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.html';
                Common.createFolders(templateGenerationPath + Constant.FOOTER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    this.htmlContent = '';
                    callback();
                });
                // Generate Footer SCSS File
                const cssData = Footer.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else {
            callback();
        }
    }
    /**
     * 
     * @param gjsElement 
     * @param body 
     * @param tagName 
     * @param callback 
     */
     generateSideNavTemplate(gjsElement, body, tagName, callback) {
        const projectName = body.project.name;
        const templateGenerationPath = body.projectGenerationPath + '/' + projectName + '/'
                    + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/';
        if (tagName === 'nav') {
            // Generating Header Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const menuList = body.menuBuilder.filter(x => x.language.toLowerCase() === body.project.defaultHumanLanguage.toLowerCase());
                let responseArray = [];
                if (res.includes(`<div id="MainMenu" class="">`)) {
                    const sideNavHtml = TemplateSideNav.generatedSideNav(menuList);
                    responseArray = res.split('\n');
                    for (let i = 0; i < responseArray.length; i++) {
                        if (responseArray[i].includes(`<div id="MainMenu" class="">`)) {
                            responseArray.splice(i + 1, 0, sideNavHtml);
                            break;
                        }
                    }
                }
                const filePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.html';
                const data = responseArray.join('\n') + ConfimModalPopup.htmlTag[0];
                Common.createFolders(templateGenerationPath + Constant.HEADER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(data, { format: 'html' }), (res) => {
                    callback();
                });
                // Generate Header SCSS File
                const cssData = TemplateHeader.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'header') {
            // Generate Template Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                callback();
            });
        } else if (tagName === 'section') {
            // Generate Template Component
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                Common.createFolders(templateGenerationPath + Constant.TEMPLATE_FOLDERNAME);
                const filePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.html';
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    callback();
                });
                // Generate Template SCSS File
                const cssData = TemplateLanding.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'footer') {
            // Generate Footer Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const filePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.html';
                Common.createFolders(templateGenerationPath + Constant.FOOTER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    this.htmlContent = '';
                    callback();
                });
                // Generate Footer SCSS File
                const cssData = TemplateFooter.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else {
            callback();
        }
    }
    /**
     * 
     * @param gjsElement 
     * @param body 
     * @param tagName 
     * @param callback 
     */
     generateTopNavTemplate(gjsElement, body, tagName, callback) {
         console.log("tag get on file ",tagName)
        const projectName = body.project.name;
        const templateGenerationPath = body.projectGenerationPath + '/' + projectName + '/'
                    + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/';
        if (tagName === 'nav') {
            // Generating Header Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const menuList = body.menuBuilder.filter(x => x.language.toLowerCase() === body.project.defaultHumanLanguage.toLowerCase());
                let responseArray = [];
                if (res.includes(`<div id="MainMenu" class="">`)) {
                    const sideNavHtml = TemplateTopNav.generateTopNav(menuList);
                    responseArray = res.split('\n');
                    for (let i = 0; i < responseArray.length; i++) {
                        if (responseArray[i].includes(`<div id="MainMenu" class="">`)) {
                            responseArray.splice(i + 1, 0, sideNavHtml);
                            break;
                        }
                    }
                }
                const filePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.html';
                const data = responseArray.join('\n') + ConfimModalPopup.htmlTag[0];
                Common.createFolders(templateGenerationPath + Constant.HEADER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(data, { format: 'html' }), (res) => {
                    callback();
                });
                // Generate Header SCSS File
                const cssData = TopTemplateHeader.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'header') {
            // Generate Template Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                callback();
            });
        } else if (tagName === 'section') {
            // Generate Template Component
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                Common.createFolders(templateGenerationPath + Constant.TEMPLATE_FOLDERNAME);
                const filePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.html';
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    callback();
                });
                // Generate Template SCSS File
                const cssData = TopTemplateLanding.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'footer') {
            // Generate Footer Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const filePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.html';
                Common.createFolders(templateGenerationPath + Constant.FOOTER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    this.htmlContent = '';
                    callback();
                });
                // Generate Footer SCSS File
                const cssData = TopTemplateFooter.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else {
            callback();
        }
    }
    /**
     * 
     * @param gjsElement 
     * @param body 
     * @param tagName 
     * @param callback 
     */
    generateGeppettoTemplate(gjsElement, body, tagName, callback) {
        const projectName = body.project.name;
        const templateGenerationPath = body.projectGenerationPath + '/' + projectName + '/'
                    + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/';
        if (tagName === 'nav') {
            // Generating Header Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const menuList = body.menuBuilder.filter(x => x.language.toLowerCase() === body.project.defaultHumanLanguage.toLowerCase());
                let responseArray = [];
                if (res.includes(`<div id="MainMenu" class="">`)) {
                    const sideNavHtml = geppettoSideNav.generateSideNav(menuList);
                    responseArray = res.split('\n');
                    for (let i = 0; i < responseArray.length; i++) {
                        if (responseArray[i].includes(`<div id="MainMenu" class="">`)) {
                            responseArray.splice(i + 1, 0, sideNavHtml);
                            break;
                        }
                    }
                }
                const filePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.html';
                const data = responseArray.join('\n') + ConfimModalPopup.htmlTag[0];
                Common.createFolders(templateGenerationPath + Constant.HEADER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(data, { format: 'html' }), (res) => {
                    callback();
                });
                // Generate Header SCSS File
                const cssData = GeppettoHeader.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'header') {
            // Generate Template Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                callback();
            });
        } else if (tagName === 'section') {
            // Generate Template Component
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                Common.createFolders(templateGenerationPath + Constant.TEMPLATE_FOLDERNAME);
                const filePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.html';
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    callback();
                });
                // Generate Template SCSS File
                const cssData = GeppettoLanding.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else if (tagName === 'footer') {
            // Generate Footer Component
            this.htmlContent = '';
            this.createHtmlfromNestedObject([gjsElement], (res) => {
                const filePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.html';
                Common.createFolders(templateGenerationPath + Constant.FOOTER_FOLDERNAME);
                componentSupportWorker.writeFile(filePath, beautify(res, { format: 'html' }), () => {
                    this.htmlContent = '';
                    callback();
                });
                // Generate Footer SCSS File
                const cssData = Footer.CSS_DATA;
                const cssFilePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.scss';
                componentSupportWorker.writeFile(cssFilePath, beautify(cssData, { format: 'css' }), () => {
                });
            });
        } else {
            callback();
        }
    }
    generateHtml(body, templateName) {
        console.log('BODY---->>>>', JSON.stringify(body));
        let gjsComponents = body.template['gjs-components'][0];
        gjsComponents = gjsComponents ? JSON.parse(gjsComponents) : [];
        if (gjsComponents && gjsComponents.length > 0) {
            asyncLoop(gjsComponents, (gjsElement, next) => {
                const tagName = componentSupportWorker.tagNameFunction(gjsElement);
                // Geppetto Template Generation
                if (templateName.toLowerCase() === 'geppetto template') {
                    this.generateGeppettoTemplate(gjsElement, body, tagName, (res) => {
                        next();
                    });
                } else if (templateName.toLowerCase() === 'weconnect template' || templateName.toLowerCase() === 'mrs travel template') {
                    this.generateWeConnectTemplate(gjsElement, body, tagName, (res) => {
                        next();
                    });
                } else if (templateName.toLowerCase() === 'architecture template') {
                    this.generateSideNavTemplate(gjsElement, body, tagName, (res) => {
                        next();
                    });
                } else if (templateName.toLowerCase() === 'nature template') {
                    console.log("if nature template------------------------------");
                    this.generateTopNavTemplate(gjsElement, body, tagName, (res) => {
                        next();
                    });
                }
            }, err => {
                if (err) {
                    console.log('ERROR---->>>>', err);
                } else {
                }
            });
        }
    }
    createHtmlfromNestedObject(gjsComponentMetadata: Array<Object>, callback) {
        asyncLoop(gjsComponentMetadata, (gjsElement, next) => {
            let tagName = componentSupportWorker.tagNameFunction(gjsElement);
            if (tagName === 'p') {
                tagName = 'div';
            }
            this.htmlContent += '<' + tagName + ' ';
            this.setAttributes(gjsElement);
            this.setClasses(gjsElement, tagName);
            this.setContent(gjsElement);
            if (gjsElement.hasOwnProperty('components') && gjsElement.components.length > 0) {
                this.createHtmlfromNestedObject(gjsElement.components, (res) => {
                });
            }
            if(tagName !== 'hr' && tagName !== 'br') {
                this.setCloseTag(tagName);
            }
            next();
        }, (err) => {
            if (err) {
                callback('');
            } else {
                callback(this.htmlContent);
            }
        });
    }
    /**
     * Set Attributes
     * @param item 
     */
    setAttributes(item) {
        if (item.hasOwnProperty('attributes')) {
            // this.htmlContent += `id="${item.attributes.id}" `;
            const keys = Object.keys(item.attributes);
            keys.forEach((key) => {
                // Replacing "href to [routerLink]", "[routerlink] to [routerLink]" in <a> tag
                if(item.attributes[key] !== '#') {
                    this.htmlContent = key === 'href' ? this.htmlContent + `[routerLink]="['${item.attributes[key]}']" ` : this.htmlContent = key === '[routerlink]' ? this.htmlContent + `[routerLink]="${item.attributes[key]}" ` : this.htmlContent + `${key}="${item.attributes[key]}" `;
                } else {
                    this.htmlContent = key === 'href' ? this.htmlContent + `[routerLink]="['/']" ` : this.htmlContent + `${key}="${item.attributes[key]}" `;
                }
            });
        }
    }
    /**
     * Set Classes
     * @param item 
     * @param tagName 
     */
    setClasses(item, tagName) {
        let classess = '';
        if (item.hasOwnProperty('classes')) {
            item.classes.forEach((element, index) => {
                if (index + 1 === item.classes.length) {
                    classess += element.name;
                } else {
                    classess += element.name + ' ';
                }
            });
        }
        this.htmlContent = tagName !== 'img' && tagName !== 'input' ? this.htmlContent + `class="${classess}">\n` : this.htmlContent + `class="${classess}"/>\n`;
    }
    /**
     * Set Content
     * @param item 
     */
    setContent(item) {
        if (item.hasOwnProperty('content') && item.content) {
            this.htmlContent += item.content;
        }
    }
    /**
     * Set close tag
     * @param tagName 
     */
    setCloseTag(tagName) {
        if (tagName !== 'img' && tagName !== 'input') {
            this.htmlContent += `</${tagName}>\n`;
        }
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
            commonWorker.generateStyleScss(generationPath, grapesjsCSS, (res) => {
                return commonWorker.generateMainFile(generationPath, details, this.sharedObj, this.projectName, (response) => {
                    return dependencyWorker.generateAppRoutingFile(generationPath, (response) => {
                        callback(response);
                    });
                });
            });
        });
    }
}
