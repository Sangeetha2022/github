import * as path from 'path';
import * as asyncLoop from 'node-async-loop';

import { ThirdPartyWorker } from '../ThirdPartyWorker';
import { FlowComponentWorker } from "./Flowcomponentworker";
import { Constant } from '../../config/Constant';
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';
import { RouteWorker } from '../Routeworker';
import { LinkWorker } from '../linkworker';
import { ComponentLifecycleWorker } from './componentlifecycle/componenetlifecycleworker';

const flowComponentWorker = new FlowComponentWorker();
const thirdPartyWorker = new ThirdPartyWorker();
const componentSupportWorker = new ComponentSupportWorker();
const routeWorker = new RouteWorker();
const linkWorker = new LinkWorker();
const componentLifecycleWorker = new ComponentLifecycleWorker();

export class ComponentWorker {
    /**
     * 
     * @param details 
     * @param callback 
     * Generate component.ts file
     */
    async generateComponentTs(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        asyncLoop(details.desktop, async (desktopElement, next) => {
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
            const entities = this.constructEntities(details.entities, desktopElement.entity_info, desktopElement);
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
            microflowObject = componentLifecycleWorker.constructLifecycle(details.desktop, desktopElement, microflowObject);
            microflowObject = thirdPartyWorker.constructAgGridComponents(desktopElement, microflowObject);
            microflowObject = thirdPartyWorker.constructThirdPartyComponents(desktopElement, microflowObject);
            const templatePath = path.resolve(__dirname, '../../../templates/ComponentTs.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/' + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME;
            const screenGenerationPath = applicationPath + `/${screenName}`;
            await componentSupportWorker.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName + '.component.ts');
            next();
        }, (err) => {
            if (!err) {
                callback('Component File Generated Successfully', null);
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
    private constructEntities(entities: Array<Object>, entity_info: Array<Object>, desktopElement) {
        // Mapping the entities for forms
        const entityIds = entity_info.map((e: any) => e.entityId);
        const entitiesFilter = entities.filter((e: any) => entityIds.includes(e._id));
        let entityArray: any = [];
        entitiesFilter.forEach((entity: any) => {
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
        return linkWorker.constructEntitiesForLinkWorker(desktopElement, entityArray, entities);
    }
}