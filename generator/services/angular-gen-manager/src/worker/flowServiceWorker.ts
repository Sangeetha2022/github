
import * as util from 'util';
import { Constant } from '../config/Constant';
import { constants } from 'fs';

export class FlowServiceWorker {

    private serviceObject: any;
    private componentName: String = null;
    private currentFlow: any = null;
    private serviceFileDetails: any;
    private endPointList: any;

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

    generateServiceComponentFlow(serviceObject, temp) {
        this.serviceObject = serviceObject;
        this.componentName = temp.folderName;
        this.serviceFileDetails = temp;
        this.endPointList = serviceObject.apiEndPoints;
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
                    this.addComponentMethod(Constant.DEFAULT_CONNECTOR_NAME);
                }
            })
        })
        this.componentOption();
    }

    // GpCodeToAdd and GpRequest
    private addComponentMethod(connectorType) {
        if (this.checkMicroFlowSteps(Constant.COMPONENT_CODETOADD_MICROFLOW) &&
            this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
            if (connectorType == Constant.DEFAULT_CONNECTOR_NAME) {
                // if (Array.isArray(this.endPointList.flowMethod)) {
                //     this.endPointList.flowMethod.forEach(endpointElement => {
                //         this.addEndPointApis(endpointElement);
                //     });
                // } else {
                //     this.addEndPointApis(this.endPointList.flowMethod);
                // }
                // this.endPointList.forEach(endPointElement => {
                //     this.addEndPointApis(endPointElement);
                // })
                const temp = this.endPointList.find(x => x.flowName === this.currentFlow.name);
                this.addEndPointApis(temp);
            }
        }
    }

    private addEndPointApis(actionElement) {
        console.log('angular component service endpoint api list are ---- ', this.endPointList);
        // this.endPointList.forEach(actionElement => {
        const tempMethod = this.checkApiAdditionalInformation(true, actionElement);
        console.log('temp mehtod true rae ----- ', tempMethod);
        let temp = `${actionElement.methodName}(${tempMethod ? tempMethod.methodRequestVariable ? tempMethod.methodRequestVariable : '' : ''}): ${this.observableObject.className}<any> {`;
        if (tempMethod && tempMethod.serviceMethodVariable) {
            temp += `\n ${tempMethod.serviceMethodVariable}`
        }
        temp += `\n return this.${this.httpObject.object}.${actionElement.apiAction}(this.${this.sharedObject.object}.apiGateway + ${this.checkApiParams(actionElement)});`;
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
                return `'/${Constant.DESKTOP_ROUTE}${actionElement.routeUrl}', ${actionElement.variableName}`;
            case 'put':
                const temp = actionElement.routeUrl.split(':');
                console.log('put apiaction routeUrl ----  ', temp);
                return `'/${Constant.DESKTOP_ROUTE}${actionElement.routeUrl}', ${actionElement.variableName}`;
            case 'get':
                const getURL = actionElement.routeUrl.split(':');
                console.log('additionalt get check api params are ----->>>   ', additional);

                return `\`/${Constant.DESKTOP_ROUTE}${getURL[0]}${additional ? additional.urlQuery ? additional.urlQuery : '' : ''}\`${additional ? additional.requestParameter ? `, ${actionElement.variableName}` : '' : ''}`;
            case 'delete':
                const deleteURL = actionElement.routeUrl.split(':');
                console.log('delete apiaction routeUrl ----  ', deleteURL);
                return `\`/${Constant.DESKTOP_ROUTE}${deleteURL[0]}${additional ? additional.urlQuery ? additional.urlQuery : '' : ''}\`${additional ? additional.requestParameter ? `, ${actionElement.variableName}` : '' : ''}`;
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
                // additional variable
                additional.serviceMethodVariable = `const temp = [];`;
                additional.serviceMethodVariable += `\n const objectKeyPair = Object.entries(ticket);`;
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
                additional.urlQuery = `\${${additional.methodRequestVariable}}`;
                return additional;
            case Constant.GP_GETNOUNBYID_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}Id: ${Constant.STRING_DATATYPE}`;
                additional.urlQuery = `\${${additional.methodRequestVariable}}`;
                return additional;
            case Constant.GP_GETALLVALUES_FLOW:
                additional.methodRequestVariable = ``;
                return additional;
            case Constant.GP_CREATE_FLOW:
                additional.methodRequestVariable = `${actionElement.variableName}: ${Constant.ANY_DATATYPE}`;
                return additional;
            case Constant.GP_SEARCH_FLOW:
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
            case Constant.GP_GETNOUNBYID_FLOW:
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
        return (this.currentFlow.components.microFlows.findIndex(x => x.microFlowStepName.toLowerCase() == microFlowStepName) > -1);
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
}