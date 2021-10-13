import * as express from 'express';
import { Routes } from './routes/routes';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import * as dotenv from 'dotenv';


class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    dotenv: any;

    constructor() { 
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        dotenv.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }
     
    private mongoSetup(): void {
        // mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/Vault', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>{ console.log('mongodb connected') })
            .catch(err => { console.log('mongo error in connection:', err) });
    }

}

new App().app.listen(process.env.SCM_PORT, () => {
    console.log('Express server listening on port  ' + process.env.SCM_PORT);
})


