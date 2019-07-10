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
    private controllerArray = [];

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
        console.log('create node response lenght are --------  ', details.nodeResponse.length)

        // generate docker file
        commonWorker.generateDockerFile(apiGatewayGenerationPath, apiGatewayTemplatePath, this.APIGATEWAY_FOLDERNAME);
        asyncLoop(req.body.nodeResponse, (element, next1) => {
            console.log('create node response lenght are --firslevel------  ', element)
            const controllerObj = {
                className: '',
                implementName: '',
                import: [],
                router: [],
                methods: []
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
                // temp.nodeName = `${element.entityFileName.toUpperCase()}URL`;
                temp.nodeName = `${element.featureName.toUpperCase()}URL`;
                temp.httpProxy = `http`;
                temp.httpUrl = `localhost`;
                temp.httpPort = element.nodePortNumber;

                controllerObj.className = element.entityFileName;
                controllerObj.implementName = `Controller`;

                this.constantObj.constantArray.push(temp);
                asyncLoop(element.flowAction, (routingElement, next2) => {
                    console.log('async loop routing element are ------  ', routingElement);
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

                        controllerDetails.methodName = routingElement.methodName;
                        controllerDetails.apiAction = routingElement.apiAction;
                        controllerDetails.nodeName = temp.nodeName;
                        controllerDetails.responseParameter = `result`;
                        this.controllerImport(controllerObj);
                        switch (routingElement.apiAction) {
                            case 'post':
                                controllerDetails.methodUrl = routingElement.routeUrl;
                                controllerDetails.requestParameter = `req.body`;
                                break;
                            case 'put':
                                const putTemp = routingElement.routeUrl.split(':');
                                if (putTemp.length > 1) {
                                    controllerDetails.methodUrl = `${putTemp[0]}req.params.${putTemp[putTemp.length - 1]}`;
                                } else {
                                    controllerDetails.methodUrl = routingElement.routeUrl;
                                }
                                controllerDetails.requestParameter = `req.body`;
                                break;
                            case 'get':
                                const getTemp = routingElement.routeUrl.split(':');
                                if (getTemp.length > 1) {
                                    controllerDetails.methodUrl = `${getTemp[0]}req.params.${getTemp[getTemp.length - 1]}`;
                                } else {
                                    controllerDetails.methodUrl = routingElement.routeUrl;
                                }
                                break;
                            case 'delete':
                                const deleteTemp = routingElement.routeUrl.split(':');
                                if (deleteTemp.length > 1) {
                                    controllerDetails.methodUrl = `${deleteTemp[0]}req.params.${deleteTemp[deleteTemp.length - 1]}`;
                                } else {
                                    controllerDetails.methodUrl = routingElement.routeUrl;
                                }
                                break;
                            default:
                                break;
                        }
                        controllerObj.methods.push(controllerDetails);
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
                apiGatewayWorker.createPackageTsConfigFiles(apiGatewayGenerationPath, apiGatewayTemplatePath);
                callback('apigateway generated ----- ');
            }
        })
    }

    public controllerImport(controllerObj) {
        controllerObj.import = [];
        controllerObj.import.push({ name: '* as express', path: 'express' });
        controllerObj.import.push({ name: '{ Request, Response }', path: 'express' });
        controllerObj.import.push({ name: `* as ${this.constantObj.className}`, path: `../config/${this.constantObj.className}` });
        controllerObj.import.push({ name: '{ ApiAdaptar } ', path: '../config/apiAdapter' });
        controllerObj.import.push({ name: 'Controller', path: '../interface/controller.interface' });
    }

}


