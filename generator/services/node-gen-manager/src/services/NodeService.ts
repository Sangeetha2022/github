import { Request } from 'express';
import { NodeDao } from '../daos/NodeDao';
import * as util from 'util';
import { NodeWorker } from '../worker/NodeWorker';
import { Model } from '../../asset/utilies'
import * as asyncLoop from 'node-async-loop';
import { DaoWorker } from '../worker/DaoWorker';

let nodeDao = new NodeDao();
let nodeWorker = new NodeWorker();
let daoWorker = new DaoWorker();
let model = Model;
// let service = Service;

export class NodeService {
    private methods = []
    private schema = []
    private controller = [];
    private service = [];
    private dao = [];
    private daoObj = {
        entitySchemaName: '',
        entityModelName: '',
        entityFileName: '',
        import: {
            dependencies: []
        },
        variable: {
            insideClass: { variableName: [], parentName: [] },
            outsideClass: { variableName: [], parentName: [] }
        },
        flowAction: []
    }

    initalizeDaoVariable() {
        this.daoObj = {
            entitySchemaName: '',
            entityModelName: '',
            entityFileName: '',
            import: {
                dependencies: []
            },
            variable: {
                insideClass: { variableName: [], parentName: [] },
                outsideClass: { variableName: [], parentName: [] }
            },
            flowAction: []
        }
    }

    public generateNode = (req: Request, callback) => {
        nodeWorker.nodeModelWorker(model, (result) => {
            callback(result)
        })
    }

