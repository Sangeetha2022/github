import * as util from 'util';
import { DaoSupportWorker } from '../supportworker/DaoSupportWorker';

let daoSupportWorker = new DaoSupportWorker();

export class DaoWorker {

    private tempDao = {
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
            verbs: '',
            query: '',
            return: ''
        }
    }
    private flowDetail;
    private entitySchema;
    private gpDao;
    count = 0;

    createDao(flowDetail, gpDao, entityElement, daoObj) {
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpDao = gpDao;
        this.gpStart(daoObj);
        this.gpVariableStatement(daoObj);
        this.gpCheckConnector();
        this.gpFunction();
        return this.tempDao;
    }

    generateDaoFile(projectGenerationPath, templateLocationPath, dao) {
        dao.forEach(daoElement => {
            daoSupportWorker.generateDaoFile(projectGenerationPath, templateLocationPath, daoElement, (response) => {
                console.log('file generated and saved')
            })
        });
    }


    gpStart(daoObj) {
        this.tempDao.GpStart.dependencies = [];

        const gpStart = this.gpDao.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpStart') {
                    return element;
                }
            });
        if (gpStart !== undefined) {
            const mongoPathIndex = daoObj.import.dependencies.findIndex(x => x.path == `mongoose`);
            if (mongoPathIndex < 0) {
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `* as mongoose`;
                tempImport.path = `mongoose`;
                this.tempDao.GpStart.dependencies.push(tempImport);
            }

            const entityPathIndex = daoObj.import.dependencies.findIndex(x => x.path == `../models/${this.entitySchema.fileName}`);
            if (entityPathIndex < 0) {
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `${this.entitySchema.modelName}`;
                tempImport.path = `../models/${this.entitySchema.fileName}`;
                this.tempDao.GpStart.dependencies.push(tempImport);
            }
        }
        this.count++;
    }

    gpVariableStatement(daoObj) {
        this.tempDao.GpVariable.insideClass = [];
        this.tempDao.GpVariable.outsideClass = [];
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
        const gpVariableStatement = this.gpDao.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpVariable_statement') {
                    return element;
                }
            });
        if (gpVariableStatement != undefined) {
            const insideClassIndex = daoObj.variable.insideClass.findIndex(x => x.parentName == this.entitySchema.modelName);
            if (insideClassIndex < 0) {
                const temp = {
                    variableName: '',
                    parentName: ''
                }
                temp.variableName = this.entitySchema.fileName;
                temp.parentName = this.entitySchema.modelName;
                this.tempDao.GpVariable.insideClass.push(temp);
            }

        }
    }

    gpCheckConnector() {
        const gpCheckConnector = this.gpDao.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpCheck_Connector') {
                    return element;
                }
            });
        if (gpCheckConnector !== undefined) {
            if (this.gpDao.connector.length > 0) {
                // need to add some functionality for avaiable connectors in dao (future)
            }
        }
    }

    gpFunction() {
        const GpVerbKey = this.gpDao.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpVerbKey') {
                    return element;
                }
            });
        const GpSqlQuery = this.gpDao.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpSqlQuery') {
                    return element;
                }
            });
        if (GpVerbKey !== undefined && GpSqlQuery !== undefined) {
            this.flowAction();
        }
    }

    flowAction() {
        this.tempDao.function.methodName = '';
        this.tempDao.function.parameter = '';
        this.tempDao.function.variable = '';
        this.tempDao.function.verbs = '';
        this.tempDao.function.query = '';
        this.tempDao.function.return = '';
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.variable = `let temp = new ${this.entitySchema.modelName}(${this.entitySchema.fileName}Data)`;
                this.tempDao.function.verbs = `temp.save`;
                break;
            case 'GpSearch':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Id, callback`;
                this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findById`;
                this.tempDao.function.query = `${this.entitySchema.fileName}Id`;
                break;
            case 'GpUpdate':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findOneAndUpdate`;
                this.tempDao.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
                break;
            case 'GpDelete':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Id, callback`;
                this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findByIdAndRemove`;
                this.tempDao.function.query = `${this.entitySchema.fileName}Id`;
                break;
            case 'GpGetAllValues':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `callback`;
                this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.find`;
                break;
            case 'GpSearchDetail':
                break;
            case 'GpSearchForUpdate':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findOneAndUpdate`;
                this.tempDao.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
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