import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FlowManagerService {

    public getProjectFlowById(req, flowid, callback) {
        const flowId = flowid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/flow/getprojectflowbyid/${flowId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getProjectFlowCompById(req, flowCompid, callback) {
        const flowCompId = flowCompid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/flowcomponent/project/getbyid/${flowCompId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getConnectorById(req, connectorid, callback) {
        const connectorId = connectorid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/get/quickConnectorbyid/${connectorId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteProjectFlow(req, flowid, callback) {
        const flowId = flowid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/flow/project/delete?projectFlowId=${flowId}&log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteProjectFlowComponent(req, flowcompid, callback) {
        const flowCompId = flowcompid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/flowcomponent/project/delete?projectFlowCompId=${flowCompId}&log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }


    public deleteConnectorById(req, entityid, callback) {
        const entityId = entityid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/delete/quickConnectorbyid/${entityId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteConnectorByEntityId(req, entityid, callback) {
        const entityId = entityid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/delete/quickConnectorbyentityid/${entityId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}