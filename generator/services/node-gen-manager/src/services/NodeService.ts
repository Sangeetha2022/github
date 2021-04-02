import { Request, response } from 'express';
import * as express from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { ServiceWorker } from '../worker/ServiceWorker';
import { ControllerWorker } from '../worker/ControllerWorker';
import { DaoWorker } from '../worker/DaoWorker';
import { RouteWorker } from '../worker/RouteWorker';
import { SwaggerGenManagerService } from '../apiservices/SwaggerGenManagerService';
import { ExternalFeatureService } from '../apiservices/ExternalFeatureService';
import { CommonWorker } from '../worker/CommonWorker';
import * as Constants from '../config/Constants';
import { AttachmentWorker } from '../worker/AttachmentWorker';
import { ExternalFeatureWorker } from '../worker/externalfeatureWorker';
import { ModifierManagerService } from '../apiservices/ModifierManagerService';

let controllerWorker = new ControllerWorker();
let serviceWorker = new ServiceWorker();
let daoWorker = new DaoWorker();
let routeWorker = new RouteWorker();
let commonWorker = new CommonWorker();
let attachWorker = new AttachmentWorker
let swaggerGen = new SwaggerGenManagerService();
let externalfeatureservice = new ExternalFeatureService();
let externalfeatureworker = new ExternalFeatureWorker();
let modifierManagerService = new ModifierManagerService();

export class NodeService {

    // constant
    private NODE_MICROSERVICE = 'Node Microservice';
    public gpAttachmentData: any;

    // controller
    private controller = [];
    // private port = 8000;
    private controllerObj = {
        entitySchemaName: '',
        entityModelName: '',
        entityFileName: '',
        import: {
            dependencies: []
        },
        variable: {
            insideClass: [],
            outsideClass: []
        },
        flowAction: []
    }
    // service
    private service = [];
    private serviceObj = {
        entitySchemaName: '',
        entityModelName: '',
        entityFileName: '',
        import: {
            dependencies: []
        },
        variable: {
            insideClass: [],
            outsideClass: []
        },
        flowAction: [],
        
    }

    // dao
    private dao = [];
    private daoObj = {
        entitySchemaName: '',
        entityModelName: '',
        entityFileName: '',
        import: {
            dependencies: []
        },
        variable: {
            insideClass: [],
            outsideClass: []
        },
        flowAction: []
    }

    // route
    private route = [];
    private routeObj = {
        entitySchemaName: '',
        entityModelName: '',
        entityFileName: '',
        featureName: '',
        isCustomCode: false,
        nodePortNumber: '',
        import: {
            dependencies: []
        },
        variable: {
            insideClass: [],
            outsideClass: []
        },
        flowAction: []
    }

    private swagger = [];
    private swaggerObj = {
        details: {
            name: '',
            version: '',
            projectName: '',
            featureName: '',
            contactName: '',
            contactEmail: '',
            contactUrl: '',
            licenseName: '',
            licenseUrl: '',
            termsOfService: ''
        },
        projectName: '',
        featureName: '',
        projectPath: '',
        nodePortNumber: '',
        servers: [],
        tags: [],
        paths: [],
        components: []
    }

    // packageJson
    private packageObj = {
        name: '',
        description: '',
        dependencies: []
    }

    // private responseArray = [];
    // private responseObj = {
    //     entitySchemaName: '',
    //     entityModelName: '',
    //     entityFileName: '',
    //     flowAction: []
    // }

    initializeSwaggerVariable() {
        this.swagger = [];
        this.swaggerObj = {
            details: {
                name: '',
                version: '',
                projectName: '',
                featureName: '',
                contactName: '',
                contactEmail: '',
                contactUrl: '',
                licenseName: '',
                licenseUrl: '',
                termsOfService: ''
            },
            projectName: '',
            featureName: '',
            projectPath: '',
            nodePortNumber: '',
            servers: [],
            tags: [],
            paths: [],
            components: []
        }
    }

    initalizeDaoVariable() {
        // controller

        this.controllerObj = {
            entitySchemaName: '',
            entityModelName: '',
            entityFileName: '',
            import: {
                dependencies: []
            },
            variable: {
                insideClass: [],
                outsideClass: []
            },
            flowAction: []
        }
        // service
        this.serviceObj = {
            entitySchemaName: '',
            entityModelName: '',
            entityFileName: '',
            import: {
                dependencies: []
            },
            variable: {
                insideClass: [],
                outsideClass: []
            },
            flowAction: []
        }

        // dao
        this.daoObj = {
            entitySchemaName: '',
            entityModelName: '',
            entityFileName: '',
            import: {
                dependencies: []
            },
            variable: {
                insideClass: [],
                outsideClass: []
            },
            flowAction: []
        }


        // route
        this.routeObj = {
            entitySchemaName: '',
            entityModelName: '',
            entityFileName: '',
            featureName: '',
            nodePortNumber: '',
            isCustomCode: false,
            import: {
                dependencies: []
            },
            variable: {
                insideClass: [],
                outsideClass: []
            },
            flowAction: []
        }

    }

