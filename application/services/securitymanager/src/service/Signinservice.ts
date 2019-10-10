import { Request, response } from 'express';
import { SigninDao } from '../daos/SigninDao';
import { resolve } from 'path';
const logger = require('../config/Logger');
import * as asyncLoop from 'node-async-loop';
import * as jwt from 'jsonwebtoken';



let jwtDecode = require('jwt-decode');
let signindao = new SigninDao();

export class Signinservice {
    roleId: any;
    roleName: any;

    public signupservice(req: Request, callback) {
        console.log('requst----->', req.body);
        const users = req.body;
        signindao.signindao(users, (response) => {
            callback(response);
        });
    }

    public loginservice(req: Request, callback) {
        // logger.info('Signinservice.ts : loginservice');
        const logindetails = req.body;
        // console.log('------------loginrequest----', logindetails);
        signindao.logindao(logindetails, (response) => {
            callback(response)
        });
    }

    public logoutservice(req: Request, callback) {
        const user = req.body.id;
        signindao.logoutdao(user, (response) => {
            callback(response);
        })
    }

    public googleservice(req: Request, callback) {
        const googleData = req.body;
        signindao.googledao(googleData, async (response) => {
            if(response.length === 0) {
                await this.socialLoginSetRole();
                const token = jwtDecode(googleData.idtoken);
                const googleUserObject = {
                    'firstname': token.given_name,
                    'lastname': token.family_name,
                    'username': token.email,
                    'email': token.email,
                    'role': this.roleId,
                    'signintype': googleData.provider
                };
                const saveGoogle = await this.saveSocialSignIn(googleUserObject);
                callback(saveGoogle);
            }
            if(response.length !== 0){
                const updateResponse = await this.updateGoogle(response);
                callback(updateResponse);
            }
        })
    }
    public fbLogIn(req: Request , callback) {
        const fbUser = req.body
        signindao.fbLogIn(fbUser ,async (response) => {
            console.log('fbuser--service-->', response)
            if(response.length === 0) {
               await this.socialLoginSetRole();
                const fbUserObj = {
                    username:fbUser.name,
                    firstname:fbUser.name,
                    lastname:fbUser.name,
                    email:fbUser.email,
                    fbId:fbUser.fbId,
                    signintype:fbUser.provider,
                    role: this.roleId
                }
                const saveFacaBook = await this.saveSocialSignIn(fbUserObj);
                callback(saveFacaBook);
            }
            if(response.length !== 0) {
                const updateFb = await this.updateFbLogin(response);
                callback(updateFb);
            }
        })
        
    }

    public saveSocialSignIn(socialSave){
        return new Promise(resolve => {
            signindao.saveSocialSignIn(socialSave, (socialResponse) => {
                const createToken = {
                    username: socialResponse.username,
                    firstname: socialResponse.firstname,
                    lastname: socialResponse.lastname,
                    email: socialResponse.email,
                    id: socialResponse._id,
                    role: this.roleName
                }
                signindao.generateIdToken(createToken , (tokenResponse) => {
                    resolve(tokenResponse);
                })
            })

        })
    }

    public updateGoogle(updateGoogleData) {
        return new Promise (resolve => {
            signindao.updateGoogleSignIn(updateGoogleData , (res) => {
                resolve(res)
            })
        })

    }

    public updateFbLogin(fbResponse){
        return new Promise(resolve => {
            signindao.updateFbLogin(fbResponse , (updateFb) => {
                resolve(updateFb);
            })
        })

    }

    public socialLoginSetRole() {
        return new Promise (resolve => {
            signindao.socialLoginSetRole((response) => {
                asyncLoop(response, (setRole , next) => {
                    if(setRole.role === 'Standarduser'){
                        this.roleId = setRole._id;
                        this.roleName = setRole.role ;
                    }
                    next()
                }), ((err) => {
                    resolve(err);
                })
                resolve();
            })

        })

    }


    public getalluserservice(req: Request, callback) {
        signindao.getalluserdao((response) => {
            callback(response);
        })
    }

    public getbyiduserservice(req: Request, callback) {
        console.log('-------paramsid------', req.params.id);
        const userId = req.params.id;
        signindao.getbyiduserdao(userId, (response) => {
            callback(response);
        })
    }

    public getrolesservice(req: Request, callback) {

        signindao.getrolesdao((response) => {
            callback(response);
        })
    }

    public updateuserservice(req: Request, callback) {
        const userdetails = req.body;

        signindao.updateuserdao(userdetails, (response) => {
            callback(response);
        })
    }
}