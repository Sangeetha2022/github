import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes';
import mongoose = require('mongoose');
import { cloneService } from './service/cloneService';
import { MongoConfig } from "./config/Mongoconfig";


const PORT = 3051;

class App {

    public app = express();
    public routerPrv: Routes = new Routes();
    public clone: cloneService = new cloneService();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = process.env.mongoUrl;


    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.routerPrv.routes(this.app);
        this.mongoSetup();
        // this.mongoSeedData();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true }); 
        // let mongoConfig = new MongoConfig();
        // mongoConfig.mongoConfig();
        // switch (process.env.localname) {
        //     case  process.env.name: mongoose.Promise = global.Promise;
        //                             mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        //         break;

        //     default:  let mConfig = new MongoConfig();
        //               mConfig.mongoConfig();
        //         break;
        // }
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})