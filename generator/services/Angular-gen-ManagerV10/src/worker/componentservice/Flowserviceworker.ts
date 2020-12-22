import { Constant } from '../../assets/Constant'

export class FlowServiceWorker {
    /**
     * @param flows_info 
     * @param nodeResponse 
     * @param microflowObject 
     * Constructing Flows like GpCreate, GpUpdate, etc... http request methods
     */
    constructFlowsInfo(flows_info: Array<Object>, nodeResponse: any, microflowObject: any) {
        const flows = [];
        flows_info.forEach((flow: any) => {
            if (nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter((e) => {
                    if (flow.flowName === e.methodName) {
                        if (e.routeUrl.includes('/:id')) {
                            e.routeUrl = e.routeUrl.replace('/:id', '');
                        }
                        const duplicateFlows = flows.filter((e) => e.methodName === flow.flowName);
                        if (duplicateFlows.length === 0) {
                            e['sharedService'] = Constant.SHARED_SERVICE;
                            flows.push(e);
                        }
                    }
                });
            }
        });
        microflowObject.GpCodeToAdd['flows_info'] = flows;
        return microflowObject;
    }
}