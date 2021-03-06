import * as dotenv from "dotenv";
dotenv.config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { Routes } from './routes/routes';
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { SharedService } from "./config/Sharedservice";
                   
const PORT = 3010;

export class App {

    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public apiUrl : SharedService = new SharedService();

    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.routerPrv.routes(this.app);

    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
