import * as mongoose from 'mongoose';
import { MenuBuilderSchema } from '../models/menubuilder.model';
import { Request } from 'express';

const MenuBuilder = mongoose.model('menu_builder', MenuBuilderSchema);

export class MenuBuilderDao {

    public addMenu(menuObject, callback: CallableFunction) {
        let newProject = new MenuBuilder(menuObject);
        newProject.save((err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public getAllMenu(req: Request, callback: CallableFunction) {
        MenuBuilder.find({}, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public getMenuById(req: Request, callback: CallableFunction) {
        MenuBuilder.findById(req.params.id)
            .exec((err, project) => {
                if (err) {
                    callback(err);
                } else {
                    // console.log('project id --------- ', project)

                    callback(project);
                }
            });
    }


    public updateMenu(req: Request, callback: CallableFunction) {
        MenuBuilder.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public updateMenuByProjectId(req: Request, callback: CallableFunction) {
        MenuBuilder.findOneAndUpdate({ project: req.params.projectId }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }



    public deleteMenu(req: Request, callback: CallableFunction) {
        MenuBuilder.remove({ _id: req.params.id }, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

    public getMenuByProjectId(projectId, callback: CallableFunction) {

        MenuBuilder.find({ project: projectId }).
            exec(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(result);
                }
            })
    }

}