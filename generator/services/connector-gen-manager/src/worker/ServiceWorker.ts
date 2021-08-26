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
            requestParameter: '',
            responseVariable: '',
            variable: '',
            return: ''
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
            serviceSupportWorker.generateServiceFile(projectGenerationPath, templateLocationPath, ServiceElement, (response) => {
                console.log('service file generated and saved')
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
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `{${this.entitySchema.fileName}Dao}`;
                tempImport.path = `../dao/${this.entitySchema.fileName}Dao`;
                this.tempService.GpStart.dependencies.push(tempImport);
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
            // this.tempService.function.methodName = this.flowDetail.actionOnData;
            this.flowAction();
        }
    }

    flowAction() {
        
    }

}