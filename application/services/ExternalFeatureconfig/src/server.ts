import * as dotenv from "dotenv";
dotenv.config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/Routes';
import * as mongoose from 'mongoose';
import { MongoConfig } from './config/MongoConfig';
import * as cors from 'cors';
import { WinstonLogger } from './config/WinstonLogger';
import { SharedService } from './config/Sharedservice';

const PORT = 3016;

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = process.env.mongoUrl;
    public apiUrl: SharedService = new SharedService();

    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private mongoSetup(): void {
        switch (process.env.localname) {
            case process.env.name: mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(res => { console.log('mongodb connected') })
                .catch(err => { console.log('mongo error in connection:', err) });

                break;

            default: let mConfig = new MongoConfig();
                mConfig.mongoConfig();
                break;
        }
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})


