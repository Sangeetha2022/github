import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import * as mongoose from 'mongoose';
import { MongoConfig } from './config/MongoConfig';
import * as cors from 'cors';
import * as expressWinston from 'express-winston';
import { WinstonLogger } from './config/WinstonLogger';
const winston = require('winston');
require('winston-daily-rotate-file')

const PORT = 3013;
const logDir = 'log';

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = 'mongodb://127.0.0.1/GeppettoDev';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));

        // Enable CORS
        this.app.use(cors({ credentials: true, origin: true }))

        // logger configuration
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        // let mongoConfig = new MongoConfig();
        // mongoConfig.mongoConfig();
    }

  
}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})