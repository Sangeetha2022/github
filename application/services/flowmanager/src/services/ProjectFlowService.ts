import { Request, NextFunction } from 'express';
import { ProjectFlowDao } from '../daos/ProjectFlowDao';
import { ProjectFlowComponentDao } from '../daos/ProjectFlowComponentDao';
import * as asyncLoop from 'node-async-loop';

let projectFlowDao = new ProjectFlowDao();
let projectFlowComponentDao = new ProjectFlowComponentDao();
export class ProjectFlowService {


    public ProjectFlow(req: Request, callback: CallableFunction) {
        const projectFlowData = req.body;
        const tempArray = [];
        asyncLoop(projectFlowData, (element, next) => {
            if (element) {
                const flowComponentData = element.components.map(({ _id, _v, ...rest }) => ({ ...rest }));
                projectFlowComponentDao.ProjectFlowComponent(flowComponentData, (result) => {
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



    public getProjectFlowById(req: Request, callback: CallableFunction) {
        const flowId = req.params.id;
        projectFlowDao.getProjectFlowById(flowId, (result) => {
            callback(result)
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