import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class ConfigurationController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.route('/generate/code').put(this.createProjectCode);
        this.router.route('/generation_flow/add').post(this.addGenerationFlow);
        this.router.route('/generation_flow/update/:id').put(this.updateGenerationFlow);
        this.router.route('/generation_flow/getall').get(this.getAllGenerationFlow);
        this.router.route('/generation_flow/getbyid/:id').get(this.getGenerationFlowByID);
        this.router.route('/generation_flow/getbyname/:name').get(this.getGenerationFlowByName);
        this.router.route('/generation_flow/delete/:id').delete(this.deleteGenerationFlow);
        this.router.route('/generation_flow/getproperties').get(this.getTechPropertyFlow);
    }

    addGenerationFlow(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.configUrl}/generation_flow/add`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    updateGenerationFlow(req: Request, res: Response) {
        new ApiAdaptar().put(
            `${Constants.configUrl}/generation_flow/update/${req.params.id}`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    getAllGenerationFlow(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.configUrl}/generation_flow/getall`
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    getGenerationFlowByID(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.configUrl}/generation_flow/getbyid/${req.params.id}`
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    getGenerationFlowByName(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.configUrl}/generation_flow/getbyname/${req.params.name}`
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    deleteGenerationFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(
            `${Constants.configUrl}/generation_flow/delete/${req.params.id}`
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

    getTechPropertyFlow(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.configUrl}/generation_flow/getproperties`
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }
}