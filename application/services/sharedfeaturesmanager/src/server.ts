import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/Routes';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { WinstonLogger } from './config/WinstonLogger';
import { CustomLogger } from './config/Logger';
import { FeedSeedData } from './seed';

const PORT = 3017;

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = process.env.mongoUrl;
    // public mongoUrl: string = 'mongodb://admin:password@127.0.0.1:27017/GeppettoStage?authSource=admin';

    constructor() { 
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.mongoSetup();
        this.mongoSeedData();
        this.routePrv.routes(this.app);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private mongoSetup(): void {
        // mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(res => { console.log('mongodb connected') })
            .catch(err => { console.log('mongo error in connection:', err) });
    }

    private mongoSeedData(): void {
        new CustomLogger().showLogger('info', 'data to store the mongo feature')
        let feedData = new FeedSeedData();
        feedData.featuresDatas();
    }


}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})


