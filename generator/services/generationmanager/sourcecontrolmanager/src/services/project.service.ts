import { Request } from 'express';
import { ProjectDao } from '../daos/project.dao';

let projectDao = new ProjectDao()

export class ProjectService{

    public addProject (req: Request, callback:CallableFunction) {                
        projectDao.addProject(req, (project) => {
            callback(project)
        })
    }

    public getAllProject (req: Request, callback:CallableFunction) {           
        projectDao.getAllProject(req, (project) => {
            callback(project)
        })
    }

    public getProjectByID (req: Request, callback:CallableFunction) {           
        projectDao.getProjectByID(req, (project) => {
            callback(project)
        })
    }

    public updateProject (req: Request, callback:CallableFunction) {           
        projectDao.updateProject(req, (project) => {
            callback(project)
        })
    }

    public deleteProject (req: Request, callback:CallableFunction) {           
        projectDao.deleteProject(req, (project) => {
            callback(project)
        })
    }
    
}