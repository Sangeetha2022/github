import { Request } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import { ApiGatewayWorker } from '../worker/ApiGatewayWorker';
import { Common } from '../config/Common';
import { CommonWorker } from '../worker/CommonWorker';

let apiGatewayWorker = new ApiGatewayWorker();
let commonWorker = new CommonWorker();
export class ApiGatewayService {
    private APIGATEWAY_FOLDERNAME = 'apigateway';
    private constantObj = {
        className: '',
        constantArray: []
    }
    private projectName = '';
    private packageObj: any[] = [];
    private controllerArray = [];
    private CAMUNDA_LOGIN_URL = '/login';
    private CAMUNDA_CONSENT_URL = '/consent';
    private CAMUNDA_AUTH_PROXY_URL = '/proxy';
    private URL_NAME = 'URL';
    private HTTP_NAME = 'http';
    private LOCALHOST_NAME = 'localhost';
    private CONTROLLER_NAME = 'Controller';
    private RESPONSEPARAMETER_NAME = 'result';

    public createApiGateway(req: Request, callback) {
        this.constantObj = {
            className: 'Constant',
            constantArray: []
        }
        this.controllerArray = [];
        console.log('create apigateway in  node services ----body---  ', util.inspect(req.body, { showHidden: true, depth: null }));
        const details = req.body;
        const portNumber = details.applicationPort;
        Common.createFolders(details.projectGenerationPath);
        const apiGatewayGenerationPath = `${details.projectGenerationPath}/${this.APIGATEWAY_FOLDERNAME}`;
        const apiGatewayTemplatePath = `${details.project.templateLocation.backendTemplate}/apigateway`;
        Common.createFolders(apiGatewayGenerationPath);
        details.project.name.split(" ").forEach((element, index) => {
            if (index === 0) {
                this.projectName = element;
            } else {
                this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
            }
        })
        console.log('------feature details-----', req.body.feature);
        // generate docker file
        commonWorker.generateDockerFile(apiGatewayGenerationPath, apiGatewayTemplatePath, this.APIGATEWAY_FOLDERNAME);
        asyncLoop(req.body.nodeResponse, (element, next1) => {
            const controllerObj = {
                className: '',
                implementName: '',
                import: [],
                router: [],
                methods: [],
                additional: {
                    camunda: {
                        login: null,
                        consent: null,
                        isVerify: false
                    }
                }
            }
            if (element === undefined) {
                next1();
            } else {
                const temp = {
                    nodeName: '',
                    httpProxy: '',
                    httpUrl: '',
                    httpPort: ''
                }
                /** For external Feature apigateway code */
                if (element.type === 'external') {
                    let extclassname;

                    temp.nodeName = `${element.value.featurename.toUpperCase()}${this.URL_NAME}`;
                    extclassname = element.value.featurename;
                    temp.httpPort = element.value.Portnumber;
                    let routearray = element.value.RouteDetails[0].Routes;

                    console.log('--------routearray-------', element);
                    routearray.forEach(routeelement => {
                        let extcontrollerDetails = {
                            methodName: '',
                            methodUrl: '',
                            type: '',
                            apiAction: '',
                            constantName: this.constantObj.className,
                            nodeName: '',
                            exterclassname: '',
                            requestParameter: '',
                            responseParameter: ''
                        }
                        let extrouteDetails = {
                            routeUrl: '',
                            apiAction: '',
                            methodName: '',
                            variableName: ''
                        }
                        extcontrollerDetails.exterclassname = element.value.featurename;

                        console.log('--------route-----element-------', routeelement);
                        extrouteDetails.routeUrl = routeelement.Apiendpoint;
                        extrouteDetails.apiAction = routeelement.ApiMethod;
                        extrouteDetails.methodName = routeelement.MethodName;
                        extcontrollerDetails.type = element.type;

                        controllerObj.router.push(extrouteDetails);

                        extcontrollerDetails.methodName = routeelement.MethodName;
                        extcontrollerDetails.apiAction = routeelement.ApiMethod;
                        extcontrollerDetails.nodeName = temp.nodeName;
                        extcontrollerDetails.responseParameter = `${this.RESPONSEPARAMETER_NAME}`;
                        controllerObj.methods.push(extcontrollerDetails);
                        this.controllerImport(controllerObj, routeelement);
                    });
                    this.controllerArray.push(controllerObj);
                }
                if (element.featureName !== undefined) {
                    temp.nodeName = `${element.featureName.toUpperCase()}${this.URL_NAME}`;
                    temp.httpPort = element.nodePortNumber;
                }
                temp.httpUrl = `${this.projectName.toLowerCase()}-app.${this.projectName.toLowerCase()}.svc.cluster.local`;
                temp.httpPort = element.nodePortNumber;

                controllerObj.className = element.entityFileName;
                controllerObj.implementName = `${this.CONTROLLER_NAME}`;
                this.setPackageDependencies(element);

                this.constantObj.constantArray.push(temp);
                if (element.flowAction !== undefined) {
                    console.log("ee-->", element.flowAction);
                    asyncLoop(element.flowAction, (routingElement, next2) => {
                        const controllerDetails = {
                            methodName: '',
                            methodUrl: '',
                            apiAction: '',
                            constantName: this.constantObj.className,
                            nodeName: '',
                            requestParameter: '',
                            responseParameter: ''
                        }
                        const routeDetails = {
                            routeUrl: '',
                            apiAction: '',
                            methodName: '',
                            variableName: ''
                        }
                        if (routingElement === undefined) {
                            next2();
                        } else {
                            routeDetails.routeUrl = routingElement.routeUrl;
                            routeDetails.apiAction = routingElement.apiAction;
                            routeDetails.methodName = routingElement.methodName;
                            routeDetails.variableName = routingElement.variableName;
                            controllerObj.router.push(routeDetails);

                            // controller info
                            controllerDetails.methodName = routingElement.methodName;
                            controllerDetails.apiAction = routingElement.apiAction;
                            controllerDetails.nodeName = temp.nodeName;
                            controllerDetails.responseParameter = `${this.RESPONSEPARAMETER_NAME}`;

                            // import controller component dependencies
                            this.controllerImport(controllerObj, element);

                            // check camunda login and constent method to generate in apigateway
                            if (routingElement.routeUrl === this.CAMUNDA_LOGIN_URL ||
                                routingElement.routeUrl === this.CAMUNDA_CONSENT_URL) {
                                this.setRoutingDetails(routingElement, controllerDetails);
                                console.log("eee--->",routingElement, controllerDetails);
                                controllerObj.additional.camunda.isVerify = true;
                                if (routingElement.routeUrl === this.CAMUNDA_LOGIN_URL) {
                                    controllerObj.additional.camunda.login = controllerDetails;
                                }
                                if (routingElement.routeUrl === this.CAMUNDA_CONSENT_URL) {
                                    controllerObj.additional.camunda.consent = controllerDetails;
                                }
                            } else {
                                this.setRoutingDetails(routingElement, controllerDetails);
                                // if (routingElement.routeUrl === this.CAMUNDA_AUTH_PROXY_URL) {
                                //     controllerObj.additional.camunda.isVerify = controllerDetails;
                                // }
                                controllerObj.methods.push(controllerDetails);

                            }
                            next2();
                        }

                    }, (err) => {
                        if (err) {
                            next1()
                        } else {
                            this.controllerArray.push(controllerObj);
                            next1()
                        }
                    })
                } else {
                    console.log('-----no flows for this feature -----');
                    next1()
                }


            }
        }, (err) => {
            if (err) {
                console.log('error apigateway -----------  ', err);
                callback(err);
            } else {
                apiGatewayWorker.createConstantFile(apiGatewayGenerationPath, apiGatewayTemplatePath, this.constantObj);
                apiGatewayWorker.createInterface(apiGatewayGenerationPath, apiGatewayTemplatePath);
                apiGatewayWorker.createApiController(apiGatewayGenerationPath, apiGatewayTemplatePath, this.controllerArray);
                apiGatewayWorker.createControllerIndex(apiGatewayGenerationPath, apiGatewayTemplatePath, this.controllerArray);
                apiGatewayWorker.createServerFile(apiGatewayGenerationPath, apiGatewayTemplatePath, this.controllerArray, portNumber);
                apiGatewayWorker.createPackageTsConfigFiles(apiGatewayGenerationPath, apiGatewayTemplatePath, this.packageObj);
                callback('apigateway generated ----- ');
            }
        })
    }

