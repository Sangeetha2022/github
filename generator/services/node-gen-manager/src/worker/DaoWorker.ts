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
        console.log('dao worker start --- ', flowDetail);
        console.log('dao worker gpDao value ----->>>>  ', gpDao);
        console.log('dao worker entityElement value ----->>>>  ', entityElement);
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpDao = gpDao;
        this.gpStart(daoObj);
        this.gpVariableStatement(daoObj);
        this.gpCheckConnector();
        this.gpFunction();
        console.log('final create dao values are -----   ', this.tempDao);
        return this.tempDao;
    }

    generateDaoFile(projectGenerationPath, templateLocationPath, dao) {
        console.log('projectGenerationPath in dao worker ---- ', projectGenerationPath);
        console.log('templateLocationPath in dao worker ---- ', templateLocationPath);
        console.log('dao worker ---- ', dao);
        console.log('create project node -------  ', util.inspect(dao, { showHidden: true, depth: null }));
    //    const daoPath = `${projectGenerationPath}/src/dao`;
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
            // default
            // const tempImport.dependencyName.findIndex();
            console.log(`daoObjcec are om count ${this.count} `, daoObj);
            const mongoPathIndex = daoObj.import.dependencies.findIndex(x => x.path == `mongoose`);
            // const entityPathIndex = daoObj.import.dependencyPath.findIndex(x => x == `../models/${this.entitySchema.fileName}`);
            if (mongoPathIndex < 0) {
                // tempImport.dependencyName.push(`* as mongoose`);
                // tempImport.dependencyPath.push(`mongoose`);
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
                // tempImport.dependencyName.push(`{ ${this.entitySchema.modelName} }`);
                console.log(`entityPath inded ar e------  count ${this.count} `, entityPathIndex, '  -----  ', `../models/${this.entitySchema.fileName}`);
                // tempImport.dependencyPath.push(`../models/${this.entitySchema.fileName}`);
                const tempImport = {
                    name: '',
                    path: ''
                }
                tempImport.name = `${this.entitySchema.modelName}`;
                tempImport.path = `../models/${this.entitySchema.fileName}`;
                this.tempDao.GpStart.dependencies.push(tempImport);
            }

            // this.importEntitySchema(tempImport, null, 'import');
            // this.tempDao.GpStart = tempImport;
        }
        console.log(`dao worker of gpstart - count ${this.count} `, this.tempDao.GpStart);
        this.count++;
    }

    gpVariableStatement(daoObj) {
        // this.tempDao.GpVariable =
        //     {
        //         insideClass: { variableName: [], parentName: [] },
        //         outsideClass: { variableName: [], parentName: [] }
        //     };
        // this.tempDao.GpVariable.insideClass = {
        //     variableName: [],
        //     parentName: []
        // }
        // this.tempDao.GpVariable.outsideClass = {
        //     variableName: [],
        //     parentName: []
        // }
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
            // this.importEntitySchema(null, tempVariable, 'variable');
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ==11=== ', this.entitySchema.modelName);
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ===22== ', daoObj.variable.insideClass.parentName);
            const insideClassIndex = daoObj.variable.insideClass.findIndex(x => x.parentName == this.entitySchema.modelName);
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ===33== ', insideClassIndex);
            if (insideClassIndex < 0) {
                const temp = {
                    variableName: '',
                    parentName: ''
                }
                temp.variableName = this.entitySchema.fileName;
                temp.parentName = this.entitySchema.modelName;
                // tempVariable.insideClass.variableName.push(this.entitySchema.fileName);
                // tempVariable.insideClass.parentName.push(this.entitySchema.modelName);
                this.tempDao.GpVariable.insideClass.push(temp);
            }

        }
        console.log('dao worker of gpVariableStatement -----  ', gpVariableStatement, '   tempVariable   ', tempVariable);
    }

    gpCheckConnector() {
        console.log('!!@@@@@@@@@@@ -gp check connectors %%^^^^^^^^^^^  ', this.tempDao);
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
        console.log('dao worker of gpCheckConnector -----  ', gpCheckConnector);
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
        console.log('dao worker of GpVerbKey -----  ', GpVerbKey);
    }

    // GpSqlQuery() {
    //     const GpSqlQuery = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpSqlQuery') {
    //                 return element;
    //             }
    //         });
    //     console.log('dao worker of GpSqlQuery -----  ', GpSqlQuery);
    // }

    // GpReturn() {
    //     const GpReturn = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpReturn') {
    //                 return element;
    //             }
    //         });
    //     console.log('dao worker of GpReturn -----  ', GpReturn);
    // }

    // GpEnd() {
    //     const GpEnd = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpEnd') {
    //                 return element;
    //             }
    //         });
    //     console.log('dao worker of GpEnd -----  ', GpEnd);
    // }

    // importEntitySchema(tempImport, tempVariable, actionName) {
    //     console.log('entity schema are ------- ', this.entitySchema);
    //     console.log('entity schema are ---tempImport---- ', tempImport);
    //     console.log('entity schema are ----tempVariable--- ', tempVariable);
    //     console.log('entity schema are ----actionName--- ', actionName);
    //     this.entitySchema.forEach(entityElement => {
    //         switch (actionName) {
    //             case 'import':
    //                 tempImport.dependencyName.push(`{ ${entityElement.modelName} }`);
    //                 tempImport.dependencyPath.push(entityElement.fileName);
    //                 break;
    //             case 'variable':
    //                 tempVariable.insideClass.variableName.push(entityElement.fileName);
    //                 tempVariable.insideClass.parentName.push(entityElement.modelName);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     })
    // }

    flowAction() {
        this.tempDao.function.methodName = '';
        this.tempDao.function.parameter = '';
        this.tempDao.function.variable = '';
        this.tempDao.function.verbs = '';
        this.tempDao.function.query = '';
        this.tempDao.function.return = '';
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                console.log('flowaction into gpcreate ------  ');
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.variable = `let temp = new ${this.entitySchema.modelName}(${this.entitySchema.fileName}Data)`;
                this.tempDao.function.verbs = `temp.save`;
                // this.tempDao.method.variable = `let ${entityElement.fileName}`
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




    // old

    // gpStart() {
    //     const tempImport = {
    //         dependencyName: [],
    //         dependencyPath: []
    //     }
    //     const gpStart = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpStart') {
    //                 return element;
    //             }
    //         });
    //     if (gpStart !== undefined) {
    //         tempImport.dependencyName.push(`* as mongoose`);
    //         tempImport.dependencyPath.push(`mongoose`);
    //         this.importEntitySchema(tempImport, null, 'import');
    //         this.tempDao.GpStart = tempImport;
    //     }
    //     console.log('dao worker of gpstart -----  ', gpStart, '  tempImport   ', tempImport);
    // }

    // gpVariableStatement() {
    //     const tempVariable = {
    //         insideClass: {
    //             variableName: [],
    //             parentName: []
    //         },
    //         outsideClass: {
    //             variableName: [],
    //             parentName: []
    //         }
    //     }
    //     const gpVariableStatement = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpVariable_statement') {
    //                 return element;
    //             }
    //         });
    //     if (gpVariableStatement != undefined) {
    //         this.importEntitySchema(null, tempVariable, 'variable');
    //         this.tempDao.GpVariable = tempVariable;
    //     }
    //     console.log('dao worker of gpVariableStatement -----  ', gpVariableStatement, '   tempVariable   ', tempVariable);
    // }

    // gpCheckConnector() {
    //     console.log('!!@@@@@@@@@@@ -gp check connectors %%^^^^^^^^^^^  ', this.tempDao);
    //     const gpCheckConnector = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpCheck_Connector') {
    //                 return element;
    //             }
    //         });
    //     if (gpCheckConnector !== undefined) {
    //         if (this.gpDao.connector.length > 0) {
    //             // need to add some functionality for avaiable connectors in dao (future)
    //         }
    //     }
    //     console.log('dao worker of gpCheckConnector -----  ', gpCheckConnector);
    // }

    // GpVerbKey() {
    //     const GpVerbKey = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpVerbKey') {
    //                 return element;
    //             }
    //         });
    //     if (GpVerbKey !== undefined) {
    //         this.flowAction
    //     }
    //     console.log('dao worker of GpVerbKey -----  ', GpVerbKey);
    // }

    // GpSqlQuery() {
    //     const GpSqlQuery = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpSqlQuery') {
    //                 return element;
    //             }
    //         });
    //     console.log('dao worker of GpSqlQuery -----  ', GpSqlQuery);
    // }

    // GpReturn() {
    //     const GpReturn = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpReturn') {
    //                 return element;
    //             }
    //         });
    //     console.log('dao worker of GpReturn -----  ', GpReturn);
    // }

    // GpEnd() {
    //     const GpEnd = this.gpDao.microFlows.find(
    //         function (element, index, array) {
    //             if (element.microFlowStepName === 'GpEnd') {
    //                 return element;
    //             }
    //         });
    //     console.log('dao worker of GpEnd -----  ', GpEnd);
    // }

    // importEntitySchema(tempImport, tempVariable, actionName) {
    //     console.log('entity schema are ------- ', this.entitySchema);
    //     console.log('entity schema are ---tempImport---- ', tempImport);
    //     console.log('entity schema are ----tempVariable--- ', tempVariable);
    //     console.log('entity schema are ----actionName--- ', actionName);
    //     this.entitySchema.forEach(entityElement => {
    //         switch (actionName) {
    //             case 'import':
    //                 tempImport.dependencyName.push(`{ ${entityElement.modelName} }`);
    //                 tempImport.dependencyPath.push(entityElement.fileName);
    //                 break;
    //             case 'variable':
    //                 tempVariable.insideClass.variableName.push(entityElement.fileName);
    //                 tempVariable.insideClass.parentName.push(entityElement.modelName);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     })
    // }

    // flowAction(action) {
    //     switch (this.flowDetail.actionOnData) {
    //         case 'GpCreate':
    //             this.tempDao.method.variable = `let ${entityElement.fileName}`
    //             if (action === 'key') {

    //             }
    //             break;
    //         case 'GpSearch':
    //             break;
    //         case 'GpUpdate':
    //             break;
    //         case 'GpDelete':
    //             break;
    //         case 'GpGetAllValues':
    //             break;
    //         case 'GpSearchDetail':
    //             break;
    //         case 'GpSearchForUpdate':
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