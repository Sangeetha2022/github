apigatewayserver(object) ::= <<
$if(object.import)$$object.import:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
$if(object.classNames)$import {
    $object.classNames:{classes | $classes.className$Controller};separator=",\n"$
    } from './apicontroller';$endif$

$if(object.serverPort)$const PORT = $object.serverPort$$endif$
$if(object.classNames)$let apisController = [ 
    $object.classNames:{classes | new $classes.className$Controller()};separator=",\n"$
    ]$endif$
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
            this.app.use('/web', controller.router);
        });
    }

}

new App(apisController).app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})

>>