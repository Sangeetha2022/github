import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

import { ThirdPartyWorker } from '../ThirdPartyWorker';
import { FlowComponentWorker } from "./Flowcomponentworker";
import { Common } from '../../config/Common';
import { Constant } from '../../assets/Constant';
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';
import { RouteWorker } from '../Routeworker';

const flowComponentWorker = new FlowComponentWorker();
const thirdPartyWorker = new ThirdPartyWorker();
const componentSupportWorker = new ComponentSupportWorker();
const routeWorker = new RouteWorker();

export class ComponentWorker {
    /**
     * 
     * @param details 
     * @param callback 
     * Generate component.ts file
     */
    generateComponent(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        console.log('DETAILS--->>>>', JSON.stringify(details));
        details.desktop.forEach(async (desktopElement: any) => {
            const screenName = desktopElement.screenName.toLowerCase();
            const firstElement = screenName.charAt(0).toUpperCase();
            const otherElements = screenName.substring(1, screenName.length);
            let microflowObject: any = this.constructMicroFlows(details.flows);
            const gpHeaders = {
                importName: firstElement + otherElements + 'Service',
                importPath: './' + screenName + '.service.ts'
            };
            microflowObject.GpHeaders.push(gpHeaders);
            microflowObject.GpOptions = {};
            microflowObject.GpOptions['screenName'] = screenName;
            microflowObject.GpOptions['className'] = firstElement + otherElements + 'Component';
            const entities = this.constructEntities(details.entities, desktopElement.entity_info);
            microflowObject.GpOptions['entities'] = entities;
            microflowObject.GpOptions['variables'] = [];
            microflowObject.GpOptions['arrayVariables'] = [];
            const constructor = [];
            const constructorObj = {
                className: firstElement + otherElements + 'Service',
                objectName: screenName + 'Service'
            };
            constructor.push(constructorObj);
            microflowObject.GpOptions['constructor'] = constructor;
            microflowObject.GpCodeToAdd = {};
            microflowObject = flowComponentWorker.constructFlowsInfo(desktopElement.flows_info, details.nodeResponse, microflowObject, entities);
            microflowObject = routeWorker.constructGpRoute(desktopElement.route_info, microflowObject);
            microflowObject = flowComponentWorker.constructLifecycle(details.desktop, desktopElement, microflowObject);
            microflowObject = thirdPartyWorker.constructAgGridComponents(desktopElement, microflowObject);
            microflowObject = thirdPartyWorker.constructThirdPartyComponents(desktopElement, microflowObject);
            const templatePath = path.resolve(__dirname, Constant.COMPONENT_PATH);
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + Constant.SRC_APP;
            const screenGenerationPath = applicationPath + `/${screenName}`
            await componentSupportWorker.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName + '.component.ts');
            callback('Component File Generated Successfully', null);
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
                const components = flow.components.filter((e) => e.name === Constant.GP_ANGULAR_COMPONENT_MICROFLOW && e.sequenceId === 1);
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
    /**
     * @param entities 
     * @param entity_info 
     * Constructing Entities for Handlebars
     */
    private constructEntities(entities: Array<Object>, entity_info: Array<Object>) {
        const entityIds = entity_info.map((e: any) => e.entityId);
        entities = entities.filter((e: any) => entityIds.includes(e._id));
        let entityArray: any = [];
        entities.forEach((entity: any) => {
            let entityObject: any = {};
            entityObject.name = entity.name;
            if (entity.field && entity.field.length > 0) {
                const fieldName = [];
                entity.field.map(e => {
                    fieldName.push({ name: e.name });
                });
                entityObject.field = fieldName;
                entityArray.push(entityObject);
            }
        });
        return entityArray;
    }
}