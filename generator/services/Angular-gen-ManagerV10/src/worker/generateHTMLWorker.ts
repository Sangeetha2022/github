import * as util from 'util';
import * as asyncForEach from 'async-foreach';
import * as asyncLoop from 'node-async-loop';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Common } from '../config/Common';

import { Forms } from '../strategy/HTML/Forms';
import { InputTagGeneration } from '../strategy/HTML/Input';
import { ComponentWorker } from '../worker/componentworker/componentworker';
import { ComponentServiceWorker } from '../worker/componentservice/componentserviceworker';
import { ComponentModuleWorker } from '../worker/componentmodule/componentmoduleworker';
import { AppModuleWorker } from '../worker/dependency-worker/AppModuleWorker';
import { AppRoutingModuleWorker } from './dependency-worker/AppRoutingModuleWorker';
import { BootstrapTable } from '../strategy/HTML/BootstrapTable';
import { AgGrid } from '../strategy/HTML/Ag-grid';
import { ComponentSupportWorker } from '../supportworker/componentsupportworker/componentsupportworker'
import { Constant } from '../config/Constant';
import { Link } from '../strategy/HTML/Link';

let forms = new Forms();
let generateInput = new InputTagGeneration();
let bootstrapTableHtml = new BootstrapTable();
let agGridTableHtml = new AgGrid();
let componentSupport = new ComponentSupportWorker();
const link = new Link();


const componentWorker = new ComponentWorker();
const componentServiceWorker = new ComponentServiceWorker();
const componentModuleWorker = new ComponentModuleWorker();
const appModuleWorker = new AppModuleWorker();
const appRoutingModuleWorker = new AppRoutingModuleWorker()


export class GenerateHtmlWorker {

    private forEach = asyncForEach.forEach;
    private tagName: String = null;
    // Screen details

    private screenInfo: any;

    generate(screenDetails, details, callback) {
        // add default styles
        this.screenInfo = screenDetails;
        let metaData: any = JSON.parse(screenDetails['gjs-components'][0]);
        this.generateHtml(metaData, screenDetails, details);
        this.generateComponent(details);
    }
    private generateComponent(details) {
        componentWorker.generateComponent(details, (res, err) => {
            componentServiceWorker.generateComponentService(details, (res, err) => {
                componentModuleWorker.generateComponentModule(details, (res, err) => {

                });
            });
        });
    }
    async generateHtml(grapesJSMetadata, screensData, details) {
        let templatePath = path.resolve(__dirname, '../../templates');
        let screenHtmlContent = [];
        let filePath = templatePath + `/componenthtml.handlebars`;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + `/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        var screenName = screensData.screenName;
        let screenGenerationPath = applicationPath + `/${screenName}`;
        await asyncLoop(grapesJSMetadata, (item, next) => {
            if (item) {
                this.tagName = this.tagNameFunction(item);
                if (this.tagName == 'form') {
                    forms.formHTMLGeneration(item, screensData, details, (response) => {
                        screenHtmlContent.push({ data: response.toString() });
                        next();
                    });
                }
                if (this.tagName == 'input') {
                    let formResponse = generateInput.inputGeneration(item);
                    next();
                }
                if (this.tagName == 'grid-type') {
                    if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == true) {
                        bootstrapTableHtml.BootstrapTableHTMLGeneration(item, screensData, details, (response) => {
                            screenHtmlContent.push({ data: response });
                            next();
                        })
                    }
                    else if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == false) {
                        agGridTableHtml.agGridTableHTMLGeneration(item, screensData, details, (response) => {
                            screenHtmlContent.push({ data: response });
                            next();
                        })
                    }
                }
                if(this.tagName === 'a') {
                    link.generateLink(item, screensData, details, (response) => {
                        screenHtmlContent.push({ data: response });
                        next();
                    })
                }
            } else {
                next();
            }
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                let fileData = {
                    screenHtmlContent: screenHtmlContent
                }
                this.handleBarsFile(filePath, fileData, screenGenerationPath, screenName);
            }
        })
        
    }

    tagNameFunction(firstEle) {
        let tagName = '';
        if (firstEle.hasOwnProperty('tagName')) {
            tagName = firstEle.tagName;
        } else if (firstEle.hasOwnProperty('type')) {
            if (
                firstEle.type != 'grid-row' && firstEle.type != 'grid-item' &&
                (firstEle.type == 'label' || firstEle.type == 'section' || firstEle.type == 'input' || firstEle.type == 'grid-type')
            ) {
                tagName = firstEle.type;
            } else if (firstEle.type == 'tab' || firstEle.type == 'link') {
                tagName = 'a';
            } else if (firstEle.type == 'image') {
                tagName = 'img';
            } else {
                tagName = 'div';
            }
        }
        if (firstEle.type === 'header') {
            if (firstEle.tagName) {
                tagName = firstEle.tagName;
            } else {
                tagName = 'h1';
            }

        } else if (!tagName) {
            tagName = 'div';
        }
        return tagName;
    }

    modifyDependency(details, callback) {
        appModuleWorker.importComponentModules(details, (res, err) => {
            callback('Modules Imported Successfully', null);
        });
    }

    handleBarsFile(filePath, fileData, screenGenerationPath, screenName) {
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                var source = data;
                Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                });
                var template = Handlebars.compile(source);
                var result = template(fileData);
                Common.createFolders(screenGenerationPath);
                fs.writeFile(screenGenerationPath + `/${screenName}.component.html`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
}
