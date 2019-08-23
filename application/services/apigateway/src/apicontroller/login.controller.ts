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
        this.router.route('/googlesignin').post(this.googlelogin);
        this.router.route('/getallusers').get(this.Getallusers);
        this.router.route('/getuser/:id').get(this.Getuserbyid);
        this.router.route('/getallroles').get(this.Getallroles);
        this.router.route('/updateuser').put(this.Updateuser);
    }

    public signup(req: Request, res: Response) {
        console.log('----ccominghere----');
        new ApiAdaptar().post(`${Constants.loginUrl}/signup`, req.body).then((response) => {
            // @ts-ignore
            const Userdetails = response;
            // @ts-ignore
            if (Userdetails.body.Idtoken === null || Userdetails.body.Idtoken === '' || Userdetails.body.Idtoken === undefined) {
                // console.log('----------insideifcondition------>>>>', Userdetails);
                var loginresponse = {
                    "Userdetails": Userdetails
                }
                res.send(loginresponse);
            }
        }).catch(err => {
            res.send(err);
        })
    }

    public Getallusers(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.loginUrl}/getallusers`).then((userlist) => {
            const usersdetails = userlist;
            res.send(usersdetails);
        }).catch(err => {
            res.send(err);
        })
    }

    public Getallroles(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.loginUrl}/getallroles`).then((roles) => {
            res.send(roles);
        }).catch(err => {
            res.send(err);
        })
    }

    public Getuserbyid(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.loginUrl}/getuser/${req.params.id}`).then((user) => {
            res.send(user);
        }).catch(err => {
            res.send(err);
        });
    }

    public login(req: Request, res: Response) {
        // logger.info('login.controller.ts : login');
        // logger.info('calling the securitymanager microservice');
        new ApiAdaptar().post(`${Constants.loginUrl}/login`, req.body).then((user) => {
            // @ts-ignore
            const Userdetails = user;
            // @ts-ignore
            if (Userdetails.body.Idtoken === null || Userdetails.body.Idtoken === '' || Userdetails.body.Idtoken === undefined) {
                console.log('----------insideifcondition------>>>>', Userdetails);
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
        // logger.info('login.controller.ts : Consent');
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
                    // logger.info('calling the Auth-proxy microservice');
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

    public googlelogin(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.loginUrl}/googlesignin`, req.body).then((googleuser) => {
            const Userdetails = googleuser;
            // @ts-ignore
            var token = Userdetails.body.Idtoken;
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    // res.status(401);
                    console.log('-----------err--->>>', err);
                    res.send({ 'status': 'Unauthorized', 'error': err, 'Userdetails': googleuser });
                } else {
                    var url = `${Constants.proxyUrl}/proxy`
                    request.post({ url: url, json: decoded }, (error, response, body) => {
                        var loginresponse = {
                            "Access": body,
                            "Userdetails": googleuser
                        }
                        console.log('-----------body--------->>>', loginresponse);
                        res.send(loginresponse);
                    })
                }
            })

        });
    }

    public Updateuser(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.loginUrl}/updateuser`, req.body).then((updateduser) => {
            console.log('--------updateuser-----', updateduser);
            const Updateduser = updateduser;
            res.send(Updateduser);
        }).catch(err => {
            res.send(err);
        })
    }
}