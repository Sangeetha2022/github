
import {Request , Response, response} from 'express';
import {AuthService} from  '../services/authService'

let authService = new AuthService ();



export class AuthController {
    public auth (req:Request , res:Response){
        authService.auth(req, (response) => {
            console.log('controller --response -->>', response)
            res.status(200);
            res.send(response);

        })
     
    }

    }