    public async createProjectNode(req: Request, callback) {
        console.log('create project node ----body---  ', req.body.projectName, util.inspect(req.body, { showHidden: true, depth: null }));
        this.controller = [];
        this.service = [];
        this.dao = [];
        this.route = [];

        const details = req.body;

        details.flows.forEach(flowDetails => {
            if (flowDetails.isDependent !== undefined) {
                if (flowDetails.isDependent === true) {
                    flowDetails.depedent.forEach(depedentName => {
                        if (depedentName.name === 'GpAttachmentUpload') {
                            depedentName.flowConfig.forEach(flowConfigData => {
                                this.gpAttachmentData = flowConfigData
                            })
                        }
                    })
                }
            }
        })

        const templateLocation = details.templateLocation.backendTemplate;
        const projectGenerationPath = details.projectGenerationPath;
        const flows = details.flows;
        const port = details.applicationPort;
        const projectName = req.body.projectName;
        const featureName = req.body.featureName;
        // this.port++;
        const EntitySchema = details.entitySchema.body;

        const gpAttachFlow = {
            templateLocation: details.templateLocation.backendTemplate,
            projectGenerationPath: details.projectGenerationPath,
            backendTemplate: details.templateLocation.backendTemplate,
            seedPath: details.templateLocation.authTemplatePath,
            gpAttachDetails: [],
            folder: 'attachment',
            file: 'fileUpload',
        }
        if (this.gpAttachmentData !== undefined) {
            gpAttachFlow.gpAttachDetails.push(this.gpAttachmentData);
            const gpAttach = await this.gpAttachmentService(gpAttachFlow);
        }
        // packageJson
        this.packageObj = {
            name: '',
            description: '',
            dependencies: []
        }

        console.log('---------------------------', EntitySchema, flows, !Object.values(details.externalfeature).includes('external'));
        if (EntitySchema == undefined && !Object.values(details.externalfeature).includes('external')) {
            console.log('-----coming inside the if condition on the node generation---');

            callback('No Schema has been found');
        } else if (Object.values(details.externalfeature).includes('external')) {
            console.log('--------node gen--feature------', details.externalfeature);
            let createextfeature;
            let externalfeatureid = details.externalfeature.externalfeatureconfig_id;
            externalfeatureservice.getExternalfeature(externalfeatureid, async (response) => {
                let externalfeatureres = JSON.parse(response);
                // console.log('-------', externalfeatureres.body[0]);
                createextfeature = await this.generateexternalfeature(projectGenerationPath, externalfeatureres);
                console.log('---------external feature', createextfeature);
                callback(createextfeature)
            });
        } else {
            try {
                asyncLoop(EntitySchema, async (entityElement, entityNext) => {
                    // initial
                    this.initalizeDaoVariable();

                    // declare

                    // controllerObj
                    this.controllerObj.entitySchemaName = entityElement.schemaName;
                    this.controllerObj.entityModelName = entityElement.modelName;
                    this.controllerObj.entityFileName = entityElement.fileName;

                    //serviceObj
                    this.serviceObj.entitySchemaName = entityElement.schemaName;
                    this.serviceObj.entityModelName = entityElement.modelName;
                    this.serviceObj.entityFileName = entityElement.fileName;

                    // daoObj
                    this.daoObj.entitySchemaName = entityElement.schemaName;
                    this.daoObj.entityModelName = entityElement.modelName;
                    this.daoObj.entityFileName = entityElement.fileName;


                    //routeObj
                    this.routeObj.entitySchemaName = entityElement.schemaName;
                    this.routeObj.entityModelName = entityElement.modelName;
                    this.routeObj.entityFileName = entityElement.fileName;
                    this.routeObj.featureName = details.featureName;
                    this.routeObj.isCustomCode = true;
                    this.routeObj.nodePortNumber = port;


                    if (entityElement === undefined) {
                        entityNext();
                    } if (entityElement.entityType === 'secondary') {
                        entityNext();
                    } else {
                        let count = 0;
                        asyncLoop(details.flows, async (flowElement, flowNext) => {

                            const gpController = details.flows[count].components.find(
                                function (element, index, array) {
                                    if (element.name === 'GpExpressController') {
                                        return true;
                                    }
                                })

                            const gpService = details.flows[count].components.find(
                                function (element, index, array) {
                                    if (element.name === 'GpExpressService') {
                                        return true;
                                    }
                                })

                            const gpDao = details.flows[count].components.find(
                                function (element, index, array) {
                                    if (element.name === 'GpExpressDao') {
                                        return true;
                                    }
                                })

                            const tempFlow = {
                                id: '',
                                name: '',
                                label: '',
                                description: '',
                                type: '',
                                actionOnData: ''
                            }
                            tempFlow.id = flowElement.id;
                            tempFlow.name = flowElement.name;
                            tempFlow.label = flowElement.label;
                            tempFlow.description = flowElement.description;
                            tempFlow.type = flowElement.type;
                            tempFlow.actionOnData = flowElement.actionOnData;
                            const projectDetials = {
                                project_id: details.projectId,
                                feature_id: details.featureId,
                                modify_target_type_id: flowElement.id
                            }
                            let modifierResponse: any = await this.getModifierByProjectDetails(projectDetials);
                            const controller = controllerWorker.createController(tempFlow, gpController, entityElement, this.controllerObj);
                            const service = serviceWorker.createService(tempFlow, gpService, entityElement, this.serviceObj, modifierResponse);
                            const dao = daoWorker.createDao(tempFlow, gpDao, entityElement, this.daoObj, modifierResponse);
                            const route = routeWorker.createRoutes(tempFlow, entityElement, this.routeObj);

                            // import dependencies
                            this.controllerObj.import.dependencies = this.controllerObj.import.dependencies.concat(controller.GpStart.dependencies);
                            this.serviceObj.import.dependencies = this.serviceObj.import.dependencies.concat(service.GpStart.dependencies);
                            this.daoObj.import.dependencies = this.daoObj.import.dependencies.concat(dao.GpStart.dependencies);
                            this.routeObj.import.dependencies = this.routeObj.import.dependencies.concat(route.GpStart.dependencies);

                            // inside variable
                            this.controllerObj.variable.insideClass = this.controllerObj.variable.insideClass.concat(controller.GpVariable.insideClass);
                            this.serviceObj.variable.insideClass = this.serviceObj.variable.insideClass.concat(service.GpVariable.insideClass);
                            this.daoObj.variable.insideClass = this.daoObj.variable.insideClass.concat(dao.GpVariable.insideClass);
                            this.routeObj.variable.insideClass = this.routeObj.variable.insideClass.concat(route.GpVariable.insideClass);

                            // outside variable
                            this.controllerObj.variable.outsideClass = this.controllerObj.variable.outsideClass.concat(controller.GpVariable.outsideClass);
                            this.serviceObj.variable.outsideClass = this.serviceObj.variable.outsideClass.concat(service.GpVariable.outsideClass);
                            this.daoObj.variable.outsideClass = this.daoObj.variable.outsideClass.concat(dao.GpVariable.outsideClass);
                            this.routeObj.variable.outsideClass = this.routeObj.variable.outsideClass.concat(route.GpVariable.outsideClass);

                            // packageDependencies
                            // avoid duplication in the array of object
                            this.packageObj.dependencies = dao.packageDependencies.map(function (a) {
                                return this[a.name] || a;
                            }, this.packageObj.dependencies.reduce(function (r, a) {
                                r[a.name] = a;
                                return r;
                            }, Object.create(null)));
                            // gp function controller
                            const controllerTemp = {
                                methodName: ''
                            }
                            controllerTemp.methodName = controller.function.methodName;
                            this.controllerObj.flowAction.push(controllerTemp);

                            // gp function services
                            const serviceTemp = {
                                methodName: '',
                                requestParameter: '',
                                responseVariable: '',
                                variable: '',
                                return: '',
                                modifiersObject: {
                                    jwt_token_variable: '',
                                    encoded_varibale: '',
                                    jwt_verify: '',
                                    variable_name: '',
                                    variable: '',
                                    variable_object: [],
                                    modifiers: []
                                }
                            }
                            serviceTemp.methodName = service.function.methodName;
                            serviceTemp.requestParameter = service.function.requestParameter;
                            serviceTemp.responseVariable = service.function.responseVariable;
                            serviceTemp.variable = service.function.variable;
                            serviceTemp.return = service.function.return;
                            serviceTemp.modifiersObject = service.function.gpModifiers;
                            serviceTemp.modifiersObject.variable_object.push(`};`);
                            this.serviceObj.flowAction.push(serviceTemp);

                            // gp function dao
                            const daoTemp = {
                                methodName: '',
                                parameter: '',
                                variable: '',
                                objectiteration: '',
                                verbs: '',
                                query: '',
                                return: '',
                                isJsonFormat: false,
                                connectorEntityName: null
                            }
                            daoTemp.methodName = dao.function.methodName;
                            daoTemp.parameter = dao.function.parameter;
                            daoTemp.variable = dao.function.variable;
                            daoTemp.objectiteration = dao.function.objectiteration;
                            daoTemp.verbs = dao.function.verbs;
                            daoTemp.query = dao.function.query;
                            daoTemp.return = dao.function.return;
                            daoTemp.isJsonFormat = dao.function.isJsonFormat;
                            daoTemp.connectorEntityName = dao.function.connectorEntityName;
                            console.log('-------------dao objects---------', daoTemp);
                            this.daoObj.flowAction.push(daoTemp);


                            // routes function
                            const routeTemp = {
                                routeUrl: '',
                                apiAction: '',
                                methodName: '',
                                variableName: ''
                            }
                            routeTemp.routeUrl = route.function.routeUrl;
                            routeTemp.apiAction = route.function.apiAction;
                            routeTemp.methodName = route.function.methodName;
                            routeTemp.variableName = route.function.variableName;
                            this.routeObj.flowAction.push(routeTemp);

                            const swaggerTemp = {
                                endpoint: '',
                                method: '',
                                description: '',
                                tags: '',
                                parameters: [],
                                responses: []
                            }
                            console.log('swagger')
                            swaggerTemp.endpoint = route.function.routeUrl;
                            let checkingPathParam = swaggerTemp.endpoint.includes(':');
                            let checkingQueryParam = swaggerTemp.endpoint.includes('?');
                            swaggerTemp.method = route.function.apiAction;
                            swaggerTemp.description = route.function.methodName;
                            swaggerTemp.tags = route.function.variableName;
                            if (checkingPathParam == true) {
                                let pathParams = [];
                                let endpoint = swaggerTemp.endpoint;
                                let splitted = endpoint.split('/');
                                splitted.forEach(data => {
                                    if (data.charAt(0) === ':') {
                                        pathParams.push(data);
                                        let changedString = data.replace(':', '');
                                        swaggerTemp.endpoint = endpoint.replace(data, `{${changedString}}`)
                                    }
                                })
                                let paramObject = {
                                    in: 'path',
                                    description: swaggerTemp.description,
                                    name: 'id',
                                    schema: 'schema',
                                    required: true,
                                    ref: 'type',
                                    reference: 'string'
                                }
                                swaggerTemp.parameters.push(paramObject)
                            }
                            else if (checkingQueryParam == true) {
                                let paramObject = {
                                    in: 'query',
                                    description: swaggerTemp.description,
                                    name: 'id',
                                    required: true,
                                    schema: 'schema',
                                    ref: '$ref',
                                    reference: `#/components/schemas/${swaggerTemp.tags}`
                                }
                                swaggerTemp.parameters.push(paramObject)
                            }
                            else if (swaggerTemp.method !== 'get') {
                                let paramObject = {
                                    requestBody: 'requestBody',
                                    description: swaggerTemp.description,
                                    name: swaggerTemp.tags,
                                    content: 'application/json',
                                    schema: 'schema',
                                    required: true,
                                    ref: '$ref',
                                    reference: `#/components/schemas/${swaggerTemp.tags}`
                                }
                                swaggerTemp.parameters.push(paramObject)
                            }
                            swaggerTemp.responses = [
                                { statuscode: '200', description: 'Success' },
                                { statuscode: '400', description: 'Bad Request' },
                                { statuscode: '404', description: 'Not Found' },
                                { statuscode: '500', description: 'Internal Server Error' }
                            ]
                            this.swaggerObj.paths.push(swaggerTemp);
                            count++;
                            flowNext();
                        }, (err) => {
                            if (err) {

                            } else {
                                this.controller.push(this.controllerObj);
                                this.service.push(this.serviceObj);
                                this.dao.push(this.daoObj);
                                this.route.push(this.routeObj);
                                entityNext();
                            }
                        })
                    }


                }, async (entityError) => {
                    if (entityError) {

                    } else {
                        let swaggerResponse: any;
                        let entities = req.body.entities;
                        this.swaggerObj.projectPath = projectGenerationPath;
                        this.swaggerObj.featureName = featureName;
                        this.swaggerObj.nodePortNumber = port;
                        const url = Constants.LOCALURL + port;
                        const serverObj = {
                            url: url,
                            description: featureName
                        }
                        this.swaggerObj.details.featureName = featureName;
                        this.swaggerObj.details.projectName = projectName;
                        this.swaggerObj.details.version = Constants.SWAGGERBASEDETAILS.version;
                        this.swaggerObj.details.contactName = Constants.SWAGGERBASEDETAILS.contactName;
                        this.swaggerObj.details.contactEmail = Constants.SWAGGERBASEDETAILS.contactEmail;
                        this.swaggerObj.details.contactUrl = Constants.SWAGGERBASEDETAILS.contactUrl;
                        this.swaggerObj.details.licenseName = Constants.SWAGGERBASEDETAILS.licenseName;
                        this.swaggerObj.details.licenseUrl = Constants.SWAGGERBASEDETAILS.licenseUrl;
                        this.swaggerObj.details.termsOfService = Constants.SWAGGERBASEDETAILS.termsOfService;
                        this.swaggerObj.servers.push(serverObj);
                        entities.forEach(entity => {
                            entity.type = 'object';
                            entity.field.forEach(field => {
                                field.data_type = field.data_type.toLowerCase();
                            })
                            this.swaggerObj.components.push(entity);
                            this.swaggerObj.tags.push(entity);
                        })
                        let result = this.swaggerObj.paths.reduce((r, a) => {
                            r[a.endpoint] = r[a.endpoint] || [];
                            r[a.endpoint].push(a);
                            return r;
                        }, Object.create(null));
                        let paths = this.uniqueByLast(this.swaggerObj.paths, it => it.endpoint);
                        paths.forEach((path: any) => {
                            let swaggerpath = {
                                endpoint: path.endpoint,
                                methodsArray: result[path.endpoint]
                            }
                            this.swagger.push(swaggerpath);
                        })
                        this.swaggerObj.paths = this.swagger;
                        controllerWorker.generateControllerFile(projectGenerationPath, templateLocation, this.controller);
                        serviceWorker.generateServiceFile(projectGenerationPath, templateLocation, this.service);
                        daoWorker.generateDaoFile(projectGenerationPath, templateLocation, this.dao);
                        routeWorker.generateRouteFile(projectGenerationPath, templateLocation, this.route);
                        console.log('route file of values are -------- ', util.inspect(this.route, { showHidden: true, depth: null }));
                        console.log('swagger object', this.swaggerObj);
                        swaggerGen.createSwaggerFile(this.swaggerObj, (response) => {
                            swaggerResponse = response;
                            this.initializeSwaggerVariable();
                        });

                        // common worker
                        this.packageObj.name = featureName;
                        this.packageObj.description = `${featureName} ${this.NODE_MICROSERVICE}`;
                        commonWorker.generatePackageJsonFile(projectGenerationPath, templateLocation, this.packageObj);
                        commonWorker.createServerFile(projectGenerationPath, templateLocation, projectName, port);
                        commonWorker.generateDockerFile(projectGenerationPath, templateLocation, featureName);
                        commonWorker.generateTsConfigFile(projectGenerationPath, templateLocation);
                        commonWorker.generateWinstonLoggerFile(projectGenerationPath, templateLocation);
                        commonWorker.generateLoggerFile(projectGenerationPath, templateLocation);
                        callback(this.route);
                    }
                })
            } catch (error) {
                callback('Something went wrong in Node Gen MicroService');
            }
        }
    }

    getModifierByProjectDetails(projectDetials) {
        return new Promise((resolve) => {
            modifierManagerService.getModifiersByProjectDetails(projectDetials, (res: any) => {
                resolve(JSON.parse(res));
            })
        }).catch(err => {
            console.log('error', err);
        })
    }

    public uniqueByLast(data, key) {
        return [...new Map(
            data.map(x => [key(x), x])
        ).values()]
    }

    public gpAttachmentService(gpAttach) {
        return new Promise(resolve => {
            attachWorker.generateAttachment(gpAttach, (gpAttachResponse) => {
                console.log('gp--attach-->', gpAttachResponse);
                resolve(response)
            })

        })


    }

    public generateexternalfeature(projectGenerationPath, externalfeatureres) {
        return new Promise((resolve, reject) => {
            externalfeatureworker.externalfeature(projectGenerationPath, externalfeatureres, (response, err) => {
                if(err){
                    reject(err);
                }
                resolve(response);
            })
        });
    }

}

