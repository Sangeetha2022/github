
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
        // console.log('final componeon file datesil are ----  ', this.componentFileDetails);
    }

    // GpCheck_Connector
    private checkConnector() {
        // flow method with connector
        console.log('flowComponent componentObject are ---- ', this.componentObject);
        // if variable list is empty need to add the primary entities in the variable list
        if (this.componentObject.variableList.length == 0 || 
            !this.componentObject.variableList[0].entityName) {
            const variableTemp = {
                entityId: '',
                entityName: '',
                fields: []
            }
            const primaryEntity = this.entities.find(x => x.entity_type == Constant.PRIMARY_NAME);
            if (primaryEntity) {
                variableTemp.entityId = primaryEntity._id;
                variableTemp.entityName = primaryEntity.name;
                this.componentObject.variableList.push(variableTemp);
            }
        }

        // if(componentDependency.component)
        // console.log('check component connector flow methods are ----  ', this.componentObject);
        if (this.componentObject.flowMethod.length > 0) {
            this.componentObject.flowMethod.forEach(flowElement => {
                this.currentFlow = null;
                this.currentFlow = flowElement;
                // console.log('each flowElement are ----  ', util.inspect(flowElement, { showHidden: true, depth: null }))
                flowElement.components.connector.forEach(connectorElement => {
                    if (connectorElement.isDefault && !connectorElement.isDisabled) {
                        this.addComponentMethod(Constant.DEFAULT_CONNECTOR_NAME);
                        this.componentOption();
                    }
                })
            })
        } else {
            if (this.componentObject.dependenciesVariableList &&
                this.componentObject.dependenciesVariableList.length > 0) {
                console.log('component object dependencie variable list are ---- ', this.componentObject.dependenciesVariableList.length);
                this.componentFileDetails.componentVariable = this.componentFileDetails.componentVariable.concat(this.componentObject.dependenciesVariableList);
            }
        }
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
                // console.log('check request method are -----  ', this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW));
                let createTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    createTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(this.${this.componentObject.variableList[this.componentObject.variableList.findIndex(x => x.entityName != undefined)].entityName})`;
                    createTemp += `\n  .subscribe(`;
                    createTemp += `\n    data => {`;
                    createTemp += `\n       console.log('data created successfully');`;
                    createTemp += `\n    },`;
                    createTemp += `\n    error => {`;
                    createTemp += `\n       console.log('cannot able to create the data');`;
                    createTemp += `\n    }`;
                    createTemp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                createTemp += `\n}`;
                // component methods
                this.componentFileDetails.componentMethod.push(createTemp);
                // console.log('create component are -----  ', createTemp);
                break;
            case Constant.GP_SEARCH_FLOW:
                break;
            case Constant.GP_UPDATE_FLOW:
                let updateTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    updateTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(this.${this.componentObject.variableList[0].entityName})`;
                    updateTemp += `\n  .subscribe(`;
                    updateTemp += `\n    data => {`;
                    updateTemp += `\n       console.log('data updated successfully --- ', data);`;
                    updateTemp += `\n    },`;
                    updateTemp += `\n    error => {`;
                    updateTemp += `\n       console.log('cannot able to update the data --- ', error);`;
                    updateTemp += `\n    }`;
                    updateTemp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                updateTemp += `\n}`;
                // component methods
                this.componentFileDetails.componentMethod.push(updateTemp);
                // console.log('update component are -----  ', updateTemp);
                break;
            case Constant.GP_DELETE_FLOW:
                let deleteTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    deleteTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(this.${this.componentObject.variableList[0].entityName})`;
                    deleteTemp += `\n  .subscribe(`;
                    deleteTemp += `\n    data => {`;
                    deleteTemp += `\n       console.log('data deleted successfully --- ', data);`;
                    deleteTemp += `\n    },`;
                    deleteTemp += `\n    error => {`;
                    deleteTemp += `\n       console.log('cannot able to delete the data --- ', error);`;
                    deleteTemp += `\n    }`;
                    deleteTemp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                deleteTemp += `\n}`;
                // component methods
                this.componentFileDetails.componentMethod.push(deleteTemp);
                // console.log('delete component are -----  ', deleteTemp);
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
                let getByIdTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    getByIdTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(this.${this.componentObject.variableList[0].entityName})`;
                    getByIdTemp += `\n  .subscribe(`;
                    getByIdTemp += `\n    data => {`;
                    getByIdTemp += `\n       console.log('data deleted successfully --- ', data);`;
                    getByIdTemp += `\n    },`;
                    getByIdTemp += `\n    error => {`;
                    getByIdTemp += `\n       console.log('cannot able to delete the data --- ', error);`;
                    getByIdTemp += `\n    }`;
                    getByIdTemp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                getByIdTemp += `\n}`;
                // component methods
                this.componentFileDetails.componentMethod.push(getByIdTemp);
                // console.log('getByIdTemp component are -----  ', getByIdTemp);
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
            this.componentObject.variableList = this.componentObject.variableList.concat(this.componentObject.dependenciesVariableList);
            this.addComponentVariable();
        }
    }

    private addComponentVariable() {
        console.log('ts component variable are -----  ', this.componentObject.variableList);
        this.componentObject.variableList.forEach(element => {
            // for entities variable in component.ts
            const entitiesObject = this.entities.find(x => x._id == element.entityId && x.entity_type == Constant.PRIMARY_NAME);
            // console.log('entitiesObject are ------  ', entitiesObject);
            if (entitiesObject) {
                let temp = `${entitiesObject.name} = {`;
                entitiesObject.field.forEach((fieldElement, fieldIndex) => {
                    temp += `\n   ${fieldElement.name}: ` + this.checkDataType(fieldElement) + this.isLastIndex(entitiesObject.field, fieldIndex);
                })
                temp += `\n}`
                this.componentFileDetails.componentVariable.push(temp);
            } else {
                // for other variable in component.ts
                this.componentFileDetails.componentVariable.push(element);
            }
        })
    }

    checkDataType(fieldElement) {
        // console.log('filed element test datatype are ---- ', fieldElement.data_type);
        return fieldElement.data_type.toLowerCase() ==
            Constant.STRING_DATATYPE ? `''` : fieldElement.data_type.toLowerCase() ==
                Constant.BOOLEAN_DATATYPE ? false : null;
    }

    isLastIndex(array, index) {
        // console.log('is last index arrays are ---  ', array);
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