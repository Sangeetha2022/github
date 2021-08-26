import { Request } from 'express';
import { ProjectDao } from '../daos/project.dao';

let projectDao = new ProjectDao()

export class ProjectService {

    public addProject(req: Request, callback: CallableFunction) {
        projectDao.addProject(req, (project) => {
            callback(project)
        })
    }

    public getAllProject(req: Request, callback: CallableFunction) {
        projectDao.getAllProject((project) => {
            callback(project)
        })
    }

    public getProjectByID(req: Request, callback: CallableFunction) {
        projectDao.getProjectByID(req, (project) => {
            callback(project)
        })
    }

    public updateProject(req: Request, callback: CallableFunction) {
        if(req.body.hasOwnProperty('admin_need_object')) {
            this.getProjectByID(req, (projectDetails) => {
                let adminsArray = projectDetails.needs_administration;
                adminsArray.push(req.body.admin_need_object);
                req.body.needs_administration = adminsArray;
                projectDao.updateProject(req, (project) => {
                    callback(project)
                })
            })
        } else {
            projectDao.updateProject(req, (project) => {
                callback(project)
            })
        }

        // projectDao.updateProject(req, (project) => {
        //     callback(project)
        // })
        
    }

    public deleteProject(req: Request, callback: CallableFunction) {
        projectDao.deleteProject(req, (project) => {
            callback(project)
        })
    }

    public getProjectByUserId(req: Request, callback: CallableFunction) {
        const userId = req.params.id;
        projectDao.getProjectByUserId(userId, (project) => {
            callback(project);
        })
    }

}