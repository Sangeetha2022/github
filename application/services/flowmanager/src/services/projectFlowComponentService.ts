import { Request, response } from 'express';
import { ProjectFlowComponentDao } from '../daos/ProjectFlowComponentDao';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService'

const projectFlowComponentDao = new ProjectFlowComponentDao();
const microFlowManagerService = new MicroFlowManagerService();

export class ProjectFlowComponentService {
    public saveProjectFlowComponent(req: Request, callback: CallableFunction) {
        let data = req.body;
        projectFlowComponentDao.saveProjectFlowComponent(data, (response) => {
            callback(response);
        })

    }

    public getProjectFlowComponents(req: Request, callback: CallableFunction) {
        const projectComponentsID = req.body;
        projectFlowComponentDao.getProjectFlowComponents(projectComponentsID, (response) => {
            callback(response);
        })
    }

    public getProjectFlowComponentById(req: Request, callback: CallableFunction) {
        const projectFlowCompId = req.params.id;
        projectFlowComponentDao.getProjectFlowComponentById(projectFlowCompId, (response) => {
            callback(response);
        })
    }

    public deleteProjectFlowComp(req: Request, callback: CallableFunction) {
        const flowCompId = req.query.projectFlowCompId;
        projectFlowComponentDao.deleteProjectFlowComp(flowCompId, (flow) => {
            callback(flow)
        })
    }


    public async updateProjectFlowComponent(req: Request, callback: CallableFunction) {
        const connectorId = req.body.connectorId;
        const flowComponentId = req.body.flowComponentId;
        let flowComponentObject: any = await this.getProjectFlowComponentByIdForBody(flowComponentId);
        const parsedObject = JSON.parse(JSON.stringify(flowComponentObject));
        let microFlowIds: Array<string> = parsedObject.microFlows;
        let microFlowArray: any = await this.getFlowComponentMicroflows(microFlowIds);
        let connectorMicroFlow: any = microFlowArray.body.filter((x) => x.microFlowStepName === 'GpCheck_Connector');
        let micro_flow_object = connectorMicroFlow[0];
        await micro_flow_object.connector.push(connectorId);
        let connectorObject = {
            connector_id: micro_flow_object._id,
            micro_object: {
                componentName: micro_flow_object.componentName,
                microFlowStepName: micro_flow_object.microFlowStepName,
                sequenceId: micro_flow_object.sequenceId,
                connector: micro_flow_object.connector
            }
        }
        microFlowManagerService.updateProjectMicroFlow(connectorObject, (response) => {
            projectFlowComponentDao.updateProjectFlowComponent(flowComponentId, connectorId, (response) => {
                callback(response);
            })
        })
        
    }

    public getProjectFlowComponentByIdForBody(flowComponentId) {
        return new Promise(resolve => {
            projectFlowComponentDao.getProjectFlowComponentById(flowComponentId, (response: any) => {
                resolve(response[0]);
            })
        })
    }

    public getFlowComponentMicroflows(microFlowIds) {
        return new Promise(resolve => {
            microFlowManagerService.getProjectMicroFlows(microFlowIds, (response: any) => {
                resolve(response);
            })
        })
    }

}