import * as dotenv from 'dotenv';
dotenv.config();
import * as cors from 'cors';
import * as express from "express";
import * as bodyParser from "body-parser";
import Controller from './interfaces/controller.interface';
import { Constants } from "./config/Constants";

import 
{
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
    SefNodeController,
    ConfigurationController,
    MenubuilderController,
    MicroflowController,
    ScreenController,
    GenerationController,
    FrontendController,
    AngularController,
    GithubController,
    PrivateGithubController,
    Authgencontroller,
    AngularTemplateController,
    AdminController,
    TemplateController,
    customConnectors,
    DeleteManagerController,
    SharedController,
    CloneController,
    SwaggerController,
    ReactController,
    ExternalfeatureController,
    ModifierManagerController,
    DefaultServicesController,
    GepFileManagerController,
    ReactTemplateController,
    AngularControllerV12,
    AngularTemplateControllerV12,
    AngularControllerV13,
    AngularTemplateControllerV13,
    SharedFeaturesController,
    SharedFeaturesGenController,
    WizardController
} from './apicontroller';

import { WinstonLogger } from './config/WinstonLogger';

const PORT = 3000;

let apisController = 
[
    new ProjectController(),
    new FlowManagerController(),
    new EntityController(),
    new DefaultController(),
    new Logincontroller(),
    new Proxycontroller(),
    new Camundacontroller(),
    new FeatureController(),
    new DataStoreController(),
    new MicroflowController(),
    new CodeController(),
    new BackendController(),
    new FrontendController(),
    new MongoController(),
    new NodeController(),
    new SefNodeController(),
    new AngularController(),
    new AngularControllerV12(),
    new AngularControllerV13(),
    new ConfigurationController(),
    new MenubuilderController(),
    new ScreenController(),
    new GenerationController(),
    new GithubController(),
    new PrivateGithubController(),
    new Authgencontroller(),
    new AngularTemplateController(),
    new AngularTemplateControllerV12(),
    new AngularTemplateControllerV13(),
    new AdminController(),
    new TemplateController(),
    new customConnectors(),
    new DeleteManagerController(),
    new SharedController(),
    new CloneController(),
    new SwaggerController(),
    new ReactController(),
    new ReactTemplateController(),
    new ExternalfeatureController(),
    new ModifierManagerController(),
    new DefaultServicesController(),
    new GepFileManagerController(),
    new SharedFeaturesController(),
    new SharedFeaturesGenController(),
    new WizardController()
]

class App 
{
    public app: express.Application = express();
    public logger: WinstonLogger = new WinstonLogger();
    public apiUrl : Constants = new Constants();

    constructor(controllers: Controller[]) 
    {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() 
    {
        // this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private initializeControllers(controllers: Controller[]) 
    {
        controllers.forEach((controller) => 
        {
            this.app.route('/health/apigateway').get((req: express.Request, res: express.Response) => 
            {
                res.status(200).send
                ({
                    status: 'up'
                })
            })
            this.app.use('/mobile', controller.router);
            this.app.use('/desktop', controller.router);
        });
    }
}

new App(apisController).app.listen(PORT, () => 
{
    console.log('Express server listening on port ' + PORT);
})