    private setRoutingDetails(routingElement, controllerDetails) {
        switch (routingElement.apiAction) {
            case 'post':
                // controllerDetails.methodUrl = routingElement.routeUrl;
                controllerDetails.methodUrl = `\${req.url}`;
                controllerDetails.requestParameter = `req.body`;
                break;
            case 'put':
                const putTemp = routingElement.routeUrl.split(':');
                // if (putTemp.length > 1) {
                //     controllerDetails.methodUrl = `${putTemp[0]}req.params.${putTemp[putTemp.length - 1]}`;
                // } else {
                //     controllerDetails.methodUrl = routingElement.routeUrl;
                // }
                controllerDetails.methodUrl = `\${req.url}`;
                controllerDetails.requestParameter = `req.body`;
                break;
            case 'get':
                const getTemp = routingElement.routeUrl.split(':');
                // if (getTemp.length > 1) {
                //     controllerDetails.methodUrl = `${getTemp[0]}req.params.${getTemp[getTemp.length - 1]}`;
                // } else {
                //     controllerDetails.methodUrl = routingElement.routeUrl;
                // }
                controllerDetails.methodUrl = `\${req.url}`;
                break;
            case 'delete':
                const deleteTemp = routingElement.routeUrl.split(':');
                // if (deleteTemp.length > 1) {
                //     controllerDetails.methodUrl = `${deleteTemp[0]}req.params.${deleteTemp[deleteTemp.length - 1]}`;
                // } else {
                //     controllerDetails.methodUrl = routingElement.routeUrl;
                // }
                controllerDetails.methodUrl = `\${req.url}`;
                break;
            default:
                break;
        }
        return controllerDetails;
    }

    private controllerImport(controllerObj, element) {
        controllerObj.import = [];
        controllerObj.import.push({ name: '* as express', path: 'express' });
        controllerObj.import.push({ name: '{ Request, Response }', path: 'express' });
        controllerObj.import.push({ name: `* as ${this.constantObj.className}`, path: `../config/${this.constantObj.className}` });
        controllerObj.import.push({ name: '{ ApiAdaptar } ', path: '../config/apiAdapter' });
        controllerObj.import.push({ name: 'Controller', path: '../interface/controller.interface' });

        if (element.hasOwnProperty('import') &&
            element.import.hasOwnProperty('packageDependencies') &&
            element.import.packageDependencies.length > 0) {
            element.import.packageDependencies.forEach(dependency => {
                const temp = {
                    name: '',
                    path: ''
                }
                temp.name = dependency.name;
                temp.path = dependency.path;
                controllerObj.import.push(temp);
            })
        }
    }

    private setPackageDependencies(element) {
        if (element.hasOwnProperty('package')) {
            element.package.forEach(packageElement => {
                const temp = {
                    name: '',
                    version: ''
                }
                temp.name = packageElement.name;
                temp.version = packageElement.version;
                this.packageObj.push(temp);
            })
        }
    }

}


