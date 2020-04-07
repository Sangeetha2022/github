import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../interfaces/controller.interface";
import { Constants } from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';



class SharedController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/shared/getbyproject/:id').get(this.getSharedByProjectId);
        this.router.route('/shared/details').post(this.create)
    }
    

    public getSharedByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.sharedUrl}/shared/getbyproject/`+ req.params.id).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public create(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.sharedUrl}/shared/details`, req.body).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

}

export { SharedController };