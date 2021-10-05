import { onSelectionChangedBody } from "../config/componentDependency";
import { onSelectionChangedBody_bootstrap } from "../config/componentDependency";

export class RouteWorker {

    /**
    * Constructing Microflows for Handlebars
    */
    private constructPayLoad() {
        const microflowObject = {
            GpHeaders: [],
            Gproutes: []
        }
        return microflowObject;
    }

    /**
     * @param route_info 
     * @param microflowObject 
     * Constructing the Route
     */
    constructGpRoute(route_info: Array<Object>, microflowObject: any, desktopElement) {
        if (route_info.length > 0) {
            const routes = [];
            route_info.forEach((element: any) => {
                let temp: any = {};
                temp.flowName = element.methodName;
                temp.parameterName = 'queryId';
                temp.body = `this.router.navigate(['./${element.screenName.toLowerCase()}'], { queryParams: { 'id': queryId } })`;
                routes.push(temp);
            });
            if (desktopElement.is_grid_present == true && desktopElement.is_bootStrapTable_present == false) {
                routes.push({
                    flowName: 'onSelectionChanged',
                    parameterName: 'event',
                    body: onSelectionChangedBody.join('\n \t \t')
                });
            }
            if (desktopElement.is_grid_present == true && desktopElement.is_bootStrapTable_present == true) {
                routes.push({
                    flowName: 'onSelectionChanged',
                    parameterName: 'values',
                    body: onSelectionChangedBody_bootstrap.join('\n \t \t')
                });
            }
            microflowObject.GpCodeToAdd['route_info'] = routes;
            if (microflowObject.GpCodeToAdd['route_info'].length > 0) {
                microflowObject.GpHeaders.push({
                    "importName": "Router",
                    "importPath": "@angular/router"
                });
                microflowObject.GpOptions.constructor.push({
                    "className": "Router",
                    "objectName": "router"
                });
            }
        } else {
            microflowObject.GpCodeToAdd['route_info'] = [];
        }
        return microflowObject;
    }
}