import { moduleHeaders } from '../../assets/componentDependency';
import { Common } from '../../config/Common';
import * as path from 'path';

export class ComponentModuleWorker {
    /**
     * @param details 
     * @param callback 
     * Generate module.ts file
     */
    generateComponentModule(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        details.desktop.forEach(async (desktopElement: any) => {
            const screenName = desktopElement.screenName;
            const firstElement = screenName.charAt(0).toUpperCase();
            const otherElements = screenName.substring(1, screenName.length);
            let microflowObject: any = this.constructMicroFlows();
            microflowObject.GpCodeToAdd = {};
            microflowObject.GpOptions = {};
            microflowObject.GpOptions['className'] = firstElement + otherElements + 'Module';
            microflowObject = this.constructHeaders(desktopElement, microflowObject);
            microflowObject = this.constructModuleRoutes(desktopElement, microflowObject);
            microflowObject.GpOptions['components'] = [{ name: firstElement + otherElements + 'Component' }];
            const templatePath = path.resolve(__dirname, '../../../templates/module.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/src/app';
            const screenGenerationPath = applicationPath + `/${screenName}`
            await Common.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName + '.module.ts');
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
        const otherElements = screenName.substring(1, screenName.length);
        const componentName = firstElement + otherElements + 'Component';
        const componentObject = {
            importName: componentName,
            importPath: './' + screenName + '.component'
        }
        microflowObject.GpHeaders.push(componentObject);
        if(desktopElement.is_grid_present && desktopElement.is_grid_present === true) {
            microflowObject.GpHeaders.push({importName: 'AgGridModule', importPath: 'ag-grid-angular'});
            microflowObject.GpOptions['modules'].push({ name: 'AgGridModule' });
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
        const otherElements = screenName.substring(1, screenName.length);
        const componentName = firstElement + otherElements + 'Component';
        const routingObject = { path: '', component: componentName }
        microflowObject.GpCodeToAdd['routes'] = [];
        microflowObject.GpCodeToAdd['routes'].push(routingObject);
        return microflowObject;
    }
}