import * as cors from 'cors';
import * as express from "express";
import * as bodyParser from "body-parser";
import Controller from './interfaces/controller.interface';
import {
    ProjectController,
    FlowManagerController,
    EntityController,
    DefaultController,
    Logincontroller,
    Proxycontroller,
    Camundacontroller,
    FeatureController,
    CodeController,
    BackendController,
    MongoController,
    DataStoreController,
    NodeController,
    ConfigurationController

} from './apicontroller';

import { WinstonLogger } from './config/WinstonLogger';
import { createUserTemplateController } from './apicontroller/screenmanager.controllers';
import { MicroflowController } from './apicontroller/microflowmanager.controller';

const PORT = 3000;

let apisController = [
    new ProjectController(),
    new FlowManagerController(),
    new EntityController(),
    new DefaultController(),
    new Logincontroller(),
    new Proxycontroller(),
    new Camundacontroller(),
    new FeatureController(),
    new DataStoreController(),
    new createUserTemplateController(),
    new MicroflowController(),
    new CodeController(),
    new BackendController(),
    new MongoController(),
    new NodeController(),
    new ConfigurationController()

]

class App {

    public app: express.Application = express();
    public logger: WinstonLogger = new WinstonLogger();

    constructor(controllers: Controller[]) {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
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

}

new App(apisController).app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})