import * as util from 'util';
import { RouteSupportWorker } from '../supportworker/RouteSupportWorker';

let routeSupportWorker = new RouteSupportWorker();
export class RouteWorker {

    generateRouteFile(projectGenerationPath, templateLocationPath, routeObj) {
        routeSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, routeObj, (response) => {
            console.log('file generated and saved')
        })
    }
}