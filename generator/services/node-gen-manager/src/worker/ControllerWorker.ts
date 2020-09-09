import * as util from 'util';
import { ControllerSupportWorker } from '../supportworker/ControllerSupportWorker';

let controllerSupportWorker = new ControllerSupportWorker();

export class ControllerWorker {

    private tempController = {
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
        }
    }
    private flowDetail;
    private entitySchema;
    private gpController;
    count = 0;

    createController(flowDetail, gpController, entityElement, controllerObj) {
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpController = gpController;
        this.gpStart(controllerObj);
        this.gpVariableStatement(controllerObj);
        this.gpCheckConnector();
        this.gpFunction();
        return this.tempController;
    }

    generateControllerFile(projectGenerationPath, templateLocationPath, Controller) {
        Controller.forEach(ControllerElement => {
            controllerSupportWorker.generateControllerFile(projectGenerationPath, templateLocationPath, ControllerElement, (response) => {
                console.log('file generated and saved')
            })
        });
    }


    gpStart(controllerObj) {
        this.tempController.GpStart.dependencies = [];

        const gpStart = this.gpController.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpStart') {
                    return element;
                }
            });
        if (gpStart !== undefined) {
            const expressPathIndex = controllerObj.import.dependencies.findIndex(x => x.path == `express`);
            if (expressPathIndex < 0) {
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `{ Request, Response }`;
                tempImport.path = `express`;
                this.tempController.GpStart.dependencies.push(tempImport);
            }

            const sevicePathIndex = controllerObj.import.dependencies.findIndex(x => x.path == `../service/${this.entitySchema.fileName}Service`);
            if (sevicePathIndex < 0) {
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `{ ${this.entitySchema.fileName}Service }`;
                tempImport.path = `../service/${this.entitySchema.fileName}Service`;
                this.tempController.GpStart.dependencies.push(tempImport);
            }
        }
        console.log(`Controller worker of gpstart - count ${this.count} `, this.tempController.GpStart);
        this.count++;
    }

    gpVariableStatement(controllerObj) {
        this.tempController.GpVariable.insideClass = [];
        this.tempController.GpVariable.outsideClass = [];
        const gpVariableStatement = this.gpController.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpVariable_statement') {
                    return element;
                }
            });
        if (gpVariableStatement != undefined) {
            const outsideClassIndex = controllerObj.variable.outsideClass.findIndex(x => x.parentName == `new ${this.entitySchema.fileName}Service()`);
            if (outsideClassIndex < 0) {
                const temp = {
                    variableName: '',
                    parentName: ''
                }
                temp.variableName = this.entitySchema.fileName;
                temp.parentName = `new ${this.entitySchema.fileName}Service()`;
                this.tempController.GpVariable.outsideClass.push(temp);
            }
        }
    }

    gpCheckConnector() {
        const gpCheckConnector = this.gpController.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpCheck_Connector') {
                    return element;
                }
            });
        if (gpCheckConnector !== undefined) {
            if (this.gpController.connector.length > 0) {
            }
        }
    }

    gpFunction() {
        this.tempController.function.methodName = '';
        const GpServiceCall = this.gpController.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpService_call') {
                    return element;
                }
            });
        if (GpServiceCall !== undefined) {

            switch (this.flowDetail.actionOnData) {
                case 'GpCreate':
                    this.tempController.function.methodName = `${this.entitySchema.fileName}_post`
                    break;

                case 'GpGetAllValues':
                    this.tempController.function.methodName = `${this.entitySchema.fileName}_get`
                    break;

                case 'GpUpdate':
                    this.tempController.function.methodName = `${this.entitySchema.fileName}_put`
                    break;

                case 'GpDelete':
                    this.tempController.function.methodName = `${this.entitySchema.fileName}_delete`
                    break;

                case 'GpSearch' :
                    this.tempController.function.methodName = `${this.entitySchema.fileName}_search`
                    break;

                case 'GpGetNounById':
                    this.tempController.function.methodName = `${this.entitySchema.fileName}_getNounById`
                    break;


                default:
                    this.tempController.function.methodName = this.flowDetail.actionOnData
                    break;


            }

            // this.tempController.function.methodName = this.flowDetail.actionOnData;
        }
    }

}