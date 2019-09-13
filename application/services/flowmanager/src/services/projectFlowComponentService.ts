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

    public projectFlowComponentService(req: Request, callback: CallableFunction) {
        projectFlowComponentDao.projectFlowComponentService((response) => {
            callback(response);
        })
    }

}