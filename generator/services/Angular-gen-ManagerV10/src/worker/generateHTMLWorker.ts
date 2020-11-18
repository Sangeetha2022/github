import * as util from 'util';
import * as asyncForEach from 'async-foreach';
import { Constant } from "../assets/Constant";
import { ComponentLifecycleWorker } from '../worker/componentworker/componentlifecycle/componenetlifecycleworker';
import { ParentComponentWorker } from '../worker/appcomponentworker/parentcomponentworker';
import { ThirdPartyWorker } from '../worker/ThirdPartyWorker';
import { PopupModal } from '../strategy/HTML/PopupModal';

let componentLifecyleWorker = new ComponentLifecycleWorker();
let parentComponetworker = new ParentComponentWorker();
let thirdPartyWorker = new ThirdPartyWorker();
let popupModal = new PopupModal();

export class GenerateHTMLWorker {
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
    private componentLifecycleInfo = [];
    private screenSpecialEvents = [];
    private linkedScreenInfo = [];
    private linkInfo = [];

    // set other dependencies 
    private entities = [];
    private flowList = [];
    private endPointList: any;
    private generatedRouteScreens: any[] = [];
    private generatedSpecialEventScreens: any[] = [];

    private tsComponent = {
        variableList: [],
        dependenciesVariableList: [],
        componentOnInit: [],
        componentOnAfterView: [],
        routeList: [],
        flowMethod: [],
        elementDependedMethod: [],
        otherMethodNames: [],
        dynamictype: '',
        issearchforupdate: ''
    }

    private serviceComponent = {
        variableList: [],
        dependenciesVariableList: [],
        flowMethod: [],
        apiEndPoints: []
    }
    private moduleComponent = {
        importDependency: [],
        imports: [],
        declarations: [],
        exports: [],
        entryComponents: [],
        dynamictype: ''

    }
    private screenInfo: any;

    private componentStyle = [];
    private globalStyle = {
        import: [],
        others: []
    }
    private selectOption = `<option *ngFor="let option of option" [ngValue]="option.key">{{option.value}}</option>`;
    private selectclass: any;
    private dynamicdropdowntype: any;
    private cssGuidelines = [];
    private ckeditorEntities: any = null;
    private linkContentInfo = {
        contentArray: [],
        isNgContentPresent: false,
        linkInfo: null
    }

    public searchforupdatescreen: any;


    // class counter
    private classCount = 0;

    initializeData() {
        // add cssGuidelines
        this.cssGuidelines = [];

        // initialize global styles
        this.globalStyle = {
            import: [],
            others: []
        }

        // generatedScreenArray for Routes
        this.generatedRouteScreens = [];

        // generatedScreen for spcialeEvent screens
        this.generatedSpecialEventScreens = [];
    }

