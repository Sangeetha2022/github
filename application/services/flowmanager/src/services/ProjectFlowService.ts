import { Request, NextFunction } from 'express';
import { ProjectFlowDao } from '../daos/ProjectFlowDao';


let projectFlowDao = new ProjectFlowDao();
export class ProjectFlowService {


    public ProjectFlow(req: Request, callback: CallableFunction) {
        const projectFlowData = req.body;
        projectFlowDao.ProjectFlows(projectFlowData, (result) => {
            callback(result)
        })
    }

    public createProjectFlow(req: Request, callback: CallableFunction) {
        const projectFlowData = req.body;
        projectFlowDao.createProjectFlows(projectFlowData, (result) => {
            callback(result)
        })
    }

    public getAllProjectFlow(req: Request, callback: CallableFunction) {
        projectFlowDao.getAllProjectFlows((result) => {
            callback(result)
        })
    }

    public getProjectFeatureFlows(req: Request, callback: CallableFunction) {
        const projectFlowsId = req.body;
        projectFlowDao.getProjectFeatureFlows(projectFlowsId, (result) => {
            callback(result)
        })
    }

    public deleteProjectFlow(req: Request, callback: CallableFunction) {
        const flowId = req.query.projectFlowId;
        projectFlowDao.deleteProjectFlow(flowId, (flow) => {
            callback(flow)
        })
    }

}