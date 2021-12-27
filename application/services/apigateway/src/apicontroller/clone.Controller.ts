import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../interfaces/controller.interface";
import { Constants } from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';

const fs = require("fs");
const multiparty = require("multiparty");

class CloneController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/clone/getbyproject/:id/user/:userid').get(this.getCloneByProjectId);
    }


    public async getCloneByProjectId(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdapter().get(`${Constants.cloneUrl}/clone/getbyproject/` + req.params.id + `/user/`+ req.params.userid));
            console.log("hit url in apigateway----------",response);
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

}
export { CloneController };