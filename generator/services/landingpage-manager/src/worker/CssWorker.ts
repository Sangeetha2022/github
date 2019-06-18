import * as util from 'util';
import { CssSupportWorker } from '../supportworker/CssSupportWorker';

let cssSupportWorker = new CssSupportWorker();
export class CssWorker {

    generateRouteFile(projectGenerationPath, templateLocationPath, routeObj) {
        cssSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, routeObj, (response) => {
            console.log('file generated and saved')
        })
    }
}