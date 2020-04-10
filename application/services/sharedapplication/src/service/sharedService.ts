import { Request, response, request } from 'express'
import { SharedApplicationsService } from '../apiservices/sharedapplicationsService'
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as multer from 'multer';
import * as  parseFormdata from 'parse-formdata';
import * as Busboy from 'busboy';


let sharedapplicationsService = new SharedApplicationsService()
var upload = multer()


export class sharedService {

    static getSharedProjectById: any;

    public async getSharedProjectById(req: Request, callback) {
        const projectId = req.params.id;
        console.log("projectId------->", projectId)
        let overallprojectdetails = await this.resolveProjectEntities(projectId);
        let projectDetails = overallprojectdetails['projectdetails'];
        console.log("projectDetails----->", projectDetails);
        let projectEntities = overallprojectdetails['projectentity'];
        let projectFeatures = overallprojectdetails['projectfeature']
        // console.log("overallproject---->", overallprojectdetails);
        // console.log("projectEntities----->", projectEntities);
            projectEntities.body.forEach(function (entity) {
                entity.field.forEach(function (details) {
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
            });
            projectEntities.body.forEach(function (entity) {
                projectFeatures.body.forEach(function (feature) {
                    // delete feature._id;
                    delete feature.__v;
                    delete feature.createdAt;
                    feature.entities.forEach(function (featureEntity) {
                    })
                })

            })


            let newObject = {
                projectName: projectDetails.body.name,
                projectTemplate: projectDetails.body.app_ui_template,
                projectTemplateId: projectDetails.body.app_ui_template_id,
                projectTemplateName: projectDetails.body.app_ui_template_name,
                primaryLanguage: projectDetails.body.default_human_language,
                secondaryLanguages: projectDetails.body.other_human_languages,
                clientlanguage: projectDetails.body.clientlanguage ? projectDetails.body.clientlanguage.name : null,
                clientframework: projectDetails.body.clientframework ? projectDetails.body.clientframework.name : null,
                serverlanguage: projectDetails.body.serverlanguage ? projectDetails.body.serverlanguage.name : null,
                serverframework: projectDetails.body.serverframework ? projectDetails.body.serverframework.name : null,
                serverdatabase: projectDetails.body.serverdatabase ? projectDetails.body.serverdatabase.name : null,
                servertarget: projectDetails.body.servertarget ? projectDetails.body.servertarget.name : null,
                server_deployment_type: projectDetails.body.server_deployment_type ? projectDetails.body.server_deployment_type.name : null,
                projectEntities: projectEntities.body,
                projectFeatures: projectFeatures.body,
            }

            // console.log("newObject", newObject);
            let yamlStr = yaml.dump(newObject);
            fs.writeFileSync(projectDetails.body.name.concat(".yaml"), yamlStr, 'utf8');
            callback('Yaml file convertion is done');
    }

    public resolveProjectEntities(projectId) {
        return new Promise(resolve => {
            sharedapplicationsService.getByProjectId(projectId, (details) => {
                sharedapplicationsService.getFeatureByProject(projectId, (feature) => {
                    sharedapplicationsService.getEntityByProject(projectId, (entity) => {
                        console.log("entity------>", entity);
                        let projectdetail = JSON.parse(details);
                        let features = JSON.parse(feature);
                        let entities = JSON.parse(entity);
                        let consolidatedobject = {
                            projectdetails: projectdetail,
                            projectfeature: features,
                            projectentity: entities
                        }
                        resolve(consolidatedobject);
                    })
                })
            });
        })
    }

    public savesharedproject(req, res, callback) {
        sharedapplicationsService.postProject(req, res, (response) => {
            callback(response);
        })
    }

    public uploadProjectFile(req, callback) {
        const userId = req.params.id;
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function (fieldname, file) {
            file.on('data', function (data) {
                sharedapplicationsService.postProject(req, data, (response) => {
                    callback(response);
                })
            });
            file.on('end', function () {
                console.log('File Finished');
            });
        });
        req.pipe(busboy);
    }
}
