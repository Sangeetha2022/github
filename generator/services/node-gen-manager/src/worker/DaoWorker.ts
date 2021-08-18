import * as util from 'util';
import { DaoSupportWorker } from '../supportworker/DaoSupportWorker';

let daoSupportWorker = new DaoSupportWorker();

export class DaoWorker {

    // npm 
    private requestNPM = {
        componentVariable: 'request',
        componentDependencies: [{
            name: '* as request',
            path: 'request-promise-native'
        }],
        packageDependencies: [{
            name: 'request',
            version: '^2.88.0'
        }, {
            name: 'request-promise-native',
            version: '^1.0.7'
        }]
    }

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
            objectiteration: '',
            verbs: '',
            query: '',
            return: '',
            isJsonFormat: false,
            connectorEntityName: null
        },
        packageDependencies: []
    }
    private flowDetail;
    private entitySchema;
    private gpDao;
    private modifiers;
    count = 0;

    createDao(flowDetail, gpDao, entityElement, daoObj, modifierResponse) {
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpDao = gpDao;
        this.modifiers = modifierResponse.body;
        this.gpStart(daoObj);
        this.gpVariableStatement(daoObj);
        // this.gpCheckConnector();
        this.gpFunction();
        return this.tempDao;
    }

    generateDaoFile(projectGenerationPath, templateLocationPath, dao) {
        dao.forEach(daoElement => {
            console.log('dao element values are -------- ', util.inspect(daoElement, { showHidden: true, depth: null }));
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
                console.log('gpdao connector details are --- ', this.gpDao.connector, ' --flowDetail--  ', this.flowDetail);
                this.addExternalConnector();
                return false;
            }
        }
        return true;
    }

    addExternalConnector() {
        console.log('gpDao connector vlaues ar e---  ', this.gpDao.connector[0]);
        const externalConnector = this.gpDao.connector[0];
        this.tempDao.function.verbs = this.requestNPM.componentVariable;
        this.tempDao.function.query = `\`${externalConnector.url}\``;
        this.tempDao.function.isJsonFormat = true;
        this.tempDao.function.connectorEntityName = externalConnector.entityName;
        // add component gpStart dependencies
        this.tempDao.GpStart.dependencies = this.tempDao.GpStart.dependencies.concat(this.requestNPM.componentDependencies);

        // add package json dependencies
        this.tempDao.packageDependencies = this.tempDao.packageDependencies.concat(this.requestNPM.packageDependencies);
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
        this.tempDao.function.objectiteration = '';
        const isDefault = this.gpCheckConnector();
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                this.tempDao.function.methodName =  this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                if (isDefault) {
                    this.tempDao.function.variable = `let temp = new ${this.entitySchema.modelName}(${this.entitySchema.fileName}Data)`;
                    this.tempDao.function.verbs = `temp.save`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
                break;
            case 'GpSearch':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                if (isDefault) {
                    /** The below is the code for the search criteria GpSearch before 
                     * making changes for the Objectiteration object or the query please check github issues #412 by Kishan on August 10th 2020*/
                    this.tempDao.function.variable += `let andkey ;`;
                    this.tempDao.function.variable += `let and_obj = {} ;`;
                    this.tempDao.function.variable += `let orkey ;`;
                    this.tempDao.function.variable += `let or_obj = {} ;`
                    if(this.modifiers.length > 0) {
                        this.tempDao.function.objectiteration = `Object.entries(${this.entitySchema.fileName}Data).forEach(
                            ([key,value]) => {
                                if(value !== ''){
                                    andkey = key;
                                    and_obj[andkey] = value;
                                }
                            }
                        );`;
                        this.tempDao.function.query = `{ $and: [and_obj] }`;

                    } else {
                        this.tempDao.function.objectiteration = `Object.entries(${this.entitySchema.fileName}Data).forEach(
                            ([key,value]) => {
                                if(value !== ''){
                                    andkey = key;
                                    and_obj[andkey] = value;
                                }
                                else{
                                    orkey = key;
                                    or_obj[orkey] = { $ne: '' }
                                }
                            }
                        );`;
                        this.tempDao.function.query = `{$and: [
                            {
                                $or: [
                                   or_obj
                                ]
                            },
                            and_obj
                        ]}`;
                    }
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.find`;
                    
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
                break;
            case 'GpSEF':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                if (isDefault) {
                    /** The below is the code for the search criteria GpSearch before 
                     * making changes for the Objectiteration object or the query please check github issues #412 by Kishan on August 10th 2020*/
                    this.tempDao.function.variable += `let andkey ;`;
                    this.tempDao.function.variable += `let and_obj = {} ;`;
                    this.tempDao.function.variable += `let orkey ;`;
                    this.tempDao.function.variable += `let or_obj = {} ;`
                    if(this.modifiers.length > 0) {
                        this.tempDao.function.objectiteration = `Object.entries(${this.entitySchema.fileName}Data).forEach(
                            ([key,value]) => {
                                if(value !== ''){
                                    andkey = key;
                                    and_obj[andkey] = value;
                                }
                            }
                        );`;
                        this.tempDao.function.query = `{ $and: [and_obj] }`;

                    } else {
                        this.tempDao.function.objectiteration = `Object.entries(${this.entitySchema.fileName}Data).forEach(
                            ([key,value]) => {
                                if(value !== ''){
                                    andkey = key;
                                    and_obj[andkey] = value;
                                }
                                else{
                                    orkey = key;
                                    or_obj[orkey] = { $ne: '' }
                                }
                            }
                        );`;
                        this.tempDao.function.query = `{$and: [
                            {
                                $or: [
                                    or_obj
                                ]
                            },
                            and_obj
                        ]}`;
                    }
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.find`;
                    
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
                break;
            case 'GpUpdate':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                if (isDefault) {
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findOneAndUpdate`;
                    this.tempDao.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
                break;
            case 'GpDelete':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Id, callback`;
                if (isDefault) {
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findByIdAndRemove`;
                    this.tempDao.function.query = `${this.entitySchema.fileName}Id`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
                break;
            case 'GpGetAllValues':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `callback`;
                if (isDefault) {
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.find`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
                break;
            case 'GpSearchDetail':
                break;
            case 'GpSearchForUpdate':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                if (isDefault) {
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findOneAndUpdate`;
                    this.tempDao.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
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
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Id, callback`;
                if (isDefault) {
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.findById`;
                    this.tempDao.function.query = `${this.entitySchema.fileName}Id`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                }
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