    generate(metaData, screenStyles, screenDetails, componentName, details, callback) {

        this.startTag = [];
        this.endTag = [];
        // component
        this.tsComponent = {
            variableList: [],
            dependenciesVariableList: [],
            componentOnInit: [],
            componentOnAfterView: [],
            routeList: [],
            flowMethod: [],
            elementDependedMethod: [],
            otherMethodNames: [],
            dynamictype: '',
            issearchforupdate: ''
        }

        // service
        this.serviceComponent = {
            variableList: [],
            dependenciesVariableList: [],
            flowMethod: [],
            apiEndPoints: []
        }

        // module
        this.moduleComponent = {
            importDependency: [],
            imports: [],
            declarations: [],
            exports: [],
            entryComponents: [],
            dynamictype: ''
        }



        this.componentStyle = [];
        this.componentStyle.push(screenStyles);


        if (screenDetails._id == this.searchforupdatescreen) {
            this.tsComponent.issearchforupdate = 'true';
        }

        this.screenInfo = screenDetails;
        console.log('generatehtlmworker componentstyles are ----  ', this.componentStyle);
        this.entityDetails = screenDetails.entity_info;
        this.flowDetails = screenDetails.flows_info;
        this.componentLifecycleInfo = screenDetails['component-lifecycle'];
        this.screenSpecialEvents = screenDetails['special-events'];
        this.linkInfo = screenDetails['link_info'];
        // list of other dependencies
        this.entities = details.entities;
        this.flowList = details.flows;
        this.endPointList = details.nodeResponse;
        this.cssGuidelines = details.cssGuidelines;
        this.generateHtml(metaData);
        // if component lifecycle present then we set those details
        if (this.componentLifecycleInfo && this.componentLifecycleInfo.length > 0) {
            this.setComponentLifeCycle();
        }
        console.log('after completed all method in child startTag are   ', `${this.startTag.join(`\n`)}`);
        // console.log('tscomponent object are ------  ', util.inspect(this.tsComponent, { showHidden: true, depth: null }));
        this.generateComponent(componentName, details, callback);
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
            if (item.components !== undefined) {
                item.components.forEach(component => {
                    console.log(' --item.content--  ', component);
                    if (component.type == 'dynamicdropdown-type') {

                        this.dynamicdropdowntype = component.type;
                        this.tsComponent.dynamictype = component.type;
                        this.moduleComponent.dynamictype = component.type;
                    }
                });
            }
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
    setComponentLifeCycle() {
        componentLifecyleWorker.setComponentLifeCycle(this);
    }
    generateChildHtml(firstEle, secondEle) {
        console.log(`firstElE -11--${this.count}-- `, firstEle);
        console.log(`secondElE -22--${this.count}-- `, secondEle);
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
                console.log('convert tags into div are ----  ', this.tagName, ' firstelement ', firstEle);
                this.tagName = 'div';
            }
            this.isNotImportant = false;
            this.isContentOnly = false;
            // set html classes
        }
    }

    modifyParentComponent(details, callback) {
        const flows = details.flows
        const packagePath = details.projectGenerationPath;
        const srcPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}`;
        const applicationPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        parentComponetworker.modifyDependency(packagePath, srcPath, applicationPath, this.globalStyle, flows, (response) => {
            this.initializeData();
            callback({ Message: `Feature Screen created successfully` });
        })
    }

    generateComponent(componentName, details, callback) {
        // console.log('generate component are ---- ', util.inspect(details, { showHidden: true, depth: null }));
        // console.log('html tag result in generate component are -----  ', this.startTag);
        // console.log('generate service component are -----  ', this.serviceComponent);
        console.log('generatecomponent name in generatehtmlworkers are -----  ', this.tsComponent);
        const applicationPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        const packagePath = details.projectGenerationPath;
        const templatePath = details.templateLocation.frontendTemplate;
        this.checkRoutes(applicationPath, templatePath);
        popupModal.checkPopupModal();
        thirdPartyWorker.setSpecialEvents(this);
        componentWorker.generateComponentService(applicationPath, templatePath, componentName, this.serviceComponent, (response) => {
            componentWorker.generateComponentTs(applicationPath, templatePath, componentName, this.tsComponent, this.entities, (response) => {
                componentWorker.generateComponentHtml(applicationPath, templatePath, componentName, this.startTag, (response) => {
                    console.log('before calling generatecomponentcss from generatehtlm -----  ', this.componentStyle);
                    componentWorker.generateComponentCss(applicationPath, templatePath, componentName, this.componentStyle, (response) => {
                        componentWorker.generateComponentSpec(applicationPath, templatePath, componentName, this.startTag, (response) => {
                            componentWorker.generateComponentModule(applicationPath, templatePath, componentName, this.moduleComponent,  (response) => {
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

    checkRoutes(applicationPath, templatePath) {
        console.log('check route list sra --1-- ', this.tsComponent);
        console.log('check route generatedRouteScreens -2--- ', this.generatedRouteScreens);
        const screenIndex = this.generatedRouteScreens.findIndex(x => x.screenId == this.screenInfo._id);
        const linkIndex = this.linkedScreenInfo.findIndex(x => x.screenId == this.screenInfo._id);
        console.log('screenIndex checkRoutes --11111-- ', screenIndex, ' screenid ', this.screenInfo._id);
        console.log('linkedScreen infromationare --- ', this.linkedScreenInfo, ' linkIndex ', linkIndex);
        if (screenIndex > -1) {
            const temp = this.generatedRouteScreens[screenIndex];
            console.log("Tem---screen--flow------", temp.screenFlow)
            console.log("Flow-----list---------", this.flowList)
            const flowObject = this.flowList.find(x => x._id == temp.screenFlow);

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
            // if (flowObject && !this.tsComponent.flowMethod.find(x => x._id == flowObject._id)) {
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

            // }
            this.generatedRouteScreens.splice(screenIndex, 1);
        }

        // if (linkIndex > -1) {
        if (this.linkedScreenInfo.length > 0) {
            this.linkedScreenInfo.forEach((element, index) => {
                const isLinkElement = linkWorker.addComponentLink(applicationPath, templatePath, element);
                console.log('each linkedscreen elemenrare  --- ', linkIndex, element, ' isLinkElement  ', isLinkElement);
                // this.tsComponent.componentOnInit.push(`console.log('code added here')`)
                if (isLinkElement) {
                    this.linkedScreenInfo.splice(index, 1);
                }
            })
        }
        // }
    }

    setComponentDependencies(flowObject, flowTemp) {

        // component method
        console.log('---------screen flow value----', flowObject, this.screenInfo.screenName);

        if (flowObject && !this.tsComponent.flowMethod.find(x => x._id == flowTemp._id)) {
            const componentFlow = flowObject.components.find(x => x.name.toLowerCase() === Constant.GP_ANGULAR_COMPONENT);
            if (componentFlow) {
                console.log('---------flowtemp value----', flowTemp, this.screenInfo.screenName);

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
                if (api) {
                    const temp = {
                        flowName: '',
                        actionOnData: '',
                        flowType: '',
                        routeUrl: '',
                        apiAction: '',
                        methodName: '',
                        variableName: ''
                    }
                    temp.flowName = flowObject.name;
                    temp.actionOnData = flowObject.actionOnData;
                    temp.flowType = flowObject.type;
                    temp.routeUrl = api.routeUrl;
                    temp.apiAction = api.apiAction;
                    temp.methodName = api.methodName;
                    temp.variableName = api.variableName;
                    this.serviceComponent.apiEndPoints.push(temp);
                }
            }
        }
    }

    setDataBinding(entityDetails, tagName) {
        const variableTemp = {
            entityId: '',
            entityName: '',
            fields: []
        }
        console.log('identified entity index are -----  ', entityDetails, ' ---tagname---  ', tagName, '-----strtstring---', this.startString);
        const entityObject = this.entities.find(x => x._id == entityDetails.entityId);
        console.log('entities object are ----------  ', entityObject);
        console.log('entities entityDetails are ----------  ', entityDetails);
        if (entityObject) {
            if (this.dynamicdropdowntype === 'dynamicdropdown-type') {
                console.log('------------dynamic dropdown startstringvalue----------', this.startString);
                if (this.startString.includes('ng-select')) {
                    this.startString += ` bindLabel="${entityDetails.fields.name.replace(' ', '')}" bindValue="${entityDetails.fields.name.replace(' ', '')}" [items]= "itemArray" [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}" [ngModelOptions]="{standalone: true}"`;
                }
                else {
                    this.startString += ` [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}" [ngModelOptions]="{standalone: true}"`;
                }
            }
            else {
                this.startString += ` [(ngModel)]="${entityObject.name.replace(' ', '')}.${entityDetails.fields.name.replace(' ', '')}" [ngModelOptions]="{standalone: true}"`;
            }
            const variableObject = this.tsComponent.variableList.find(x => x.entityId == entityDetails.entityId);
            console.log('variableList ------>>>>  ', variableObject);
            console.log('startString ---ngModels--->>>>  ', this.startString);
            if (variableObject) {
                console.log('---------------coming in the if condition of variable list---',entityDetails);
                variableObject.fields.push(entityDetails.fields.name);
            } else {
                console.log('---------------coming in the else condition of variable list---',entityDetails);
                variableTemp.entityId = entityDetails.entityId;
                variableTemp.entityName = entityObject.name;
                variableTemp.fields.push(entityDetails.fields.name);
                this.tsComponent.variableList.push(variableTemp);
            }
        }
    }
    // array of object constrction for ts file
    getSelectOptions(optionComponent) {

        if (optionComponent.length > 0) {
            let temp = `${Constant.SELECT_TS_OPTION_VARIABLENAME} = [`;
            optionComponent.forEach((optionElement, index) => {
                temp += `\n{ ${Constant.SELECT_KEY_VARIABLENAME}: '${optionElement.attributes.value}', ${Constant.SELECT_VALUE_VARIABLENAME}: '${optionElement.content}' }`;
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
                    console.log('set content of firstelement --tagname-- ', this.tagName)
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

        if (this.linkContentInfo.isNgContentPresent) {
            componentSpecializedWorker.setLinkContent(this);
        } else if (this.tagName && this.tagName != 'option' &&
            !this.isContentOnly &&
            !this.isNotImportant &&
            !this.isCKeditorSpan) {
            console.log('pushed value tagname are -------->>>   ', this.selectOption);
            if (this.tagName == 'select' && this.dynamicdropdowntype !== 'dynamicdropdown-type') {
                this.startString += '\n' + this.selectOption;
                this.startString += `</${this.tagName}>`;
                console.log('select tagname in push values are -----  ', this.startString);
                this.setTagValue();
            } else if (this.tagName == 'select' && this.dynamicdropdowntype == 'dynamicdropdown-type') {
                // this.startString += '\n' + this.selectOption;
                this.startString += `</ng-select>`;
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
        console.log('--------------------Start string comes first-----', this.startString);
        this.startTag.push(this.startString);
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
                (firstEle.type == 'label' || firstEle.type == 'section' || firstEle.type == 'input')
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
