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
        console.log('projectGenerationPath in Controller worker ---- ', projectGenerationPath);
        console.log('templateLocationPath in Controller worker ---- ', templateLocationPath);
        console.log('Controller worker ---- ', Controller);
        console.log('create project node -------  ', util.inspect(Controller, { showHidden: true, depth: null }));
        //    const ControllerPath = `${projectGenerationPath}/src/Controller`;
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
            // default
            // const tempImport.dependencyName.findIndex();
            console.log(`controllerObjcec are om count ${this.count} `, util.inspect(controllerObj, { showHidden: true, depth: null }));
            const expressPathIndex = controllerObj.import.dependencies.findIndex(x => x.path == `express`);
            // const sevicePathIndex = controllerObj.import.dependencyPath.findIndex(x => x == `../models/${this.entitySchema.fileName}`);
            if (expressPathIndex < 0) {
                // tempImport.dependencyName.push(`* as mongoose`);
                // tempImport.dependencyPath.push(`mongoose`);
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `{ Request, Response }`;
                tempImport.path = `express`;
                this.tempController.GpStart.dependencies.push(tempImport);
            }

            const sevicePathIndex = controllerObj.import.dependencies.findIndex(x => x.path == `../services/${this.entitySchema.fileName}Service`);
            if (sevicePathIndex < 0) {
                // tempImport.dependencyName.push(`{ ${this.entitySchema.modelName} }`);
                console.log(`entityPath inded ar e------  count ${this.count} `, sevicePathIndex, '  -----  ', `../models/${this.entitySchema.fileName}`);
                // tempImport.dependencyPath.push(`../models/${this.entitySchema.fileName}`);
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `${this.entitySchema.fileName}Service`;
                tempImport.path = `../services/${this.entitySchema.fileName}Service`;
                this.tempController.GpStart.dependencies.push(tempImport);
            }

            // this.importEntitySchema(tempImport, null, 'import');
            // this.tempController.GpStart = tempImport;
        }
        console.log(`Controller worker of gpstart - count ${this.count} `, this.tempController.GpStart);
        this.count++;
    }

    gpVariableStatement(controllerObj) {
        // this.tempController.GpVariable =
        //     {
        //         insideClass: { variableName: [], parentName: [] },
        //         outsideClass: { variableName: [], parentName: [] }
        //     };
        // this.tempController.GpVariable.insideClass = {
        //     variableName: [],
        //     parentName: []
        // }
        // this.tempController.GpVariable.outsideClass = {
        //     variableName: [],
        //     parentName: []
        // }
        this.tempController.GpVariable.insideClass = [];
        this.tempController.GpVariable.outsideClass = [];
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
            this.tempController.function.methodName = this.flowDetail.actionOnData;
            // this.flowAction();
        }
    }

    // flowAction() {
    //     this.tempController.function.methodName = '';
    //     this.tempController.function.parameter = '';
    //     this.tempController.function.variable = '';
    //     this.tempController.function.verbs = '';
    //     this.tempController.function.query = '';
    //     this.tempController.function.return = '';
    //     switch (this.flowDetail.actionOnData) {
    //         case 'GpCreate':
    //             console.log('flowaction into gpcreate ------  ');
    //             this.tempController.function.methodName = this.flowDetail.actionOnData;
    //             this.tempController.function.parameter = `${this.entitySchema.fileName}Data, callback`;
    //             this.tempController.function.variable = `let temp = new ${this.entitySchema.modelName}(${this.entitySchema.fileName}Data)`;
    //             this.tempController.function.verbs = `temp.save`;
    //             // this.tempController.method.variable = `let ${entityElement.fileName}`
    //             break;
    //         case 'GpSearch':
    //             this.tempController.function.methodName = this.flowDetail.actionOnData;
    //             this.tempController.function.parameter = `${this.entitySchema.fileName}Data, callback`;
    //             this.tempController.function.verbs = `this.${this.entitySchema.fileName}.findOneAndUpdate`;
    //             this.tempController.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
    //             break;
    //         case 'GpUpdate':
    //             this.tempController.function.methodName = this.flowDetail.actionOnData;
    //             this.tempController.function.parameter = `${this.entitySchema.fileName}Data, callback`;
    //             this.tempController.function.verbs = `this.${this.entitySchema.fileName}.findOneAndUpdate`;
    //             this.tempController.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
    //             break;
    //         case 'GpDelete':
    //             this.tempController.function.methodName = this.flowDetail.actionOnData;
    //             this.tempController.function.parameter = `${this.entitySchema.fileName}Id, callback`;
    //             this.tempController.function.verbs = `this.${this.entitySchema.fileName}.findByIdAndRemove`;
    //             this.tempController.function.query = `${this.entitySchema.fileName}Id`;
    //             break;
    //         case 'GpGetAllValues':
    //             this.tempController.function.methodName = this.flowDetail.actionOnData;
    //             this.tempController.function.parameter = `callback`;
    //             this.tempController.function.verbs = `this.${this.entitySchema.fileName}.find`;
    //             break;
    //         case 'GpSearchDetail':
    //             break;
    //         case 'GpSearchForUpdate':
    //             this.tempController.function.methodName = this.flowDetail.actionOnData;
    //             this.tempController.function.parameter = `${this.entitySchema.fileName}Data, callback`;
    //             this.tempController.function.verbs = `this.${this.entitySchema.fileName}.findOneAndUpdate`;
    //             this.tempController.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
    //             break;
    //         case 'GpDeleteNounRelationship':
    //             break;
    //         case 'GpFileUpload':
    //             break;
    //         case 'GpDeleteNounByRelation':
    //             break;
    //         case 'GpCancel':
    //             break;
    //         case 'GpGetNounFromRelation':
    //             break;
    //         case 'GpAppStartup':
    //             break;
    //         case 'GpGridExportCSV':
    //             break;
    //         case 'GpCreateRelationship':
    //             break;
    //         case 'GpRecordVideo':
    //             break;
    //         case 'GpGetNounByRelationship':
    //             break;
    //         case 'GpTakePhoto':
    //             break;
    //         case 'GpCustom':
    //             break;
    //         case 'GpGetNounById':
    //             break;
    //         case 'GpDeleteByParentId':
    //             break;
    //         case 'GpGetNounByParentId':
    //             break;
    //         default:
    //             break;

    //     }
    // }

}