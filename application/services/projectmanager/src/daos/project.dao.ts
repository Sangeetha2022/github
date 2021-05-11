import * as mongoose from 'mongoose';
import { ProjectSchema } from '../models/project.model';
import { Request } from 'express';
import { gpConfigSchema } from '../models/configuration.model';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';
import * as generate from 'nanoid/generate';
import * as dictionary from 'nanoid-dictionary';

const Project = mongoose.model('Projects', ProjectSchema);
const configModel = mongoose.model('gp_config', gpConfigSchema);

export class ProjectDao {

    public addProject(req: Request, callback: CallableFunction) {
        req.body.project_unique_id = `${req.body.name}_${generate(dictionary.numbers, 4)}`;
        let newProject = new Project(req.body);

        console.log('i am project------->><<<>>>>', newProject)


        newProject.save((err, project) => {
            if (err) {
                callback(err);
            } else {
                callback(project);
            }
        });
    }

    public getAllProject(callback: CallableFunction) {
        Project.find({}, (err, project) => {
            if (err) {
                callback(err);
            } else {
                let getAllProjects = [];
                project.forEach(function (details) {
                    getAllProjects.push(new Promise((resolve, reject) => {
                        if (details.app_ui_template_img == null) {
                            new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/template/get/${details.app_ui_template_name}`)
                                .then(
                                    (data: any) => {
                                        let result = JSON.parse(data)
                                        let templateImage;
                                        let templateName;
                                        result.body.forEach(template => {
                                            templateImage = template.template_image[0].image,
                                                templateName = template.template_name
                                        })
                                        if (details.app_ui_template_name == templateName) {
                                            details.app_ui_template_img = templateImage;
                                            resolve(details)
                                        }
                                    });
                        }
                    }));
                })
                Promise.all(getAllProjects).then(values => {
                    let merged = [].concat.apply([], values);
                    callback(merged)
                })
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
        Project.findByIdAndDelete(req.params.id, (err, project) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

    public getProjectByUserId(userId, callback: CallableFunction) {
        Project.find({ UserId: userId }, (err, project) => {
            let Projects = [];
            project.forEach(function (details) {
                Projects.push(new Promise((resolve, reject) => {
                    if (details.app_ui_template_img == null) {
                        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/template/get/${details.app_ui_template_name}`)
                            .then(
                                (data: any) => {
                                    let result = JSON.parse(data)
                                    let templateImage;
                                    let templateName;
                                    result.body.forEach(template => {
                                        templateImage = template.template_image[0].image,
                                            templateName = template.template_name
                                    })
                                    if (details.app_ui_template_name == templateName) {
                                        details.app_ui_template_img = templateImage;
                                        resolve(details)
                                    }
                                });
                    }
                }));
            })
            Promise.all(Projects).then(values => {
                let merged = [].concat.apply([], values);
                callback(merged)
            })
        })
    }
}