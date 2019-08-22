import * as util from 'util';
import * as asyncForEach from 'async-foreach';
import { ComponentWorker } from './componentWorker';
import { Constant } from '../config/Constant';
import * as componentDependency from '../assets/componentDependency';
import { threadId } from 'worker_threads';
// import { styles } from '../assets/cssGuidline';
// import { RouteSupportWorker } from '../supportworker/RouteSupportWorker';

// let routeSupportWorker = new RouteSupportWorker();
let componentWorker = new ComponentWorker();
export class GenerateHtmlWorker {

    private forEach = asyncForEach.forEach;
    private firstEle: any = null;
    private secondEle: any[] = [];
    private startTag: any[] = [];
    private endTag: any[] = [];
    private tagName: String = null;
    private startString: String = '';
    private count: number = 0;
    private parentTest: any[] = [];
    private isNotImportant: Boolean = false;
    private isContentOnly: Boolean = false;

    private CKEDITOR_HTMLID_NAME = 'ckeditortextarea';
    private TEXTAREA_TAGNAME = 'textarea';
    private CKEDITOR_TAGNAME = 'ckeditor';
    private CKEDITOR_SPAN_IDNAME = 'ckeditorspan';
    private isCKeditorSpan = false;

    // entity and flows for Each screens
    private entityDetails = [];
    private flowDetails = [];

    // set other dependencies 
    private entities = [];
    private flowList = [];
    private endPointList: any;

    private tsComponent = {
        variableList: [],
        dependenciesVariableList: [],
        flowMethod: [],
        otherMethodNames: []
    }

    private serviceComponent = {
        variableList: [],
        dependenciesVariableList: [],
        flowMethod: [],
        apiEndPoints: []
    }

    private componentStyle = [];
    private selectOption = `<option *ngFor="let option of option" [ngValue]="option.key">{{option.value}}</option>`;
    private cssGuidelines = [];
    private ckeditorEntities: any = null;

    initializeData() {
        // add cssGuidelines
        this.cssGuidelines = [];
    }
    generate(metaData, screenStyles, screenDetails, componentName, details, callback) {
        this.startTag = [];
        this.endTag = [];
        // component
        this.tsComponent = {
            variableList: [],
            dependenciesVariableList: [],
            flowMethod: [],
            otherMethodNames: []
        }

        // service
        this.serviceComponent = {
            variableList: [],
            dependenciesVariableList: [],
            flowMethod: [],
            apiEndPoints: []
        }

        this.componentStyle = [];
        // add default styles
        this.componentStyle.push(screenStyles);


        console.log('generatehtlmworker componentstyles are ----  ', this.componentStyle);
        this.entityDetails = screenDetails.entity_info;
        this.flowDetails = screenDetails.flows_info;
        // list of other dependencies
        this.entities = details.entities;
        this.flowList = details.flows;
        this.endPointList = details.nodeResponse;
        this.cssGuidelines = details.cssGuidelines;

        this.generateHtml(metaData);
        // this.templateMainObj.tag = this.startTag;
        // this.TemplateTag = this.startTag;
        console.log('after completed all method in child startTag are   ', `${this.startTag.join(`\n`)}`);
        // console.log('tscomponent object are ------  ', util.inspect(this.tsComponent, { showHidden: true, depth: null }));
        this.generateComponent(componentName, details, callback);
        // this.generateComponent(componentName, details, (response) => {
        //     console.log('generateComponent vale in  are -----  ', )
        //     callback({ Message: 'Feature Screen created successfully' })
        // });
        // console.log('after completed all method in child scriptTag are   ', `${this.startTag.join(`\n`)}`);
        // console.log('after completed all method in child templateTag are   ', `${this.startTag.join(`\n`)}`);
    }

