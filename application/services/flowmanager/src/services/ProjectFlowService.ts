import { Request, NextFunction } from 'express';
import { ProjectFlowDao } from '../daos/ProjectFlowDao';
import { ProjectFlowComponentDao } from '../daos/ProjectFlowComponentDao';
import * as asyncLoop from 'node-async-loop';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService'

let projectFlowDao = new ProjectFlowDao();
let projectFlowComponentDao = new ProjectFlowComponentDao();
let microflowManagerService = new MicroFlowManagerService();
export class ProjectFlowService {


    public ProjectFlow(req: Request, callback: CallableFunction) {
        const projectFlowData = req.body;
        const tempArray = [];
        asyncLoop(projectFlowData, async (element, next) => {
            if (element) {
                let flowComponentArray: any = [];
                const flowComponentData = element.components.map(({ _id, _v, ...rest }) => ({ ...rest }));
                flowComponentArray = await this.saveMicroflowData(flowComponentData);
                projectFlowComponentDao.ProjectFlowComponent(flowComponentArray, (result) => {
                    const temp = result.map(({ _id }) => _id);
                    element.components = temp;
                    tempArray.push(element);
                    next();
                })
            } else {
                next();
            }
        }, (err) => {
            if (err) {
                callback('cannot able to create a new projectFlows based on feature');
            } else {
                projectFlowDao.ProjectFlows(tempArray, (result) => {
                    callback(result)
                })
            }
        })

    }

    public createProjectFlow(req: Request, callback: CallableFunction) {
        const projectFlowData = req.body;
        projectFlowDao.createProjectFlows(projectFlowData, (result) => {
            callback(result)
        })
    }

    saveMicroflowData(flowComponentData) {
        return new Promise((resolve, reject) => {
            let flowComponentArray = [];
            asyncLoop(flowComponentData, (data: any, next) => {
                microflowManagerService.getMicroFlows(data.microFlows, (res) => {
                    const microflowArray = res.body.map(({_id, __v, createdAt, ...rest}) => ({...rest}));
                    microflowManagerService.saveBulkMicroFlows(microflowArray, (response) => {
                        const temp = response.body.map(({ _id }) => _id);
                        data.microFlows = temp;
                        flowComponentArray.push(data);
                        next();
                    })
                })
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(flowComponentArray);
                }
            })
        })
    }



    public getProjectFlowById(req: Request, callback: CallableFunction) {
        const flowId = req.params.id;
        projectFlowDao.getProjectFlowById(flowId, (result) => {
            callback(result)
        })
    }


    public updateFlowComponents(req: Request, callback: CallableFunction) {
        const flowId = req.query.projectFlowId;
        const flowData = req.body;
        console.log('flowId and data in services are ----- ', flowId, '  --data-- ', flowData);
        projectFlowDao.updateFlowComponents(flowId, flowData, (flow) => {
            callback(flow)
        })
    }

    public getAllProjectFlow(req: Request, callback: CallableFunction) {
        projectFlowDao.getAllProjectFlows((result) => {
            callback(result)
        })
    }

    public getProjectFeatureFlows(req: Request, callback: CallableFunction) {
        const projectFlowsId = req.body;
        projectFlowDao.getProjectFeatureFlows(projectFlowsId, (result) => {
            callback(result)
        })
    }

    public deleteProjectFlow(req: Request, callback: CallableFunction) {
        console.log('----------------------------', req)
        const flowId = req.query.projectFlowId;
        projectFlowDao.deleteProjectFlow(flowId, (flow) => {
            callback(flow)
        })
    }

}