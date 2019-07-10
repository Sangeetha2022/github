import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class CommonSupportWorker {



    generateCommonFile(generationPath, templatePath, daoData, callback) {
        const daoPath = `${generationPath}/src/dao`;
        const daoTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(daoPath);
        let generateCommon = st.loadGroup(require(daoTemplatePath + '/dao_stg'));
        let daoFile = generateCommon.render("dao", [daoData]);
        fs.writeFile(daoPath + `/${daoData.entityFileName.trim()}Common.ts`, daoFile, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }

    generateDockerFile(generationPath, templatePath, featureName, callback) {
         templatePath = path.resolve(__dirname, templatePath);
        let renderTemplate = st.loadGroup(require(templatePath + '/docker_file_stg'));
        let fileData = renderTemplate.render("docker_file", [featureName]);
        fs.writeFile(generationPath + `/Dockerfile.ts`, fileData, function (err) {
            if (err) throw err;
            callback('file generated');
        })
    }


  async generateServerFile(generationPath, templatePath, serverData, callback) {
        const serverPath = `${generationPath}/src`;
        const serverTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(serverPath);
        let generateServer = st.loadGroup(require(serverTemplatePath + '/server_stg'));
        let serverFile = generateServer.render("server", [serverData]);
       await fs.writeFile(serverPath + `/server.ts`, serverFile, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }

    async generatePackageJsonFile(generationPath, templatePath, packageJsonData, callback) {
        const packagePath = `${generationPath}`;
        const packageTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(packagePath);
        let generatePackage = st.loadGroup(require(packageTemplatePath + '/packageJson_stg'));
        let packageFile = generatePackage.render("packageJson", [packageJsonData]);
       await fs.writeFile(packagePath + `/package.json`, packageFile, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }

    async generateTsConfigFile(generationPath, templatePath, callback) {
        const tsConfigPath = `${generationPath}`;
        const tsConfigTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(tsConfigPath);
        let generateTsConfig = st.loadGroup(require(tsConfigTemplatePath + '/tsconfig_stg'));
        let tsConfigFile = generateTsConfig.render("tsconfig", []);
       await fs.writeFile(tsConfigPath + `/tsconfig.json`, tsConfigFile, function (err) {
            if (err) throw err;
           callback('file generated');
        })

    }

    generateWinstonLoggerFile(generationPath, templatePath) {
        const configPath = `${generationPath}/src/config`;
        const winstonTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(configPath);
        let generateWinstonLogger = st.loadGroup(require(winstonTemplatePath + '/winston_stg'));
        let winstonLoggerFile = generateWinstonLogger.render("winston");
        fs.writeFile(configPath + `/WinstonLogger.ts`, winstonLoggerFile, function (err) {
            if (err) throw err;
            console.log('winston logger files generated');
        })
    }
}