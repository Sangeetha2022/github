import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import * as cors from 'cors';
import { WinstonLogger } from './config/WinstonLogger';

const PORT = 5014;
const logDir = 'log';

class App {

    public app: express.Application = express();
    public logger: WinstonLogger = new WinstonLogger();
    public routePrv: Routes = new Routes();

    constructor() {
        this.config();
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
}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})

