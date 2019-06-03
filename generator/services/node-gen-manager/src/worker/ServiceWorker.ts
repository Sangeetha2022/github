import * as util from 'util';
import { ServiceSupportWorker } from '../supportworker/ServiceSupportWorker';

let serviceSupportWorker = new ServiceSupportWorker();

export class ServiceWorker {

    private tempService = {
        GpStart: {
            dependencies: []
        },
        GpVariable:
        {
            insideClass: [],
            outsideClass: []
        },
        gpConnector: {},
        function: {
            methodName: '',
            parameter: '',
            variable: '',
            return: '',
            params: '',
            end: ''
        },
    }
    private flowDetail;
    private entitySchema;
    private gpService;
    count = 0;

    createService(flowDetail, gpService, entityElement, serviceObj) {
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpService = gpService;
        this.gpStart(serviceObj);
        this.gpVariableStatement(serviceObj);
        this.gpCheckConnector();
        this.gpFunction();
        return this.tempService;
    }

    generateServiceFile(projectGenerationPath, templateLocationPath, Service) {
        Service.forEach(ServiceElement => {
            console.log('===============================', util.inspect(ServiceElement, { showHidden: true, depth: null }));
            serviceSupportWorker.generateServiceFile(projectGenerationPath, templateLocationPath, ServiceElement, (response) => {
                console.log('file generated and saved')
            })
        });
    }


    gpStart(serviceObj) {
        this.tempService.GpStart.dependencies = [];

        const gpStart = this.gpService.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpStart') {
                    return element;
                }
            });
        if (gpStart !== undefined) {
            const expressPathIndex = serviceObj.import.dependencies.findIndex(x => x.path == `express`);
            console.log('========================================', util.inspect(serviceObj, { showHidden: true, depth: null }));
            if (expressPathIndex < 0) {
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `{ Request, Response }`;
                tempImport.path = `express`;
                this.tempService.GpStart.dependencies.push(tempImport);
            }

            const sevicePathIndex = serviceObj.import.dependencies.findIndex(x => x.path == `../dao/${this.entitySchema.fileName}Dao`);
            if (sevicePathIndex < 0) {
                // tempImport.dependencyName.push(`{ ${this.entitySchema.modelName} }`);
                console.log(`entityPath inded ar e------  count ${this.count} `, sevicePathIndex, '  -----  ', `../models/${this.entitySchema.fileName}`);
                // tempImport.dependencyPath.push(`../models/${this.entitySchema.fileName}`);
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `{${this.entitySchema.fileName}Dao}`;
                tempImport.path = `../dao/${this.entitySchema.fileName}Dao`;
                this.tempService.GpStart.dependencies.push(tempImport);
                console.log('============================ tempImport', tempImport)
            }

        }
        this.count++;
    }

    gpVariableStatement(serviceObj) {
        this.tempService.GpVariable.insideClass = [];
        this.tempService.GpVariable.outsideClass = [];
        const tempVariable = {
            insideClass: {
                variableName: [],
                parentName: []
            },
            outsideClass: {
                variableName: [],
                parentName: []
            }
        }
        const gpVariableStatement = this.gpService.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpVariable_statement') {
                    return element;
                }
            });
        if (gpVariableStatement != undefined) {
            const outsideClassIndex = serviceObj.variable.outsideClass.findIndex(x => x.parentName == `new ${this.entitySchema.fileName}Dao()`);
            if (outsideClassIndex < 0) {
                const temp = {
                    variableName: '',
                    parentName: ''
                }
                temp.variableName = this.entitySchema.fileName;
                temp.parentName = `new ${this.entitySchema.fileName}Dao()`;
                this.tempService.GpVariable.outsideClass.push(temp);
            }
        }
    }

    gpCheckConnector() {
        const gpCheckConnector = this.gpService.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpCheck_Connector') {
                    return element;
                }
            });
        if (gpCheckConnector !== undefined) {
            if (this.gpService.connector.length > 0) {
            }
        }
    }

    gpFunction() {
        this.tempService.function.methodName = '';
        const GpDaoCall = this.gpService.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpDaoCall') {
                    return element;
                }
            });
        if (GpDaoCall !== undefined) {
            this.tempService.function.methodName = this.flowDetail.actionOnData;
            // this.flowAction();
        }
    }

    flowAction() {
        this.tempService.function.methodName = '';
        this.tempService.function.parameter = '';
        this.tempService.function.variable = '';
        this.tempService.function.return = '';
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                console.log('flowaction into gpcreate ------  ');
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempService.function.variable = `let temp = new ${this.entitySchema.modelName}(${this.entitySchema.fileName}Data)`;
                // this.tempService.method.variable = `let ${entityElement.fileName}`
                break;
            case 'GpSearch':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                break;
            case 'GpUpdate':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempService.function.params = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
                break;
            case 'GpDelete':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.parameter = `${this.entitySchema.fileName}Id, callback`;
                this.tempService.function.params = `${this.entitySchema.fileName}Id`;
                break;
            case 'GpGetAllValues':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.parameter = `callback`;
                break;
            case 'GpSearchDetail':
                break;
            case 'GpSearchForUpdate':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempService.function.params = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
                break;
            case 'GpDeleteNounRelationship':
                break;
            case 'GpFileUpload':
                break;
            case 'GpDeleteNounByRelation':
                break;
            case 'GpCancel':
                break;
            case 'GpGetNounFromRelation':
                break;
            case 'GpAppStartup':
                break;
            case 'GpGridExportCSV':
                break;
            case 'GpCreateRelationship':
                break;
            case 'GpRecordVideo':
                break;
            case 'GpGetNounByRelationship':
                break;
            case 'GpTakePhoto':
                break;
            case 'GpCustom':
                break;
            case 'GpGetNounById':
                break;
            case 'GpDeleteByParentId':
                break;
            case 'GpGetNounByParentId':
                break;
            default:
                break;

        }
    }

}