import * as express from 'express';
import { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';

export class Logincontroller implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();

    }

    public initializeRoutes() {

        this.router.route('/signup').post(this.signup);
        this.router.route('/login').post(this.login);
        this.router.route('/consent').put(this.Consent);
        this.router.route('/logout').post(this.Logout);
    }

    public signup(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.loginUrl}/signup`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        })
    }


    public login(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.loginUrl}/login`, req.body).then((response) => {
            // @ts-ignore
            var token = response.Idtoken;
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    res.send(err);
                }
                var url = 'http://localhost:3011/proxy';
                request.post({ url: url, json: decoded }, (error, response, body) => {
                    var loginresponse = {
                        "Access":body,
                        "Userdetails":decoded
                    }
                    res.send(loginresponse);
                })
            })
        }).catch(err => {
            res.send(err);
        });
    }

    public Consent(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.loginUrl}/consent`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    public Logout(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.loginUrl}/logout`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}