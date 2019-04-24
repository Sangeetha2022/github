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
        new ApiAdaptar().post(`${Constants.loginUrl}/login`, req.body).then((user) => {
            // @ts-ignore
            const Userdetails = user;
            // @ts-ignore
            if (Userdetails.body.Idtoken === null || Userdetails.body.Idtoken === '' || Userdetails.body.Idtoken === undefined) {
                // console.log('----------insideifcondition------>>>>', Userdetails);
                var loginresponse = {
                    "Userdetails": Userdetails
                }
                res.send(loginresponse);
            } else {
                // @ts-ignore
                var token = Userdetails.body.Idtoken;
                jwt.verify(token, 'geppettosecret', (err, decoded) => {
                    if (err) {
                        // res.status(401);
                        console.log('-----------err--->>>', err);
                        res.send({ 'status': 'Unauthorized', 'error': err, 'Userdetails': user });
                    } else {
                        var url = `${Constants.proxyUrl}/proxy`
                        request.post({ url: url, json: decoded }, (error, response, body) => {
                            var loginresponse = {
                                "Access": body,
                                "Userdetails": user
                            }
                            console.log('-----------body--------->>>', loginresponse);
                            res.send(loginresponse);
                        })
                    }
                })
            }
        }).catch(err => {
            res.send(err);
        });

    }

    public Consent(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.loginUrl}/consent`, req.body).then((consentresponse) => {
            // @ts-ignore
            var token = consentresponse.body.Idtoken;
            console.log('---------token---->>>', token);
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    // res.status(401);
                    console.log('---------hey an err--->>>', err);
                    // res.send({ 'status': 'Unauthorized', 'error': err,'Userdetails':user });
                } else {
                    var url = `${Constants.proxyUrl}/proxy`;
                    request.post({ url: url, json: decoded }, (error, response, body) => {
                        var loginresponse = {
                            "Access": body,
                            "Userdetails": consentresponse
                        }
                        res.send(loginresponse);
                    })
                }
            })
            // res.send(consentresponse);
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