    generateComponent(componentName, details, callback) {
        // console.log('generate component are ---- ', util.inspect(details, { showHidden: true, depth: null }));
        // console.log('html tag result in generate component are -----  ', this.startTag);
        // console.log('generate service component are -----  ', this.serviceComponent);
        console.log('generatecomponent name in generatehtmlworkers are -----  ', componentName);
        const applicationPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        const packagePath = details.projectGenerationPath;
        const templatePath = details.templateLocation.frontendTemplate;
        componentWorker.generateComponentHtml(applicationPath, templatePath, componentName, this.startTag, (response) => {
            componentWorker.generateComponentTs(applicationPath, templatePath, componentName, this.tsComponent, this.entities, (response) => {
                componentWorker.generateComponentService(applicationPath, templatePath, componentName, this.serviceComponent, (response) => {
                    // console.log('before calling generatecomponentcss from generatehtlm -----  ', this.componentStyle);
                    componentWorker.generateComponentCss(applicationPath, templatePath, componentName, this.componentStyle, (response) => {
                        componentWorker.generateComponentSpec(applicationPath, templatePath, componentName, this.startTag, (response) => {
                            componentWorker.generateComponentModule(applicationPath, templatePath, componentName, this.startTag, (response) => {
                                // console.log('component worker in generate component modeule in-----  ');
                                // this.modifyDependency(applicationPath, packagePath, callback)
                                callback();
                            })
                        })
                    })
                })
            })
        })
    }

    modifyDependency(details, callback) {
        console.log('modifydependency calling in gnerateHTML Workere s');
        const applicationPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        const packagePath = details.projectGenerationPath;
        componentWorker.modifyDependency(applicationPath, packagePath, (response) => {
            console.log('modify dependency response rare ----  ');
            this.initializeData();
            callback({ Message: `Feature Screen created successfully` });
        })
    }


    generateHtml(grapesJSMetadata) {
        this.forEach(grapesJSMetadata, (item, index, arr) => {
            let tempObj = { endTagName: null };
            if (index === 0) {
                this.firstEle = item;
            } else {
                this.parentTest.push(item);
            }
            this.tagName = this.tagNameFunction(item);
            // console.log('tagName for each iterate value are -parent----   ', this.tagName, ' --item.content--  ', item.content);
            if (item.type === 'textnode') {
                tempObj.endTagName = 'label';
                this.parentTest.push(tempObj);
            } else if (!this.tagName || this.tagName == 'div') {
                tempObj.endTagName = 'div';
                this.parentTest.push(tempObj);
            } else if (this.tagName == 'form') {
                tempObj.endTagName = 'form';
                this.parentTest.push(tempObj);
            } else if (this.tagName == 'section') {
                tempObj.endTagName = 'section';
                this.parentTest.push(tempObj);
            } else if (!item.content &&
                (this.tagName == 'nav' || this.tagName == 'header' || this.tagName == 'footer')) {
                tempObj.endTagName = this.tagName;
                this.parentTest.push(tempObj);
            }
            if (index === grapesJSMetadata.length - 1) {
                if (this.parentTest.length > 0) {
                    this.secondEle.unshift(this.parentTest);
                }
                this.generateChildHtml(this.firstEle, this.secondEle);
            }
        })
    }

    generateChildHtml(firstEle, secondEle) {
        // console.log(`firstElE -11--${this.count}-- `, firstEle);
        // console.log(`secondElE -22--${this.count}-- `, secondEle);
        this.tagName = '';
        this.startString = '';
        this.isCKeditorSpan = false;
        if (firstEle && firstEle.hasOwnProperty('endTagName')) {
            this.startTag.push(`</${firstEle.endTagName}>`);
            this.getNextValue(secondEle);
        } else if (firstEle) {
            this.tagName = this.tagNameFunction(firstEle);
            if (firstEle.type == 'textnode') {
                this.startTag.push(firstEle.content);
                // console.log('pushed ttextnode are ------------ ', this.startTag);
                this.getNextValue(secondEle);
            } else if (!this.tagName) {
                this.tagName = 'div';
            }
            this.isNotImportant = false;
            this.isContentOnly = false;
            // set html classes
            this.setClasses(firstEle, secondEle);
            // set html attributes
            this.setAttributes(firstEle);
            // set html contents
            this.setContent(firstEle);
            // based on value push it into startTag and endTag
            this.pushValue(firstEle);
            // check if the current html contents child components or not if it
            this.childComponents(firstEle);
        }
    }

