import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

// need to work
export class ApiGatewaySupportWorker {



    generateCommonFile(generationPath, templatePath, constantData, callback) {
        const configPath = `${generationPath}/config`;
        const apiGatewayTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(configPath);
        let generateConfig = st.loadGroup(require(apiGatewayTemplatePath + '/config_constant_stg'));
        let configFile = generateConfig.render("config_constant", [constantData]);
        fs.writeFile(configPath + `/${constantData.className.trim()}.ts`, configFile, (err) => {
            if (err) throw err;
            this.generateApiAdapter(configPath, apiGatewayTemplatePath)
            callback('file generated');
        })

    }


    generateApiAdapter(configPath, apiGatewayTemplatePath) {
        let generateApiGateway = st.loadGroup(require(apiGatewayTemplatePath + '/apiadapter_stg'));
        let apigatewayFile = generateApiGateway.render("apiadapter");
        fs.writeFile(configPath + `/apiAdapter.ts`, apigatewayFile, (err) => {
            if (err) throw err;
            this.generateWinstonLoggerFile(configPath, apiGatewayTemplatePath);
            console.log('apiadapter files generated');
        })
    }

    generateWinstonLoggerFile(configPath, apiGatewayTemplatePath) {
        let generateWinstonLogger = st.loadGroup(require(apiGatewayTemplatePath + '/winston_stg'));
        let winstonLoggerFile = generateWinstonLogger.render("winston");
        fs.writeFile(configPath + `/WinstonLogger.ts`, winstonLoggerFile, (err) => {
            if (err) throw err;
            this.generateLoggerFile(configPath, apiGatewayTemplatePath);
            console.log('winston logger files generated');
        })
    }

    generateLoggerFile(configPath, apiGatewayTemplatePath) {
        let generateLogger = st.loadGroup(require(apiGatewayTemplatePath + '/logger_stg'));
        let loggerFile = generateLogger.render("logger");
        fs.writeFile(configPath + `/Logger.ts`, loggerFile, function (err) {
            if (err) throw err;
            
            console.log('logger files generated');
        })
    }

    generateInterface(generationPath, templatePath, callback) {
        const interfacePath = `${generationPath}/interface`;
        const apiGatewayTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(interfacePath);
        let generateInterface = st.loadGroup(require(apiGatewayTemplatePath + '/controllerinterface_stg'));
        let interfaceFile = generateInterface.render("controllerinterface");
        fs.writeFile(interfacePath + `/controller.interface.ts`, interfaceFile, function (err) {
            if (err) throw err;
            callback('apigateway interface generated');
        })
    }



    generateSefController(generationPath, templatePath, controllerData, callback) {
        console.log('generate controller files are ------ ', util.inspect(controllerData, { showHidden: true, depth: null }));
        let classname
        if(controllerData.className !== undefined){
            classname = controllerData.className.trim();
        }else{
            if(classname == undefined){
                console.log('---------classnae----',classname);
                controllerData.methods.forEach(methodelement => {
                    if(methodelement.type === 'external'){
                        classname = methodelement.exterclassname;
                    }
                });
            }
        }
        const controllerPath = `${generationPath}/apicontroller`;
        const apiGatewayTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(controllerPath);
        let generateController = st.loadGroup(require(apiGatewayTemplatePath + '/apicontroller_stg'));
        let controllerFile = generateController.render("apicontroller", [controllerData]);
        fs.writeFile(controllerPath + `/${classname}Controller.ts`, controllerFile, function (err) {
            if (err) throw err;
            callback('apicontroller file generated');
        })

    }

    generateSefControllerIndex(generationPath, templatePath, controllerData, callback) {
        console.log('generate controller index are -----  ', controllerData);
        const controllerIndexPath = `${generationPath}/apicontroller`;
        const apiGatewayTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(controllerIndexPath);
        let generateControllerIndex = st.loadGroup(require(apiGatewayTemplatePath + '/controllerindex_stg'));
        let controllerIndexFile = generateControllerIndex.render("controllerindex", [controllerData]);
        fs.writeFile(controllerIndexPath + `/index.ts`, controllerIndexFile, function (err) {
            if (err) throw err;
            callback('apicontroller index file generated');
        })

    }

    generateSefServerFile(generationPath, templatePath, serverData, callback) {
        const apiGatewayTemplatePath = path.resolve(__dirname, templatePath);
        let generateServer = st.loadGroup(require(apiGatewayTemplatePath + '/apigatewayserver_stg'));
        let serverFile = generateServer.render("apigatewayserver", [serverData]);
        fs.writeFile(generationPath + `/server.ts`, serverFile, function (err) {
            if (err) throw err;
            callback('server file generated');
        })

    }


    generatePackageJsonFile(generationPath, templatePath, packageData) {
        const apiGatewayTemplatePath = path.resolve(__dirname, templatePath);
        let generatePackageJson = st.loadGroup(require(apiGatewayTemplatePath + '/packageJson_stg'));
        let packageJsonFile = generatePackageJson.render("packageJson", [packageData]);
        fs.writeFile(generationPath + `/package.json`, packageJsonFile, function (err) {
            if (err) throw err;
            console.log('package.json file generated');
        })

    }


    generateTsconfigFile(generationPath, templatePath) {
        const apiGatewayTemplatePath = path.resolve(__dirname, templatePath);
        let generateTsConfig = st.loadGroup(require(apiGatewayTemplatePath + '/tsconfig_stg'));
        let tsConfigFile = generateTsConfig.render("tsconfig");
        fs.writeFile(generationPath + `/tsconfig.json`, tsConfigFile, function (err) {
            if (err) throw err;
            console.log('ts config file generated');
        })

    }
}