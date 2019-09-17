import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FlowManagerService {

    public getProjectFlowById(flowid, callback) {
        const flowId = flowid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/flow/getprojectflowbyid/${flowId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getProjectFlowCompById(flowCompid, callback) {
        const flowCompId = flowCompid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/flowcomponent/project/getbyid/${flowCompId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteProjectFlow(flowid, callback) {
        const flowId = flowid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/flow/project/delete?projectFlowId=${flowId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteProjectFlowComponent(flowcompid, callback) {
        const flowCompId = flowcompid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/flowcomponent/project/delete?projectFlowCompId=${flowCompId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}