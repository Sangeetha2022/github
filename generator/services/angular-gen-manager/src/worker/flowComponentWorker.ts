
import * as util from 'util';
import { Constant } from '../config/Constant';
import { FlowServiceWorker } from './flowServiceWorker';
import { connect } from 'http2';

export class FlowComponentWorker {

    private componentObject: any;
    private componentName: String = null;
    private currentFlow: any = null;
    private componentFileDetails: any;
    private entities: any[] = [];
    private flowServiceWorker = new FlowServiceWorker();

    generateComponentFlow(componentObject, temp, entities) {
        console.log("Temp=---------123-----", temp)
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
        console.log('flowComponent componentObject are ---- ', util.inspect(this.componentObject, { showHidden: true, depth: null }));
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
            // dependenices variables are added
            this.componentObject.variableList = this.componentObject.variableList.concat(this.componentObject.dependenciesVariableList);
            this.componentObject.flowMethod.forEach(flowElement => {
                this.currentFlow = null;
                this.currentFlow = flowElement;
                // console.log('each flowElement are ----  ', util.inspect(flowElement, { showHidden: true, depth: null }))
                flowElement.components.connector.forEach(connectorElement => {
                    if (connectorElement.isDefault && !connectorElement.isDisabled) {
                        this.addComponentMethod(Constant.DEFAULT_CONNECTOR_NAME, connectorElement);
                    } else if (connectorElement.isCustom) {
                        console.log('entered into the else if condition are---')
                        this.addComponentMethod(Constant.AVAILABLE_CONNECTOR_NAME, connectorElement);
                    }
                })
            })
            this.addComponentVariable();
            this.componentOption();
        } else {
            if (this.componentObject.dependenciesVariableList &&
                this.componentObject.dependenciesVariableList.length > 0) {
                this.componentObject.variableList = this.componentObject.variableList.concat(this.componentObject.dependenciesVariableList);
            }
            if (this.componentObject.variableList.length > 0) {
                this.addComponentVariable();
            }

        }
    }

    // to check service connector and get those information to construct the method in ts component
    checkServiceConnector() {
        const connector = this.flowServiceWorker.serviceConnectorInfo(this.currentFlow._id);
        console.log('checkservice connector in component are --- ', connector);
    }

    //setGpSerch

    // setGpSearch(searchFlow, tempData) {
    //     console.log("i am inside-----------", this.componentFileDetails)
    //     this.componentFileDetails = tempData;

    //     let createTemp = `${searchFlow}() {`;
    //     // if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
    //     createTemp += `\n this.screen760635Servicedass.GPSearch(entity)`;
    //     createTemp += `\n  .subscribe(`;
    //     createTemp += `\n    data => {`;
    //     createTemp += `\n       console.log('data created successfully');`;
    //     // if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME && this.componentObject.flowMethod[0].components.connector.length > 0) {
    //     //     createTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
    //     //     this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
    //     // } else { }
    //     createTemp += `\n    },`;
    //     createTemp += `\n    error => {`;
    //     createTemp += `\n       console.log('cannot able to create the data');`;
    //     createTemp += `\n    }`;
    //     createTemp += `\n    );`;
    //     // calling constructor methods
    //     // this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

    //     // calling component headers
    //     // this.componentHeaders(headers.className, headers.path);
    //     // }
    //     createTemp += `\n}`;
    //     console.log("create----Temp-----", createTemp)
    //     // component methods
    //     this.componentFileDetails.componentMethod.push(createTemp);

    //     // let serviceClassName = ``;
    //     // let entityInfo = null;
    //     // let headers = {
    //     //     className: '',
    //     //     path: ''
    //     // }
    //     // const methodParams = '';
    //     // let connectorParams = '';
    //     // let connectorType = "available"

    //     // // this.checkServiceConnector();
    //     // serviceClassName = `${this.componentName.charAt(0).toUpperCase()}${this.componentName.slice(1)}${Constant.SERVICE_EXTENSION.charAt(0).toUpperCase()}${Constant.SERVICE_EXTENSION.slice(1)}`;
    //     // headers.className = serviceClassName;
    //     // headers.path = `./${this.componentName.toLowerCase()}.${Constant.SERVICE_EXTENSION.toLowerCase()}`;

    //     // let searchTemp = `${searchFlow}(dass) {`;
    //     // if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
    //     //     searchTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${searchFlow}(${connectorParams ? connectorParams : `${this.componentObject.variableList[0].entityName}`})`;
    //     //     searchTemp += `\n  .subscribe(`;
    //     //     searchTemp += `\n    data => {`;
    //     //     searchTemp += `\n       console.log('data searched successfully --- ', data);`;
    //     //     // if (connectorType == Constant.DEFAULT_CONNECTOR_NAME) {
    //     //         searchTemp += `\n       this.rowData = data.body;`;
    //     //     // } 
    //     //     // else if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME) {
    //     //         if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME && this.componentObject.flowMethod[0].components.connector.length > 0) {
    //     //             searchTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
    //     //             this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
    //     //         }
    //     //          else {
    //     //             searchTemp += `\n       this.rowData = ${entityInfo ? `data.${entityInfo.name}` : '[]'};`;
    //     //         // }
    //     //     }
    //     //     searchTemp += `\n    },`;
    //     //     searchTemp += `\n    error => {`;
    //     //     searchTemp += `\n       console.log('cannot able to search the data --- ', error);`;
    //     //     searchTemp += `\n    }`;
    //     //     searchTemp += `\n    );`;
    //     //     // calling constructor methods
    //     //     this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

    //     //     // calling component headers
    //     //     this.componentHeaders(headers.className, headers.path);
    //     // }
    //     // searchTemp += `\n}`;
    //     // // component methods
    //     // console.log("Serach--temp=======-----", searchTemp)
    //     // this.componentFileDetails.componentMethod.push(searchTemp);

    // }

    // GpCodeToAdd and GpRequest
    private addComponentMethod(connectorType, connectorElement) {
        let serviceClassName = ``;
        let entityInfo = null;
        let headers = {
            className: '',
            path: ''
        }
        const methodParams = '';
        let connectorParams = '';

        // this.checkServiceConnector();
        serviceClassName = `${this.componentName.charAt(0).toUpperCase()}${this.componentName.slice(1)}${Constant.SERVICE_EXTENSION.charAt(0).toUpperCase()}${Constant.SERVICE_EXTENSION.slice(1)}`;
        headers.className = serviceClassName;
        headers.path = `./${this.componentName.toLowerCase()}.${Constant.SERVICE_EXTENSION.toLowerCase()}`;

        // default connector type
        if (connectorType == Constant.DEFAULT_CONNECTOR_NAME) {

            // available connector types
        } else if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME) {
            console.log('available connector in component are --- ', this.componentObject.flowMethod.length, ' connector  ', util.inspect(this.componentObject, { showHidden: true, depth: null }));
            console.log('available connector in component are -connector.properties-- ', this.componentObject.flowMethod[0].components.connector[0].properties);
            console.log('test else if create---- ', `${this.componentObject.variableList[this.componentObject.variableList.findIndex(x => x.entityName != undefined)].entityName}`);
            console.log('${this.componentObject.variableList[0].entityName}  --- ', `${this.componentObject.variableList[0].entityName}`);

            entityInfo = this.entities.find(x => x._id === connectorElement.entity_id);
            if (entityInfo) {
                const variableTemp = {
                    entityId: '',
                    entityName: '',
                    fields: []
                }
                variableTemp.entityId = entityInfo._id;
                variableTemp.entityName = entityInfo.name;
                this.componentObject.variableList.push(variableTemp);
            }
            this.componentObject.flowMethod[0].components.connector[0].properties.forEach((element, index) => {
                if (element.isDynamicParams) {
                    connectorParams += `this.${element.key}`;
                    if (index !== this.componentObject.flowMethod[0].components.connector[0].properties.length - 1) {
                        connectorParams += `,`;
                    }
                    this.componentObject.variableList.push(`${element.key}`);
                }
            })
        }
        switch (this.currentFlow.actionOnData) {
            case Constant.GP_CREATE_FLOW:
                // console.log('check request method are -----  ', this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW));
                let createTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    createTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(this.${this.componentObject.variableList[this.componentObject.variableList.findIndex(x => x.entityName != undefined)].entityName})`;
                    createTemp += `\n  .subscribe(`;
                    createTemp += `\n    data => {`;
                    createTemp += `\n              this.toastr.success('data save sucessfully','Success' , {
                        timeOut: 3000
                      }); `
                    createTemp += `\n       console.log('data created successfully');`;
                    if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME && this.componentObject.flowMethod[0].components.connector.length > 0) {
                        createTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
                        this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
                    } else { }
                    createTemp += `\n    },`;
                    createTemp += `\n    error => {`;
                    createTemp += `\n             this.toastr.error('Failed to data save', 'Failed' ,{
                        timeOut: 3000
                      });`       
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
                let searchTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    searchTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(${connectorParams ? connectorParams : `this.${this.componentObject.variableList[0].entityName}`})`;
                    searchTemp += `\n  .subscribe(`;
                    searchTemp += `\n    data => {`;
                    searchTemp += `\n       console.log('data searched successfully --- ', data);`;
                    if (connectorType == Constant.DEFAULT_CONNECTOR_NAME) {
                        if (this.componentObject.dynamictype === 'dynamicdropdown-type') {
                            searchTemp += `\n       this.itemArray = data.body;`;
                        } else {
                            searchTemp += `\n       this.rowData = data.body;`;
                        }
                    } else if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME) {
                        if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME && this.componentObject.flowMethod[0].components.connector.length > 0) {
                            searchTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
                            this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
                        } else {
                            searchTemp += `\n       this.rowData = ${entityInfo ? `data.${entityInfo.name}` : '[]'};`;
                        }
                    }
                    searchTemp += `\n    },`;
                    searchTemp += `\n    error => {`;
                    searchTemp += `\n       console.log('cannot able to search the data --- ', error);`;
                    searchTemp += `\n    }`;
                    searchTemp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);

                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                searchTemp += `\n}`;
                // component methods
                this.componentFileDetails.componentMethod.push(searchTemp);
                break;
            case Constant.GP_UPDATE_FLOW:
                let updateTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    updateTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(${connectorParams ? connectorParams : `this.${this.componentObject.variableList[0].entityName}`})`;
                    updateTemp += `\n  .subscribe(`;
                    updateTemp += `\n    data => {`;
                    updateTemp += `\n              this.toastr.success('data save sucessfully','Success' , {
                        timeOut: 3000
                      }); `
                    updateTemp += `\n       console.log('data updated successfully --- ', data);`;
                    if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME && this.componentObject.flowMethod[0].components.connector.length > 0) {
                        updateTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
                        this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
                    } else { }
                    updateTemp += `\n    },`;
                    updateTemp += `\n    error => {`;
                    updateTemp += `\n             this.toastr.error('Failed to data save', 'Failed ',{
                        timeOut: 3000
                      });`
                    updateTemp += `\n       console.log('cannot able to update the data --- ', error);`;
                    updateTemp += `\n    }`;
                    updateTemp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);
                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                updateTemp += `\n}`; 
                // component methods6
                this.componentFileDetails.componentMethod.push(updateTemp);
                // console.log('update component are -----  ', updateTemp);
                break;
            case Constant.GP_DELETE_FLOW:
                const serviceRequestParams = `${Constant.QUERY_VARIABLE_NAME}${Constant.IDVARIABLE}`;
                let isDeleteExist = false;
                this.componentFileDetails.componentVariable.forEach(element => {
                    if (typeof (element) != 'object' &&
                        element.includes(serviceRequestParams)) {
                        isDeleteExist = true;
                    }
                });
                if (!isDeleteExist && this.componentObject.variableList.length > 0) {
                    this.componentObject.variableList.forEach(element => {
                        console.log('each element are ------ ', element);
                        console.log('each element types are ------ ', typeof (element));
                        if (typeof (element) != 'object' &&
                            element.includes(serviceRequestParams)) {
                            isDeleteExist = true;
                        }
                    })
                }
                // if delete variable is not present then we need to add it
                if (!isDeleteExist) {
                    this.componentFileDetails.componentVariable.push(`${this.componentObject.variableList[0].entityName}${Constant.IDVARIABLE}`);
                }
                let deleteTemp = `${this.currentFlow.name}() {`;
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    deleteTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(${connectorParams ? connectorParams : isDeleteExist ? `this.${serviceRequestParams}` : `this.${this.componentObject.variableList[0].entityName}${Constant.IDVARIABLE}`})`;
                    deleteTemp += `\n  .subscribe(`;
                    deleteTemp += `\n    data => {`;
                    deleteTemp += `\n       console.log('data deleted successfully --- ', data);`;
                    if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME && this.componentObject.flowMethod[0].components.connector.length > 0) {
                        deleteTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
                        this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
                    } else { }
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
                let getAllValueTemp = `${this.currentFlow.name}() {`;
                const rowDataTemp = this.componentObject.variableList.findIndex(x => /rowData/.test(x));
                if (this.checkMicroFlowSteps(Constant.COMPONENT_REQUEST_MICROFLOW)) {
                    console.log('get all valiesus flows of entityare ----  ', entityInfo);
                    getAllValueTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(${connectorParams ? connectorParams : ''})`;
                    getAllValueTemp += `\n  .subscribe(`;
                    getAllValueTemp += `\n    data => {`;
                    getAllValueTemp += `\n       console.log('successfully get all data --- ', data);`;
                    if (connectorType == Constant.DEFAULT_CONNECTOR_NAME) {
                        if (rowDataTemp > -1) {
                            getAllValueTemp += `\n       this.rowData = data.body;`;
                        }
                    } else if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME) {
                        if (rowDataTemp > -1) {
                            getAllValueTemp += `\n       this.rowData = ${entityInfo ? `data.${entityInfo.name}` : '[]'};`;
                        } else {
                            if (this.componentObject.flowMethod[0].components.connector.length > 0) {
                                getAllValueTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
                                this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
                            }
                        }
                    }
                    getAllValueTemp += `\n    },`;
                    getAllValueTemp += `\n    error => {`;
                    getAllValueTemp += `\n       console.log('cannot able to get all data --- ', error);`;
                    getAllValueTemp += `\n    }`;
                    getAllValueTemp += `\n    );`;
                    // calling constructor methods
                    this.addConstructor(`${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}`, serviceClassName);
                    // calling component headers
                    this.componentHeaders(headers.className, headers.path);
                }
                getAllValueTemp += `\n}`;
                // component methods
                this.componentFileDetails.componentMethod.push(getAllValueTemp);
                // console.log('update component are -----  ', updateTemp);
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
                    getByIdTemp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${this.currentFlow.name}(this.${connectorParams ? connectorParams : `${Constant.QUERY_VARIABLE_NAME}${Constant.IDVARIABLE}`})`;
                    getByIdTemp += `\n  .subscribe(`;
                    getByIdTemp += `\n    data => {`;
                    getByIdTemp += `\n       console.log('successfully get the data by id --- ', data);`;
                    if (connectorType == Constant.AVAILABLE_CONNECTOR_NAME && this.componentObject.flowMethod[0].components.connector.length > 0) {
                        getByIdTemp += `\n   this.${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE} = data.${this.componentObject.flowMethod[0].components.connector[0].entityName};`;
                        this.setComponentVariable(`${this.componentObject.flowMethod[0].components.connector[0].entityName}${Constant.LIST_VARIABLE};`);
                    } else {
                        getByIdTemp += `\n       this.${this.componentObject.variableList[0].entityName} = data.body;`;
                    }
                    getByIdTemp += `\n    },`;
                    getByIdTemp += `\n    error => {`;
                    getByIdTemp += `\n       console.log('cannot able to get the data using its id--- ', error);`;
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

    private setComponentVariable(name) {
        const regex = new RegExp(name);
        console.log('this componentobj in setcomponetnvar are 0--- -', this.componentObject);
        const finded = this.componentObject.variableList.findIndex(x => regex.test(x));
        if (finded < 0) {
            this.componentObject.variableList.push(name);
        }
    }

    // GpOptons
    private componentOption() {
        if (this.checkMicroFlowSteps(Constant.COMPONENT_OPTIONS_MICROFLOW)) {
            this.addComponentVariable();
        }
    }

    private addComponentVariable() {
        console.log('ts component variable are -----  ', this.componentObject.variableList);
        this.componentObject.variableList.forEach(element => {
            // for entities variable in component.ts
            const entitiesObject = this.entities.find(x => x._id == element.entityId);
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
        const temp = `${Constant.PRIVATE_ACCESS_MODIFIER} ${constructorObject}: ${className}`;
        if (!this.componentFileDetails.componentConstructorParams.find(x => x == temp)) {
            let toastrService = `${Constant.PRIVATE_ACCESS_MODIFIER} toastr : ToastrService`
            this.componentFileDetails.componentConstructorParams.push(toastrService);
            this.componentFileDetails.componentConstructorParams.push(temp);
            console.log("Push---values000-----addconstructor----", this.componentFileDetails.componentConstructorParams)
        }
    }

    // GpHeaders
    private componentHeaders(classname, path) {
        if (!this.componentFileDetails.importComponent.find(x => x.classname === classname && x.path === path)) {
            const temp = {
                classname: '',
                path: ''
            }
            temp.classname = classname;
            temp.path = path;
            this.componentFileDetails.importComponent.push(temp);
        }
    }
}