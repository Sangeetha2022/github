import * as util from 'util';
import { ServiceSupportWorker } from '../sefsupportworker/SefServiceSupportWorker';
import { ModifierManagerService } from '../apiservices/ModifierManagerService';

let serviceSupportWorker = new ServiceSupportWorker();
let modifierManagerService = new ModifierManagerService();

export class ServiceWorker {

    public tempService = {
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
            return: '',
            gpModifiers: {
                jwt_token_variable: '',
                encoded_varibale: '',
                variable_name: '',
                variable: '',
                variable_object: [],
                jwt_verify: '',
                modifiers: []
            }
        },
    }
    private flowDetail;
    private entitySchema;
    private gpService;
    private modifiers;
    count = 0;

    createSefService(flowDetail, gpService, entityElement, serviceObj, modifierResponse) {
        this.flowDetail = flowDetail;
        this.entitySchema = entityElement;
        this.gpService = gpService;
        this.modifiers = modifierResponse.body;
        this.gpStart(serviceObj);
        this.gpVariableStatement(serviceObj);
        this.gpCheckConnector();
        this.gpCheckModifier(flowDetail, modifierResponse);
        this.gpFunction();
        return this.tempService;
    }

    generateSefServiceFile(projectGenerationPath, templateLocationPath, Service) {
        Service.forEach(ServiceElement => {
            serviceSupportWorker.generateSefServiceFile(projectGenerationPath, templateLocationPath, ServiceElement, (response) => {
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

    gpCheckModifier(flowDetail, modifierResponse) {
        if(flowDetail.actionOnData === 'GpSearch') {
            const gpCheckModifiers = this.gpService.microFlows.find(
                function (element, index, array) {
                    if (element.microFlowStepName === 'GpCheck_Modifiers') {
                        return element;
                    }
                });
            if (gpCheckModifiers !== undefined) {
                this.gpFunctionModifierBody(modifierResponse);
            }
        } else {
            this.tempService.function.gpModifiers = {
                jwt_token_variable: '',
                encoded_varibale: '',
                variable_name: '',
                variable: '',
                jwt_verify: '',
                variable_object: [],
                modifiers: []
            }
        }
    }

    gpFunctionModifierBody(modifierResponse) {
        if(modifierResponse.body.length > 0) {
            this.tempService.function.gpModifiers.jwt_token_variable = `let jwt_token = req.query.jwt_token;`;
            this.tempService.function.gpModifiers.encoded_varibale = `let decodedObject: any = await this.verifyToken(jwt_token);`;
            this.tempService.function.gpModifiers.variable_name = `${this.entitySchema.fileName}Data`;
            this.tempService.function.gpModifiers.variable = `${this.entitySchema.fileName}Data = null;`;
            this.tempService.function.gpModifiers.jwt_verify = `verifyToken(jwt_token) {
                return new Promise(resolve => {
                    jwt.verify(jwt_token, 'geppettosecret', (err, decoded) => {
                        resolve(JSON.parse(JSON.stringify(decoded)));
                    })
                })
            }`;
            this.tempService.function.gpModifiers.variable_object.push(`let ${this.entitySchema.fileName}Data = {`);
            modifierResponse.body.forEach(modifier => {
                if(modifier.modify_by_value === 'email') {
                    this.tempService.function.gpModifiers.variable_object.push(`created_by: '',`);
                    modifier.modifier_variable = `${this.entitySchema.fileName}Data.created_by = decodedObject.${modifier.modify_by_value};`;
                }
                else {
                    this.tempService.function.gpModifiers.variable_object.push(`${modifier.modify_by_value}: '',`);
                    modifier.modifier_variable = `${this.entitySchema.fileName}Data.${modifier.modify_by_value} = decodedObject.${modifier.modify_by_value}`;
                }
                this.tempService.function.gpModifiers.modifiers.push(modifier);
            })
            this.tempService.function.gpModifiers.variable_object.push(`};`)
        } else {
            this.tempService.function.gpModifiers.modifiers = null;
        }
    }

    checkModifierByProjectDetails(projectDetials) {
        return new Promise((resolve) => {
            modifierManagerService.getModifiersByProjectDetails(projectDetials, (res: any) => {
                resolve(JSON.parse(res));
            })
        }).catch(err => {
            console.log('error', err);
        })
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
        this.tempService.function.methodName = '';
        this.tempService.function.requestParameter = '';
        this.tempService.function.responseVariable = '';
        this.tempService.function.variable = '';
        this.tempService.function.return = '';
        switch (this.flowDetail.actionOnData) {
            case 'GpCreate':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.requestParameter = `${this.entitySchema.fileName}Data`;
                this.tempService.function.responseVariable = `response`;
                this.tempService.function.variable = ` ${this.entitySchema.fileName}Data = req.body;`;
                break;
            case 'GpSearch':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.requestParameter = `${this.entitySchema.fileName}Data`;
                this.tempService.function.responseVariable = `response`;
                if(this.modifiers.length === 0) this.tempService.function.variable = ` ${this.entitySchema.fileName}Data = req.query;`;
                else this.tempService.function.variable = ``;
                break;
            case 'GpUpdate':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.requestParameter = `${this.entitySchema.fileName}Data`
                this.tempService.function.responseVariable = `response`;
                this.tempService.function.variable = ` ${this.entitySchema.fileName}Data = req.body;`;
                break;
            case 'GpDelete':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.requestParameter = `${this.entitySchema.fileName}Id`
                this.tempService.function.responseVariable = `response`;
                this.tempService.function.variable = ` ${this.entitySchema.fileName}Id = req.params.id;`;
                break;
            case 'GpGetAllValues':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.responseVariable = `response`;
                break;
            case 'GpSearchDetail':
                break;
            case 'GpSearchForUpdate':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.requestParameter = `${this.entitySchema.fileName}Data`
                this.tempService.function.responseVariable = `response`;
                this.tempService.function.variable = ` ${this.entitySchema.fileName}Data = req.body;`;
                break;
            case 'GpSEF':
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.requestParameter = `${this.entitySchema.fileName}Id`
                this.tempService.function.responseVariable = `response`;
                this.tempService.function.variable = ` ${this.entitySchema.fileName}Id = req.params.id;`;
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
                this.tempService.function.methodName = this.flowDetail.actionOnData;
                this.tempService.function.requestParameter = `${this.entitySchema.fileName}Id`
                this.tempService.function.responseVariable = `response`;
                this.tempService.function.variable = ` ${this.entitySchema.fileName}Id = req.params.id;`;
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