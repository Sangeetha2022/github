import { ApiAdaptar } from '../config/ApiAdaptar';
import { CloneService } from '../config/CloneService';
// import { ProjectSchema } from '../../../projectmanager/src/models/project.model'
import * as YAML from 'yamljs'
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { response } from 'express';

// let Project = mongoose.model('Projects', ProjectSchema);
var globalData: any;

export class CloneApplicationsService {
    public responseofFeature: any;

    async postProject(request, projectData, featureData, entityData, screenData, templateData, menubuilderData, callback) {

        let userId = request.params.userid;
        let projectDetails = projectData;
        let projectfeatures = featureData;
        let projectEntity = entityData;
        let projectScreen = screenData;
        let projectTemplate = templateData;
        let projectMenubuilder = menubuilderData;

        projectDetails.UserId = userId;
        // new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/projects/getbyuserid/${ProjectData.User_Id}`).then(
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/projects/getbyuserid/${projectDetails.UserId}?log_id=${request.query.log_id}`).then(
            async (data: any) => {
                let projectsAll = JSON.parse(data)
                let projects;
                // projectsAll.body.forEach(function (proj) {
                //     if (projectDetails.name == proj.name) {
                //         projects = true
                //         callback("----Project is already exists----")
                //     }
                // })

                // if (projects != true) {
                    let newProjectName = projectDetails.name;
                    delete projectDetails.name;
                    projectDetails.name = `${newProjectName}${Math.floor((Math.random() * 100) + 1)}`;
                    await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/projects/add?log_id=${request.query.log_id}`, projectDetails)
                    .then(
                        async (data: any) => {
                            let ProjectId = data.body._id;

                            let resNumber = 0;
                            var resScreen = 0;
                            let listScreen = projectScreen.body;
                            projectTemplate.project_id = ProjectId;

                            //Project using Application Template Created
                            await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/project/template/save`, projectTemplate).then(
                                async (data: any) => {
                                    projectTemplate = {};
                                    // callback("projectTemplate Created: ",data.body);
                            });

                            //Default MenuBuilder Created
                            await this.postMenuBuilder(request, ProjectId, projectMenubuilder.body, async(response) => {
                                // callback(response)
                            })

                            //default Admin Screen Created
                            while(resScreen < listScreen.length){
                                if(listScreen[resScreen].feature == null && listScreen[resScreen].screenName === 'Admin Screen'){
                                    console.log("screenname else loop",listScreen[resScreen].screenName);
                                    delete listScreen[resScreen].project;
                                    listScreen[resScreen].project = ProjectId
                                    await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/screen/save`, listScreen[resScreen]).then(
                                        async (data: any) => {
                                            listScreen[resScreen] = {};
                                            listScreen[resScreen]._id = data.body._id;
                                            // callback(data);
                                        }
                                    )
                                }
                                resScreen++;
                            }

                            //Project each feature on entity, flow, screen created
                            console.log("project features body ----------------------------------------------------------------------------",projectfeatures.body);
                            for(var i=0; i<projectfeatures.body.length; i++){
                                await this.postFeatures(request, ProjectId, projectfeatures.body[i], async (res, featureoldId) => {
                                    let featureOldId = featureoldId;
                                    let featureNewId:any;
                                    if(res.body == undefined){
                                        featureNewId = "";
                                    }else {
                                        featureNewId = res.body._id;
                                    }

                                    console.log("featureold and new id:",featureOldId," ",featureNewId);

                                    await this.postEntities(request, ProjectId, projectEntity.body, resNumber, async (resp) => {
                                        // resScreen = resScreen+1;                                    
                                        console.log("entity field data:",resp.body.field);                                   
                                    });
                                    resNumber=resNumber+1;

                                    await this.postScreens(request, ProjectId, projectScreen.body, resScreen, featureNewId, featureOldId, async(resp) => {
                                        // callback("post entites");
                                    }); 

                                });
                            }
                        callback(data);
                    });
                // }
            }
        ).catch(error => {
            callback(error);
        })
    }

    async postMenuBuilder(req, ProjectId, menuBuilderData, callback) {
        for(var i=0; i<menuBuilderData.length; i++){
            menuBuilderData[i].project = ProjectId;
            await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/menu/save`, menuBuilderData[i]).then(
                async (data: any) => {
                    menuBuilderData[i] = {};
                    callback(data);
            });
        }
    }

    async postFlowsProjectbyId(req, featureData, callback){

        var newFlowsId = [];

        //Create flows_Project, Flows_component, microflows
        for(var i=0; i<featureData.length;i++){
            await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/flow/getprojectflowbyid/${featureData[i]}`).then(
                async (data:any) => {

                let flowcomponents:any = JSON.parse(data);
                let flowscomponents = flowcomponents.body[0];
                let flowComponents:any = flowcomponents.body[0].components;
                console.log("flowcomponentsid: ",flowComponents);
                let flowdata: any;
                await this.postFlowComponents(req, flowComponents, async (data) => {
                    flowdata = data;
                });

                delete flowscomponents._id;
                delete flowscomponents.components;
                flowscomponents.components = flowdata;
                console.log("flowcomponents new data: ",flowscomponents.components);
                await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/flow/project/save`,flowscomponents).then(
                    async (data:any) => {
                        let newIdData = data.body._id;
                        newFlowsId.push(newIdData);
                });
            });
        }
        callback(newFlowsId);
    }


    async postFlowComponents(req, flowcomponentData, callback){
        // console.log("flowcomponent data: ", flowcomponentData.length);
        var flowdataId = [];
        for(var i=0;i<flowcomponentData.length;i++){
            await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/flowcomponent/project/getbyid/${flowcomponentData[i]}`).then(
                async (data:any) => {
                let microflow:any = JSON.parse(data);
                let microflows:any = microflow.body[0];

                delete microflows._id;
                await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/flowcomponent/project/save`,microflows).then(
                    async (data:any) => {
                        let datas = data.body._id;
                        flowdataId.push(datas);
                })                                                
            });
        }
        callback(flowdataId);
    }
    
    async postFeatures(req, ProjectId, featureData, callback) {
        console.log("featurelenghth",featureData.length);
        // if(featureData.length == 0){
        //     callback(featureData);
        // }
        // else{
            let newFlowsIdData;
            let featuredata = featureData;
            // featureData.forEach( async(featuredata) => {
    
                let featureoldID = featuredata._id;

                await this.postFlowsProjectbyId(req, featuredata.flows, async(data) => {
                    console.log("last end data new id created----------",data);
                    newFlowsIdData = data;

                    console.log("flowscomplete to store: ",newFlowsIdData);
                    delete featuredata._id;
                    delete featuredata.flows;
                    featuredata.project = ProjectId;
                    featuredata.flows = newFlowsIdData;
                    console.log("new data of feature flows id :",featuredata);
                    await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/feature/save?log_id=${req.query.log_id}`,featuredata).then(
                        async (data: any) => {
                            featuredata = {};
                            featuredata._id = data.body._id;
                            callback(data, featureoldID);
                        }
                    ).catch(error => {
                        callback(error);
                    })
                });
            // });
        // }
    }

    async postEntities(req, ProjectId, entityData, responseNumber, callback) {
        await entityData.forEach(async function (entity) {
            await entity.field.forEach(async function (details) {
                entity.project_id = ProjectId
                let data_type = details.data_type.startsWith("{");
                if (data_type == true) {
                    let dataType = typeof (details.type_name);
                    details.data_type = dataType.charAt(0).toUpperCase() + dataType.slice(1);
                    delete details.reference_table;
                }
            })
            if(responseNumber == 0) {
                // delete the exist id of entity
                delete entity._id;
                if(entity.name == 'User'){
                    delete entity.is_default;
                    entity.is_default = 'true';
                }
                await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/entity/save?log_id=${req.query.log_id}`, entity).then(
                    async (data: any) => {
                        entity = {};
                        entity._id = data.body._id;
                        callback(data);
                    }
                ).catch(error => {
                    callback(error);
                })
            }
        });
    }


    async postScreens(req, ProjectId, screenData, responseNo, featureNewId, featureOldId, callback) {

        console.log("totalscreen ",screenData.length);
        for(var i=0; i<screenData.length; i++) {
            if(screenData[i].feature == featureOldId && screenData[i].screenName !== 'Admin Screen') {
                // delete the exist id of screen
                console.log("screenname ",screenData[i].screenName, "iteration",i);
                // console.log("featureid: ",screenData[i].feature," = featureOldId: ",featureOldId);
                // console.log("featureNewId: ",featureNewId);
                console.log("screen flows info : ", screenData[i].flows_info);
                console.log("screen entity info :", screenData[i].entity_info);
                delete screenData[i].project;
                delete screenData[i].feature;
                screenData[i].project = ProjectId
                screenData[i].feature = featureNewId;
                await new ApiAdaptar().post(`${CloneService.apiGatewayURL}/desktop/screen/save`, screenData[i]).then(
                   async(data: any) => {
                        screenData[i] = {};
                        screenData[i]._id = data.body._id;
                        callback(data);
                    }
                ).catch(error => {
                    callback(error);
                })
            }
        }

    }
    
    
//get data from project, entites, features, screen from DB
    async getEntityByProject(req, projectId, callback) {
        console.log("entity"+projectId);
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/entity/getbyproject/${projectId}?log_id=${req.query.log_id}`).then(
            async data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    async getMenubuilderByProject(req, projectId, callback) {
        console.log("entity"+projectId);
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/menu/getbyprojectid/${projectId}?log_id=${req.query.log_id}`).then(
            async data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    async getByProjectId(req, projectId, callback) {
        console.log("project:"+projectId);
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/projects/getbyid/${projectId}?log_id=${req.query.log_id}`).then(
            async data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    async getProjectTemplatebyId(req, projectId, callback){
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/project/template/${projectId}?log_id=${req.query.log_id}`).then(
            async (data) => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    async getFeatureByProject(req, projectId, callback) {
        console.log("feature"+projectId);
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/feature/project/get?projectId=${projectId}&log_id=${req.query.log_id}`).then(
            async data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    async getScreenByProject(req, projectId, callback) {
        console.log("feature"+projectId);
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/screen/getbyprojectid/${projectId}`).then(
            async data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    async getFlowsbyProject(req, flowdata, callback){
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/flow/getprojectflowbyid/${flowdata}`).then(
            async (data:any) => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    async getFlowsComponents(req, flowcomponents, callback){
        await new ApiAdaptar().get(`${CloneService.apiGatewayURL}/desktop/flowcomponent/project/getbyid/${flowcomponents}`).then(
            async (data:any) => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

}