    setClasses(firstEle, secondEle) {
        if (firstEle.hasOwnProperty('classes')) {
            // console.log('firstEle classes are ---- ', firstEle.classes[0], ' ---firstELE classes length-- ', firstEle.classes.length);
            if (!firstEle.hasOwnProperty('tagName') && !this.tagName) {
                this.tagName = 'div';
            }
            let className = this.getClassName(firstEle);

            const defaultClassNames = this.addClassName('class');
            if (defaultClassNames) {
                if (!className.includes(defaultClassNames) && className.toLowerCase() != 'radio') {
                    className += ` ${this.addClassName('class')}`;
                }
            }
            // console.log('finded class name are -----  ', css[this.tagName]);
            // console.log('set each classNmaes are -------- ', className);
            if (className) {
                if (className == Constant.STATE_SUCCESS_CLASSNAME || className == Constant.STATE_ERROR_CLASSNAME) {
                    this.isNotImportant = true;
                } else if (className.toLowerCase() != 'radio') {
                    this.startString += `<${this.tagName} class='${className}'`
                }
            }

        } else {
            const defaultClassNames = this.addClassName('class');
            if (defaultClassNames) {
                this.startString += `<${this.tagName} class='${defaultClassNames}'`
            }
        }
    }

    addClassName(cssTypes) {
        // additional
        const cssGuides = this.cssGuidelines.find(x => x.tagName == this.tagName);
        if (cssGuides) {
            if (cssTypes == 'class') {
                return cssGuides.className;
            }
        } else {
            return null;
        }
        // if (this.tagName == 'form') {
        //     return 'form';
        // }
        // if (this.tagName == 'input') {
        //     return `form-control`;
        // }
        // if (this.tagName == 'select') {
        //     return `form-control`;
        // }
        // if (this.tagName == 'textarea') {
        //     return `form-control`;
        // }
        // if (this.tagName == 'button') {
        //     return `btn btn-primary`;
        // }
    }

    getClassName(firstEle) {
        let temp = '';
        if (firstEle.classes && firstEle.classes.length > 0) {
            this.forEach(firstEle.classes, (item, index, arr) => {
                temp += `${item.name}`;
                if (firstEle.classes.length - 1 == index) {
                } else {
                    temp += ` `;
                }
            });
        }
        return temp;
    }

    removeClassName(removeTagName) {
        const temp = this.cssGuidelines.find(x => x.tagName == removeTagName);
        if (temp) {
            this.startString = this.startString.replace(temp.className, '');
        }
    }


