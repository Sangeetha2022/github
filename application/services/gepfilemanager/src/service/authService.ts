import { Request, response } from 'express';
import { AuthDao } from '../dao/authDao';
import { CustomLogger } from '../config/Logger'

let authDao = new AuthDao();
export class AuthService {

    public signUp(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into authService.ts: signUp');
        const users = req.body;
        authDao.signUp(users, (response) => {
            new CustomLogger().showLogger('info', 'Exit from authService.ts: signUp');
            callback(response);

        });
    }

    public login(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into login');
        const loginDetails = req.body;
        authDao.login(loginDetails, (response) => {
            new CustomLogger().showLogger('info', 'Exit from authService.ts: login');
            callback(response)

        });
    }

    public logout(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into authService.ts: logout');

        const user = req.body.id;
        authDao.logout(user, (response) => {
            new CustomLogger().showLogger('info', 'Exit from authService.ts: logout');
            callback(response);

        })
    }

    public getAllUser(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into authService.ts: getAllUser');

        authDao.getAllUser((response) => {
            new CustomLogger().showLogger('info', 'Exit from authService.ts: getAllUser');
            callback(response);

        })
    }

    public getUserById(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into authService.ts: getUserById');

        const userId = req.params.id;
        authDao.getUserById(userId, (response) => {
            new CustomLogger().showLogger('info', 'Exit from authService.ts: getUserById');
            callback(response);

        })
    }


    public updateUser(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into authService.ts: updateUser');

        const userDetails = req.body;

        authDao.updateUser(userDetails, (response) => {
            new CustomLogger().showLogger('info', 'Exit from authService.ts: updateUser');
            callback(response);

        })
    }

    public userDelete(req: Request, callback){
        new CustomLogger().showLogger('info', 'Enter into authService.ts: userDelete')
         const  userId = req.params.id;
         authDao.userDelete(userId,(response)=>{
                 new CustomLogger().showLogger('info', 'Exit from authService.ts: userDelete')
             callback(response);
             });
        }
}