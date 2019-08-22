import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { ServiceWorker } from '../worker/ServiceWorker';
import { ControllerWorker } from '../worker/ControllerWorker';
import { DaoWorker } from '../worker/DaoWorker';
import { RouteWorker } from '../worker/RouteWorker';
import { CommonWorker } from '../worker/CommonWorker';

let controllerWorker = new ControllerWorker();
let serviceWorker = new ServiceWorker();
let daoWorker = new DaoWorker();
let routeWorker = new RouteWorker();
let commonWorker = new CommonWorker();

export class NodeService {

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
        flowAction: []
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

    // private responseArray = [];
    // private responseObj = {
    //     entitySchemaName: '',
    //     entityModelName: '',
    //     entityFileName: '',
    //     flowAction: []
    // }

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

    public createProjectNode(req: Request, callback) {
        console.log('create project node ----body---  ', req.body.projectName, util.inspect(req.body, { showHidden: true, depth: null }));
        this.controller = [];
        this.service = [];
        this.dao = [];
        this.route = [];
        const details = req.body;
        const templateLocation = details.templateLocation.backendTemplate;
        const projectGenerationPath = details.projectGenerationPath;
        const flows = details.flows;
        const port = details.applicationPort;
        const projectName = req.body.projectName;
        const featureName = req.body.featureName;
        // this.port++;
        const EntitySchema = details.entitySchema.body;

        if (EntitySchema === undefined && EntitySchema.length === 0) {
            callback('No Schema has been found');
        } else {
            try {
                commonWorker.createServerFile(projectGenerationPath, templateLocation, projectName, port);
                commonWorker.generatePackageJsonFile(projectGenerationPath, templateLocation, featureName);
                commonWorker.generateDockerFile(projectGenerationPath, templateLocation, featureName);
                commonWorker.generateTsConfigFile(projectGenerationPath, templateLocation);
                commonWorker.generateWinstonLoggerFile(projectGenerationPath, templateLocation);
                commonWorker.generateLoggerFile(projectGenerationPath, templateLocation);

                asyncLoop(EntitySchema, (entityElement, entityNext) => {
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
                    this.routeObj.nodePortNumber = port;


                    if (entityElement === undefined) {
                        entityNext();
                    } if (entityElement.entityType === 'secondary') {
                        entityNext();
                    } else {
                        const gpController = details.flows[0].components.find(
                            function (element, index, array) {
                                if (element.name === 'GpExpressController') {
                                    return element;
                                }
                            }
                        )
                        const gpService = details.flows[0].components.find(
                            function (element, index, array) {
                                if (element.name === 'GpExpressService') {
                                    return element;
                                }
                            }
                        )
                        const gpDao = details.flows[0].components.find(
                            function (element, index, array) {
                                if (element.name === 'GpExpressDao') {
                                    return element;
                                }
                            }
                        )
                        asyncLoop(details.flows, (flowElement, flowNext) => {
                            const tempFlow = {
                                name: '',
                                label: '',
                                description: '',
                                type: '',
                                actionOnData: ''
                            }
                            tempFlow.name = flowElement.name;
                            tempFlow.label = flowElement.label;
                            tempFlow.description = flowElement.description;
                            tempFlow.type = flowElement.type;
                            tempFlow.actionOnData = flowElement.actionOnData;
                            const controller = controllerWorker.createController(tempFlow, gpController, entityElement, this.controllerObj);
                            const service = serviceWorker.createService(tempFlow, gpService, entityElement, this.serviceObj);
                            const dao = daoWorker.createDao(tempFlow, gpDao, entityElement, this.daoObj);
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
                                return: ''
                            }
                            serviceTemp.methodName = service.function.methodName;
                            serviceTemp.requestParameter = service.function.requestParameter;
                            serviceTemp.responseVariable = service.function.responseVariable;
                            serviceTemp.variable = service.function.variable;
                            serviceTemp.return = service.function.return;
                            this.serviceObj.flowAction.push(serviceTemp);

                            // gp function dao
                            const daoTemp = {
                                methodName: '',
                                parameter: '',
                                variable: '',
                                verbs: '',
                                query: '',
                                return: ''
                            }
                            daoTemp.methodName = dao.function.methodName;
                            daoTemp.parameter = dao.function.parameter;
                            daoTemp.variable = dao.function.variable;
                            daoTemp.verbs = dao.function.verbs;
                            daoTemp.query = dao.function.query;
                            daoTemp.return = dao.function.return;
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


                }, (entityError) => {
                    if (entityError) {

                    } else {
                        controllerWorker.generateControllerFile(projectGenerationPath, templateLocation, this.controller);
                        serviceWorker.generateServiceFile(projectGenerationPath, templateLocation, this.service);
                        daoWorker.generateDaoFile(projectGenerationPath, templateLocation, this.dao);
                        routeWorker.generateRouteFile(projectGenerationPath, templateLocation, this.route);
                        console.log('route file of values are -------- ', util.inspect(this.route, { showHidden: true, depth: null }));
                        callback(this.route);
                    }
                })
            } catch (error) {
                callback('Something went wrong in Node Gen MicroService');
            }
        }
    }
}

