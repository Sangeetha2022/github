import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import * as mongoose from 'mongoose';
import { MongoConfig } from './config/MongoConfig';
import * as cors from 'cors';
import * as expressWinston from 'express-winston';
const winston = require('winston');
require('winston-daily-rotate-file')

const PORT = 5004;
const logDir = 'log';

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://127.0.0.1/GeppettoDev';

    constructor() {
        this.config();
        this.mongoSetup();
        // this.mongoSeedData();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));

        // Enable CORS
        this.app.use(cors({ credentials: true, origin: true }))

        // logger configuration
        this.app.use(expressWinston.logger({
            format: winston.format.combine(
                winston.format.label({ label: 'gep-dev-node-api' }),
                winston.format.colorize(),
                winston.format.json()

            ),
            transports: [
                new winston.transports.Console(),
                new (winston.transports.DailyRotateFile)({
                    level: 'info',
                    dirname: logDir,
                    filename: logDir + 'api-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    prepend: true,
                    json: true,
                    colorize: false,
                }),
            ],
            statusLevels: false, // default value
            level: function (req, res) {
                var level = '';
                if (res.statusCode >= 100) {
                    level = 'info';
                }
                if (res.statusCode >= 400) {
                    level = 'warn';
                }
                if (res.statusCode >= 500) {
                    level = 'error';
                }
                return level;
            },
            exitOnError: false
        }))
        this.app.use(expressWinston.errorLogger({
            format: winston.format.combine(
                winston.format.label({ label: 'gep-dev-node-api' }),
                winston.format.colorize(),
                winston.format.json()
            ),

            transports: [
                new winston.transports.Console(),
                new (winston.transports.DailyRotateFile)({
                    level: 'info',
                    dirname: logDir,
                    filename: logDir + '/error/api-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    prepend: true,
                    json: true,
                    colorize: false,
                }),
            ],
            statusLevels: false, // default value
            level: function (req, res) {
                var level = '';
                if (res.statusCode >= 100) {
                    level = 'info';
                }
                if (res.statusCode >= 400) {
                    level = 'warn';
                }
                if (res.statusCode >= 500) {
                    level = 'error';
                }
                return level;
            },
            exitOnError: false,
        }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        // let mongoConfig = new MongoConfig();
        // mongoConfig.mongoConfig();
    }

    // private mongoSeedData(): void {
    //     let seedData = new FeedSeedData();
    //     seedData.EntityTypeData();
    // }
}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})