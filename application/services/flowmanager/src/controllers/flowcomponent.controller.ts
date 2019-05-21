import { Request, Response, NextFunction } from 'express';
import { FlowComponentService } from '../services/flowcomponent.service';

let flowComponentService = new FlowComponentService()

export class FlowComponentController {

    // public saveFlowComonents(req: Request, res: Response) {
    //     flowComponentService.saveFlowComonents(req, (user) => {
    //         res.status(200); // status for the response
    //         res.json(user);
    //     })
    // }

    // public updateFlowComponent(req: Request, res: Response, next: NextFunction) {
    //     flowComponentService.updateFlowComponent(req, next, (user) => {
    //         res.status(200); // status for the response
    //         res.json(user);
    //     })
    // }

    // public getAllFlowComponents(req: Request, res: Response, next: NextFunction) {
    //     flowComponentService.getAllFlowComponents(req, next, (flowComponent) => {
    //         res.status(200); // status for the response
    //         res.json(flowComponent);
    //     })
    // }

    // public getFlowComponentsByID(req: Request, res: Response, next: NextFunction) {
    //     flowComponentService.getFlowComponentsByID(req, next, (flowComponent) => {
    //         res.status(200); // status for the response
    //         res.json(flowComponent);
    //     })
    // }

    // public getFlowComponentsByName(req: Request, res: Response, next: NextFunction) {
    //     flowComponentService.getFlowComponentsByName(req, next, (flowComponent) => {
    //         res.status(200); // status for the response
    //         res.json(flowComponent);
    //     })
    // }

}