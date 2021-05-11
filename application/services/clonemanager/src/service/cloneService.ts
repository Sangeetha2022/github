import { Request, response, request } from 'express'
import { CloneApplicationsService } from '../apiservices/cloneapplicationsService'
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as multer from 'multer';
import * as  parseFormdata from 'parse-formdata';
import * as Busboy from 'busboy';
import { features } from 'process';
import { forEachChild } from 'typescript';


let cloneApplicationsService = new CloneApplicationsService()
var upload = multer()


export class cloneService {

    static getCloneProjectById: any;

    public async getCloneProjectById(req: Request, callback) {
        const projectId = req.params.id;
        console.log("projectId------->", projectId)
        let overallprojectdetails = await this.resolveProjectEntities(req, projectId);
        let projectDetails = overallprojectdetails['projectdetails'];
        let projectMenubuilder = overallprojectdetails['projectmenu'];
        let projectTemplate = overallprojectdetails['projecttemplate'].body[0];
        let projectFeatures = overallprojectdetails['projectfeature']
        let projectEntities = overallprojectdetails['projectentity'];
        let projectScreens = overallprojectdetails['projectscreens'];

            delete projectDetails.body.__v;
            delete projectDetails.body._id;
            delete projectDetails.body.last_modified_date;
            delete projectDetails.body.UserId;
            delete projectDetails.body.shared_visibility;

            delete projectTemplate.project_id;
            delete projectTemplate._id;
            delete projectTemplate.date;
            delete projectTemplate.__v;

            projectMenubuilder.body.forEach( (menubuilder) => {
                delete menubuilder._id;
                delete menubuilder.__v;
                delete menubuilder.created_date;
                delete menubuilder.project;
            });

            projectEntities.body.forEach(async function (entity) {
                projectFeatures.body.forEach(async function (feature) {
                    delete feature.createdAt;
                });
                await entity.field.forEach(async function (details) {
                        delete entity.__v;
                        delete entity.is_default;
                        delete entity.created_at;
                        delete entity.updated_at;
                        delete entity.created_by;
                        delete details.updated_at;
                        delete details.created_at;
                        delete details.entity_id;
                        delete details._id;
                        delete entity.project_id;
                        // delete entity._id;
    
                        let data_type = details.data_type.startsWith("{");
                        if (data_type == true) {
                            let dataType = typeof (details.type_name);
                            details.data_type = dataType.charAt(0).toUpperCase() + dataType.slice(1);
                            details.reference_table = details.name;
    
                        }
                });
            })

            projectScreens.body.forEach( async (screens) => {
                    delete screens.__v;
                    delete screens.created_at;
                    delete screens._id;
            });

            
            var cloneData = await cloneApplicationsService.postProject(req, projectDetails.body, projectFeatures, projectEntities, projectScreens, projectTemplate, projectMenubuilder, callback);
            callback("Clone a project generated code");
    }

//send data get all db to entity, feature, project, screen
    public async resolveProjectEntities(req, projectId) {
        return new Promise(resolve => {
            cloneApplicationsService.getByProjectId(req, projectId, (details) => {
                cloneApplicationsService.getMenubuilderByProject(req, projectId, (menubuilder) => {
                    cloneApplicationsService.getProjectTemplatebyId(req, projectId, (template) => {
                        cloneApplicationsService.getFeatureByProject(req, projectId, (feature) => {
                            cloneApplicationsService.getEntityByProject(req, projectId, (entity) => {
                                cloneApplicationsService.getScreenByProject(req, projectId, (screens) => { 
                                    let projectdetail = JSON.parse(details);
                                    let projectMenubuilder = JSON.parse(menubuilder);
                                    let Template = JSON.parse(template);
                                    let features = JSON.parse(feature);
                                    let entities = JSON.parse(entity);
                                    let screen = JSON.parse(screens);
                                    let consolidatedobject = {
                                        projectdetails: projectdetail,
                                        projectmenu: projectMenubuilder,
                                        projecttemplate: Template,
                                        projectfeature: features,
                                        projectentity: entities,
                                        projectscreens: screen
                                    }
                                    resolve(consolidatedobject);
                                });
                            });
                        });
                    });
                });
            });
        });
    }

}
