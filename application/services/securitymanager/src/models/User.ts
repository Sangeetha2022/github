import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const Userschema = new Schema ({

    _id: {
        type: String,
        default:uuid.v1
    },
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    fbId:String,
    password: String,
    role: { type: mongoose.Schema.Types.String, ref: 'roles' },
    signintype: String,
    Idtoken: String,
    installrToken: String,
    loggedinDate: {
        type: Date,
        default: Date.now
    },
    loggedoutDate: {
        type: Date,
        default: Date.now
    },
})