    setAttributes(firstEle) {
        if (firstEle.hasOwnProperty('attributes') && this.tagName !== 'form') {
            let attributes = Object.keys(firstEle.attributes);
            if (!this.startString) {
                this.startString += `<${this.tagName}`
            }
            attributes.forEach(element => {
                if (element === 'name' && firstEle.name) {
                    // added previour
                    if (this.startString.includes('radio')) {
                        console.log('is radio buttone are -----  ', this.startString);
                        this.removeClassName('input');
                        this.startString += ` ${element}='${firstEle.attributes[element]}'`;
                    } else {
                        this.startString += ` ${element}='${firstEle.name}'`;
                    }
                    if (this.startString.includes('checkbox')) {
                        this.removeClassName('input');
                    }
                } else {
                    if (this.tagName != 'base' && element === 'href' && firstEle.attributes[element] === Constant.HREF_BASE) {
                        this.startString += ` [routerLink]="['${firstEle.attributes[element]}']"`;
                    } else {
                        this.startString += ` ${element}='${firstEle.attributes[element]}'`;
                    }
                    // if (element === 'id' && firstEle.attributes[element] === this.MAINMENU_ATTRIBUTE) {
                    //     this.setNav(firstEle, this.secondEle);
                    // }
                }

            })
            // set html traits
            this.setTraits(firstEle);
            if (this.tagName === 'input' || this.tagName === 'meta' || this.tagName === 'link') {
                this.startString += `/>`;
            } else {
                this.startString += `>`;
            }
        } else {
            // set html traits
            this.setTraits(firstEle);
            if (this.startString) {
                this.startString += `>`;
            }
        }
        // checking and add the ckeditor5
        console.log('each tagname are -----  ', this.tagName);
        console.log('each startString are -----  ', this.startString);
        if (this.tagName == this.TEXTAREA_TAGNAME && this.startString.includes(this.CKEDITOR_HTMLID_NAME)) {
            console.log('entering into change textarea into ckeditor5 --- ', this.startString);
            this.startString = this.startString.replace(this.tagName.toString(), this.CKEDITOR_TAGNAME);
            const findckeditorDependencies = componentDependency.component.find(x => x.name == this.CKEDITOR_TAGNAME);
            this.removeClassName('textarea');
            if (findckeditorDependencies) {
                this.startString = this.startString.replace('>', ` ${findckeditorDependencies.htmlDependencies}>`);
            }
            this.tagName = this.CKEDITOR_TAGNAME;
            // adding ckeditor5 in tscomponent dependencies
            this.tsComponent.otherMethodNames.push(this.CKEDITOR_TAGNAME);
        }
    }

    setTraits(firstEle) {
        if (firstEle.hasOwnProperty('traits')) {

            if (this.entityDetails.length > 0 || this.flowDetails.length > 0) {
                firstEle.traits.forEach(traitElement => {
                    const entityIndex = this.entityDetails.findIndex(x => x.elementName == traitElement.value);
                    const flowIndex = this.flowDetails.findIndex(x => x.elementName == traitElement.value);
                    console.log('entity and flows index are ---- ', entityIndex, ' --flowIndex-- ', flowIndex);
                    // span with data binding 
                    if (entityIndex > -1 && this.tagName == 'span') {
                        console.log('span values are -----  ', this.startString);
                        console.log('span entities details are -----  ', this.entityDetails[entityIndex]);
                        this.ckeditorEntities = this.entityDetails[entityIndex];
                        // this.childComponents(firstEle);
                        // this.getNextValue(this.secondEle);
                        this.isCKeditorSpan = true;
                    } else if (entityIndex > -1 && !this.isCKeditorSpan) {
                        console.log('entering into else if else if enditityINdex values')
                        this.setDataBinding(this.entityDetails[entityIndex], this.tagName);
                    }
                    // adding flows action
                    if (flowIndex > -1) {
                        console.log('identitied flow index are -----  ', this.flowDetails[flowIndex]);
                        const flowObject = this.flowList.find(x => x._id == this.flowDetails[flowIndex].flow);
                        console.log('flowObject ---------->>>   ', flowObject);
                        this.startString += ` (click)="${flowObject.name}()"`;
                        const flowTemp = {
                            _id: flowObject._id,
                            name: flowObject.name,
                            label: flowObject.label,
                            description: flowObject.description,
                            type: flowObject.type,
                            actionOnData: flowObject.actionOnData,
                            createWithDefaultActivity: flowObject.createWithDefaultActivity,
                            components: []

                        }
                        // component method
                        if (!this.tsComponent.flowMethod.find(x => x._id == this.flowDetails[flowIndex].flow)) {
                            const componentFlow = flowObject.components.find(x => x.name.toLowerCase() === Constant.GP_ANGULAR_COMPONENT);
                            if (componentFlow) {
                                flowTemp.components = componentFlow;
                            }
                            this.tsComponent.flowMethod.push(flowTemp);
                        }
                        // service method
                        if (!this.serviceComponent.flowMethod.find(x => x._id == this.flowDetails[flowIndex].flow)) {
                            const serviceFlow = flowObject.components.find(x => x.name.toLowerCase() === Constant.GP_ANGULAR_SERVICE);
                            if (serviceFlow) {
                                flowTemp.components = serviceFlow;
                            }
                            this.serviceComponent.flowMethod.push(flowTemp);
                        }
                        console.log('the endpointlist in generate htm lworker aer ae- ----   ', this.endPointList);
                        const api = this.endPointList.flowAction.find(x => x.methodName == flowObject.name);
                        console.log('finded api are ----  ', api);
                        if (this.serviceComponent.apiEndPoints.findIndex(x => x.methodName == flowObject.name) < 0) {
                            this.serviceComponent.apiEndPoints.push(api);
                            console.log('after added api endpoints in ')
                        }
                    }
                })
                // add ckeditor ngModels
                if (this.ckeditorEntities && !this.isCKeditorSpan) {
                    console.log('entering into else if ckeditroentities --- ', this.tagName);
                    this.setDataBinding(this.ckeditorEntities, this.tagName);
                    this.ckeditorEntities = null;
                    // adding data binding
                }
            }
            if (this.tagName == 'input') {
                if (this.startString.includes('radio')) {
                    // console.log('radio input tytpes firsteleme are ----  ', firstEle);
                    // console.log('radio input tytpes startString are ----  ', this.startString);
                    // console.log('radio input entiteis are ----- ', this.entities);
                }
            }
            if (this.tagName == 'select') {
                // console.log('select firstELEM are ---- ', firstEle);
                // console.log('select secondELE are ---- ', this.secondEle);
                // console.log('select startString are ---- ', this.startString);
                this.getSelectOptions(firstEle.components);
            }
        }
    }

