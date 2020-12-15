
export class FlowComponentWorker {

    constructFlowsInfo(flows_info: Array<Object>, nodeResponse: any) {
        const flows = [];
        flows_info.forEach((flow: any) => {
            let temp: any = { flowName: flow.flowName };
            if (nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter((e) => {
                    if (flow.flowName === e.methodName && (e.apiAction === 'post' || e.apiAction === 'put')) {
                        temp.parameterName = 'this.' + e.variableName;
                    }
                });
            }
            const duplicateFlows = flows.filter((e)  => e.flowName === flow.flowName);
            if(duplicateFlows.length === 0) {
                flows.push(temp);
            }
        });
        return flows;
    }
}