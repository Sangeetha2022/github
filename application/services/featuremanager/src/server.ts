import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as cors from 'cors';
import { MongoConfig } from './config/MongoConfig'
import { WinstonLogger } from './config/WinstonLogger';
// import { FeedSeedData } from './seed';
import * as mongoose from "mongoose";

const PORT = 3006;

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    
    public mongoUrl: string = 'mongodb://127.0.0.1/GeppettoDev';

    constructor() { 
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.mongoSetup();
        // this.mongoSeedData();
        this.routePrv.routes(this.app);
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

    // private mongoSeedData(): void {
    //     let seedData = new FeedSeedData()
    //     seedData.seedFeatureData();
    // }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})