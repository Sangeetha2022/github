import { Request, NextFunction } from 'express';
import { FlowDao } from '../daos/FlowDao';

let flowDao = new FlowDao()

export class FlowService {

    public saveFlow(req: Request, callback: CallableFunction) {
        const flowData = req.body;
        flowDao.saveFlow(flowData, (flow) => {
            callback(flow)
        })
    }

    public updateFlow(req: Request, callback: CallableFunction) {
        const flowId = req.body._id;
        const flowData = req.body;
        flowDao.updateFlow(flowId, flowData, (flow) => {
            callback(flow)
        })
    }

    public getAllFlow(req: Request, callback: CallableFunction) {
        flowDao.getAllFlow((flow) => {
            callback(flow)
        })
    }

    public getFlowById(req: Request, callback: CallableFunction) {
        const flowId = req.query.flowId;
        flowDao.getFlowById(flowId, (flow) => {
            callback(flow)
        })
    }

    public getFeatureFlows(req: Request, callback: CallableFunction) {
        const flowsId = req.body;
        flowDao.getFeatureFlows(flowsId, (flow) => {
            callback(flow)
        })
    }
    public getFeatureFlowsByLanguage(req: Request, callback: CallableFunction) {
        const flowsId = req.body;
        const language = req.query.language;
        flowDao.getFeatureFlowsByLanguage(flowsId, language, (flow) => {
            callback(flow)
        })
    }

    // public getBackendFlow(req: Request, callback: CallableFunction) {
    //     const flowsId = req.body;
    //     flowDao.getBackendFlow(flowsId, (flow) => {
    //         callback(flow)
    //     })
    // }

    public getFlowByProjectId(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        console.log('getflow by project id are ------ ', projectId);
        flowDao.getFlowByProjectId(projectId, (flow) => {
            callback(flow)
        })
    }

    public deleteFlow(req: Request, callback: CallableFunction) {
        const flowId = req.query.flowId;
        flowDao.deleteFlow(flowId, (flow) => {
            callback(flow)
        })
    }

    // public saveFlow(req: Request, callback: CallableFunction) {
    //     const flow = req.body;
    //     flowDao.saveFlow(flow, (response) => {
    //         callback(response);
    //     })
    // }

    // public getAllFlow(req: Request, callback: CallableFunction) {
    //     flowDao.getAllFlow(req, (flow) => {
    //         callback(flow);
    //     })
    // }

    // public getFlowByID(req: Request, next: NextFunction, callback: CallableFunction) {
    //     flowDao.getFlowByID(req, next, (flow) => {
    //         callback(flow);
    //     })
    // }

    // public deleteFlow(req: Request, next: NextFunction, callback: CallableFunction) {
    //     const flowID = req.params.id;
    //     flowDao.deleteFlow(flowID, next, (response) => {
    //         callback(response);
    //     })
    // }

    // getFlowByname(req: Request, next: NextFunction, callback: CallableFunction) {
    //     flowDao.getFlowByname(req,next, (response) => {
    //         callback(response);
    //     })
    // }

    // updateFlow = (req: Request, next: NextFunction, callback: CallableFunction) => {
    //     flowDao.updateFlow(req, next, (response) => {
    //         callback(response);
    //     })
    // }

    // getFlowDetails = (req: Request, next: NextFunction, callback: CallableFunction) => {
    //     flowDao.getFlowDetails(req, next, (response) => {
    //         callback(response);
    //     })
    // }

    // updateFlowComponent = (req: Request, next: NextFunction, callback: CallableFunction) => {
    //     flowDao.updateFlowComponent(req, next, (response) => {
    //         callback(response);
    //     })
    // }

    // updateLinkedConnector = (req: Request, next: NextFunction, callback: CallableFunction) => {
    //     flowDao.updateLinkedConnector(req, next, (response) => {
    //         callback(response);
    //     })
    // }

    // addFlowComponent = (req: Request, next: NextFunction, callback: CallableFunction) => {
    //     flowDao.addFlowComponent(req, next, (response) => {
    //         callback(response);
    //     })
    // }

    // addLinkedConnector = (req: Request, next: NextFunction, callback: CallableFunction) => {
    //     flowDao.addLinkedConnector(req, next, (response) => {
    //         callback(response);
    //     })
    // }

}