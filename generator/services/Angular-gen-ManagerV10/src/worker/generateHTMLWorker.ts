import * as util from 'util';
import * as asyncForEach from 'async-foreach';
import * as asyncLoop from 'node-async-loop';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Common } from '../config/Common';
import * as beautify from 'beautify';

import { Forms } from '../strategy/HTML/Forms';
import { Button } from '../strategy/HTML/Button';
import { RadioButton } from '../strategy/HTML/Radiobutton';
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
import { ComponentCSSworker } from './componentworker/componentCSSworker';
import { DependencyWorker } from './dependency-worker/dependencyWorker';

import { CheckBox } from '../strategy/HTML/Checkbox';
import { Select } from '../strategy/HTML/Select';
import { DynamicDropDown } from '../strategy/HTML/Dynamic-dropdown';
import { SpecialDropDown } from '../strategy/HTML/SpecialDropDown';
import { Label } from '../strategy/HTML/Label';
import { response } from 'express';
import { ComponentSpecWorker } from './componentworker/ComponentSpecWorker';


let forms = new Forms();
let button = new Button();
let radiobutton = new RadioButton();
let select = new Select();
let checkbox = new CheckBox();
let generateInput = new InputTagGeneration();
let bootstrapTableHtml = new BootstrapTable();
let agGridTableHtml = new AgGrid();
let dynamicDropDown = new DynamicDropDown();
let specialDropDown = new SpecialDropDown();
let label = new Label();
let componentSupportWorker = new ComponentSupportWorker();
const link = new Link();

const componentWorker = new ComponentWorker();
const componentServiceWorker = new ComponentServiceWorker();
const componentModuleWorker = new ComponentModuleWorker();
const appModuleWorker = new AppModuleWorker();
const appRoutingModuleWorker = new AppRoutingModuleWorker();
const componetCssWorker = new ComponentCSSworker();
const dependencyWorker = new DependencyWorker();
const componentSpecWorker = new ComponentSpecWorker();


export class GenerateHtmlWorker {

    private forEach = asyncForEach.forEach;
    private tagName: String = null;
    private htmlContent: String = '';
    // Screen details

    private screenInfo: any;