    setDataBinding(entityDetails, tagName) {
        const variableTemp = {
            entityId: '',
            entityName: '',
            fields: []
        }
        console.log('identified entity index are -----  ', entityDetails, ' ---tagname---  ', tagName);
        const entityObject = this.entities.find(x => x._id == entityDetails.entityId);
        console.log('entities object are ----------  ', entityObject);
        this.startString += ` [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}"`;
        const variableObject = this.tsComponent.variableList.find(x => x.entityId == entityDetails.entityId);
        console.log('variableList ------>>>>  ', variableObject);
        console.log('startString ---ngModels--->>>>  ', this.startString);
        if (variableObject) {
            variableObject.fields.push(entityDetails.fields.name);
        } else {
            variableTemp.entityId = entityDetails.entityId;
            variableTemp.entityName = entityObject.name;
            variableTemp.fields.push(entityDetails.fields.name);
            this.tsComponent.variableList.push(variableTemp);
        }
    }

    getSelectOptions(optionComponent) {
        if (optionComponent.length > 0) {
            let temp = `option = [`;
            optionComponent.forEach((optionElement, index) => {
                temp += `\n{ key: '${optionElement.attributes.value}', value: '${optionElement.content}' }`;
                if (optionComponent.length - 1 != index) {
                    temp += `,`;
                }
            })
            temp += `\n]`;
            this.tsComponent.variableList.push(temp);
            console.log('getselect optons list are -----  ', this.tsComponent.variableList);
        }
    }

