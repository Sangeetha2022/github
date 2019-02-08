import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";
import { FeedSeedData } from './seed';
import * as cors from 'cors';

const PORT = 3001;

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://127.0.0.1/GeppettoDev';

    constructor() {
        this.config();
        this.mongoSetup();
        this.mongoSeedData();
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

    private mongoSeedData(): void {
        let seedData = new FeedSeedData()
        seedData.seedFlowData();
        seedData.seedFlowComponentData();
        seedData.seedGenFlowComponentData();
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})