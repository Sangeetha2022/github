import * as util from 'util';
import { DaoSupportWorker } from '../supportworker/DaoSupportWorker';
import * as Constants from '../config/Constants';
import * as asyncLoop from 'node-async-loop';

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

    private fetchNPM = {
        componentVariable: 'fetch',
        componentDependencies: [{
            name: '* as fetch',
            path: 'node-fetch'
        },
        {
            name: '{ ApiAdaptar }',
            path: '../config/apiAdapter'
        },
        {
            name: '{ URL, URLSearchParams }',
            path: 'url'
        },
        {
            name: '* as btoa',
            path: 'btoa'
        }
    ],
        packageDependencies: [{
            name: 'node-fetch',
            version: '^2.3.0'
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
            connectorEntityName: null,
            connector: {
                SCM_method_call: '',
                get_vault_data: '',
                fetch_request: '',
                fetch_respone: '',
                query_object: []
            }
        },
        packageDependencies: []
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

    async addExternalConnector() {
        console.log('gpDao connector vlaues ar e---  ', this.gpDao.connector[0]);
        const connector = this.gpDao.connector[0].externalConnector[0].fileData;
        const externalConnector = this.gpDao.connector[0].externalConnector[0].fileData.item[0].request;
        this.tempDao.function.verbs = this.fetchNPM.componentVariable;
        this.tempDao.function.connector.SCM_method_call = `let credentialData: any = await this.getCredentialsData('${connector.info.name}')`;
        let connectorUrlObject: any = {
            protocol:'',
            host:'',
            port: '',
            path: '',
        }
        let queryObject: any ={}
        let connectorUrl = `'${externalConnector.url.protocol}://`
        externalConnector.url.host.forEach((hostData, index) => {
            if(index == externalConnector.url.host.length) {
                connectorUrlObject.host += `${hostData}`
                if(externalConnector.url.port) {
                    connectorUrlObject.host += `:${externalConnector.url.port}`;
                }
            } else {
                connectorUrlObject.host += `${hostData}.`
            }
        })
        externalConnector.url.path.forEach((pathData, index) => {
            connectorUrlObject.path += `/${pathData}`
        })
        connectorUrl += `${connectorUrlObject.host}${connectorUrlObject.path}'`;
        if(externalConnector.url.query && externalConnector.url.query.length > 0) {
            connectorUrl += `+ '?' + new URLSearchParams(queryObject)`;
            this.tempDao.function.connector.query_object.push(`let queryObject = {`);
            asyncLoop(externalConnector.url.query, async (data: any, next) => {
                let key = data.key;
                console.log('index',externalConnector.url.query.indexOf(data))
                if(externalConnector.url.query.indexOf(data) === externalConnector.url.query.length) {
                    this.tempDao.function.connector.query_object.push(`${key}: ${this.entitySchema.fileName}Data.${key}`);
                    next();
                } else {
                    this.tempDao.function.connector.query_object.push(`${key}: ${this.entitySchema.fileName}Data.${key},`);
                    next();
                }
            }, (err) =>{
                if(err) throw err;
                else {
                    this.tempDao.function.connector.query_object.push(`}`);
                    console.log('queryObject', JSON.stringify(queryObject));
                }
            })
        }
        this.tempDao.function.query = `${connectorUrl}, { method: "${externalConnector.method}"`;
        if(externalConnector.method === 'POST' || externalConnector.method === 'PUT') {
            this.tempDao.function.query += `, body: JSON.stringify(${this.entitySchema.fileName}Data),`
        }
        this.tempDao.function.query += `, headers: { 'Content-Type': 'application/json'`
        if(externalConnector.auth !== undefined) {
            if(externalConnector.auth.type == 'basic') {
                let creds = '`\${credentialData.data.username}:\${credentialData.data.password}`';
                this.tempDao.function.query += `, 'Authorization': '${externalConnector.auth.type} ' + btoa(${creds})}}`;
            }
            if(externalConnector.auth.type == 'bearer') {
                this.tempDao.function.query += `, 'Authorization': '${externalConnector.auth.type} ' + credentialData.body.${externalConnector.auth.type}.token}}`;
            }
        } else {
            this.tempDao.function.query += `}}`
        }
        this.tempDao.function.connector.fetch_respone = `result.json()).then((result) =>`;
        this.tempDao.function.isJsonFormat = true;
        // this.tempDao.function.connectorEntityName = externalConnector.entityName;
        // add component gpStart dependencies
        this.tempDao.GpStart.dependencies = this.tempDao.GpStart.dependencies.concat(this.fetchNPM.componentDependencies);

        // add package json dependencies
        this.tempDao.packageDependencies = this.tempDao.packageDependencies.concat(this.fetchNPM.packageDependencies);
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
                    this.tempDao.function.connector = undefined;
                    this.tempDao.function.connector = undefined;
                } else {

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
                    );`
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.find`;
                    this.tempDao.function.query = `{$and: [
                        {
                            $or: [
                               or_obj
                            ]
                        },
                        and_obj
                    ]}`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                    this.tempDao.function.connector = undefined;
                } else {

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
                    this.tempDao.function.connector = undefined;
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
                    this.tempDao.function.connector = undefined;
                }
                break;
            case 'GpGetAllValues':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `callback`;
                if (isDefault) {
                    this.tempDao.function.verbs = `this.${this.entitySchema.fileName}.find`;
                    this.tempDao.function.isJsonFormat = false;
                    this.tempDao.function.connectorEntityName = null;
                    this.tempDao.function.connector = undefined;
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
                    this.tempDao.function.connector = undefined;
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
                    this.tempDao.function.connector = undefined;
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
