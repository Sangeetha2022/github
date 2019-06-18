import * as util from 'util';
import { ComponentSupportWorker } from '../supportworker/ComponentSupportWorker';

let componentSupportWorker = new ComponentSupportWorker();
export class ComponentWorker {

    generateRouteFile(projectGenerationPath, templateLocationPath, routeObj) {
        componentSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, routeObj, (response) => {
            console.log('file generated and saved')
        })
    }
}