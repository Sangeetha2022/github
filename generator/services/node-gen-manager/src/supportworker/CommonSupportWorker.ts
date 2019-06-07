import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as st from 'stringtemplate-js';

export class CommonSupportWorker {



    generateCommonFile(generationPath, templatePath, daoData, callback) {
        // const daoPath = path.join(__dirname, `${generationPath}/src/dao`)
        const daoPath = `${generationPath}/src/dao`;
        const daoTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(daoPath);
        let generateCommon = st.loadGroup(require(daoTemplatePath + '/dao_stg'));
        let daoFile = generateCommon.render("dao", [daoData]);
        fs.writeFile(daoPath + `/${daoData.entityFileName.trim()}Common.ts`, daoFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('file generated');
        })

    }


  async generateServerFile(generationPath, templatePath, serverData, callback) {
      console.log('#####server file are ----- ', util.inspect(serverData, { showHidden: true, depth: null }));
        // const serverPath = path.join(__dirname, `${generationPath}/src`)
        const serverPath = `${generationPath}/src`;
        const serverTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(serverPath);
        let generateServer = st.loadGroup(require(serverTemplatePath + '/server_stg'));
        let serverFile = generateServer.render("server", [serverData]);
       await fs.writeFile(serverPath + `/server.ts`, serverFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('file generated');
        })

    }

    async generatePackageJsonFile(generationPath, templatePath, packageJsonData, callback) {
        console.log('@@@@@@g generat -----  ', packageJsonData);
        // const packagePath = path.join(__dirname, `${generationPath}`)
        const packagePath = `${generationPath}`;
        const packageTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(packagePath);
        let generatePackage = st.loadGroup(require(packageTemplatePath + '/packageJson_stg'));
        let packageFile = generatePackage.render("packageJson", [packageJsonData]);
       await fs.writeFile(packagePath + `/package.json`, packageFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('file generated');
        })

    }

    async generateTsConfigFile(generationPath, templatePath, callback) {
        // const tsConfigPath = path.join(__dirname, `${generationPath}`)
        const tsConfigPath = `${generationPath}`;
        const tsConfigTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(tsConfigPath);
        let generateTsConfig = st.loadGroup(require(tsConfigTemplatePath + '/tsconfig_stg'));
        let tsConfigFile = generateTsConfig.render("tsconfig", []);
       await fs.writeFile(tsConfigPath + `/tsconfig.json`, tsConfigFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('file generated');
        })

    }



    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };

}