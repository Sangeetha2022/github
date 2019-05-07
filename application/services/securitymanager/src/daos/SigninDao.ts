import mongoose = require('mongoose');
import { Signinschema } from '../models/Signin';
import { Roleschema } from '../models/Role';
import * as jwt from 'jsonwebtoken';
import * as asyncLoop from 'node-async-loop';
var jwtDecode = require('jwt-decode');

const signinmodel = mongoose.model('Signin', Signinschema);
const rolemodel = mongoose.model('role', Roleschema);
export class SigninDao {

    private userrole: any;
    private rolevalue: any;
    private signuprole: any;
    private userDetails: any;
    private mailboolean: boolean;
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
                'firstname': userData.firstName,
                'lastname': userData.lastName,
                'password': userData.password,
                'email': userData.email,
                'username': userData.email,
                'role': this.signuprole,
                'Idtoken':''
            };
            console.log('userdetails---->', this.userDetails)
            signinmodel.find().then(data => {
                console.log('----------------data-------->>>', data.length);
                if(data.length !== 0){
                    asyncLoop(data, (users, next) => {
                        if (users.email === this.userDetails.email) {
                            this.mailboolean = true;
                        }else{
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
                }else{
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

        rolemodel.find().then((result) => {
            asyncLoop(result, (roles, next) => {
                console.log('--------roles----', roles);
                if (roles.role === 'Standarduser') {
                    this.userrole = roles._id;
                    this.rolevalue = roles.role;
                    console.log('--------id-----', roles._id);
                }
                next();
            }, (err) => {
                if (err) {
                    console.log('----------erro----', err);
                }
            })
            console.log('------googleuser------->>>', this.userrole);
            // @ts-ignore
            let token = jwtDecode(googledata.idtoken);
            console.log('----decodedtoken---->>>', token);
            const userobject = {
                'firstname': token.given_name,
                'lastname': token.family_name,
                'username': token.email,
                'email': token.email,
                'role': this.userrole,
                'signintype': 'google'
            };
            let googlelogin = new signinmodel(userobject);
            googlelogin.save().then((result) => {
                console.log('---------googleuser--->>>>', result);
                var payload = {
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    id: result._id,
                    role: this.rolevalue
                }
                var idtoken = jwt.sign(payload, 'geppettosecret', {
                    expiresIn: 86400
                });
                signinmodel.findByIdAndUpdate(result._id, { $set: { Idtoken: idtoken } }, function (err, response) {
                    if (err) {
                        callback(err);
                    }
                    response.Idtoken = idtoken;
                    callback(response);
                });
            });

        });

    }
}