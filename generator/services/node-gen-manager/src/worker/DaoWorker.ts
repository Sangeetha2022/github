export class DaoWorker {

    private tempDao = {
        GpStart: {
            dependencyName: [],
            dependencyPath: []
        },
        GpVariable:
        {
            insideClass: { variableName: [], parentName: [] },
            outsideClass: { variableName: [], parentName: [] }
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

    createDao(flowDetail, gpDao, entityElement) {
        console.log('dao worker start --- ', flowDetail);
        console.log('dao worker gpDao value ----->>>>  ', gpDao);
        console.log('dao worker entityElement value ----->>>>  ', entityElement);
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpDao = gpDao;
        this.gpStart();
        this.gpVariableStatement();
        this.gpCheckConnector();
        this.gpFunction();
        console.log('final create dao values are -----   ', this.tempDao);
        return this.tempDao;
    }


    gpStart() {
        const tempImport = {
            dependencyName: [],
            dependencyPath: []
        }
        const gpStart = this.gpDao.microFlows.find(
            function (element, index, array) {
                if (element.microFlowStepName === 'GpStart') {
                    return element;
                }
            });
        if (gpStart !== undefined) {
            // default
            tempImport.dependencyName.push(`* as mongoose`);
            tempImport.dependencyPath.push(`mongoose`);

            // custom
            tempImport.dependencyName.push(`{ ${this.entitySchema.modelName} }`);
            tempImport.dependencyPath.push(this.entitySchema.fileName);

            // this.importEntitySchema(tempImport, null, 'import');
            this.tempDao.GpStart = tempImport;
        }
        console.log('dao worker of gpstart -----  ', gpStart, '  tempImport   ', tempImport);
    }

    gpVariableStatement() {
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
            tempVariable.insideClass.variableName.push(this.entitySchema.fileName);
            tempVariable.insideClass.parentName.push(this.entitySchema.modelName);
            this.tempDao.GpVariable = tempVariable;
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
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                console.log('flowaction into gpcreate ------  ');
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.variable = `let ${this.entitySchema.fileName} = new ${this.entitySchema.fileName}(${this.entitySchema.fileName}Data)`;
                this.tempDao.function.verbs = `${this.entitySchema.fileName}.save`;
                // this.tempDao.method.variable = `let ${entityElement.fileName}`
                break;
            case 'GpSearch':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.verbs = `${this.entitySchema.fileName}.findOneAndUpdate`;
                this.tempDao.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
                break;
            case 'GpUpdate':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.verbs = `${this.entitySchema.fileName}.findOneAndUpdate`;
                this.tempDao.function.query = `{ _id: ${this.entitySchema.fileName}Data._id }, ${this.entitySchema.fileName}Data, { new: true }`;
                break;
            case 'GpDelete':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Id, callback`;
                this.tempDao.function.verbs = `${this.entitySchema.fileName}.findByIdAndRemove`;
                this.tempDao.function.query = `${this.entitySchema.fileName}Id`;
                break;
            case 'GpGetAllValues':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `callback`;
                this.tempDao.function.verbs = `${this.entitySchema.fileName}.find`;
                break;
            case 'GpSearchDetail':
                break;
            case 'GpSearchForUpdate':
                this.tempDao.function.methodName = this.flowDetail.actionOnData;
                this.tempDao.function.parameter = `${this.entitySchema.fileName}Data, callback`;
                this.tempDao.function.verbs = `${this.entitySchema.fileName}.findOneAndUpdate`;
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