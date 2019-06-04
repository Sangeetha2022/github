server(object) ::= <<
$if(object.import)$$object.import.dependencies:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$
const winston = require('winston');
require('winston-daily-rotate-file')

const PORT = $object.port$;
const logDir = 'log';

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();

    public mongoUrl: string = '$object.dbConnectionUrl$';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));

        // Enable CORS
        this.app.use(cors({ credentials: true, origin: true }))
}

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})



>>