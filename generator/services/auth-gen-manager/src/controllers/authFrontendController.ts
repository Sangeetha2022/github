import {Request , Response, response} from 'express';
import { AuthFrontendService } from  '../services/authFrontendService'

let authService = new AuthFrontendService ();



export class AuthFrontendController {

    public authfrontend (req:Request , res:Response){
        authService.authfrontendservice(req, (response) => {
            res.status(200);
            res.send(response);

        })
     
    }

    }
