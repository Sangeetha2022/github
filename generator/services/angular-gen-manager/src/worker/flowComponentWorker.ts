
import * as util from 'util';
import { Constant } from '../config/Constant';

export class FlowComponentWorker {

    private componentObject: any;
    private componentName: String = null;
    private currentFlow: any = null;
    private componentFileDetails: any;
    private entities: any[] = [];

    generateComponentFlow(componentObject, temp, entities) {
        this.componentObject = componentObject;
        this.componentName = temp.folderName;
        this.componentFileDetails = temp;
        this.entities = entities;
        this.checkConnector();
        console.log('final componeon file datesil are ----  ', this.componentFileDetails);
    }

    // GpCheck_Connector
    private checkConnector() {
        // flow method with connector
        console.log('check component connector flow methods are ----  ', this.componentObject);
        this.componentObject.flowMethod.forEach(flowElement => {
            this.currentFlow = null;
            this.currentFlow = flowElement;
            console.log('each flowElement are ----  ', util.inspect(flowElement, { showHidden: true, depth: null }))
            flowElement.components.connector.forEach(connectorElement => {
                if (connectorElement.isDefault && !connectorElement.isDisabled) {
                    this.addComponentMethod(Constant.DEFAULT_CONNECTOR_NAME);
                    this.componentOption();
                }
            })
        })
    }

    // GpCodeToAdd and GpRequest
    private addComponentMethod(connectorType) {
        let serviceClassName = ``;
        let headers = {
            className: '',
            path: ''
        }
        if (connectorType == Constant.DEFAULT_CONNECTOR_NAME) {
            serviceClassName = `${this.componentName.charAt(0).toUpperCase()}${this.componentName.slice(1)}${Constant.SERVICE_EXTENSION.charAt(0).toUpperCase()}${Constant.SERVICE_EXTENSION.slice(1)}`;
            headers.className = serviceClassName;
            headers.path = `./${this.componentName.toLowerCase()}.${Constant.SERVICE_EXTENSION.toLowerCase()}`;
        }
        switch (this.currentFlow.actionOnData) {
            case Constant.GP_CREATE_FLOW:
                console.log('check request method are -----  ', this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW));
                let temp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    temp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(this.${this.componentObject.variableList[0].entityName})`;
                    temp += `\n  .subscribe(`;
                    temp += `\n    data => {`;
                    temp += `\n       console.log('data created successfully');`;
                    temp += `\n    },`;
                    temp += `\n    error => {`;
                    temp += `\n       console.log('cannot able to create the data');`;
                    temp += `\n    }`;
                    temp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                temp += `\n}`;
                // component methods
                this.componentFileDetails.componentMethod.push(temp);
                console.log('create component are -----  ', temp);
                break;
            case Constant.GP_SEARCH_FLOW:
                break;
            case Constant.GP_UPDATE_FLOW:
                break;
            case Constant.GP_DELETE_FLOW:
                break;
            case Constant.GP_GETALLVALUES_FLOW:
                break;
            case Constant.GP_SEARCHDETAIL_FLOW:
                break;
            case Constant.GP_SEARCHFORUPDATE_FLOW:
                break;
            case Constant.GP_DELETENOUNRELATIONSHIP_FLOW:
                break;
            case Constant.GP_FILEUPLOAD_FLOW:
                break;
            case Constant.GP_DELETENOUNBYRELATION_FLOW:
                break;
            case Constant.GP_CANCEL_FLOW:
                break;
            case Constant.GP_GETNOUNFROMRELATION_FLOW:
                break;
            case Constant.GP_APPSTARTUP_FLOW:
                break;
            case Constant.GP_GRIDEXPORTCSV_FLOW:
                break;
            case Constant.GP_CREATERELATIONSHIP_FLOW:
                break;
            case Constant.GP_RECORDVIDEO_FLOW:
                break;
            case Constant.GP_GETNOUNBYRELATIONSHIP_FLOW:
                break;
            case Constant.GP_TAKEPHOTO_FLOW:
                break;
            case Constant.GP_CUSTOM_FLOW:
                break;
            case Constant.GP_GETNOUNBYID_FLOW:
                break;
            case Constant.GP_DELETEBYPARENTID_FLOW:
                break;
            case Constant.GP_GETNOUNBYPARENTID_FLOW:
                break;
            default:
                break;

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

    private addComponentVariable() {
        this.componentObject.variableList.forEach(element => {
            const entitiesObject = this.entities.find(x => x._id == element.entityId && x.entity_type == Constant.PRIMARY_NAME);
            console.log('entitiesObject are ------  ', entitiesObject);
            if (entitiesObject) {
                let temp = `${entitiesObject.name} = {`;
                entitiesObject.field.forEach((fieldElement, fieldIndex) => {
                    temp += `\n   ${fieldElement.name}: ` + this.checkDataType(fieldElement) + this.isLastIndex(entitiesObject.field, fieldIndex);
                })
                temp += `\n}`
                this.componentFileDetails.componentVariable.push(temp);
            }
        })
    }

    checkDataType(fieldElement) {
        console.log('filed element test datatype are ---- ', fieldElement.data_type);
        return fieldElement.data_type.toLowerCase() ==
            Constant.STRING_DATATYPE ? `''` : fieldElement.data_type.toLowerCase() ==
                Constant.BOOLEAN_DATATYPE ? false : null;
    }

    isLastIndex(array, index) {
        console.log('is last index arrays are ---  ', array);
        return array.length - 1 == index ? '' : ',';
    }



    private addConstructor(constructorObject, className) {
        this.componentFileDetails.componentConstructorParams.push(
            `${Constant.PRIVATE_ACCESS_MODIFIER} ${constructorObject}: ${className}`
        );
    }

    // GpHeaders
    private componentHeaders(classname, path) {
        const temp = {
            classname: '',
            path: ''
        }
        temp.classname = classname;
        temp.path = path;
        this.componentFileDetails.importComponent.push(temp);
    }
}