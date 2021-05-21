import { Request, Response, response } from 'express';
import { AuthService } from '../service/authService';
import { CustomLogger } from '../config/Logger'

let authService = new AuthService;
export class AuthController {

    public signup(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into authController.ts: signup');
        authService.signUp(req, (response) => {
            res.status(201);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from authController.ts: signup');
        })
    }

    public login(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into authController.ts: login');
        authService.login(req, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from authController.ts: login');

        })

    }

    public logout(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into authController.ts: logout');

        authService.logout(req, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from authController.ts: logout');

        })
    }


    public getAllUsers(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into authController.ts: getAllUsers');

        authService.getAllUser(req, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from authController.ts: getAllUsers');

        });
    } 

   public getUserById(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into authController.ts: getUserById');

        authService.getUserById(req, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from authController.ts: getUserById');

        })
    }
 
    public updateUser(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into authController.ts: updateUser');

        authService.updateUser(req, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from authController.ts: updateUser');

        })
    } 

    public userDelete(req: Request, res: Response) {
        authService.userDelete(req, (response) => {
                        new CustomLogger().showLogger('info', 'Enter into authController.ts: userDelete');
             res.status(200);
             res.json(response);
                        new CustomLogger().showLogger('info', 'Exit from authController.ts: userDelete');
            })}

}