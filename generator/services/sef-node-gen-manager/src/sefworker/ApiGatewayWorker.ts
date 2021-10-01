import { ApiGatewaySupportWorker } from "../sefsupportworker/ApiGatewaySupportWorker";
import { Common } from '../config/Common';

let apiGatewaySupportWorker = new ApiGatewaySupportWorker();
export class ApiGatewayWorker {
    private tempServer = {
        GpStart: {
            dependencies: []
        },
        dbConnectionUrl: '',
        port: 0
    }

    createConstantFile(generationPath, templatePath, details) {
        const srcPath = `${generationPath}/src`;
        Common.createFolders(srcPath);
        apiGatewaySupportWorker.generateCommonFile(srcPath, templatePath, details, (response) => {
            return response;
        });
    }

    createInterface(generationPath, templatePath) {
        const srcPath = `${generationPath}/src`;
        Common.createFolders(srcPath);
        apiGatewaySupportWorker.generateInterface(srcPath, templatePath, (response) => {
            return response;
        });
    }

    createApiController(generationPath, templatePath, controllerDetails) {
        const srcPath = `${generationPath}/src`;
        Common.createFolders(srcPath);
        controllerDetails.forEach(controllerElement => {
            apiGatewaySupportWorker.generateSefController(srcPath, templatePath, controllerElement, (response) => {
                return response;
            });
        })
    }

    createSefControllerIndex(generationPath, templatePath, controllerDetails) {
        const srcPath = `${generationPath}/src`;
        Common.createFolders(srcPath);
        apiGatewaySupportWorker.generateSefControllerIndex(srcPath, templatePath, controllerDetails, (response) => {
            return response;
        })
    }

    createPackageTsConfigFiles(generationPath, templatePath, packageObj) {
        Common.createFolders(generationPath);
        const obj = {
            name: 'ApiGateway',
            description: 'ApiGateway Sef Node Microservice',
            dependencies: packageObj
        }
        apiGatewaySupportWorker.generatePackageJsonFile(generationPath, templatePath, obj);
        apiGatewaySupportWorker.generateTsconfigFile(generationPath, templatePath);
    }

    createSefServerFile(generationPath, templatePath, controllerDetails, portNumber) {
        const obj = {
            import: [],
            classNames: [],
            serverPort: ''
        }
        obj.serverPort = portNumber;
        const srcPath = `${generationPath}/src`;
        Common.createFolders(srcPath);
        this.serverImport(obj);
        this.serverClasses(obj, controllerDetails);
        apiGatewaySupportWorker.generateSefServerFile(srcPath, templatePath, obj, (response) => {
            return response;
        })
    }

    serverImport(obj) {
        obj.import.push({ name: '* as cors', path: 'cors' });
        obj.import.push({ name: '* as express', path: 'express' });
        obj.import.push({ name: '* as bodyParser', path: 'body-parser' });
        obj.import.push({ name: 'SefController', path: './interface/sefcontroller.interface' });
        obj.import.push({ name: '{ WinstonLogger }', path: './config/WinstonLogger' });
    }

    serverClasses(obj, controllerDetails) {
        controllerDetails.forEach(element => {
            const temp = {
                className: ''
            }
            temp.className = element.className;
            obj.classNames.push(temp);
        })
    }
}