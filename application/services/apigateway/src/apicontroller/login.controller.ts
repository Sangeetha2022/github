import * as express from 'express';
import { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import { Constants } from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';
import { constants } from 'crypto';

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
        this.router.route('/fblogin').post(this.fbLogIn)
        this.router.route('/getallusers').get(this.Getallusers);
        this.router.route('/getuser/:id').get(this.Getuserbyid);
        this.router.route('/getallroles').get(this.Getallroles);
        this.router.route('/updateuser').put(this.Updateuser);
        this.router.route('/getConfigurations').get(this.getConfigurations);
        this.router.route('/addConfigurations').post(this.AddConfiguration);
    }

    public async signup(req: Request, res: Response) {

        console.log('----ccominghere----');
        try {
            let user = await Promise.resolve(new ApiAdapter().post(`${Constants.loginUrl}/signup`, req.body));
            // @ts-ignore
            const Userdetails = user;
            // @ts-ignore
            if (Userdetails.body.Idtoken === null || Userdetails.body.Idtoken === '' || Userdetails.body.Idtoken === undefined) {
                // console.log('----------insideifcondition------>>>>', Userdetails);
                var loginresponse = {
                    "Userdetails": Userdetails
                }
                res.send(loginresponse);
            }
        } catch (err) {
            res.send(err);
        }
    }

    public async Getallusers(req: Request, res: Response) {
        try {
            let user = await Promise.resolve(new ApiAdapter().get(`${Constants.loginUrl}/getallusers`));
            const usersdetails = user;
            res.send(usersdetails);
        } catch (err) {
            res.send(err);
        }
    }

    public async Getallroles(req: Request, res: Response) {
        try {
            let role = await Promise.resolve(new ApiAdapter().get(`${Constants.loginUrl}/getallroles`));
            res.send(role);
        } catch (err) {
            res.send(err);
        }
    }

    public async Getuserbyid(req: Request, res: Response) {
        try {
            let user = await Promise.resolve(new ApiAdapter().get(`${Constants.loginUrl}/getuser/${req.params.id}`));
            res.send(user);
        } catch (err) {
            res.send(err);
        }

    }


    public async login(req: Request, res: Response) {
        // logger.info('login.controller.ts : login');
        // logger.info('calling the securitymanager microservice');

        try {
            let user = await Promise.resolve(new ApiAdapter().post(`${Constants.loginUrl}/login`, req.body));
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
        } catch (err) {
            res.send(err);
        }
    }

    public Consent(req: Request, res: Response) {
        // logger.info('login.controller.ts : Consent');
        new ApiAdapter().put(`${Constants.loginUrl}/consent`, req.body).then((consentresponse) => {
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

    public async Logout(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdapter().post(`${Constants.loginUrl}/logout`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }

    public async AddConfiguration(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdapter().post(`${Constants.loginUrl}/addConfigurations`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }

    public async getConfigurations(req: Request, res: Response) {
        try {
            let user = await Promise.resolve(new ApiAdapter().get(`${Constants.loginUrl}/getConfigurations`));
            res.send(user);
        } catch (err) {
            res.send(err);
        }

    }

    public async googlelogin(req: Request, res: Response) {

        try {
            let googleuser = await Promise.resolve(new ApiAdapter().post(`${Constants.loginUrl}/googlesignin`, req.body));
            const Userdetails = googleuser;
            // @ts-ignore
            var token = Userdetails.body.Idtoken;
            if (token === null || token === '' || token === undefined) {
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
            }
        } catch (err) {
            res.send(err);
        }
    }
    public async fbLogIn(req: Request, res: Response) {

        try {
            let fbResponse = await Promise.resolve(new ApiAdapter().post(`${Constants.loginUrl}/fblogin`, req.body));
            const Userdetails = fbResponse;
            // @ts-ignore
            var token = Userdetails.body.Idtoken;
            if (token === null || token === '' || token === undefined) {
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
                        res.send({ 'status': 'Unauthorized', 'error': err, 'Userdetails': fbResponse });
                    } else {
                        var url = `${Constants.proxyUrl}/proxy`
                        request.post({ url: url, json: decoded }, (error, response, body) => {
                            var loginresponse = {
                                "Access": body,
                                "Userdetails": fbResponse
                            }
                            console.log('-----------body--------->>>', loginresponse);
                            res.send(loginresponse);
                        })
                    }
                })
            }
        } catch (err) {
            res.send(err);
        }
    }

    public async Updateuser(req: Request, res: Response) {
        try {
            let updateduser = await Promise.resolve(new ApiAdapter().put(`${Constants.loginUrl}/updateuser`, req.body));
            const Updateduser = updateduser;
            res.send(Updateduser);
        } catch (err) {
            res.send(err);
        }
    }
}