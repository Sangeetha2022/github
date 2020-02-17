import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class GenerationController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/generate/:projectId').post(this.project);
        this.router.route('/projectgen/project/:id/get').get(this.generateProject);
        this.router.route('/projectgen/project/:projectId').get(this.getAllNotifyProject);
        this.router.route('/projectgen/user/:userId').get(this.getAllUserNotify);
    }

    project(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.projectGenUrl}/generate/${req.params.projectId}`, req.body
        ).then((result) => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    generateProject(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.projectGenUrl}/projectgen/project/${req.params.id}/get`,
        ).then((result) => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    getAllNotifyProject(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.projectGenUrl}/projectgen/project/${req.params.projectId}`,
        ).then((result) => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    getAllUserNotify(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.projectGenUrl}/projectgen/user/${req.params.userId}`,
        ).then((result) => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

}