import * as util from 'util';
import * as asyncForEach from 'async-foreach';
import { ComponentWorker } from './componentWorker';
import { Constant } from '../config/Constant';
import * as componentDependency from '../assets/componentDependency';
import { threadId } from 'worker_threads';
import { ComponentSpecializedWorker } from './componentSpecializedWorker';
// import { styles } from '../assets/cssGuidline';
// import { RouteSupportWorker } from '../supportworker/RouteSupportWorker';

// let routeSupportWorker = new RouteSupportWorker();
let componentWorker = new ComponentWorker();
let componentSpecializedWorker = new ComponentSpecializedWorker();

export class GenerateHtmlWorker {

    private forEach = asyncForEach.forEach;
    private firstEle: any = null;
    private secondEle: any[] = [];
    private startTag: any[] = [];
    private endTag: any[] = [];
    private tagName: String = null;
    private startString: String = '';
    private count: number = 0;
    private parentHtmlTags: any[] = [];
    private isNotImportant: Boolean = false;
    private isContentOnly: Boolean = false;
    private isCKeditorSpan: Boolean = false;
    // entity and flows for Each screens
    private entityDetails = [];
    private flowDetails = [];

    // set other dependencies 
    private entities = [];
    private flowList = [];
    private endPointList: any;
    private generatedScreens: any[] = [];

    private tsComponent = {
        variableList: [],
        dependenciesVariableList: [],
        routeList: [],
        flowMethod: [],
        elementDependedMethod: [],
        otherMethodNames: []
    }

    private serviceComponent = {
        variableList: [],
        dependenciesVariableList: [],
        flowMethod: [],
        apiEndPoints: []
    }
    private screenInfo: any;

    private componentStyle = [];
    private globalStyle = {
        import: [],
        others: []
    }
    private selectOption = `<option *ngFor="let option of option" [ngValue]="option.key">{{option.value}}</option>`;
    private cssGuidelines = [];
    private ckeditorEntities: any = null;

