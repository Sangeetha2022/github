import { Constant } from '../../config/Constant'
import { gpSearchBody } from '../../config/componentDependency';

export class SefFlowServiceWorker {
    /**
     * @param flows_info 
     * @param nodeResponse 
     * @param microflowObject 
     * Constructing Flows like GpCreate, GpUpdate, etc... http request methods
     */
    constructFlowsInfo(details, desktopElement, flows_info: Array<Object>, nodeResponse: any, microflowObject: any) {
        const flows = [];
        let gjs_components = JSON.parse(desktopElement['gjs-components'][0]);
        flows_info.forEach((flow: any) => {
            if (nodeResponse && nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter(async (e) => {
                    if (flow.flowName === e.methodName) {
                        if (e.routeUrl.includes('/:id')) {
                            e.routeUrl = e.routeUrl.replace('/:id', '');
                        }
                        const duplicateFlows = flows.filter((e) => e.methodName === flow.flowName);
                        if (duplicateFlows.length === 0) {
                            // Mapping GpSEF Flow Actions Body
                            if (e.methodName === Constant.GP_SEF_FLOW) {

                                e['body'] = `let jwt_token = sessionStorage.getItem('JwtToken');
                                \n \t \treturn this.http.${e.apiAction}(this.sharedService.DESKTOP_API + '${e.routeUrl}' + ${Constant.JWT_TOKEN}, ${e['paramName']});}
                                getChartData(Id:any): Observable<any> {
                                    return this.http.get(this.sharedService.DESKTOP_API + '/systemEntryFeature/chart/\${Id}');`;
                                flows.push(e);
                            }
                        }
                    }
                });
            }
        });
        microflowObject.GpCodeToAdd['flows_info'] = flows;
        console.log('flows info-------------------',flows)
        return microflowObject;
    }
}
