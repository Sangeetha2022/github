import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import * as ncp from 'ncp';
import * as asyncLoop from 'node-async-loop';
import { Constant } from '../config/Constant';
import * as beautify from 'beautify';
import { ConfimModalPopup } from '../assets/headerComponents';
import { ComponentSupportWorker } from '../supportworker/componentSupportWorker';
//TopNav path
import { TemplateTopNav } from '../strategy/HTML/generateTopNavigation/TopNav';
import { TopTemplateHeader } from '../strategy/HTML/generateTopNavigation/TopNavHeader';
import { TopTemplateLanding } from '../strategy/HTML/generateTopNavigation/TopNavLanding';
import { TopTemplateFooter } from '../strategy/HTML/generateTopNavigation/TopNavFooter';

const componentSupportWorker = new ComponentSupportWorker();
export class ReactService {
    private exec = childProcess.exec;
    private details = null;
    private generationPath = '';
    private templatePath = '';
    private sharedObj = {
        className: 'Shared',
        variableName: 'DESKTOP_API',
        protocol: 'http',
        link: 'localhost',
        port: 0
    }
    private projectName = '';
    private DEFAULT_FEATURENAME = 'default';
    private htmlContent: string = '';
    constructor() {
    }
    async createReactProject(req: Request, callback: CallableFunction) {
        this.details = req.body;
        let seedPath = this.details.project.templateLocation.authTemplatePath;
        this.projectName = this.details.project.name
        let reactBaseCodePath = `${seedPath}/reactBase`;
        this.details.project.name.split(" ").forEach((element, index) => {
            if (index === 0) {
                this.projectName = element;
            } else {
                this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
            }
        })
        this.generationPath = this.details.projectGenerationPath;
        Common.createFolders(this.generationPath);
        ncp(reactBaseCodePath, this.generationPath, function (err) {
            if (err) {
                return console.error(err);
            }
            callback('done!');
        });
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
               const filePath = templateGenerationPath + Constant.HEADER_FOLDERNAME + '/header.component.tsx';
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
               const filePath = templateGenerationPath + Constant.TEMPLATE_FOLDERNAME + '/template.component.tsx';
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
               const filePath = templateGenerationPath + Constant.FOOTER_FOLDERNAME + '/footer.component.tsx';
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


}
