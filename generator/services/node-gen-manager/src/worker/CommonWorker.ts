export class CommonWorker {
    private tempServer = {
        GpStart: {
            dependencies: []
        },
        dbConnectionUrl: '',
        port: 0
    }

    createServerFile() {
        this.gpStart();
        this.gpConnection();
    }

    gpStart() {
        this.tempServer.GpStart.dependencies.push({ 'name': '* as express', 'path': 'express' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as bodyParser', 'path': 'body-parser' });
        this.tempServer.GpStart.dependencies.push({ 'name': '{ Routes }', 'path': './routes/routes' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as mongoose', 'path': 'mongoose' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as cors', 'path': 'cors' });
        this.tempServer.GpStart.dependencies.push({ 'name': '* as expressWinston', 'path': 'express-winston' });
    }

    gpConnection() {
        this.tempServer.dbConnectionUrl = 'mongodb://127.0.0.1/GeppettoDev';
        this.tempServer.port = 1000;
    }


}