    public createProjectNode(req: Request, callback) {
        console.log('create project node -------  ', util.inspect(req.body, { showHidden: true, depth: null }));
        const details = req.body;
        const templateLocation = details.templateLocation.backendTemplate;
        const projectGenerationPath = details.projectGenerationPath;
        const flows = details.flows;
        const EntitySchema = details.entitySchema.body;
        console.log('flows length are ----##############------- ', details.flows.length);
        // const methods = []
        // const schema = []
        // const controller = [];
        // const service = [];
        // const dao = [];
        // const constrollerMicroFlows = {
        //     GpStart: '',
        //     GpVariableStatement: '',
        //     GpCheckConnector: '',
        //     GpServiceCall: '',
        //     GpReturn: '',
        //     GpEnd: ''
        // }
        // const tempDao = {
        //     GpStart: {
        //         dependencyName: [],
        //         dependencyPath: []
        //     },
        //     GpVariable:
        //     {
        //         insideClass: { variableName: [], parentName: [] },
        //         outsideClass: { variableName: [], parentName: [] }
        //     },
        //     function: {
        //         methodName: [],
        //         parameter: [],
        //         variable: [],
        //         verbs: [],
        //         query: [],
        //         return: []
        //     }
        // }


        if (EntitySchema === undefined && EntitySchema.length === 0) {
            callback('No Schema has been found');
        } else {
            asyncLoop(EntitySchema, (entityElement, entityNext) => {
                console.log('entity schema of each loop are -----  ', entityElement);
                // initial
                // this.daoObj.entitySchemaName = '';
                // this.daoObj.entityModelName = '';
                // this.daoObj.entityFileName = '';
                this.initalizeDaoVariable();

                // declare
                this.daoObj.entitySchemaName = entityElement.schemaName;
                this.daoObj.entityModelName = entityElement.modelName;
                this.daoObj.entityFileName = entityElement.fileName;


                if (entityElement === undefined) {
                    entityNext();
                } else {
                    const gpController = details.flows[0].components.find(
                        function (element, index, array) {
                            if (element.name === 'GpExpressController') {
                                return element;
                            }
                        }
                    )
                    const gpService = details.flows[0].components.find(
                        function (element, index, array) {
                            if (element.name === 'GpExpressService') {
                                return element;
                            }
                        }
                    )
                    const gpDao = details.flows[0].components.find(
                        function (element, index, array) {
                            if (element.name === 'GpExpressDao') {
                                return element;
                            }
                        }
                    )
                    asyncLoop(details.flows, (flowElement, flowNext) => {
                        const tempFlow = {
                            name: '',
                            label: '',
                            description: '',
                            type: '',
                            actionOnData: ''
                        }
                        tempFlow.name = flowElement.name;
                        tempFlow.label = flowElement.label;
                        tempFlow.description = flowElement.description;
                        tempFlow.type = flowElement.type;
                        tempFlow.actionOnData = flowElement.actionOnData;
                        let test = 0;
                        console.log('before calling dao ----- ', test);
                        const dao = daoWorker.createDao(tempFlow, gpDao, entityElement, this.daoObj);
                        console.log('daoWork compleleted ---- ', util.inspect(dao, { showHidden: true, depth: null }));
                        // import dependencies
                        this.daoObj.import.dependencies = this.daoObj.import.dependencies.concat(dao.GpStart.dependencies);
                       
                        // inside variable
                        this.daoObj.variable.insideClass.parentName = this.daoObj.variable.insideClass.parentName.concat(dao.GpVariable.insideClass.parentName);
                        this.daoObj.variable.insideClass.variableName = this.daoObj.variable.insideClass.variableName.concat(dao.GpVariable.insideClass.variableName);

                        // outside variable
                        this.daoObj.variable.outsideClass.parentName = this.daoObj.variable.outsideClass.parentName.concat(dao.GpVariable.outsideClass.parentName);
                        this.daoObj.variable.outsideClass.variableName = this.daoObj.variable.outsideClass.variableName.concat(dao.GpVariable.outsideClass.variableName);

                        // gp function 
                        this.daoObj.flowAction.push(dao.function);
                        // tempDao.function.methodName.push(dao.function.methodName);
                        // tempDao.function.parameter.push(dao.function.parameter);
                        // tempDao.function.variable.push(dao.function.variable);
                        // tempDao.function.verbs.push(dao.function.verbs);
                        // tempDao.function.query.push(dao.function.query);
                        // tempDao.function.return.push(dao.function.return);
                        flowNext();
                    }, (err) => {
                        if (err) {

                        } else {
                            console.log('daoWork compleleted after assigned value ---- ', this.daoObj);
                            this.dao.push(this.daoObj);
                            entityNext();
                        }
                    })
                }


            }, (entityError) => {
                if (entityError) {

                } else {
                    console.log('entity iteration completed -------   ', this.dao);
                    daoWorker.generateDaoFile(projectGenerationPath, templateLocation, this.dao);

                }
            })
        }

        //         const gpController = details.flows[0].components.find(
        //             function (element, index, array) {
        //                 console.log('find element ---@@--->>>   ', element);
        //                 console.log('find index ----@@-->>>   ', index);
        //                 console.log('find array ----@@-->>>   ', array);
        //                 if(element.name === 'GpExpressController') {
        //                     return element;
        //                 }
        //             }
        //         )
        //         const gpStart = gpController.microFlows.find(function(element, index, array) {
        //              if(element.microFlowStepName === 'GpStart') {
        //                  return element;
        //              }
        //         })
        //         console.log('gpStart element are ---------  ', gpStart);

        //         const GpVariable_statement = gpController.microFlows.find(function(element, index, array) {
        //             if(element.microFlowStepName === 'GpVariable_statement') {
        //                 return element;
        //             }
        //        })
        //        console.log('GpVariable_statement element are ---------  ', GpVariable_statement);

        //        const GpCheck_Connector = gpController.microFlows.find(function(element, index, array) {
        //         if(element.microFlowStepName === 'GpCheck_Connector') {
        //             return element;
        //         }
        //    })
        //    console.log('GpCheck_Connector element are ---------  ', GpCheck_Connector);
        //         console.log('gpController final one are ------   ', gpController);

        // const response = this.iterateFlow(flows);
        // console.log('flows respponser are =====   ', response);


        // daoWorker.createDao();
        callback();
    }

    iterateFlow(flows) {
        console.log('iterating flows ');
        asyncLoop(flows, (flowElement, flowNext) => {
            const methods = {
                name: '',
                label: '',
                description: '',
                type: '',
                actionOnData: ''
            }
            if (flowElement === undefined) {
                flowNext();
            } else {
                methods.name = flowElement.name;
                methods.label = flowElement.label;
                methods.description = flowElement.description;
                methods.type = flowElement.type;
                methods.actionOnData = flowElement.actionOnData;
                this.methods.push(methods);
                console.log('before iterating components length ------   ', flowElement.components);
                flowElement.components.forEach(componentElement => {
                    console.log('each components flow element --------    ', componentElement);
                    const component = {
                        name: '',
                        label: '',
                        microflows: [],
                        connectors: []
                    }
                    const microflow = {
                        GpStart: '',
                        GpVariableStatement: '',
                        GpCheckConnector: '',
                        GpServiceCall: '',
                        GpReturn: '',
                        GpEnd: ''
                    }
                    switch (componentElement.name) {
                        case 'GpExpressController':
                            component.name = componentElement.name;
                            component.label = componentElement.label;
                            const res = this.iterateMicroFlow(methods, componentElement.name, componentElement.microFlows, microflow);
                            // const connector = this.iterateConnector(componentElement.connector);
                            console.log('microflow response ---11--- ', res);
                            // console.log('connectors response ---22--- ', connector);
                            console.log('microflow assigned values  ---33--- ', microflow);
                            break;
                        case 'GpExpressService':
                            break;
                        case 'GpExpressDao':
                            break;
                        default:
                            break;
                    }
                })
                console.log('  eeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnddddddddddddd $$$$$@####    ');
                // flowNext();
            }

        }, (err) => {
            if (err) {

            } else {
                return 'completed';
            }
        })
    }

