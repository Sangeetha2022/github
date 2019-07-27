server_file(object) ::= <<
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes'
import mongoose = require('mongoose');
$if(object.isSeed)$import { SeedService } from './seed';$endif$
$if(object.isDmnFile)$import { DmnFile } from './dmnDeploye/dmnFile';$endif$
const PORT = $object.port$;

class App {
    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = 'mongodb://$object.projectName$-app-db.$object.projectName$.svc.cluster.local:27017/$object.databaseName$';

    constructor() {
        this.config();
        this.routerPrv.routes(this.app);
        this.mongoSetup();
        $if(object.isSeed)$this.mongoSeedData();$endif$
        $if(object.isDmnFile)$this.DeployDMNfile();$endif$
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static("public"));
        this.app.use(cors({ credentials: true, origin: true }));

    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

$if(object.isSeed)$
    private mongoSeedData(): void {
        let seedData = new SeedService();
        seedData.create();
    }
$endif$

$if(object.isDmnFile)$
    private DeployDMNfile(): void {
        let dmnfile = new DmnFile();
        dmnfile.dmnFileDeploye();
    }
$endif$

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})
>>