import * as util from 'util';
import { FooterSupportWorker } from '../supportworker/FooterSupportWorker';

let footerSupportWorker = new FooterSupportWorker();
export class FooterWorker {

    generateRouteFile(projectGenerationPath, templateLocationPath, routeObj) {
        footerSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, routeObj, (response) => {
            console.log('file generated and saved')
        })
    }
}