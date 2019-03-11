import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as cors from 'cors';
import { WinstonLogger } from './config/WinstonLogger';

const PORT = 5005;

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();

    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.routePrv.routes(this.app);
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