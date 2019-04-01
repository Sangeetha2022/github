import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { EntityController } from './entity.controller';


const entityController = new EntityController();

class MicroflowController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post('/microflow/save', this.flowControllersaveMicroFlow);
        this.router.put('/microflow/update', this.flowControllerupdateMicroFlow);
        this.router.get('/microflow/getall', this.flowControllergetAllFlow);
        this.router.get('/microflow/getbyid/:id', this.flowControllergetFlowByID);
        this.router.delete('/microflow/delete/:id', this.flowControllerdeleteMicroFlow);
       
    }

    public flowControllersaveMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.featureUrl}/microflow/save`, req.body).then(micro => {
            res.send(micro);
        }).catch(err => {
            res.send(err);
        });
    }

    public flowControllerupdateMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.microUrl}/microflow/update ${req.params.id}`,req.body).then(micro => {
            res.send(micro);
        }).catch(err => {
            res.send(err);
        });
    }

    public flowControllerdeleteMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.microUrl}/microflow/delete/:id ${req.params.id}`).then(micro => {
            res.send(micro);
        }).catch(err => {
            res.send(err);
        });
    }

    public flowControllergetAllFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.microUrl}/microflow/getall`).then(allmicro => {
            res.send(allmicro);
        }).catch(err => {
            res.send(err);
        });
    }

    public flowControllergetFlowByID = (req: Request, res: Response) => {
        new ApiAdaptar().get(`${Constants.microUrl}'/microflow/getall'${req.params.id}`).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
}
export { MicroflowController };