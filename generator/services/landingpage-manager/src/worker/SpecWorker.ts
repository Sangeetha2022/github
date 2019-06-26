import * as util from 'util';
import { SpecSupportWorker } from '../supportworker/SpecSupportWorker';

let specSupportWorker = new SpecSupportWorker();
export class SpecWorker {

    generateRouteFile(projectGenerationPath, templateLocationPath, routeObj) {
        specSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, routeObj, (response) => {
            console.log('file generated and saved')
        })
    }
}