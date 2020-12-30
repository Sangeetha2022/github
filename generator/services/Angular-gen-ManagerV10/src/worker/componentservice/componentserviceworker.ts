import * as path from 'path';

import { FlowServiceWorker } from './Flowserviceworker';
import { Constant } from '../../config/Constant';
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';

const flowServiceWorker = new FlowServiceWorker();
const componentSupportWorker = new ComponentSupportWorker();

export class ComponentServiceWorker {
    /**
     * @param details 
     * @param callback 
     * Generate component.service file
     */
    generateComponentService(details: any, callback) {
        details = JSON.parse(JSON.stringify(details));
        details.desktop.forEach(async (desktopElement: any) => {
            const screenName = desktopElement.screenName.toLowerCase();
            const firstElement = screenName.charAt(0).toUpperCase();
            const otherElements = screenName.substring(1, screenName.length);
            let microflowObject: any = this.constructMicroFlows(details.flows);
            const gpHeaders = {
                importName: 'SharedService',
                importPath: '../../shared/shared.service'
            };
            microflowObject.GpHeaders.push(gpHeaders);
            microflowObject.GpOptions['className'] = firstElement + otherElements + 'Service';
            const constructor = [];
            const constructorObj = {
                className: 'SharedService',
                objectName: 'sharedService'
            };
            constructor.push(constructorObj);
            microflowObject.GpOptions['constructor'] = constructor;
            microflowObject.GpCodeToAdd = {};
            microflowObject = flowServiceWorker.constructFlowsInfo(desktopElement.flows_info, details.nodeResponse, microflowObject);
            const templatePath = path.resolve(__dirname, '../../../templates/ComponentService.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/src/app';
            const screenGenerationPath = applicationPath + `/${screenName}`;
            await componentSupportWorker.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName + '.service.ts');
            callback('Service File Generated Successfully', null);
        });
    }
    /**
     * @param flows 
     * Constructing Microflows for Handlebars
     */
    private constructMicroFlows(flows: Array<Object>) {
        if (flows && flows.length > 0) {
            const flow: any = flows[0];
            if (flow.components && flow.components.length > 0) {
                const components = flow.components.filter((e) => e.name === Constant.GP_ANGULAR_SERVICE_MICROFLOW && e.sequenceId === 2);
                if (components.length > 0) {
                    const microflows = components[0].microFlows;
                    if (microflows && microflows.length > 0) {
                        let microflowObject: Object = {};
                        microflows.forEach((microflow: any) => {
                            microflowObject[microflow.microFlowStepName] = []
                        });
                        return microflowObject;
                    }
                }
            }
        } else {
            const microflowObject = {
                GpHeaders: [],
                GpOptions: [],
                GpCodeToAdd: [],
                GpCheck_Connector: [],
                GpRequest: []
            }
            return microflowObject;
        }
    }
}
