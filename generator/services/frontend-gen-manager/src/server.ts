import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { Routes } from './routes/routes';
import * as cors from 'cors';
import { WinstonLogger } from './config/WinstonLogger';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';


const PORT = 5013;

export class App {

    public app: express.Application = express();
    public server: Server;
    public io: socketIo.Server;

    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();


    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.createServer();
        this.sockets();
        this.listen();
        this.routePrv.routes(this.app, this.io);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }



    private createServer(): void {
        this.server = createServer(this.app);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    public listen(): void {

        this.io.on('connect', (socket: any) => {
            console.log('Client Connected!');
            //this.routePrv.socketIO(socket)

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }


}

new App().server.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})


