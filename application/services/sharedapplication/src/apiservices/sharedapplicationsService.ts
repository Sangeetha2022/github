import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';
import { ProjectSchema } from '../../../projectmanager/src/models/project.model'
import * as YAML from 'yamljs'
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { response } from 'express';

const Project = mongoose.model('Projects', ProjectSchema);
// let jsonStr = fs.readFileSync('./test.yaml', 'utf-8')
var globalData: any;

export class SharedApplicationsService {
    public responseofFeature: any;
    postProject(request, fileData, callback) {
        let ProjectData = YAML.parse(fileData.toString());

        let projectDetails = {
            name: ProjectData.projectName,
            app_ui_template: ProjectData.projectTemplate,
            app_ui_template_id: ProjectData.projectTemplateId,
            app_ui_template_name: ProjectData.projectTemplateName,
            app_ui_template_img: null,
            default_human_language: ProjectData.primaryLanguage,
            other_human_languages: ProjectData.secondaryLanguages,
            clientlanguage: ProjectData.clientlanguage,
            clientframework: ProjectData.clientframework,
            serverlanguage: ProjectData.serverlanguage,
            serverframework: ProjectData.serverframework,
            serverdatabase: ProjectData.serverdatabase,
            servertarget: ProjectData.servertarget,
            server_deployment_type: ProjectData.server_deployment_type,
            UserId: ProjectData.User_Id
        }
        
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/projects/getbyuserid/${ProjectData.User_Id}`).then(
            (data: any) => {
                let projectsAll = JSON.parse(data)
                let projects;
                projectsAll.body.forEach(function (proj) {
                    if (ProjectData.projectName == proj.name) {
                        projects = true
                        callback("----Project is already exists----")
                    }
                })

                if (projects != true) {
                    new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/projects/add`, projectDetails).then(
                        (data: any) => {
                            let ProjectId = data.body._id;
                            let resNumber = 0;
                            this.postFeatures(ProjectId, fileData, res => {
                                this.postEntities(ProjectId, fileData, res, resNumber,  resp => {
                                    this.updateFeatureEntity(ProjectId, fileData, res, resp, response => {
                                        callback(res, resp, response);
                                    })
                                });
                                resNumber=resNumber+1;
                            });
                    })
                }
            }
        ).catch(error => {
            callback(error)
        })
    }

    postEntities(ProjectId, fileData, response, responseNumber, callback) {
        let entityData = YAML.parse(fileData.toString());
        entityData.projectEntities.forEach(function (entity) {
            entity.field.forEach(function (details) {
                entity.project_id = ProjectId
                let data_type = details.data_type.startsWith("{");
                if (data_type == true) {
                    let dataType = typeof (details.type_name);
                    details.data_type = dataType.charAt(0).toUpperCase() + dataType.slice(1);
                    delete details.reference_table;
                }
            })
            if(!entity.feature_id && responseNumber == 0) {
                // delete the exist id of entity
                delete entity._id;
                new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/entity/save`, entity).then(
                    (data: any) => {
                        entity._id = data.body._id;
                        callback(entity);
                    }
                ).catch(error => {
                    callback(error);
                })
            }

            if(entity.feature_id) {
                response.body.entities.forEach( function (responseEntity) {
                    console.log('response feature entity id', responseEntity.entityId)
                    if(entity._id == responseEntity.entityId) {
                        // delete exist id of entity and featureEntity
                        delete entity._id;
                        delete responseEntity.entityId;
                        entity.feature_id = response.body._id;
                        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/entity/save`, entity).then(
                            (data: any) => {
                                entity._id = data.body._id;
                                responseEntity.entityId = data.body._id;
                                callback(responseEntity);
                            }
                        ).catch(error => {
                            callback(error);
                        })
                    }
                })
            }
        });
    }

    postFeatures(ProjectId, fileData, callback) {
        let featureData = YAML.parse(fileData.toString());
        featureData.projectFeatures.forEach(function (feature) {
            delete feature._id;
            feature.project = ProjectId;
            new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/feature/save`, feature).then(
                (data: any) => {
                    feature._id = data.body._id;
                    callback(data);
                }
            ).catch(error => {
                callback(error);
            })
        });
    }

    updateFeatureEntity(ProjectId, fileData, feature, featureEntity, callback) {
        // let featureData = YAML.parse(fileData.toString())
        // featureData.projectFeatures.forEach(function (oldFeature) {
        //     oldFeature.entities.forEach(function (oldFeatureEntity) {
        //         feature.body.entities.forEach(function (newFeatureEntity) {
        //             if(oldFeatureEntity.entityId == newFeatureEntity.entityId) {
        //             }
        //         })
        //     })
        // })
        // callback('uploaded');
        if(feature.body._id && !featureEntity._id) {
            new ApiAdaptar().put(`${SharedService.apiGatewayURL}/desktop/feature/update/entity?featureId=${feature.body._id}`, featureEntity).then(
                (data: any) => {
                    // console.log('data from the update feature', data)
                    callback(data);
                }
            ).catch(error => {
                callback(error);
            })
        }
    }
    

    getEntityByProject(projectId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/entity/getbyproject/${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getByProjectId(projectId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/projects/getbyid/${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    getFeatureByProject(projectId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/feature/project/get?projectId=${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

}
