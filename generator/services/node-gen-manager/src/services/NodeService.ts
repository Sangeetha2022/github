import { Request, response } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { ServiceWorker } from '../worker/ServiceWorker';
import { ControllerWorker } from '../worker/ControllerWorker';
import { DaoWorker } from '../worker/DaoWorker';
import { RouteWorker } from '../worker/RouteWorker';
import { CommonWorker } from '../worker/CommonWorker';
import { resolve } from 'dns';
import { AttachmentWorker } from '../worker/AttachmentWorker';

let controllerWorker = new ControllerWorker();
let serviceWorker = new ServiceWorker();
let daoWorker = new DaoWorker();
let routeWorker = new RouteWorker();
let commonWorker = new CommonWorker();
let attachWorker = new AttachmentWorker

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
        // const details =  {
        //     featureName: 'ticket',
        //     applicationPort: '8000',
        //     projectGenerationPath:
        //         '/geppetto/generated-code',
        //     templateLocation:
        //     {
        //         frontendTemplate: '../../template',
        //         backendTemplate: '../../template',
        //         mongoTemplate: '../../template',
        //         authTemplatePath:
        //             '/geppetto/template/seed',
        //         authorizationTempPath: '../../template',
        //         adminManagerTemplatePath:
        //             '/geppetto/template/seed'
        //     },
        //     projectName: 'gpattach',
        //     primaryLanguage: 'English',
        //     secondaryLanguage: 'Tamil',
        //     serverLanguage:
        //     {
        //         updated_at: null,
        //         _id: '51572440-ebee-11e9-98e8-410a9b0b93ae',
        //         name: 'Node.js',
        //         label: 'NodeJS',
        //         description: null,
        //         value: null,
        //         type: 'GpServerLanguage',
        //         sub_type: null,
        //         created_at: '2019-10-11T06:14:01.092Z',
        //         __v: 0
        //     },
        //     serverFramework:
        //     {
        //         updated_at: null,
        //         _id: '51410430-ebee-11e9-98e8-410a9b0b93ae',
        //         name: 'Express',
        //         label: 'Express',
        //         description: null,
        //         value: null,
        //         type: 'GpServerDevFramework',
        //         sub_type: null,
        //         created_at: '2019-10-11T06:14:00.947Z',
        //         __v: 0
        //     },
        //     serverDatabase:
        //     {
        //         updated_at: null,
        //         _id: '512bf591-ebee-11e9-98e8-410a9b0b93ae',
        //         name: 'mongodb',
        //         label: 'MongoDB',
        //         description: null,
        //         value: null,
        //         type: 'GpServerDBMS',
        //         sub_type: null,
        //         created_at: '2019-10-11T06:14:00.809Z',
        //         __v: 0
        //     },
        //     entities:
        //         [{
        //             is_default: false,
        //             updated_at: '2019-10-11T06:38:26.714Z',
        //             _id: 'c56cd340-ebf1-11e9-87ce-fff17318aa2a',
        //             name: 'ticket',
        //             description: 'details',
        //             entity_type: 'primary',
        //             project_id: 'b0f431b0-ebf1-11e9-b976-3b154e86d0e0',
        //             feature_id: 'ba033990-ebf1-11e9-9229-f3608f21ebd7',
        //             created_by: '',
        //             last_modified_by: '',
        //             field:
        //                 [{
        //                     name: 'ticketname',
        //                     type_name: 'Text',
        //                     data_type: 'String',
        //                     description: 'Description',
        //                     is_default: false,
        //                     is_entity_type: false,
        //                     is_list_type: false,
        //                     list_type: null,
        //                     list_value: null,
        //                     updated_at: null,
        //                     created_at: '2019-10-11T06:39:25.616Z',
        //                     entity_id: null,
        //                     _id: 'de070b00-ebf1-11e9-87ce-fff17318aa2a'
        //                 },
        //                 {
        //                     name: 'ticketstatus',
        //                     type_name: 'Text',
        //                     data_type: 'String',
        //                     description: 'Description',
        //                     is_default: false,
        //                     is_entity_type: false,
        //                     is_list_type: false,
        //                     list_type: null,
        //                     list_value: null,
        //                     updated_at: null,
        //                     created_at: '2019-10-11T06:39:25.615Z',
        //                     entity_id: null,
        //                     _id: 'de06e3f0-ebf1-11e9-87ce-fff17318aa2a'
        //                 },
        //                 {
        //                     name: 'enter_name',
        //                     type_name: 'Text',
        //                     data_type: 'String',
        //                     description: 'Description',
        //                     is_default: false,
        //                     is_entity_type: false,
        //                     is_list_type: false,
        //                     list_type: null,
        //                     list_value: null,
        //                     updated_at: null,
        //                     created_at: '2019-10-11T06:39:25.615Z',
        //                     entity_id: null,
        //                     _id: 'de06bce0-ebf1-11e9-87ce-fff17318aa2a'
        //                 }],
        //             created_at: '2019-10-11T06:38:44.340Z',
        //             __v: 0
        //         }],
        //     entitySchema:
        //     {
        //         body:
        //             [{
        //                 schemaName: 'ticketSchema',
        //                 modelName: 'ticketModel',
        //                 fileName: 'ticket',
        //                 entityType: 'primary'
        //             }],
        //         code: 200,
        //         message: ' request has succeeded'
        //     },
        //     flows:
        //         [{
        //             name: 'GpCreate',
        //             label: 'save',
        //             description: 'creates a noun',
        //             type: 'basic',
        //             actionOnData: 'GpCreate',
        //             createWithDefaultActivity: 1,
        //             flowConfig: [],
        //     isAdmin:true,
        //             isDependent: true,
        //             depedent: [{
        //                 name: "GpAttachmentUpload",
        //                 label: 'download',
        //                 description: 'creates a noun',
        //                 type: 'basic',
        //                 actionOnData: 'GpAttachmentUpload',
        //                 createWithDefaultActivity: 1,
        //                 flowConfig: [{
        //                     gpattach: {
        //                         size: 1000000,
        //                         location: '/home/tendecoders/Pictures/files',
        //                         allowedfiles: ["html", "txt"],
        //                         count: 1000,
        //                     },
        //                 }],
        //                 depedent: [],
        //                 isDependent: false,
        //             }],

        //             components:
        //                 [{
        //                     name: 'GpExpressController',
        //                     label: 'controller',
        //                     description: 'controller for a Backend Application',
        //                     type: 'server',
        //                     sequenceId: 1,
        //                     devLanguage: 'Node.js',
        //                     devFramework: 'Express',
        //                     microFlows:
        //                         [{
        //                             _id: '8827e700-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpStart',
        //                             sequenceId: '1',
        //                             createdAt: '2019-10-09T12:30:45.723Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88285c30-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpVariable_statement',
        //                             sequenceId: '2',
        //                             createdAt: '2019-10-09T12:30:45.845Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88285c31-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpCheck_Connector',
        //                             sequenceId: '3',
        //                             createdAt: '2019-10-09T12:30:45.779Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288339-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpService_call',
        //                             sequenceId: '4',
        //                             createdAt: '2019-10-09T12:30:45.799Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288340-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpReturn',
        //                             sequenceId: '5',
        //                             createdAt: '2019-10-09T12:30:45.744Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288341-7003-11e9-abdd-ffb308621fd2',
        //                             sequenceId: '6',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpEnd',
        //                             createdAt: '2019-10-09T12:30:45.724Z',
        //                             __v: 0
        //                         }],
        //                     connector:
        //                         [{
        //                             api_key: [],
        //                             url: null,
        //                             isDefault: true,
        //                             isCustom: false,
        //                             isDisabled: false,
        //                             properties: [],
        //                             _id: '7cbbe202-7877-11e9-bdb0-f73f14ce0e52',
        //                             name: 'BackendController',
        //                             description:
        //                                 'default connector calling from Backend controller to its backend service',
        //                             availableApi:
        //                                 [{
        //                                     name: null,
        //                                     description: null,
        //                                     type: null,
        //                                     properties: [],
        //                                     _id: '5da01f10438cf511c590a889'
        //                                 }
        //                                 ],
        //                             fromComponentName: 'GpExpressController',
        //                             toComponentName: 'GpExpressService',
        //                             createdAt: '2019-10-09T12:30:16.217Z',
        //                             __v: 0
        //                         }]
        //                 },
        //                 {
        //                     name: 'GpExpressService',
        //                     label: 'service',
        //                     description: 'service component for Backend Application',
        //                     type: 'server',
        //                     sequenceId: 2,
        //                     devLanguage: 'Node.js',
        //                     devFramework: 'Express',
        //                     microFlows:
        //                         [{
        //                             _id: '88288342-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpStart',
        //                             sequenceId: '1',
        //                             createdAt: '2019-10-09T12:30:45.846Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288343-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpVariable_statement',
        //                             sequenceId: '2',
        //                             createdAt: '2019-10-09T12:30:45.779Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288344-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpCheck_Connector',
        //                             sequenceId: '3',
        //                             createdAt: '2019-10-09T12:30:45.799Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288345-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpDaoCall',
        //                             sequenceId: '4',
        //                             createdAt: '2019-10-09T12:30:45.745Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa50-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpReturn',
        //                             sequenceId: '5',
        //                             createdAt: '2019-10-09T12:30:45.725Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa51-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpEnd',
        //                             sequenceId: '6',
        //                             createdAt: '2019-10-09T12:30:45.846Z',
        //                             __v: 0
        //                         }],
        //                     connector:
        //                         [{
        //                             api_key: [],
        //                             url: null,
        //                             isDefault: true,
        //                             isCustom: false,
        //                             isDisabled: false,
        //                             properties: [],
        //                             _id: '7cbbe200-7877-11e9-bdb0-f73f14ce0e52',
        //                             name: 'BackendService',
        //                             description:
        //                                 'default connector calling from frontend Backend service to its backend dao',
        //                             availableApi:
        //                                 [{
        //                                     name: null,
        //                                     description: null,
        //                                     type: null,
        //                                     properties: [],
        //                                     _id: '5da01f10438cf511c590a88a'
        //                                 },
        //                                 ],
        //                             fromComponentName: 'GpExpressService',
        //                             toComponentName: 'GpExpressDao',
        //                             createdAt: '2019-10-09T12:30:16.232Z',
        //                             __v: 0
        //                         },
        //                         ]
        //                 },
        //                 {
        //                     name: 'GpExpressDao',
        //                     label: 'dao',
        //                     description: 'dao component for Backend Application',
        //                     type: 'server',
        //                     sequenceId: 3,
        //                     devLanguage: 'Node.js',
        //                     devFramework: 'Express',
        //                     microFlows:
        //                         [{
        //                             _id: '88288333-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpVariable_statement',
        //                             sequenceId: '2',
        //                             createdAt: '2019-10-09T12:30:45.800Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa52-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpStart',
        //                             sequenceId: '1',
        //                             createdAt: '2019-10-09T12:30:45.781Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa53-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpCheck_Connector',
        //                             sequenceId: '3',
        //                             createdAt: '2019-10-09T12:30:45.746Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d160-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpVerbKey',
        //                             sequenceId: '4',
        //                             createdAt: '2019-10-09T12:30:45.725Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d161-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpSqlQuery',
        //                             sequenceId: '5',
        //                             createdAt: '2019-10-09T12:30:45.847Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d162-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpReturn',
        //                             sequenceId: '6',
        //                             createdAt: '2019-10-09T12:30:45.781Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d163-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpEnd',
        //                             sequenceId: '7',
        //                             createdAt: '2019-10-09T12:30:45.800Z',
        //                             __v: 0
        //                         },
        //                         ],
        //                     connector: []
        //                 },
        //                 ]
        //         },
        //         {
        //             name: 'GpGetAllValues',
        //             label: 'getAllRecord',
        //             description: 'special search that gets all values',
        //             type: 'basic',
        //             actionOnData: 'GpGetAllValues',
        //             createWithDefaultActivity: 1,
        //             components:
        //                 [{
        //                     name: 'GpExpressController',
        //                     label: 'controller',
        //                     description: 'controller for a Backend Application',
        //                     type: 'server',
        //                     sequenceId: 1,
        //                     devLanguage: 'Node.js',
        //                     devFramework: 'Express',
        //                     microFlows:
        //                         [{
        //                             _id: '8827e700-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpStart',
        //                             sequenceId: '1',
        //                             createdAt: '2019-10-09T12:30:45.723Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88285c30-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpVariable_statement',
        //                             sequenceId: '2',
        //                             createdAt: '2019-10-09T12:30:45.845Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88285c31-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpCheck_Connector',
        //                             sequenceId: '3',
        //                             createdAt: '2019-10-09T12:30:45.779Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288339-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpService_call',
        //                             sequenceId: '4',
        //                             createdAt: '2019-10-09T12:30:45.799Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288340-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpReturn',
        //                             sequenceId: '5',
        //                             createdAt: '2019-10-09T12:30:45.744Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288341-7003-11e9-abdd-ffb308621fd2',
        //                             sequenceId: '6',
        //                             componentName: 'GpExpressController',
        //                             microFlowStepName: 'GpEnd',
        //                             createdAt: '2019-10-09T12:30:45.724Z',
        //                             __v: 0
        //                         },
        //                         ],
        //                     connector:
        //                         [{
        //                             api_key: [],
        //                             url: null,
        //                             isDefault: true,
        //                             isCustom: false,
        //                             isDisabled: false,
        //                             properties: [],
        //                             _id: '7cbbe202-7877-11e9-bdb0-f73f14ce0e52',
        //                             name: 'BackendController',
        //                             description:
        //                                 'default connector calling from Backend controller to its backend service',
        //                             availableApi:
        //                                 [{
        //                                     name: null,
        //                                     description: null,
        //                                     type: null,
        //                                     properties: [],
        //                                     _id: '5da01f10438cf511c590a889'
        //                                 },
        //                                 ],
        //                             fromComponentName: 'GpExpressController',
        //                             toComponentName: 'GpExpressService',
        //                             createdAt: '2019-10-09T12:30:16.217Z',
        //                             __v: 0
        //                         },
        //                         ]
        //                 },
        //                 {
        //                     name: 'GpExpressService',
        //                     label: 'service',
        //                     description: 'service component for Backend Application',
        //                     type: 'server',
        //                     sequenceId: 2,
        //                     devLanguage: 'Node.js',
        //                     devFramework: 'Express',
        //                     microFlows:
        //                         [{
        //                             _id: '88288342-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpStart',
        //                             sequenceId: '1',
        //                             createdAt: '2019-10-09T12:30:45.846Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288343-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpVariable_statement',
        //                             sequenceId: '2',
        //                             createdAt: '2019-10-09T12:30:45.779Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288344-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpCheck_Connector',
        //                             sequenceId: '3',
        //                             createdAt: '2019-10-09T12:30:45.799Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '88288345-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpDaoCall',
        //                             sequenceId: '4',
        //                             createdAt: '2019-10-09T12:30:45.745Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa50-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpReturn',
        //                             sequenceId: '5',
        //                             createdAt: '2019-10-09T12:30:45.725Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa51-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressService',
        //                             microFlowStepName: 'GpEnd',
        //                             sequenceId: '6',
        //                             createdAt: '2019-10-09T12:30:45.846Z',
        //                             __v: 0
        //                         },
        //                         ],
        //                     connector:
        //                         [{
        //                             api_key: [],
        //                             url: null,
        //                             isDefault: true,
        //                             isCustom: false,
        //                             isDisabled: false,
        //                             properties: [],
        //                             _id: '7cbbe200-7877-11e9-bdb0-f73f14ce0e52',
        //                             name: 'BackendService',
        //                             description:
        //                                 'default connector calling from frontend Backend service to its backend dao',
        //                             availableApi:
        //                                 [{
        //                                     name: null,
        //                                     description: null,
        //                                     type: null,
        //                                     properties: [],
        //                                     _id: '5da01f10438cf511c590a88a'
        //                                 },
        //                                 ],
        //                             fromComponentName: 'GpExpressService',
        //                             toComponentName: 'GpExpressDao',
        //                             createdAt: '2019-10-09T12:30:16.232Z',
        //                             __v: 0
        //                         },
        //                         ]
        //                 },
        //                 {
        //                     name: 'GpExpressDao',
        //                     label: 'dao',
        //                     description: 'dao component for Backend Application',
        //                     type: 'server',
        //                     sequenceId: 3,
        //                     devLanguage: 'Node.js',
        //                     devFramework: 'Express',
        //                     microFlows:
        //                         [{
        //                             _id: '88288333-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpVariable_statement',
        //                             sequenceId: '2',
        //                             createdAt: '2019-10-09T12:30:45.800Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa52-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpStart',
        //                             sequenceId: '1',
        //                             createdAt: '2019-10-09T12:30:45.781Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828aa53-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpCheck_Connector',
        //                             sequenceId: '3',
        //                             createdAt: '2019-10-09T12:30:45.746Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d160-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpVerbKey',
        //                             sequenceId: '4',
        //                             createdAt: '2019-10-09T12:30:45.725Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d161-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpSqlQuery',
        //                             sequenceId: '5',
        //                             createdAt: '2019-10-09T12:30:45.847Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d162-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpReturn',
        //                             sequenceId: '6',
        //                             createdAt: '2019-10-09T12:30:45.781Z',
        //                             __v: 0
        //                         },
        //                         {
        //                             _id: '8828d163-7003-11e9-abdd-ffb308621fd2',
        //                             componentName: 'GpExpressDao',
        //                             microFlowStepName: 'GpEnd',
        //                             sequenceId: '7',
        //                             createdAt: '2019-10-09T12:30:45.800Z',
        //                             __v: 0
        //                         },
        //                         ],
        //                     connector: []
        //                 },
        //                 ]
        //         },
        //         ]
        // }

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

        if (EntitySchema === undefined && EntitySchema.length === 0) {
            callback('No Schema has been found');
        } else {
            try {
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
                    this.routeObj.isCustomCode = true;
                    this.routeObj.nodePortNumber = port;


                    if (entityElement === undefined) {
                        entityNext();
                    } if (entityElement.entityType === 'secondary') {
                        entityNext();
                    } else {
                        let count = 0;
                        asyncLoop(details.flows, (flowElement, flowNext) => {

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
                            console.log('-------------dao objects---------',daoTemp);
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


                }, (entityError) => {
                    if (entityError) {

                    } else {
                        controllerWorker.generateControllerFile(projectGenerationPath, templateLocation, this.controller);
                        serviceWorker.generateServiceFile(projectGenerationPath, templateLocation, this.service);
                        daoWorker.generateDaoFile(projectGenerationPath, templateLocation, this.dao);
                        routeWorker.generateRouteFile(projectGenerationPath, templateLocation, this.route);
                        console.log('route file of values are -------- ', util.inspect(this.route, { showHidden: true, depth: null }));

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

    public gpAttachmentService(gpAttach) {
        return new Promise(resolve => {
            attachWorker.generateAttachment(gpAttach, (gpAttachResponse) => {
                console.log('gp--attach-->', gpAttachResponse);
                resolve(response)
            })

        })


    }
}

