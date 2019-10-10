import mongoose = require('mongoose');
import { Userschema } from '../models/User';
import { Roleschema } from '../models/Role';
import * as jwt from 'jsonwebtoken';
import * as asyncLoop from 'node-async-loop';
import { resolve } from 'dns';
var jwtDecode = require('jwt-decode');
const logger = require('../config/Logger');

const signinmodel = mongoose.model('User', Userschema);
const rolemodel = mongoose.model('role', Roleschema);
export class SigninDao {

    private userrole: any;
    private rolevalue: any;
    private signuprole: any;
    private userDetails: any;
    private mailboolean: boolean;
    equalToEmail: any;
    public signindao(userData, callback) {
        rolemodel.find().then(result => {
            asyncLoop(result, (roles, next) => {
                if (roles.role === 'Standarduser') {
                    this.signuprole = roles._id;
                    console.log('signuprole---->', this.signuprole)
                }
                next();
            }, (err) => {
                if (err) {
                    console.log('----------erro----', err);
                }
            })

            this.userDetails = {
                'firstname': userData.firstname,
                'lastname': userData.lastname,
                'password': userData.password,
                'email': userData.email,
                'username': userData.email,
                'role': this.signuprole,
                'Idtoken': '',
                'installrToken': userData.installrToken
            };
            console.log('userdetails---->', this.userDetails)
            signinmodel.find().then(data => {
                console.log('----------------data-------->>>', data.length);
                if (data.length !== 0) {
                    asyncLoop(data, (users, next) => {
                        if (users.email === this.userDetails.email) {
                            this.mailboolean = true;
                        } else {
                            this.mailboolean = false;
                        }
                        next();
                    }, (error) => {
                        if (error) {
                            console.log('----------erro----', error);
                        }
                    });
                    if (this.mailboolean === true) {
                        var mailresponse = 'Email is already exists';
                        callback(mailresponse);
                    } else {
                        let logincreds = new signinmodel(this.userDetails);
                        logincreds.save().then((result) => {
                            callback(result);
                        }).catch((error) => {
                            callback(error);
                        })
                    }
                } else {
                    let logincreds = new signinmodel(this.userDetails);
                    logincreds.save().then((result) => {
                        callback(result);
                    }).catch((error) => {
                        callback(error);
                    })
                }
            });

        })

    }

    public logindao(logindetails, callback) {
        // logger.info('SigninDao.ts : logindao');
        // logger.info('response send to apigateway');
        signinmodel.findOneAndUpdate({ email: logindetails.email, password: logindetails.password }, { $set: { loggedinDate: new Date() } }, function (err, response) {
            if (err) {
                callback(err);
            }
            if (response === null) {
                response = 'Incorrect Username or Password';
                callback(response);
            } else {
                callback(response);
            }
        })
    }

    public logoutdao(userid, callback) {

        signinmodel.findByIdAndUpdate(userid, { $set: { loggedoutDate: new Date() } }, function (err, result) {
            if (err) {
                callback(err);
            }
            callback(result);
        })
    }

    public googledao(googledata, callback) {
        let token = jwtDecode(googledata.idtoken);
        signinmodel.find({ email: token.email }).then((err, findResult) => {
            console.log('result--->>', findResult)
            if (err) {
                callback(err);
            } else {
                callback(findResult);
            }
        })
    }
    public fbLogIn(fbUser, callback) {
        console.log('fbUSer--ahha--->>', fbUser);
        signinmodel.find({$or:[{email:{$in:[fbUser.email]}},{fbId:{$in:[fbUser.fbId]}}]}).then(result => {
            callback(result)
        })
    }

    public saveSocialSignIn(socialResponse, callback) {
        let googlelogin = new signinmodel(socialResponse);
        googlelogin.save().then((err ,result) => {
            if(err) {
                callback(err)
            }else{
                callback(result);

            }
        })
    }

    public updateGoogleSignIn(updateGoogle, callback) {
        signinmodel.findOneAndUpdate({ email:updateGoogle[0].email }, updateGoogle, { new: true }, (err, updateResult) => {
            if (err) {
                callback(err);
            } else {
                callback(updateResult);
            }
        });

    }

    public updateFbLogin(fbUpdate , callback){
        signinmodel.findOneAndUpdate({fbId:fbUpdate[0].fbId},fbUpdate , {new: true}, (err , fbUpdateRes) => {
            callback(fbUpdateRes);
        } )
    }

    public socialLoginSetRole(callback) {
        rolemodel.find().then(result => {
            callback(result)
        })
    }

    public generateIdToken(tokenData , callback) {
        const idtoken = jwt.sign(tokenData, 'geppettosecret', {
            expiresIn: 86400
        });
        signinmodel.findByIdAndUpdate(tokenData.id, { $set: { Idtoken: idtoken } }, function (err, response) {
            if (err) {
                callback(err);
            }
            response.Idtoken = idtoken;
            callback(response);
        });

    }

    public getalluserdao(callback) {
        signinmodel.find().populate({
            path: 'role', model: rolemodel
        }).then(result => {
            callback(result);
        }).catch((error => {
            callback(error);
        }))
    }

    public getbyiduserdao(userId, callback) {
        signinmodel.findById(userId).populate({
            path: 'role', model: rolemodel
        }).then(result => {
            callback(result);
        }).catch((error => {
            callback(error);
        }))
    }

    public getrolesdao(callback) {
        rolemodel.find().then(result => {
            callback(result);
        }).catch((error) => {
            callback(error);
        })
    }

    public updateuserdao(updateuser, callback) {

        console.log('------updateuserindaoe-----', updateuser);

        var payload = {
            username: updateuser.email,
            firstname: updateuser.firstname,
            lastname: updateuser.lastname,
            email: updateuser.email,
            id: updateuser.id,
            role: updateuser.role.role,
            installrToken: updateuser.installrToken
        }
        var idtoken = jwt.sign(payload, 'geppettosecret', {
            expiresIn: 86400
        });

        signinmodel.findByIdAndUpdate(updateuser.id, { $set: { username: updateuser.username, firstname: updateuser.firstname, lastname: updateuser.lastname, email: updateuser.email, role: updateuser.role._id, Idtoken: idtoken, installrToken: updateuser.installrToken } }, (err, response) => {
            if (err) {
                callback(err);
            }
            var updaterespone = {
                username: updateuser.email,
                firstname: updateuser.firstname,
                lastname: updateuser.lastname,
                email: updateuser.email,
                id: updateuser.id,
                role: updateuser.role._id,
                Idtoken: idtoken,
                installrToken: updateuser.installrToken
            }
            callback(updaterespone);
        })
    }
}