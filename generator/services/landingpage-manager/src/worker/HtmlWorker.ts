import * as util from 'util';
import { HtmlSupportWorker } from '../supportworker/HtmlSupportWorker';

let htmlSupportWorker = new HtmlSupportWorker();
export class HtmlWorker {

    generateRouteFile(projectGenerationPath, templateLocationPath, routeObj) {
        htmlSupportWorker.generateRouteFile(projectGenerationPath, templateLocationPath, routeObj, (response) => {
            console.log('file generated and saved')
        })
    }
}