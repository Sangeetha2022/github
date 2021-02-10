import * as path from 'path';
import * as asyncLoop from 'node-async-loop';

import { FlowServiceWorker } from './Flowserviceworker';
import { Constant } from '../../config/Constant';
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';
import { constructorObj } from '../../config/componentDependency';

const flowServiceWorker = new FlowServiceWorker();
const componentSupportWorker = new ComponentSupportWorker();

export class ComponentServiceWorker {
    /**
     * @param details 
     * @param callback 
     * Generate component.service file
     */
    async generateComponentService(details: any, callback) {
        details = JSON.parse(JSON.stringify(details));
        asyncLoop(details.desktop, async (desktopElement, next) => {
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
            constructorObj.forEach(element => {
                constructor.push(element);
            });
            microflowObject.GpOptions['constructor'] = constructor;
            microflowObject.GpCodeToAdd = {};
            microflowObject = flowServiceWorker.constructFlowsInfo(details, desktopElement, desktopElement.flows_info, details.nodeResponse, microflowObject);
            const templatePath = path.resolve(__dirname, '../../../templates/ComponentService.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/src/app';
            const screenGenerationPath = applicationPath + `/${screenName}`;
            await componentSupportWorker.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName + '.service.ts');
            next();
        }, (err) => {
            if(!err) {
                callback('Service File Generated Successfully', null);
            }
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
