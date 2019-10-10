
import * as util from 'util';
import { Constant } from '../config/Constant';
import { constants } from 'fs';
import { ProxySupportWorker } from '../supportworker/proxySupportWorker';

export class FlowServiceWorker {

    private serviceObject: any;
    private componentName: String = null;
    private templatePath: String = null;
    private currentFlow: any = null;
    private serviceFileDetails: any;
    private endPointList: any;
    private proxySupportWorker = new ProxySupportWorker();
    private proxyArray = [];
    private nginxArray = [];

    private sharedObject = {
        className: `${Constant.SHARED_FILENAME.charAt(0).toUpperCase() + Constant.SHARED_FILENAME.slice(1)}${Constant.SERVICE_EXTENSION.charAt(0).toUpperCase() + Constant.SERVICE_EXTENSION.slice(1).toLowerCase()}`,
        object: `${Constant.SHARED_FILENAME}${Constant.SERVICE_EXTENSION.charAt(0).toUpperCase() + Constant.SERVICE_EXTENSION.slice(1).toLowerCase()}`,
        path: `../../${Constant.SHARED_FILENAME}/${Constant.SHARED_FILENAME}.${Constant.SERVICE_EXTENSION}`
    }
    private httpObject = {
        className: `HttpClient`,
        object: `http`,
        path: `@angular/common/http`
    }

    private observableObject = {
        className: `Observable`,
        path: `rxjs`
    }

    generateServiceComponentFlow(serviceObject, temp, templatePath) {
        this.serviceObject = serviceObject;
        this.componentName = temp.folderName;
        this.serviceFileDetails = temp;
        this.templatePath = templatePath;
        this.endPointList = serviceObject.apiEndPoints;
        this.templatePath = templatePath;
        // console.log('endpoint list in flow service worker  are ----  ', this.endPointList);
        this.checkConnector();
        // console.log('final services file datesil are ----  ', this.serviceFileDetails);
    }

    // GpCheck_Connector
    private checkConnector() {
        // flow method with connector
        console.log('check service connector flow methods are ----  ', this.serviceObject);
        this.serviceObject.flowMethod.forEach(flowElement => {
            this.currentFlow = null;
            this.currentFlow = flowElement;
            console.log('each services flowElement are ----  ', util.inspect(flowElement, { showHidden: true, depth: null }))
            flowElement.components.connector.forEach(connectorElement => {
                if (connectorElement.isDefault && !connectorElement.isDisabled) {
                    this.addComponentMethod(Constant.DEFAULT_CONNECTOR_NAME, connectorElement);
                } else if (connectorElement.isCustom) {
                    this.addComponentMethod(Constant.AVAILABLE_CONNECTOR_NAME, connectorElement);
                }
            })
        })
        this.componentOption();
    }

    // GpCodeToAdd and GpRequest
    private addComponentMethod(connectorType, connectorDetails) {
        console.log('add component method details rae r-----  ', connectorDetails);
        if (this.checkMicroFlowSteps(Constant.COMPONENT_CODETOADD_MICROFLOW) &&
            this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
            switch (connectorType) {
                case Constant.DEFAULT_CONNECTOR_NAME:
                    const temp = this.endPointList.find(x => x.flowName === this.currentFlow.name);
                    if (temp) {
                        this.defaultApiEndPoints(temp);
                    }
                    break;
                case Constant.AVAILABLE_CONNECTOR_NAME:
                    this.customApis(connectorDetails);
                    break;
                default:
                    break;
            }
        }
    }

