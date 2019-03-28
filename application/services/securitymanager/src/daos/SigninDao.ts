import mongoose = require('mongoose');
import { Signinschema } from '../models/Signin';

const signinmodel = mongoose.model('Signin', Signinschema);

export class SigninDao {

    public signindao(userData, callback) {
        let logincreds = new signinmodel(userData);
        logincreds.save().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        })
    }

    public logindao(logindetails, callback) {
        signinmodel.findOneAndUpdate({ email: logindetails.email, password: logindetails.password }, {$set:{loggedinDate:new Date()}}, function (err, response) {
            if (err){
                callback(err);
            }
            if (response === null){
                response = 'Incorrect Username or Password';
                callback(response);
            } else {
                callback(response);
            }
        })
    }

    public logoutdao(userid, callback){

        signinmodel.findByIdAndUpdate(userid,{$set:{loggedoutDate: new Date()}}, function(err, result){
            if(err){
                callback(err);
            }
            callback(result);
        })
    }

}