    setContent(firstEle) {
        if (firstEle.hasOwnProperty('content')) {
            // console.log('tagname of values rae ----- ', this.tagName, '  ---content---  ', firstEle.content);
            if (this.startString && firstEle.content) {
                // console.log('content startstring are -----test----  ', this.startTag);
                this.startString += `${firstEle.content}`;
            } else if (!this.startString && firstEle.type != 'textnode') {
                this.isContentOnly = true;
                this.startString += `<${this.tagName}>${firstEle.content}`;
                if (this.tagName == 'script' || this.tagName == 'title' ||
                    (firstEle.content &&
                        (this.tagName == 'p' || firstEle.type == 'header' ||
                            this.tagName == 'span' || this.tagName == 'div' || this.tagName == 'label'))
                ) {
                    // console.log('set content of firstelement --tagname-- ', this.tagName)
                    this.startString += `</${this.tagName}>`
                }
                // this.startTag.push(this.startString);
                if (this.count < 10) {
                    // console.log('need to knsow ------------  ', this.startTag);
                }
                this.setTagValue();
                // if (this.tagName == 'title') {
                //     this.mainHtmlTag.push(`<base href="/" />`);
                // }
                // console.log('isContentOnly pushed values are ---item.content-- ', firstEle.content, '  --item.type---  ', firstEle.type);

            } else if (!firstEle.content && (this.tagName == 'button' || this.tagName == 'input')) {
                this.isContentOnly = true;
                this.setTagValue();
                // this.startTag.push(this.startString);
            } else {
                // if(this.count < 10) {
                //     console.log('need to knsow ------------  ', this.startTag);
                // }
                // this.startString = firstEle.content;
                // this.isContentOnly = true;
                // this.setTagValue(); 
            }
            // console.log('setContent vlaue of isContentOnly is ----  ', this.isContentOnly, ' --complete---  ', this.startTag);
        }
        if (firstEle.content == 'Email') {
            console.log('firstEle content ------  ', this.startString, ' ---isContentOnly-- ', this.isContentOnly, ' -isNotImportant-- ', this.isNotImportant);
        }
    }


    pushValue(firstEle) {
        if (this.tagName && this.tagName != 'option' &&
            !this.isContentOnly &&
            !this.isNotImportant &&
            !this.startString.includes(this.CKEDITOR_SPAN_IDNAME)) {
            // console.log('pushed value tagname are -------->>>   ', this.tagName, ' ---firstEle.content---- ', firstEle.content);
            if (this.tagName == 'select') {
                this.startString += '\n' + this.selectOption;
                this.startString += `</${this.tagName}>`;
                console.log('select tagname in push values are -----  ', this.startString);
                this.setTagValue();
            } else if (this.startString && this.tagName != 'div' && this.tagName != 'form') {
                if (!firstEle.content && (this.tagName == 'label' || this.tagName == 'footer'
                    || this.tagName == 'section' || firstEle.type == 'header' || this.tagName == 'header'
                    || this.tagName == 'nav' || this.tagName == 'a' || this.tagName == 'svg' ||
                    this.tagName == 'p' || this.tagName == 'br' || this.tagName == 'meta' ||
                    this.tagName == 'link' || this.tagName == 'li' || this.tagName == 'ul' || this.tagName == 'g' ||
                    this.tagName == 'base' || this.tagName == 'span' || this.tagName == 'img' || this.tagName == 'h1' ||
                    this.tagName == 'h2' || this.tagName == 'h3' ||
                    this.tagName == 'h4' || this.tagName == 'h5' ||
                    this.tagName == 'h6' || this.tagName == 'hr')) {
                    this.endTag.unshift(`${this.tagName}`);
                } else {
                    this.startString += `</${this.tagName}>`
                }
                // this.startTag.push(this.startString);
                this.setTagValue();
            } else if (this.startString && this.tagName == 'div' && firstEle.content) {
                this.startString += `</${this.tagName}>`;
                this.setTagValue();
            } else if (this.startString) {
                this.setTagValue();
            }
        } else {
        }
    }

    setTagValue() {
        this.startTag.push(this.startString);
        // if (this.tagName == 'meta' || this.tagName == 'title' ||
        //     this.tagName == 'link' || this.tagName == 'base') {
        //     this.mainHtmlTag.push(this.startString);
        // } else if (this.tagName == 'script') {
        //     this.scriptTag.push(this.startString);
        // } else {
        //     this.startTag.push(this.startString);
        // }
    }

