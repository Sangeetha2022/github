import * as mongoose from 'mongoose';
import { ProjectSchema } from '../models/project.model';
import { Request } from 'express';
import { gpConfigSchema } from '../models/configuration.model';

const Project = mongoose.model('Projects', ProjectSchema);
const configModel = mongoose.model('gp_config', gpConfigSchema);

export class ProjectDao {

    public addProject(req: Request, callback: CallableFunction) {
        let newProject = new Project(req.body);

        newProject.save((err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public getAllProject(req: Request, callback: CallableFunction) {
        Project.find({}, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public getProjectByID(req: Request, callback: CallableFunction) {
        Project.findById(req.params.id).populate(
            [
                { path: 'clientlanguage', model: configModel },
                { path: 'clientframework', model: configModel },
                { path: 'serverlanguage', model: configModel },
                { path: 'serverframework', model: configModel },
                { path: 'serverdatabase', model: configModel },
                { path: 'servertarget', model: configModel },
                { path: 'server_deployment_type', model: configModel }
            ])
            .exec((err, project) => {
                if (err) {
                    callback(err);
                } else {
                    // console.log('project id --------- ', project)

                    callback(project);
                }
            });
    }

    public updateProject(req: Request, callback: CallableFunction) {
        Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public deleteProject(req: Request, callback: CallableFunction) {
        Project.remove({ _id: req.params.id }, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

    public getProjectByUserId(userId, callback: CallableFunction) {
        Project.find({}, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

}