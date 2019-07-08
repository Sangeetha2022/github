import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { Routes } from './routes/routes';
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { MongoConfig } from './config/MongoConfig';


const PORT = 5018;

class App {

    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = 'mongodb://127.0.0.1/GeppettoDev';
    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.routerPrv.routes(this.app);
        this.mongoSetup();
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
    }


}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