    private customApis(actionElement) {
        console.log('availabel custom apis connectorDetails are ---11--   ', actionElement);
        console.log('availabel custom apis current flow loist are ---22--   ', this.currentFlow, ' --currentFlowName-- ', this.currentFlow.name);
        const tempMethod = this.checkApiAdditionalInformation(true, this.currentFlow);
        console.log('tcustomApis temp methods rae  --33--- ', tempMethod);
        let temp = `${this.currentFlow.name}(${tempMethod ? tempMethod.methodRequestVariable ? tempMethod.methodRequestVariable : '' : ''}): ${this.observableObject.className}<any> {`;
        if (tempMethod && tempMethod.serviceMethodVariable) {
            temp += `\n ${tempMethod.serviceMethodVariable}`
        }
        const baseUrl = actionElement.url.match(/http.:\/\/.*?\//g)[0].slice(0, -1);
        const baseName = baseUrl.replace(/http.:\/\//, '');
        const urlAdditionalInfo = actionElement.url.replace(baseUrl, '');
        console.log('after match are ---------------    ', baseUrl);
        console.log('after test action url ar e------   ', urlAdditionalInfo, '  --baseName--  ', baseName);
        temp += `\n return this.${this.httpObject.object}.${actionElement.apiMethods}(\`/${baseName}${urlAdditionalInfo}\`);`;
        temp += `\n}`;
        this.serviceFileDetails.serviceMethod.push(temp);

        const proxyObj = {
            baseName: baseName,
            baseUrl: baseUrl
        }

        const nginxObj = {
            url: baseName
        }

        // add proxy information
        this.proxySupportWorker.renderDetails(this.templatePath,
            Constant.MODIFY_PROXY_CONFIG_TEMPLATENAME, proxyObj, this.proxyArray, true);

        // add nginx information
        this.proxySupportWorker.renderDetails(this.templatePath,
            Constant.MODIFY_NGINX_CONF_TEMPLATENAME, nginxObj, this.nginxArray, false);

        // constructor
        this.addConstructor(this.httpObject.object, this.httpObject.className);

        // import dependency
        this.addDependencyHeaders(this.observableObject.className, this.observableObject.path);
        this.addDependencyHeaders(this.httpObject.className, this.httpObject.path);
    }

    private defaultApiEndPoints(actionElement) {
        console.log('angular component service endpoint api list are ---- ', this.endPointList);
        // this.endPointList.forEach(actionElement => {
        const tempMethod = this.checkApiAdditionalInformation(true, actionElement);
        console.log('temp mehtod true rae ----- ', tempMethod);
        let temp = `${actionElement.methodName}(${tempMethod ? tempMethod.methodRequestVariable ? tempMethod.methodRequestVariable : '' : ''}): ${this.observableObject.className}<any> {`;
        if (tempMethod && tempMethod.serviceMethodVariable) {
            temp += `\n ${tempMethod.serviceMethodVariable}`
        }
        temp += `\n return this.${this.httpObject.object}.${actionElement.apiAction}(this.${this.sharedObject.object}.${Constant.DESKTOP_APINAME} + ${this.checkApiParams(actionElement)});`;
        temp += `\n}`;
        this.serviceFileDetails.serviceMethod.push(temp)
        // })
        // constructor
        this.addConstructor(this.httpObject.object, this.httpObject.className);
        this.addConstructor(this.sharedObject.object, this.sharedObject.className);

        // import dependency
        this.addDependencyHeaders(this.observableObject.className, this.observableObject.path);
        this.addDependencyHeaders(this.httpObject.className, this.httpObject.path);
        this.addcomponentHeaders(this.sharedObject.className, this.sharedObject.path);
    }

    private checkApiParams(actionElement) {
        const additional = this.checkApiAdditionalInformation(false, actionElement);
        switch (actionElement.apiAction) {
            case 'post':
                return `'${actionElement.routeUrl}', ${actionElement.variableName}`;
            case 'put':
                const temp = actionElement.routeUrl.split(':');
                console.log('put apiaction routeUrl ----  ', temp);
                return `'${actionElement.routeUrl}', ${actionElement.variableName}`;
            case 'get':
                const getURL = actionElement.routeUrl.split(':');
                console.log('additionalt get check api params are ----->>>   ', additional);

                return `\`${getURL[0]}${additional ? additional.urlQuery ? additional.urlQuery : '' : ''}\`${additional ? additional.requestParameter ? `, ${actionElement.variableName}` : '' : ''}`;
            case 'delete':
                const deleteURL = actionElement.routeUrl.split(':');
                console.log('delete apiaction routeUrl ----  ', deleteURL);
                return `\`${deleteURL[0]}${additional ? additional.urlQuery ? additional.urlQuery : '' : ''}\`${additional ? additional.requestParameter ? `, ${actionElement.variableName}` : '' : ''}`;
            default:
                break;
        }
    }

    // check is additional method or query url needed
    private checkApiAdditionalInformation(isMethodVariable, actionElement) {
        console.log('action element list are ---actionElement-- ', actionElement);
        console.log('action element list are --isMethodVariable--- ', isMethodVariable);
        const additional = {
            methodRequestVariable: '',
            serviceMethodVariable: '',
            urlQuery: '',
            requestParameter: ''
        }
        switch (actionElement.flowActionOnData) {
            case Constant.GP_SEARCH_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                // additional variable
                additional.serviceMethodVariable = `const temp = [];`;
                additional.serviceMethodVariable += `\n const objectKeyPair = Object.entries(${actionElement.variableName});`;
                additional.serviceMethodVariable += `\n objectKeyPair.forEach((element, index) => {`;
                additional.serviceMethodVariable += `\n   if (element[1]) {`;
                additional.serviceMethodVariable += `\n      temp.push(\`\${element[0]}=\${element[1]}\`);`;
                additional.serviceMethodVariable += `\n   }`;
                additional.serviceMethodVariable += `\n  });`;

                // additional query or route variables
                additional.urlQuery = `\${temp.length > 0 ? \`?\${temp.join('&')}\` : ''}`;
                return additional;
            case Constant.GP_DELETE_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}Id: ${Constant.STRING_DATATYPE}`;
                additional.urlQuery = `\${${actionElement.variableName}Id}`;
                return additional;
            case Constant.GP_GETNOUNBYID_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}Id: ${Constant.STRING_DATATYPE}`;
                additional.urlQuery = `\${${actionElement.variableName}Id}`;
                return additional;
            case Constant.GP_GETALLVALUES_FLOW:
                additional.methodRequestVariable = ``;
                return additional;
            case Constant.GP_CREATE_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_UPDATE_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_SEARCHDETAIL_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_SEARCHFORUPDATE_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_DELETENOUNRELATIONSHIP_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_FILEUPLOAD_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_DELETENOUNBYRELATION_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_CANCEL_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_GETNOUNFROMRELATION_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_APPSTARTUP_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_GRIDEXPORTCSV_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_CREATERELATIONSHIP_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_RECORDVIDEO_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_GETNOUNBYRELATIONSHIP_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_TAKEPHOTO_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_CUSTOM_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_DELETEBYPARENTID_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_GETNOUNBYPARENTID_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            default:
                return null;
        }
    }

    // private checkComponentRequest() {
    //     return (this.currentFlow.components.microFlows.findIndex(x => x.microFlowStepName.toLowerCase() == Constant.COMPONENT_REQUEST_MICROFLOW) > -1);
    // }

    private checkMicroFlowSteps(microFlowStepName) {
        if (this.currentFlow && this.currentFlow.components) {
            return (this.currentFlow.components.microFlows.findIndex(x => x.microFlowStepName.toLowerCase() == microFlowStepName) > -1);
        } else {
            return false;
        }
    }

    // GpOptons
    private componentOption() {
        if (this.checkMicroFlowSteps(Constant.COMPONENT_OPTIONS_MICROFLOW)) {
            this.addComponentVariable();
        }
    }

    private addComponentVariable() { }

    private addConstructor(constructorObject, className) {
        const temp = `${Constant.PRIVATE_ACCESS_MODIFIER} ${constructorObject}: ${className}`;
        if (!this.serviceFileDetails.serviceConstructorParams.find(x => x == temp)) {
            this.serviceFileDetails.serviceConstructorParams.push(temp);
        }
    }

    // GpHeaders
    private addDependencyHeaders(dependencyName, dependencyPath) {
        if (!this.serviceFileDetails.importDependency.find(x => x.dependencyName === dependencyName &&
            x.dependencyPath === dependencyPath)) {
            const temp = {
                dependencyName: '',
                dependencyPath: ''
            }
            temp.dependencyName = dependencyName;
            temp.dependencyPath = dependencyPath;
            this.serviceFileDetails.importDependency.push(temp);
        }
    }

    private addcomponentHeaders(classname, path) {
        if (!this.serviceFileDetails.importComponent.find(x => x.classname === classname &&
            x.path === path)) {
            const temp = {
                classname: '',
                path: ''
            }
            temp.classname = classname;
            temp.path = path;
            this.serviceFileDetails.importComponent.push(temp);
        }
    }

    // modify proxy file details
    modifyProxyFile(applicationPath) {
        const nginxPath = `${applicationPath}/${Constant.NGINX_FOLDERNAME}`;
        // modify proxy file
        console.log('proxy array value are --- ', this.proxyArray);
        this.proxySupportWorker.modifyFileInfo(applicationPath, this.proxyArray,
             Constant.PROXY_CONFIG_VARIABLENAME, Constant.PROXY_CONFIG_FILENAME);
             this.proxyArray = [];
        // modify nginx file
        console.log('nginx array value are --- ', this.nginxArray);
        this.proxySupportWorker.modifyFileInfo(nginxPath, this.nginxArray, 
            null, Constant.NGINX_FILENAME);
            this.nginxArray = [];
    }
}