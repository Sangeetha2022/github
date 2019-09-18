import { Request } from 'express';
import { ProjectFlowComponentDao } from '../daos/ProjectFlowComponentDao'

const projectFlowComponentDao = new ProjectFlowComponentDao();

export class ProjectFlowComponentService {
    public saveProjectFlowComponent(req: Request, callback: CallableFunction) {
        let data = req.body;
        projectFlowComponentDao.saveProjectFlowComponent(data, (response) => {
            callback(response);
        })

    }

    public getProjectFlowComponents(req: Request, callback: CallableFunction) {
        const projectComponentsID = req.body;
        projectFlowComponentDao.getProjectFlowComponents(projectComponentsID, (response) => {
            callback(response);
        })
    }

    public updateProjectFlowComponent(req: Request, callback: CallableFunction) {
        const connectorId = req.body.connectorId;
        const flowComponentId = req.body.flowComponentId;
        projectFlowComponentDao.updateProjectFlowComponent(flowComponentId, connectorId, (response) => {
            callback(response);
        })
    }

}