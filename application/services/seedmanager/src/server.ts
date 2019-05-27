import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { seedData } from './seed';
import { MongoConfig } from './config/MongoConfig'
import { WinstonLogger } from './config/WinstonLogger';
import * as mongoose from 'mongoose';

const PORT = 3011;

class App {

    public app: express.Application = express();
    public logger: WinstonLogger = new WinstonLogger();
    

    constructor() { 
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.mongoSetup();
        this.mongoSeedData();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        // let mConfig = new MongoConfig();
        // mConfig.mongoConfig();
    }

    private mongoSeedData(): void {
        let seeds = new seedData();
        seeds.flows();
        seeds.flowComponents();
        seeds.microFlow();
        seeds.connectors();
        // seeds.flowComponent();
        // seedData.seedFlowData();
        // seedData.seedFlowComponentData();
        // seedData.seedConnectorData();
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})