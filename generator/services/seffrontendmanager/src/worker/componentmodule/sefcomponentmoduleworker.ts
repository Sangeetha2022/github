import * as path from 'path';
import * as asyncLoop from 'node-async-loop';

import { moduleHeaders } from '../../config/componentDependency';
import { SefComponentSupportWorker } from '../../supportworker/sefcomponentsupportworker/sefcomponentsupportworker';
import { ThirdPartyWorker } from '../ThirdPartyWorker';

const sefcomponentSupportWorker = new SefComponentSupportWorker();
const thirdPartyWorker = new ThirdPartyWorker();
export class SefComponentModuleWorker {
    /**
     * @param details 
     * @param callback 
     * Generate module.ts file
     */
    async generateComponentModule(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        asyncLoop(details.desktop, async (desktopElement, next) => {
            const screenName = desktopElement.screenName.toLowerCase();
            const firstElement = screenName.charAt(0).toUpperCase();
            const otherElements = screenName.substring(1, screenName.length);
            let microflowObject: any = this.constructMicroFlows();
            microflowObject.GpCodeToAdd = {};
            microflowObject.GpOptions = {};
            microflowObject.GpOptions['className'] = firstElement + otherElements + 'Module';
            microflowObject = this.constructHeaders(desktopElement, microflowObject);
            microflowObject = this.constructModuleRoutes(desktopElement, microflowObject);
            microflowObject.GpOptions['components'] = [{ name: firstElement + otherElements + 'Component' }];
            microflowObject = thirdPartyWorker.constructThirdPartyModuleHeaders(desktopElement, microflowObject);
            console.log('path genrate test------', microflowObject, microflowObject.GpCodeToAdd.routes);
            
            const templatePath = path.resolve(__dirname, '../../../templates/module.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/src/app';
            const screenGenerationPath = applicationPath + `/${screenName}`
            await sefcomponentSupportWorker.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName + '.module.ts');
            next();
        }, (err) => {
            if(!err) {
                callback('Module File Generated Successfully', null);
            }
        });
    }
    /**
     * Constructing Microflows for Handlebars
     */
    private constructMicroFlows() {
        const microflowObject = {
            GpHeaders: [],
            GpOptions: [],
            GpCodeToAdd: [],
            GpCheck_Connector: [],
            GpRequest: []
        }
        return microflowObject;
    }
    /**
     * 
     * @param desktopElement 
     * @param microflowObject 
     * Constructing Headers for import section
     */
    private constructHeaders(desktopElement, microflowObject) {
        microflowObject.GpOptions['modules'] = [];
        microflowObject.GpOptions['modules'].push({ name: moduleHeaders[0].importName });
        microflowObject.GpHeaders.push(moduleHeaders[0]);
        const screenName = desktopElement.screenName;
        const firstElement = screenName.charAt(0).toUpperCase();
        const otherElements = screenName.substring(1, screenName.length).toLowerCase();
        const componentName = firstElement + otherElements + 'Component';
        const componentObject = {
            importName: componentName,
            importPath: './' + screenName.toLowerCase() + '.component'
        }
        microflowObject.GpHeaders.push(componentObject);
        if(desktopElement.is_grid_present && desktopElement.is_grid_present === true  && desktopElement.is_bootStrapTable_present == false) {
            microflowObject.GpHeaders.push({importName: 'AgGridModule', importPath: 'ag-grid-angular'});
            microflowObject.GpOptions['modules'].push({ name: 'AgGridModule' });
        }
        if(desktopElement.is_grid_present && desktopElement.is_grid_present === true && desktopElement.is_bootStrapTable_present == true) {
            microflowObject.GpHeaders.push({importName: 'NgbPaginationModule, NgbAlertModule', importPath: '@ng-bootstrap/ng-bootstrap'}, );
            microflowObject.GpOptions['modules'].push({ name: 'NgbPaginationModule' });
        }
        return microflowObject;
    }

    /**
     * 
     * @param desktopElement 
     * @param microflowObject 
     * Constructing Routing objects for modules
     */
    private constructModuleRoutes(desktopElement, microflowObject) {
        const screenName = desktopElement.screenName;
        const firstElement = screenName.charAt(0).toUpperCase();
        const otherElements = screenName.substring(1, screenName.length).toLowerCase();
        const componentName = firstElement + otherElements + 'Component';
        const routingObject = { path: '', component: componentName }
        microflowObject.GpCodeToAdd['routes'] = [];
        microflowObject.GpCodeToAdd['routes'].push(routingObject);
        return microflowObject;
    }
}