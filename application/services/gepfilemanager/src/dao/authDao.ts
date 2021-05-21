import mongoose = require("mongoose");
import { userSchema } from "../models/user";
import * as asyncLoop from "node-async-loop";
import { CustomLogger } from "../config/Logger";

const userModel = mongoose.model("User", userSchema);

export class AuthDao {
    private userDetails: any;
    private isEmail: boolean;

    public signUp(userData, callback) {
        new CustomLogger().showLogger("info", "Enter into authDao.ts: signUp");

        this.userDetails = {
            name: userData.name,
            dob: userData.dob,
            doj: userData.doj,
            projectid: userData.projectid,
            teamid: userData.teamid,
            organization: userData.organization,
            email: userData.email,
            password: userData.password,
            username: userData.email,
            createdOn: new Date(),
        };
        userModel.find().then((data) => {
            if (data.length !== 0) {
                asyncLoop(
                    data,
                    (users, next) => {
                        if (users.email === this.userDetails.email) {
                            this.isEmail = true;
                        } else {
                            this.isEmail = false;
                        }
                        next();
                    },
                    (error) => {
                        if (error) {
                            return error;
                        }
                    }
                );
                if (this.isEmail === true) {
                    var mailResponse = "Email is already exists";
                    new CustomLogger().showLogger("info", "Exit from authDao.ts: signUp");
                    callback(mailResponse);
                } else {
                    let loginCredentials = new userModel(this.userDetails);
                    loginCredentials
                        .save()
                        .then((result) => {
                            new CustomLogger().showLogger(
                                "info",
                                "Exit from authDao.ts: signUp"
                            );
                            callback(result);
                        })
                        .catch((error) => {
                            callback(error);
                        });
                }
            } else {
                let loginCredentials = new userModel(this.userDetails);
                loginCredentials
                    .save()
                    .then((result) => {
                        new CustomLogger().showLogger(
                            "info",
                            "Exit from authDao.ts: signUpDao"
                        );
                        callback(result);
                    })
                    .catch((error) => {
                        callback(error);
                    });
            }
        });
    }

    public login(loginDetails, callback) {
        new CustomLogger().showLogger("info", "Enter into authDao.ts: login");
        console.log("login details: ", loginDetails);
        userModel.findOneAndUpdate(
            { email: loginDetails.email, password: loginDetails.password },
            { $set: { loginDate: new Date() } },null,
            function (err, response:any) {
                if (err) {
                    callback(err);
                }
                if (response === null) {
                    response = "Incorrect Username or Password";
                    new CustomLogger().showLogger("info", "Exit from authDao.ts: login");
                    callback(response);
                } else {
                    new CustomLogger().showLogger("info", "Exit from authDao.ts: login");
                    callback(response);
                }
            }
        );
    }

    public logout(userId, callback) {
        console.log('userId in dao: ', userId);
        new CustomLogger().showLogger("info", "Enter into authDao.ts: logout");

        userModel.findByIdAndUpdate(
            userId,
            { $set: { logoutDate: new Date() } },
            function (err, result) {
                if (err) {
                    callback(err);
                }
                new CustomLogger().showLogger("info", "Exit from authDao.ts: logout");
                callback(result);
            }
        );
    }

    public getAllUser(callback) {
          new CustomLogger().showLogger('info', 'Enter into authDao.ts: getAllUserDao');
  
          userModel.find().then(result => {
              new CustomLogger().showLogger('info', 'Exit from authDao.ts: getAllUserDao');
              callback(result);
  
          }).catch((error => {
              callback(error);
          }))
      } 

    public getUserById(userId, callback) {
        new CustomLogger().showLogger("info", "Enter into authDao.ts: getUserById");

        userModel
            .findById(userId)
            .then((result) => {
                new CustomLogger().showLogger(
                    "info",
                    "Exit from authDao.ts: getUserById"
                );
                callback(result);
            })
            .catch((error) => {
                callback(error);
            });
    }

     public updateUser(updateUser, callback) {
        new CustomLogger().showLogger("info", "Enter into authDao.ts: updateUser");

        userModel.findByIdAndUpdate(
            updateUser.id,
            {
                $set: {
                    name: updateUser.name,
                    dob: updateUser.dob,
                    doj: updateUser.doj,
                    projectid: updateUser.projectid,
                    teamid: updateUser.teamid,
                    organization: updateUser.organization,
                    email: updateUser.email,
                    password: updateUser.password,
                    username: updateUser.email,
                    updatedOn: new Date(),
                },
            },
            (err, response) => {
                if (err) {
                    callback(err);
                }
                var updateResponse = {
                    name: updateUser.name,
                    dob: updateUser.dob,
                    doj: updateUser.doj,
                    projectid: updateUser.projectid,
                    teamid: updateUser.teamid,
                    organization: updateUser.organization,
                    email: updateUser.email,
                    password: updateUser.password,
                    username: updateUser.email,
                    updatedOn: new Date(),
                };
                new CustomLogger().showLogger(
                    "info",
                    "Exit from authDao.ts: updateUser"
                );
                callback(updateResponse);
            }
        );
    }

    public userDelete(userId, callback) {
        new CustomLogger().showLogger('info', 'Enter into authDao.ts: userDelete')

        userModel.findByIdAndRemove(userId).then((result) => {
            new CustomLogger().showLogger('info', 'Exit from authDao.ts: userDelete');
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
}
