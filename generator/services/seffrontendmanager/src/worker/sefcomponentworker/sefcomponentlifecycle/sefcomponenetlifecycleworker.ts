import { queryParamSubscribe } from "../../../config/componentDependency";
import { Constant } from "../../../config/Constant";

export class SefComponentLifecycleWorker {
    /**
     * @param desktop 
     * @param desktopElement 
     * @param microflowObject 
     * Constructing Lifecycle
     */
    constructLifecycle(desktop: Array<Object>, desktopElement: any, microflowObject: any) {
        const lifecycle = [];
        const routeInfoObject: Array<Object> = desktop.filter((e: any) => e.route_info.length > 0);
        routeInfoObject.forEach((element: any) => {
            const routeInfo = element.route_info.filter((e: any) => e.screenId === desktopElement._id);
            if (routeInfo && routeInfo.length > 0) {
                const temp: any = {};
                temp.queryParams = true;
                temp.queryParamSubscribe = queryParamSubscribe.join('\n \t \t');
                lifecycle.push(temp);
            }
        });
        microflowObject.GpCodeToAdd['lifecycle_info'] = lifecycle;
        if (microflowObject.GpCodeToAdd['lifecycle_info'].length > 0) {
            microflowObject.GpCodeToAdd['lifecycle_info'].forEach((element: any) => {
                if (element.queryParams && element.queryParams === true) {
                    microflowObject.GpHeaders.push({
                        "importName": "ActivatedRoute",
                        "importPath": "@angular/router"
                    });
                    microflowObject.GpOptions.constructor.push({
                        "className": "ActivatedRoute",
                        "objectName": "activatedRoute"
                    });
                }
            });
        }
        microflowObject.GpCodeToAdd['flows_info'].forEach((element: any) => {
            if (element.flowName === Constant.GP_GETALLVALUES_FLOW) {
                microflowObject.GpCodeToAdd['lifecycle_info'].push({ getAll: true });
            }
        });
        return microflowObject;
    }
}