    generate(screenDetails, details, callback) {
        // add default styles
        this.screenInfo = screenDetails;
        let metaData: any = JSON.parse(screenDetails['gjs-components'][0]);
        this.generateHtml(metaData, screenDetails, details);
        this.generateComponent(details, callback);
    }
    public generateComponent(details, callback) {
        componentWorker.generateComponentTs(details, (res, err) => {
            componetCssWorker.generateComponentCss(details, (res, err) => {
                componentServiceWorker.generateComponentService(details, (res, err) => {
                    componentModuleWorker.generateComponentModule(details, (res, err) => {
                        componentSpecWorker.generateComponentSpecFile(details, (res, err) => {
                            callback();
                        });
                    })
                });
            });
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
                this.htmlContent += `${key}="${item.attributes[key]}" `
            });
        }
    }
    /**
     * Set AngularAttributes(ngModel, click)
     */
    setAngularAttributes(gjsElement, screensData, tagName, details, callback) {
        if(tagName !== 'grid-type' && tagName !== 'specialdropdown-type' && tagName !== 'dynamicdropdown-type' && tagName !== 'select' && tagName !== 'option' && gjsElement.attributes && gjsElement.attributes.id) {
            // Appending entities for two way binding
            if(screensData.entity_info && screensData.entity_info.length > 0) {
                let twoWayBinding = '';
                screensData.entity_info.forEach((entity: any) => {
                    twoWayBinding = '';
                    const entityId = entity.entityId;
                    if(details.entities && details.entities.length > 0) {
                        const entityFilter = details.entities.filter(e => e._id === entityId);
                        if(entityFilter.length > 0) {
                            twoWayBinding = entity.fields.name ? twoWayBinding + entityFilter[0].name + '.' + entity.fields.name : '';
                            if(twoWayBinding && gjsElement.attributes && gjsElement.attributes.id && gjsElement.attributes.id === entity.htmlId) {
                                this.htmlContent += `[(ngModel)]="${twoWayBinding}" [ngModelOptions]="{standalone: true}" `;
                            }
                        }
                    }
                });
            }
            // Appending click event
            if(screensData.flows_info && screensData.flows_info.length > 0) {
                screensData.flows_info.forEach((flow) => {
                    if(flow.htmlId && gjsElement.attributes && gjsElement.attributes.id && gjsElement.attributes.id === flow.htmlId) {
                        this.htmlContent += `(click)="${flow.flowName}()" `;
                    }
                });
            }
            callback();
        }
        // Set grid-type
        else if (tagName === 'grid-type') {
            // Create bootstrap table
            if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == true) {
                bootstrapTableHtml.BootstrapTableHTMLGeneration(gjsElement, screensData, details, (response) => {
                    this.htmlContent += response;
                    callback();
                });
            }
            // Create ag-grid table
            else if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == false) {
                agGridTableHtml.agGridTableHTMLGeneration(gjsElement, screensData, details, (response) => {
                    this.htmlContent += response;
                    callback();
                });
            }
        }
        // Set specialdropdown-type
        else if (tagName === 'specialdropdown-type') {
            specialDropDown.specialDropDownHTMLGeneration(gjsElement, screensData, details, (response) => {
                this.htmlContent += response;
                callback();
            });
        }
        // Set dynamicdropdown-type
        else if (tagName === 'dynamicdropdown-type') {
            dynamicDropDown.dynamicDropDownHTMLGeneration(gjsElement, screensData, details, (response) => {
                this.htmlContent += response;
                callback();
            });
        }
        // Set select 
        else if (tagName === 'select' && !gjsElement.hasOwnProperty('name')) {
            select.SelectGeneration(gjsElement, screensData, details, (response) => {
                this.htmlContent += response;
                callback();
            });
        } 
        else {
            callback();
        }
    }
    /**
     * Set Classes
     * @param item 
     * @param tagName 
     */
    setClasses(item, tagName) {
        let classess = '';
        if(item.hasOwnProperty('classes')) {
            item.classes.forEach((element, index) => {
                if(index + 1 === item.classes.length) {
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
        if(tagName !== 'img' && tagName !== 'input') {
            this.htmlContent += `</${tagName}>\n`;
        }
    }
    /**
     * Recursive Function for Create HTML from Nested JSON Object
     * @param gjsComponentMetadata
     */
    createHtmlfromNestedObject(gjsComponentMetadata: Array<Object>, screensData, details, callback) {
        asyncLoop(gjsComponentMetadata, (gjsElement, next) => {
            const tagName = this.tagNameFunction(gjsElement);
            if(tagName !== 'grid-type' && tagName !== 'specialdropdown-type' && tagName !== 'dynamicdropdown-type' && tagName !== 'select' && tagName !== 'option') {
                this.htmlContent += '<' + tagName + ' ';
                this.setAttributes(gjsElement);
            }
            this.setAngularAttributes(gjsElement, screensData, tagName, details, (res) => {
                if(tagName !== 'grid-type' && tagName !== 'specialdropdown-type' && tagName !== 'dynamicdropdown-type' && tagName !== 'select' && tagName !== 'option') {
                    this.setClasses(gjsElement, tagName);
                    this.setContent(gjsElement);
                }
                if (gjsElement.hasOwnProperty('components') && gjsElement.components.length > 0) {
                    this.createHtmlfromNestedObject(gjsElement.components, screensData, details, (res) => {
                    });
                }
                if(tagName !== 'grid-type' && tagName !== 'specialdropdown-type' && tagName !== 'dynamicdropdown-type' && tagName !== 'select' && tagName !== 'option') {
                    this.setCloseTag(tagName);
                }
                next();
            });
        }, (err) => {
            if (err) {
                callback('');
            } else {
                callback(this.htmlContent);
            }
        });
    }
    async generateHtml(gjsComponentMetadata, screensData, details) {
        this.htmlContent = '';
        const templatePath = path.resolve(__dirname, '../../templates');
        let screenHtmlContent = [];
        let filePath = templatePath + `/ComponentHtml.handlebars`;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + `/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        const screenName = screensData.screenName;
        const firstElement = screenName.charAt(0).toUpperCase();
        const otherElements = screenName.substring(1, screenName.length);
        const screenGenerationPath = applicationPath + `/${screenName.toLowerCase()}`;
        Common.createFolders(screenGenerationPath);
        this.createHtmlfromNestedObject(gjsComponentMetadata, screensData, details, (response) => {
            response = `<h2 class="screen-align">${firstElement + otherElements}</h2>` + response;
            const beautifyHtml = beautify(response, { format: 'html' });
            componentSupportWorker.writeFile(screenGenerationPath + `/${screenName.toLowerCase()}.component.html`, beautifyHtml, (writeResponse) => {
                // handle callback;
            });
        });
    }

    tagNameFunction(firstEle) {
        let tagName = '';
        if (firstEle.hasOwnProperty('tagName')) {
            tagName = firstEle.tagName;
        } else if (firstEle.hasOwnProperty('type')) {
            if (
                firstEle.type != 'grid-row' && firstEle.type != 'grid-item' &&
                (firstEle.type == 'specialdropdown-type' || firstEle.type == 'label' || firstEle.type == 'section' || firstEle.type == 'input' || firstEle.type == 'grid-type')
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
            if (firstEle.components && firstEle.components.length > 0 && firstEle.components[0].type === 'dynamicdropdown-type') {
                tagName = firstEle.components[0].type;
            } else {
                tagName = 'div';
            }
        }
        return tagName;
    }

    modifyDependency(details, callback) {
        dependencyWorker.modifyDependency(details, (res) => {
            callback();
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
                fs.writeFile(screenGenerationPath + `/${screenName.toLowerCase()}.component.html`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
}