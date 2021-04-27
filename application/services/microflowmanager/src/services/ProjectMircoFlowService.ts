import { Request } from 'express';
import { ProjectMicroFlowDao } from '../daos/ProjectMicroFlowDao';

let projectMicroFlowDao = new ProjectMicroFlowDao();

export class ProjectMicroFlowService{

    public saveProjectMicroFlow(req: Request, callback: CallableFunction) {
        const ProjectMicroFlowData = req.body;
        projectMicroFlowDao.saveProjectMicroFlow(ProjectMicroFlowData, (feature) => {
            callback(feature)
        })
    }

    public updateProjectMicroFlow(req: Request, callback: CallableFunction) {
        const ProjectMicroFlowId = req.body._id;
        const ProjectMicroFlowData = req.body;
        projectMicroFlowDao.updateProjectMicroFlow(ProjectMicroFlowId, ProjectMicroFlowData, (ProjectMicroFlow) => {
            callback(ProjectMicroFlow)
        })
    }

    public getAllProjectMicroFlow(req: Request, callback: CallableFunction) {
        projectMicroFlowDao.getAllProjectMicroFlow((ProjectMicroFlow) => {
            callback(ProjectMicroFlow)
        })
    }

    public getProjectMicroFlowByID(req: Request, callback: CallableFunction) {
        const ProjectMicroFlowId = req.query.ProjectMicroFlowId;
        projectMicroFlowDao.getProjectMicroFlowByID(ProjectMicroFlowId, (ProjectMicroFlow) => {
            callback(ProjectMicroFlow)
        })
    }

    public getProjectMicroFlow(req: Request, callback: CallableFunction) {
        const ProjectMicroFlowIDS = req.body;
        projectMicroFlowDao.getProjectMicroFlow(ProjectMicroFlowIDS ,(ProjectMicroFlow) => {
            callback(ProjectMicroFlow);
        })
    }

    public getBackendProjectMicroFlow(req: Request, callback: CallableFunction) {
        const ProjectMicroFlowIDS = req.body;
        projectMicroFlowDao.getBackendProjectMicroFlow(ProjectMicroFlowIDS ,(ProjectMicroFlow) => {
            callback(ProjectMicroFlow);
        })
    }

    public getProjectMicroFlowByProjectId(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        projectMicroFlowDao.getProjectMicroFlowByProjectId(projectId, (ProjectMicroFlow) => {
            callback(ProjectMicroFlow)
        })
    }

    public deleteProjectMicroFlow(req: Request, callback: CallableFunction) {
        const ProjectMicroFlowId = req.query.ProjectMicroFlowId;
        projectMicroFlowDao.deleteProjectMicroFlow(ProjectMicroFlowId, (ProjectMicroFlow) => {
            callback(ProjectMicroFlow)
        })
    }

}