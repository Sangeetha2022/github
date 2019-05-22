import { Request, Response, NextFunction } from 'express';
import { FlowService } from '../services/FlowService';

let flowService = new FlowService()

export class FlowController {

    public saveFlow(req: Request, res: Response) {
        flowService.saveFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public updateFlow(req: Request, res: Response) {
        flowService.updateFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getAllFlow(req: Request, res: Response) {
        flowService.getAllFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getFlowById(req: Request, res: Response) {
        flowService.getFlowById(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getFlowByProjectId(req: Request, res: Response) {
        flowService.getFlowByProjectId(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public deleteFlow(req: Request, res: Response) {
        flowService.deleteFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    // public saveFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.saveFlow(req, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public getAllFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.getAllFlow(req, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public getFlowByID(req: Request, res: Response, next: NextFunction) {
    //     flowService.getFlowByID(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public getFlowByname(req: Request, res: Response, next: NextFunction) {
    //     flowService.getFlowByname(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public deleteFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.deleteFlow(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public updateFlow(req: Request, res: Response, next: NextFunction) {
    //     flowService.updateFlow(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // getFlowDetails = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.getFlowDetails(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // updateFlowComponent = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.updateFlowComponent(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // updateLinkedConnector = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.updateLinkedConnector(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // addFlowComponent = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.addFlowComponent(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // addLinkedConnector = (req: Request, res: Response, next: NextFunction) => {
    //     flowService.addLinkedConnector(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

}