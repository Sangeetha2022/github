import * as mongoose from 'mongoose';
import { ProjectSchema } from '../models/project.model';
import { Request } from 'express';

const Project = mongoose.model('Projects', ProjectSchema);

export class ProjectDao{

    public addProject (req: Request, callback: CallableFunction) {                
        let newProject = new Project(req.body);

        newProject.save((err, project) => {
            if(err){
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public getAllProject (req: Request, callback: CallableFunction) {           
        Project.find({}, (err, project) => {
            if(err){
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public getProjectByID (req: Request, callback: CallableFunction) {           
        Project.findById(req.params.id, (err, project) => {
            if(err){
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public updateProject (req: Request, callback: CallableFunction) {           
        Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, project) => {
            if(err){
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public deleteProject (req: Request, callback: CallableFunction) {           
        Project.remove({ _id: req.params.id }, (err, project) => {
            if(err){
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!'});
            }
        });
    }
    
}