import { CommonSupportWorker } from "../supportworker/CommonSupportWorker";

let commonSupportWorker = new CommonSupportWorker();
export class CommonWorker {
    private tempServer = {
        GpStart: {
            dependencies: []
        },
        dbConnectionUrl: '',
        port: 0
    }

    createServerFile(projectGenerationPath, templateLocationPath, projectName, port) {
        this.tempServer = {
            GpStart: {
                dependencies: []
            },
            dbConnectionUrl: '',
            port: 0
        }
        this.gpStart();
        this.gpConnection(projectName, port);
        console.log('!!!!!!!!!!! create server file in services ar e-----  ', this.tempServer);
        this.generateServerFile(projectGenerationPath, templateLocationPath);
    }

    generateServerFile(projectGenerationPath, templateLocationPath) {
        commonSupportWorker.generateServerFile(projectGenerationPath, templateLocationPath, this.tempServer, (response) => { })
    }

    generatePackageJsonFile(projectGenerationPath, templateLocationPath, featureName) {
        const temp = {
            name: featureName,
            description: `${featureName} Node Microservice`
        }
        commonSupportWorker.generatePackageJsonFile(projectGenerationPath, templateLocationPath, temp, (response) => { })
    }

    generateTsConfigFile(projectGenerationPath, templateLocationPath) {

        commonSupportWorker.generateTsConfigFile(projectGenerationPath, templateLocationPath, (response) => { })
    }

    gpStart() {
        this.tempServer.GpStart.dependencies.push({ 'name': '* as express', 'path': 'express' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as bodyParser', 'path': 'body-parser' });
        this.tempServer.GpStart.dependencies.push({ 'name': '{ Routes }', 'path': './routes/Routes' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as mongoose', 'path': 'mongoose' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as cors', 'path': 'cors' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as expressWinston', 'path': 'express-winston' });
    }

    gpConnection(projectName, port) {
        this.tempServer.dbConnectionUrl = `mongodb://127.0.0.1/${projectName}`;
        this.tempServer.port = port;
    }


}