    // defaultFiles(componentName, microFlowStepName) {
    //     if(componentName === 'GpExpressController' && microFlowStepName)
    // }

    iterateMicroFlow(flowMethod, componentName, componentMicroFlow, microflow) {
        console.log('component microflows are -----  ', componentMicroFlow);
        console.log('component microflows are --length---  ', componentMicroFlow.length);
        const details = {};
        componentMicroFlow.forEach(microflow => {
            switch (microflow.microFlowStepName) {
                case 'GpStart':
                    const temp = {
                        dependencyPath: '',
                        dependencyName: []
                    }
                    // detail import
                    switch (componentName) {
                        case 'GpExpressController':
                            temp.dependencyPath = 'express';
                            temp.dependencyName.push(`Request`);
                            temp.dependencyName.push(`Response`);
                            microflow.GpStart.push(temp);
                            break;
                        case 'GpExpressService':
                            break;
                        case 'GpExpressDao':
                            break;
                        default:
                            break;
                    }

                    console.log('GpStart assigned values  ------ ', microflow);
                    break;
                case 'GpVariable_statement':
                    console.log('variable assigned values  ------ ', microflow);
                    break;
                case 'GpCheck_Connector':
                    console.log('check connector assigned values  ------ ', microflow);
                    break;
                case 'GpService_call':
                    console.log('serviceCall assigned values  ------ ', microflow);
                    break;
                case 'GpReturn':
                    console.log('GPReturn assigned values  ------ ', microflow);
                    break;
                case 'GpEnd':
                    console.log('GpENd assigned values  ------ ', microflow);
                    break;
                default:
                    break;
            }
        })
        return microflow;

    }

    iterateConnector(flowConnector, microflow, microFlowStepName, isDefaultconnector) {
        const connectors = [];

        flowConnector.forEach(connector => {
            switch (microFlowStepName) {
                case 'GpStart':
                    const temp = {
                        dependencyPath: '',
                        dependencyName: []
                    }
                    if (connector.isDefault === isDefaultconnector) {
                        // default connector with component name 
                        switch (connector) {
                            case 'GpExpressController':
                                temp.dependencyPath = 'express';
                                temp.dependencyName.push(`Request`);
                                temp.dependencyName.push(`Response`);
                                microflow.GpStart.push(temp);
                                break;
                            case 'GpExpressService':
                                break;
                            case 'GpExpressDao':
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case 'GpVariable_statement':
                    if (connector.isDefault === isDefaultconnector) {

                    }
                    break;
                case 'GpCheck_Connector':
                    if (connector.isDefault === isDefaultconnector) {

                    }
                    break;
                case 'GpService_call':
                    if (connector.isDefault === isDefaultconnector) {

                    }
                    break;
                case 'GpReturn':
                    if (connector.isDefault === isDefaultconnector) {

                    }
                    break;
                case 'GpEnd':
                    if (connector.isDefault === isDefaultconnector) {

                    }
                    break;
                default:
                    break;

            }
        })

        // flowConnector.forEach(connector => {
        //     const tempObj = {
        //         isDefault: false,
        //         isDisabled: false,
        //         url: null,
        //         description: '',
        //         fromComponentName: '',
        //         toComponentName: ''
        //     }

        //     if (connector.isDefault && !connector.isDisabled) {
        //         tempObj.isDefault = connector.isDefault;
        //         tempObj.isDisabled = connector.isDisabled;
        //         tempObj.url = connector.url;
        //         tempObj.description = connector.description;
        //         connectors.push(tempObj);
        //     }

        // })
        // return connectors;
    }
}