    childComponents(firstEle) {
        // console.log('entering into chiuld component ');
        if (firstEle.hasOwnProperty('components')) {
            // console.log(`child component firstELEM are ---${this.count}------   `, firstEle.components.length);
            if (typeof firstEle.components !== 'undefined' && firstEle.components.length === 0) {
                this.getNextValue(this.secondEle);
            }
            let firstTemp = null;
            var test = [];
            this.forEach(firstEle.components, (item, index, arr) => {
                // console.log('for each child component are --------  ', index, '  items   ', item);
                let tempObj = { endTagName: null };
                if (index === 0) {
                    firstTemp = item;
                } else {
                    test.push(item);
                }
                this.tagName = this.tagNameFunction(item);
                // console.log('before pushing the tagname in array ----  ', this.tagName, ' --item type---- ', item.type, ' ---item.content---  ', item.content);
                if (!item.classes || (item.classes && item.classes.length === 0) || (item.classes && item.classes.length > 0 &&
                    item.classes[0].name !== Constant.STATE_SUCCESS_CLASSNAME &&
                    item.classes[0].name !== Constant.STATE_ERROR_CLASSNAME)) {
                    if (!item.content && item.type === 'textnode') {
                        tempObj.endTagName = this.endTag.shift();
                        if (tempObj.endTagName) {
                            test.push(tempObj);
                            // console.log('if- ', this.tagName, ' --endtagname--  ', tempObj.endTagName);
                        }
                    } else if (!item.content && this.checkTagAttributes(item) &&
                        (this.tagName == 'button' || this.tagName == 'a' ||
                            this.tagName == 'ul' || this.tagName == 'li' || this.tagName == 'div' ||
                            this.tagName == 'footer' || this.tagName == 'p' || this.tagName == 'section' ||
                            item.type == 'header' || this.tagName == 'form' || this.tagName == 'nav' ||
                            this.tagName == 'svg' || this.tagName == 'span' || this.tagName == 'h1' ||
                            this.tagName == 'h2' || this.tagName == 'h3' || this.tagName == 'h4' ||
                            this.tagName == 'h5' || this.tagName == 'h6' || this.tagName == 'g' ||
                            this.tagName == 'label'
                        )) {
                        tempObj.endTagName = this.tagName;
                        test.push(tempObj);
                        // console.log('2nd else if-', this.tagName, ' --endtagname--  ', tempObj.endTagName);
                        // console.log('before pushing the tagname in array -textnode--tagname-', this.tagName, ' --endtagname--  ', tempObj.endTagName, ' --endTag---- ', this.endTag);
                    } else if (!this.tagName) {
                        tempObj.endTagName = 'div';
                        test.push(tempObj);
                        // console.log('3nd else if-', this.tagName, ' --endtagname--  ', tempObj.endTagName);
                    }
                }

                if (index === firstEle.components.length - 1) {
                    this.count++;
                    if (test.length > 0) {
                        this.secondEle.unshift(test);
                    }
                    this.generateChildHtml(firstTemp, this.secondEle);
                }
            })
        } else {
            this.getNextValue(this.secondEle);
        }
    }



    getNextValue(secondEle) {
        let testTemp = secondEle.shift();
        var temp = '';
        if (testTemp) {
            temp = testTemp.shift();
            if (testTemp.length > 0) {
                secondEle.unshift(testTemp);
            }
        } else {
            temp = testTemp;
        }
        // console.log('getNext value ------------  ', temp);
        if (temp != undefined) {
            this.generateChildHtml(temp, secondEle);
        }
    }

    checkTagAttributes(element) {
        const tagName = this.tagNameFunction(element);
        if (element.attributes && element.attributes.id == 'ckeditorspan') {
            return false;
        } else {
            return true;
        }
    }

    tagNameFunction(firstEle) {
        let tagName = '';
        if (firstEle.hasOwnProperty('tagName')) {
            tagName = firstEle.tagName;
        } else if (firstEle.hasOwnProperty('type')) {
            if (
                firstEle.type != 'grid-row' && firstEle.type != 'grid-item' &&
                (firstEle.type == 'label' || firstEle.type == 'section')
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
}