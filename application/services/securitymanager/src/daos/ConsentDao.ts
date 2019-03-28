import mongoose = require('mongoose');
import { Signinschema } from '../models/Signin';
import { Roleschema } from '../models/Role';
import * as jwt from 'jsonwebtoken';

const signinmodel = mongoose.model('Signin', Signinschema);
const rolemodel = mongoose.model('role', Roleschema)

export class ConsentDao {
    public consentdao(consentdata, callback) {


        if (consentdata.scope === 'openid' && consentdata.submit === 'Allow access') {
            signinmodel.findById(consentdata.id).populate({
                path: 'role', model: rolemodel
            }).then((result) => {
                if (result.Idtoken !== '') {
                    jwt.verify(result.Idtoken, 'geppettosecret', (err, decoded) => {
                        if (err) {
                            console.log('Auth error', err);
                            callback(err);
                        } else {
                            callback(decoded);
                        }
                    })
                } else {
                    var payload = {
                        username: result.username,
                        firstname: result.firstname,
                        lastname: result.lastname,
                        email: result.email,
                        role: result.role.role
                    }
                    var token = jwt.sign(payload, 'geppettosecret', {
                        expiresIn: 86400
                    });
                    signinmodel.findByIdAndUpdate(consentdata.id, { $set: { Idtoken: token } }, function (err, response) {
                        if (err) {
                            callback(err);
                        }
                        callback(response);
                    })
                }
            })
        }
    }

}