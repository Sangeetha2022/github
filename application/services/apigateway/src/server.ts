import * as fs from 'fs';
import * as cors from 'cors';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressWinston from 'express-winston';
import Controller from './interfaces/controller.interface';
import { ProjectController } from './apicontroller';

const winston = require('winston');
require('winston-daily-rotate-file');

const PORT = 3010;
const logDir = 'log';

class App {

    public app: express.Application = express();

    constructor(controllers: Controller[]) {
        this.setupLogger();
        this.configureWinston();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.route('/health/apigateway').get((req: express.Request, res: express.Response) => {
                res.status(200).send({
                    status: 'up'
                })
            })
            this.app.use('/mobile', controller.router);
            this.app.use('/desktop', controller.router);
        });
    }

    private setupLogger(): void {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
    }

    private configureWinston(): void {
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
            statusLevels: false,
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

}

let allApis = [
    new ProjectController()
]

new App(allApis).app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})