import { Constant } from '../config/Constant';
import * as util from 'util';
import { Common } from '../config/Common';
import * as path from 'path';

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
    constructGpRoute(route_info: Array<Object>, microflowObject: any) {
        if(route_info.length > 0) {
            const routes = [];
            route_info.forEach((element: any) => {
                let temp: any = {};
                temp.flowName = element.methodName;
                temp.navigationUrl = './' + element.screenName;
                temp.objectName = 'this.router';
                temp.parameterName = 'queryId'
                routes.push(temp);
            });
            routes.push({
                flowName: 'onSelectionChanged',
                parameterName: 'event',
            });
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