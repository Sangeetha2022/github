import express from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes';
const request = require('request');
import { Request, Response, NextFunction } from 'express';
const cheerio = require('cheerio');


const PORT = 3007;

class App {

    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();

    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.routerPrv.routes(this.app);
        this.app.route('/home').get(this.homeroute)
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private homeroute(req: Request, res: Response, next: NextFunction): void {

        var url = 'http://127.0.0.1:4446';

        request({ url }, function (error, response, body) {
            if (error) {
                console.log('error:', error);
            } else if (response && body) {
                let url = [];
                const $ = cheerio.load(body)
                $('a').each(function () {
                    const test = $(this)[0];
                    const urlvalue = test.attribs;
                    url.push(urlvalue.href);
                })

                res.send(url);
            }
        })

    }
}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})