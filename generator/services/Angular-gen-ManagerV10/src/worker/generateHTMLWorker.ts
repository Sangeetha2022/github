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
import * as componentDependency from '../config/componentDependency';



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

    private GRID_CLICK_HTML = {
        htmlOptionName: 'selectionChanged',
        htmlMethodName: 'onSelectionChanged',
        htmlParams: '$event'
    }

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
            const keys = Object.keys(item.attributes);
            keys.forEach((key) => {
                this.htmlContent += `${key}="${item.attributes[key]}" `
            });
        }
    }
    /**
     * Set AngularAttributes(ngModel, click)
     */
    setAngularAttributes(gjsElement, screensData, tagName, details, mappedEntityName = '') {
        if(tagName !== 'grid-type' && tagName !== 'specialdropdown-type' && tagName !== 'select' && tagName !== 'option' && gjsElement.attributes && gjsElement.attributes.id) {
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
                    if(flow.htmlId && gjsElement.attributes && gjsElement.attributes.id && gjsElement.attributes.id === flow.htmlId && tagName !== 'dynamicdropdown-type' && !mappedEntityName) {
                        this.htmlContent += `(click)="${flow.flowName}()" `;
                    } 
                    // Adding entity name before the methods only for dynamicdropdown-type click event
                    else if(flow.htmlId && gjsElement.attributes && gjsElement.attributes.id && gjsElement.attributes.id === flow.htmlId && tagName === 'dynamicdropdown-type' && mappedEntityName) {
                        this.htmlContent += `(click)="${mappedEntityName + flow.flowName}()" `;
                    }
                });
            }
            // callback(gjsElement);
        }
        // Set grid-type
        // else if (tagName === 'grid-type') {
        //     // Create bootstrap table
        //     if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == true) {
        //         bootstrapTableHtml.BootstrapTableHTMLGeneration(gjsElement, screensData, details, (response) => {
        //             this.htmlContent += response;
        //             callback('Grid Type Completed');
        //         });
        //     }
        //     // Create ag-grid table
        //     else if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == false) {
        //         agGridTableHtml.agGridTableHTMLGeneration(gjsElement, screensData, details, (response) => {
        //             this.htmlContent += response;
        //             callback('Ag-Grid Completed');
        //         });
        //     }
        // }
        // // Set specialdropdown-type
        // else if (tagName === 'specialdropdown-type') {
        //     specialDropDown.specialDropDownHTMLGeneration(gjsElement, screensData, details, (response) => {
        //         this.htmlContent += response;
        //         callback('Special Dropdown Completed');
        //     });
        // }
        // // Set dynamicdropdown-type
        // else if (tagName === 'dynamicdropdown-type') {
        //     console.log('11111111111   BEFORE HTML CONTENT---->>>>', this.htmlContent);
        //     dynamicDropDown.dynamicDropDownHTMLGeneration(gjsElement, screensData, details, (response) => {
        //         console.log('3333333333333 DROPDOWN RESPONSE---->>>>', response);
        //         this.htmlContent += response;
        //         callback('DYNAMIC DROP DOWN' +  JSON.stringify(gjsElement));
        //     });
        // }
        // // Set select 
        // else if (tagName === 'select' && !gjsElement.hasOwnProperty('name')) {
        //     select.SelectGeneration(gjsElement, screensData, details, (response) => {
        //         this.htmlContent += response;
        //         callback('Select Completed');
        //     });
        // } 
        // else {
        //     callback('Else Block' + JSON.stringify(gjsElement));
        // }
    }
    /**
     * Set Classes
     * @param item 
     * @param tagName 
     */
    setClasses(item, tagName) {
        let classess = '';
        if(item.hasOwnProperty('classes')) {
            console.log("set class");
            item.classes.forEach((element, index) => {
                if(index + 1 === item.classes.length) {
                    console.log("set class element",element);
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
            if(tagName === 'dynamicdropdown-type' || tagName === 'specialdropdown-type') {
                this.htmlContent += `</ng-select>`;
            } else {
                this.htmlContent += `</${tagName}>\n`;
            }
        }
    }
    /**
     * Generate Dynamic Dropdown
     * @param gjsElement 
     * @param screensData 
     * @param tagName 
     * @param details 
     */
    generateDynamicDropDown(gjsElement, screensData, tagName, details) {
        const screenEntityDetails = screensData.entity_info;
        const overAllEntities = details.entities;
        let mappedEntityName = '';
        let bindLable = ''
        this.htmlContent += `<div `;
        this.setAttributes(gjsElement);
        this.setClasses(gjsElement, tagName);
        const gjsElementComponents = gjsElement.components[0];
        this.htmlContent += `<ng-select `;
        this.setAttributes(gjsElementComponents);
        this.htmlContent += `name="${gjsElementComponents.name || ''}" `;
        this.htmlContent += `[searchable]="true" [virtualScroll]="true" `
        if (gjsElement.components && gjsElement.components.length > 0) {
            gjsElement.components.forEach(component => {
                screenEntityDetails.forEach(async (entityField: any) => {
                    if (component.name === entityField.elementName) {
                        overAllEntities.forEach((entity: any) => {
                            if (entityField.entityId === entity._id) {
                                entity.field.forEach(fieldData => {
                                    if (fieldData._id === entityField.fields.fieldId && fieldData.type_name === 'Entity') {
                                        let mappedFieldDetails = fieldData.entity_id.field.filter((x) => x._id === fieldData.entity_field);
                                        let fieldDataObject = mappedFieldDetails[0];
                                        mappedEntityName = fieldData.entity_id.name;
                                        bindLable = fieldDataObject.name;
                                        // this.htmlContent += `bindLabel="${fieldDataObject.name}" bindValue="${fieldDataObject.name}" `
                                    }
                                })
                                // entityField.entityName = entity.name;
                                // component.attributes.entityDetails = entityField;
                            }
                        })
                    }
                });
            });
        }
        this.htmlContent += `[items]="${mappedEntityName}itemArray" `;
        this.htmlContent += `bindLabel="${bindLable}" bindValue="${bindLable}" `
        this.setAngularAttributes(gjsElementComponents, screensData, tagName, details, mappedEntityName);
        this.setClasses(gjsElementComponents, tagName);
        this.setCloseTag(tagName);
        this.setCloseTag('div');
    }
    /**
     * Generate Special Dropdown
     * @param gjsElement 
     * @param tagName 
     * @param details 
     */
    generateSpecialDropdown(gjsElement, tagName) {
        this.htmlContent += `<div `;
        this.setAttributes(gjsElement);
        this.setClasses(gjsElement, tagName);
        gjsElement = gjsElement.components[0];
        this.htmlContent += `<ng-select `;
        this.setAttributes(gjsElement);
        this.htmlContent += `[searchable]="true" [virtualScroll]="true" name="${gjsElement.name || ''}" `;
        this.setClasses(gjsElement, tagName);
        this.setCloseTag(tagName);
        this.setCloseTag('div');
    }
    /**
     * 
     * @param gjsElement 
     * @param tagName 
     */
    generateSelect(gjsElement, tagName) {
        this.htmlContent += `<div>`;
        this.htmlContent += `<select `;
        this.setAttributes(gjsElement);
        this.setClasses(gjsElement, tagName);
        this.htmlContent += `<option  *ngFor="let option of options" [ngValue]="option.key">{{option.value}}</option>`;
        this.setCloseTag(tagName);
        this.setCloseTag('div');
    }
    /**
     * 
     * @param gjsElement 
     * @param screensData 
     * @param tagName 
     */
    generateAgGrid(gjsElement, screensData) {
        this.htmlContent += `<div `;
        this.htmlContent += `name="${gjsElement.name}" `;
        this.setAttributes(gjsElement);
        if (gjsElement.components !== undefined) {
            screensData.flows_info.forEach(element => {
                if (gjsElement.name === element.elementName) {
                    if (element.flowName && element.flowName === 'GpGetAllValues') {
                        this.htmlContent += `(click)="GpGetAllValues()"`;
                    }
                }
            });
        }
        this.htmlContent += '>';
        const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
        if (gjsElement.components !== undefined) {
            this.htmlContent += `<ag-grid-angular `;
            findAgGridDependencies.htmlDependencies.forEach((ag_grid_angular) => {
                this.htmlContent += ag_grid_angular.toString();
            });
            if (screensData.grid_fields && screensData.grid_fields.event == 'Rowclick' && (screensData.route_info.find(i => i.routeType === 'queryParameter'))) {
                const gridData = `(${this.GRID_CLICK_HTML.htmlOptionName})="${this.GRID_CLICK_HTML.htmlMethodName}(${this.GRID_CLICK_HTML.htmlParams})"`;
                this.htmlContent += gridData;
            }
            this.htmlContent += `>`;
            this.setCloseTag('ag-grid-angular');
            this.setCloseTag('div');
        };
    }
    generateBootstrapTable(gjsElement, screensData, tagName) {
        this.htmlContent += `<div `;
        this.htmlContent = gjsElement.name ? this.htmlContent + `name="${gjsElement.name}" ` : this.htmlContent + '';
        this.setClasses(gjsElement, tagName);
        const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.BOOTSTRAP_TAGNAME);
        this.htmlContent += findAgGridDependencies.bootstrapTable;
        // rowclick
        if (screensData.grid_fields && screensData.grid_fields.event &&  screensData.grid_fields.event == "Rowclick" && (screensData.route_info.find(i => i.routeType === 'queryParameter'))) {
            this.htmlContent += `<tr (click)="onSelectionChanged(values)"  *ngFor="let values of rowData | slice: (page-1) * paginationPageSize :(page-1) * paginationPageSize + paginationPageSize" style="cursor: pointer;">`;
        } else {
            this.htmlContent += `<tr  *ngFor="let values of rowData | slice: (page-1) * paginationPageSize :(page-1) * paginationPageSize + paginationPageSize">`;
        }
        if(screensData.grid_fields && screensData.grid_fields.custom_field && screensData.grid_fields.custom_field.length > 0) {
            screensData.grid_fields.custom_field.forEach(element => {
                this.htmlContent += `<td>{{ values.${element.entityfield} }}</td>`
            });
        }
        this.htmlContent += `</tr> </tbody></table></div>`;
        this.htmlContent += findAgGridDependencies.paginationSection;
        this.setCloseTag('div');
    }
    /**
     * Recursive Function for Create HTML from Nested JSON Object
     * @param gjsComponentMetadata
     */
    createHtmlfromNestedObject(gjsComponentMetadata: Array<Object>, screensData, details, callback) {
        asyncLoop(gjsComponentMetadata, async (gjsElement, next) => {
            const tagName = this.tagNameFunction(gjsElement);
            if(tagName !== 'grid-type' && tagName !== 'specialdropdown-type' && tagName !== 'dynamicdropdown-type' && tagName !== 'select' && tagName !== 'option') {
                this.htmlContent += '<' + tagName + ' ';
                this.setAttributes(gjsElement);
            }
            this.setAngularAttributes(gjsElement, screensData, tagName, details);
            if (tagName !== 'grid-type' && tagName !== 'specialdropdown-type' && tagName !== 'dynamicdropdown-type' && tagName !== 'select' && tagName !== 'option') {
                this.setClasses(gjsElement, tagName);
                this.setContent(gjsElement);
            }

            if (tagName === 'dynamicdropdown-type') {
                this.generateDynamicDropDown(gjsElement, screensData, tagName, details);
            }
            if(tagName === 'specialdropdown-type') {
                this.generateSpecialDropdown(gjsElement, tagName);
            }
            if (tagName === 'select' && !gjsElement.hasOwnProperty('name')) {
                this.generateSelect(gjsElement, tagName);
            }
            if (tagName === 'grid-type') {
                // Create bootstrap table
                if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == true) {
                    this.generateBootstrapTable(gjsElement, screensData, tagName);
                }
                // Create ag-grid table
                else if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == false) {
                    this.generateAgGrid(gjsElement, screensData);
                }
            }
            if (gjsElement.hasOwnProperty('components') && gjsElement.components.length > 0) {
                this.createHtmlfromNestedObject(gjsElement.components, screensData, details, (res) => {
                });
            } 
            if (tagName !== 'grid-type' && tagName !== 'dynamicdropdown-type' && tagName !== 'specialdropdown-type' && tagName !== 'select' && tagName !== 'option') {
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
    async generateHtml(gjsComponentMetadata, screensData, details) {
        console.log("gjsComponentMetadata===",gjsComponentMetadata);
        console.log('DETAILS---->>>>', JSON.stringify(details));
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
            console.log('HTML CONTENT---->>>>', response);
            response = `<h2 class="screen-align">${firstElement + otherElements}</h2>` + response;
            const beautifyHtml = beautify(response, { format: 'html' });
            componentSupportWorker.writeFile(screenGenerationPath + `/${screenName.toLowerCase()}.component.html`, beautifyHtml, (writeResponse) => {
                // handle callback;
            });
        });
        // await asyncLoop(gjsComponentMetadata, (item, next) => {
        //     if (item) {
        //         this.tagName = this.tagNameFunction(item);
        //         console.log('tag name====================>>>>', this.tagName);
        //         // form generation
        //         if (this.tagName == 'form') {
        //             forms.formHTMLGeneration(item, screensData, details, (response) => {
        //                 screenHtmlContent.push({ data: response.toString() });
        //                 next();
        //             });
        //         }

        //         // specific Input generation
        //         if (this.tagName == 'input') {

        //             if (item.type == 'input') {
        //                 generateInput.inputGeneration(item, screensData, details, (response) => {
        //                     screenHtmlContent.push({ data: response.toString() });
        //                     next();
        //                 });
        //             }
        //             if (item.type == 'radio') {
        //                 radiobutton.radiobuttonHTMLGeneration(item, screensData, details, (response) => {
        //                     screenHtmlContent.push({ data: response.toString() });
        //                     next();
        //                 });
        //             }

        //             if (item.type == 'checkbox') {
        //                 checkbox.checkboxGeneration(item, screensData, details, (response) => {
        //                     screenHtmlContent.push({ data: response.toString() });
        //                     next();
        //                 });
        //             }
        //         }
        //         if (this.tagName == 'button') {
        //             let formResponse = button.buttonHTMLGeneration(item, screensData, details, (response) => {
        //                 screenHtmlContent.push({ data: response.toString() });
        //                 next();
        //             });
        //         }
        //         if (this.tagName == 'select') {
        //             select.SelectGeneration(item, screensData, details, (response) => {
        //                 screenHtmlContent.push({ data: response.toString() });
        //                 next();
        //             });
        //         }
        //         // 
        //         if (this.tagName == 'grid-type') {
        //             if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == true) {
        //                 bootstrapTableHtml.BootstrapTableHTMLGeneration(item, screensData, details, (response) => {
        //                     screenHtmlContent.push({ data: response });
        //                     next();
        //                 })
        //             }
        //             else if (screensData.is_grid_present == true && screensData.is_bootStrapTable_present == false) {
        //                 agGridTableHtml.agGridTableHTMLGeneration(item, screensData, details, (response) => {
        //                     screenHtmlContent.push({ data: response });
        //                     next();
        //                 })
        //             }
        //         }
        //         if (this.tagName === 'a') {
        //             link.generateLink(item, screensData, details, (response) => {
        //                 screenHtmlContent.push({ data: response });
        //                 next();
        //             })
        //         }
        //         if (this.tagName === 'specialdropdown-type') {
        //             specialDropDown.specialDropDownHTMLGeneration(item, screensData, details, (response) => {
        //                 screenHtmlContent.push({ data: response });
        //                 next();
        //             })
        //         }
        //         if (this.tagName === 'dynamicdropdown-type') {
        //             dynamicDropDown.dynamicDropDownHTMLGeneration(item, screensData, details, (response) => {
        //                 screenHtmlContent.push({ data: response });
        //                 next();
        //             })
        //         }
        //         if (this.tagName === 'label') {
        //             label.labelHTMLGeneration(item, screensData, details, (response) => {
        //                 screenHtmlContent.push({ data: response });
        //                 next();
        //             })
        //         }
        //     } else {
        //         next();
        //     }
        // }, (err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         let fileData = {
        //             screenHtmlContent: screenHtmlContent,
        //             screenName: screenName
        //         }
        //         this.handleBarsFile(filePath, fileData, screenGenerationPath, screenName);
        //     }
        // })
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