    initializeData() {
        // add cssGuidelines
        this.cssGuidelines = [];

        // initialize global styles
        this.globalStyle = {
            import: [],
            others: []
        }
    }
    generate(metaData, screenStyles, screenDetails, componentName, details, callback) {
        this.startTag = [];
        this.endTag = [];
        // component
        this.tsComponent = {
            variableList: [],
            dependenciesVariableList: [],
            routeList: [],
            flowMethod: [],
            elementDependedMethod: [],
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

        this.screenInfo = screenDetails;
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
            this.checkRoutes();
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

    checkRoutes() {
        console.log('check route list sra --1-- ', this.tsComponent);
        console.log('check route generatedScreens -2--- ', this.generatedScreens);
        const screenIndex = this.generatedScreens.findIndex(x => x.screenId == this.screenInfo._id);
        console.log('screenIndex checkRoutes ---- ', screenIndex);
        if (screenIndex > -1) {
            const temp = this.generatedScreens[screenIndex];
            const flowObject = this.flowList.find(x => x._id == temp.screenFlow);
            console.log('check routes flowObject ---------->>>   ', flowObject);
            let flowTemp = {
                _id: '',
                name: '',
                label: '',
                description: '',
                type: '',
                actionOnData: '',
                createWithDefaultActivity: '',
                components: []
            };
            if (flowObject && !this.tsComponent.flowMethod.find(x => x._id == flowObject._id)) {
                flowTemp = {
                    _id: flowObject._id,
                    name: flowObject.name,
                    label: flowObject.label,
                    description: flowObject.description,
                    type: flowObject.type,
                    actionOnData: flowObject.actionOnData,
                    createWithDefaultActivity: flowObject.createWithDefaultActivity,
                    components: []

                }
                // set component dependencies method and variable
                this.setComponentDependencies(flowObject, flowTemp);

                // set services dependencies method and variable
                this.setServiceDependencies(flowObject, flowTemp);

                // set component services api's
                this.setEndPoints(flowObject);

                // set component route list
                this.setComponentRouteList(temp, 'child');
                console.log('setted ts component ---->>>  ', this.tsComponent);
                console.log('setted services  ---->>>  ', this.serviceComponent);

            }
            this.generatedScreens.splice(screenIndex, 1);
        }
    }

    setComponentRouteList(routeObj, action) {
        const temp = {
            route: routeObj,
            action: action
        }
        this.tsComponent.routeList.push(temp);
    }

    modifyDependency(details, callback) {
        console.log('modifydependency calling in gnerateHTML Workere s , ', this.globalStyle);
        const packagePath = details.projectGenerationPath;
        const srcPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}`;
        const applicationPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        componentWorker.modifyDependency(packagePath, srcPath, applicationPath, this.globalStyle, (response) => {
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
                this.parentHtmlTags.push(item);
            }
            this.tagName = this.tagNameFunction(item);
            // console.log('tagName for each iterate value are -parent----   ', this.tagName, ' --item.content--  ', item.content);
            if (item.type === 'textnode') {
                tempObj.endTagName = 'label';
                this.parentHtmlTags.push(tempObj);
            } else if (!this.tagName || this.tagName == 'div') {
                tempObj.endTagName = 'div';
                this.parentHtmlTags.push(tempObj);
            } else if (this.tagName == 'form') {
                tempObj.endTagName = 'form';
                this.parentHtmlTags.push(tempObj);
            } else if (this.tagName == 'section') {
                tempObj.endTagName = 'section';
                this.parentHtmlTags.push(tempObj);
            } else if (!item.content &&
                (this.tagName == 'nav' || this.tagName == 'header' || this.tagName == 'footer')) {
                tempObj.endTagName = this.tagName;
                this.parentHtmlTags.push(tempObj);
            }
            if (index === grapesJSMetadata.length - 1) {
                if (this.parentHtmlTags.length > 0) {
                    this.secondEle.unshift(this.parentHtmlTags);
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
            this.setClasses(firstEle);
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

    setClasses(firstEle) {
        if (firstEle.hasOwnProperty('classes')) {
            // console.log('firstEle classes are ---- ', firstEle.classes[0], ' ---firstELE classes length-- ', firstEle.classes.length);
            if (!firstEle.hasOwnProperty('tagName') && !this.tagName) {
                this.tagName = 'div';
            }
            let className = this.getClassName(firstEle);

            const defaultClassNames = componentSpecializedWorker.addClassName(this, 'class');
            if (defaultClassNames) {
                if (!className.includes(defaultClassNames) && className.toLowerCase() != 'radio') {
                    className += ` ${componentSpecializedWorker.addClassName(this, 'class')}`;
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
            const defaultClassNames = componentSpecializedWorker.addClassName(this, 'class');
            if (defaultClassNames) {
                this.startString += `<${this.tagName} class='${defaultClassNames}'`
            }
        }
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
                        componentSpecializedWorker.removeClassName(this, 'input');
                        this.startString += ` ${element}='${firstEle.attributes[element]}'`;
                    } else {
                        this.startString += ` ${element}='${firstEle.name}'`;
                    }
                    if (this.startString.includes('checkbox')) {
                        componentSpecializedWorker.removeClassName(this, 'input');
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
        componentSpecializedWorker.checkSpecialElement(this);
    }

    setTraits(firstEle) {
        if (firstEle.hasOwnProperty('traits')) {
            // checking entities from databinding and flows for methods in component
            if (this.entityDetails.length > 0 || this.flowDetails.length > 0 || this.screenInfo.route_info.length > 0) {
                firstEle.traits.forEach(traitElement => {
                    // console.log('triat firstelement are -----   ', traitElement);
                    const entityIndex = this.entityDetails.findIndex(x => x.elementName == traitElement.value);
                    const flowIndex = this.flowDetails.findIndex(x => x.elementName == traitElement.value);
                    const routeIndex = this.screenInfo.route_info.findIndex(x => x.elementName == traitElement.value);

                    // console.log('entity and flows index are ---- ', entityIndex, ' --flowIndex-- ', flowIndex, '  --routeIndex--  ', routeIndex);
                    // span with data binding 
                    if (entityIndex > -1 && this.tagName == 'span') {
                        // console.log('span values are -----  ', this.startString);
                        // console.log('span entities details are -----  ', this.entityDetails[entityIndex]);
                        this.ckeditorEntities = this.entityDetails[entityIndex];
                        // this.childComponents(firstEle);
                        // this.getNextValue(this.secondEle);
                        this.isCKeditorSpan = true;
                    } else if (entityIndex > -1 && !this.isCKeditorSpan) {
                        // console.log('entering into else if else if enditityINdex values')
                        this.setDataBinding(this.entityDetails[entityIndex], this.tagName);
                    }
                    // adding flows action
                    if (flowIndex > -1) {
                        // console.log('identitied flow index are -----  ', this.flowDetails[flowIndex]);
                        const flowObject = this.flowList.find(x => x._id == this.flowDetails[flowIndex].flow);
                        console.log('flowObject ---------->>>   ', flowObject);
                        let flowTemp = {
                            _id: '',
                            name: '',
                            label: '',
                            description: '',
                            type: '',
                            actionOnData: '',
                            createWithDefaultActivity: '',
                            components: []
                        };
                        if (flowObject) {
                            this.startString += ` (click)="${flowObject.name}()"`;
                            flowTemp = {
                                _id: flowObject._id,
                                name: flowObject.name,
                                label: flowObject.label,
                                description: flowObject.description,
                                type: flowObject.type,
                                actionOnData: flowObject.actionOnData,
                                createWithDefaultActivity: flowObject.createWithDefaultActivity,
                                components: []

                            }
                        }
                        // set component dependencies method and variable
                        this.setComponentDependencies(flowObject, flowTemp);

                        // set services dependencies method and variable
                        this.setServiceDependencies(flowObject, flowTemp);

                        // set component services api's
                        this.setEndPoints(flowObject);
                    }
                    // check routing info and decide whether we add it in html or ts
                    if (routeIndex > -1) {
                        const routeObj = this.screenInfo.route_info[routeIndex];
                        console.log('routeindex routeObj ---11-- ', routeObj);
                        console.log('routeindex generatedScreens ----- ', this.generatedScreens);
                        const isExistIndex = this.generatedScreens.findIndex(x => x.elementName === routeObj.elementName);
                        if (isExistIndex > -1) {
                            this.generatedScreens.splice(isExistIndex, 1);
                        } else {
                            this.generatedScreens.push(routeObj);
                        }
                        // set component route list
                        this.setComponentRouteList(routeObj, 'parent');
                        console.log('routeindex are ---11-- ', routeIndex);
                        console.log('routeindex are ---22-- ', this.screenInfo.is_grid_present);
                        if (this.screenInfo.is_grid_present) {
                            componentSpecializedWorker.checkAGGridAction(this, routeObj);
                        }
                    }
                })

                // add ckeditor ngModels
                if (this.ckeditorEntities && !this.isCKeditorSpan) {
                    // console.log('entering into else if ckeditroentities --- ', this.tagName);
                    this.setDataBinding(this.ckeditorEntities, this.tagName);
                    this.ckeditorEntities = null;
                }
            }
            // check if tag is select, yes then we need to add its option in component ts file
            if (this.tagName == 'select') {
                this.getSelectOptions(firstEle.components);
            }
        }
    }

    setComponentDependencies(flowObject, flowTemp) {
        // component method
        if (flowObject && !this.tsComponent.flowMethod.find(x => x._id == flowTemp._id)) {
            const componentFlow = flowObject.components.find(x => x.name.toLowerCase() === Constant.GP_ANGULAR_COMPONENT);
            if (componentFlow) {
                flowTemp.components = componentFlow;
            }
            this.tsComponent.flowMethod.push(flowTemp);
        }
    }

    setServiceDependencies(flowObject, flowTemp) {
        // service method
        if (flowObject && !this.serviceComponent.flowMethod.find(x => x._id == flowTemp._id)) {
            const serviceFlow = flowObject.components.find(x => x.name.toLowerCase() === Constant.GP_ANGULAR_SERVICE);
            if (serviceFlow) {
                flowTemp.components = serviceFlow;
            }
            this.serviceComponent.flowMethod.push(flowTemp);
        }
    }

    setEndPoints(flowObject) {
        console.log('the endpointlist in generate htm lworker aer ae- ----   ', this.endPointList);
        if (flowObject && this.serviceComponent.apiEndPoints.findIndex(x => x.methodName == flowObject.name) < 0) {
            if (this.endPointList) {
                const api = this.endPointList.flowAction.find(x => x.methodName == flowObject.actionOnData);
                // console.log('finded api are ----  ', api);
                const temp = {
                    flowName: '',
                    flowActionOnData: '',
                    flowType: '',
                    routeUrl: '',
                    apiAction: '',
                    methodName: '',
                    variableName: ''
                }
                temp.flowName = flowObject.name;
                temp.flowActionOnData = flowObject.actionOnData;
                temp.flowType = flowObject.type;
                temp.routeUrl = api.routeUrl;
                temp.apiAction = api.apiAction;
                temp.methodName = api.methodName;
                temp.variableName = api.variableName;
                this.serviceComponent.apiEndPoints.push(temp);
            }
        }
    }

    setDataBinding(entityDetails, tagName) {
        const variableTemp = {
            entityId: '',
            entityName: '',
            fields: []
        }
        // console.log('identified entity index are -----  ', entityDetails, ' ---tagname---  ', tagName);
        const entityObject = this.entities.find(x => x._id == entityDetails.entityId);
        console.log('entities object are ----------  ', entityObject);
        console.log('entities entityDetails are ----------  ', entityDetails);
        if (entityObject) {
            this.startString += ` [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}"`;
            const variableObject = this.tsComponent.variableList.find(x => x.entityId == entityDetails.entityId);
            // console.log('variableList ------>>>>  ', variableObject);
            // console.log('startString ---ngModels--->>>>  ', this.startString);
            if (variableObject) {
                variableObject.fields.push(entityDetails.fields.name);
            } else {
                variableTemp.entityId = entityDetails.entityId;
                variableTemp.entityName = entityObject.name;
                variableTemp.fields.push(entityDetails.fields.name);
                this.tsComponent.variableList.push(variableTemp);
            }
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
            // console.log('firstEle content ------  ', this.startString, ' ---isContentOnly-- ', this.isContentOnly, ' -isNotImportant-- ', this.isNotImportant);
        }
    }


    pushValue(firstEle) {
        if (this.tagName && this.tagName != 'option' &&
            !this.isContentOnly &&
            !this.isNotImportant &&
            !this.isCKeditorSpan) {
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
                    } else if (!item.content &&
                        componentSpecializedWorker.checkTagAttributes(this, item) &&
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