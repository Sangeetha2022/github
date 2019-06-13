import * as util from 'util';
import { HeaderSupportWorker } from '../supportworker/HeaderSupportWorker';

let headerSupportWorker = new HeaderSupportWorker();
export class HeaderWorker {

    generateRouteFile(projectGenerationPath, templateLocationPath, routeObj) {
        headerSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, routeObj, (response) => {
            console.log('file generated and saved')
        })
    }
}