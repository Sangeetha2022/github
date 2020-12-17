import { FlowComponentWorker } from "./flowComponentWorker";
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { Common } from '../../config/Common';
import * as path from 'path';
import { ThirdPartyWorker } from '../ThirdPartyWorker'

const flowComponentWorker = new FlowComponentWorker();
const thirdPartyWorker = new ThirdPartyWorker();

export class ComponentWorker {
    generateComponent(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        console.log('DETAILS--->>>>', JSON.stringify(details));
        details.desktop.forEach(async (desktopElement: any) => {
            const screenName = desktopElement.screenName;
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
            microflowObject.GpOptions['className'] = firstElement + otherElements + 'Component';;
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
            microflowObject = flowComponentWorker.constructGpRoute(desktopElement.route_info, microflowObject);
            microflowObject = flowComponentWorker.constructLifecycle(details.desktop, desktopElement, microflowObject);
            microflowObject = thirdPartyWorker.constructAgGridComponents(desktopElement, microflowObject);
            console.log('microflowObject------->>>>>>', JSON.stringify(microflowObject));
            let templatePath = path.resolve(__dirname, '../../../templates/component.handlebars');
            let projectGenerationPath = details.projectGenerationPath;
            let applicationPath = projectGenerationPath + '/src/app';
            let screenGenerationPath = applicationPath + `/${screenName}`
            let result: any = await this.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName);
        });
    }
    constructMicroFlows(flows: Array<Object>) {
        if (flows && flows.length > 0) {
            const flow: any = flows[0];
            if (flow.components && flow.components.length > 0) {
                const components = flow.components.filter((e) => e.name === 'GpAngularComponent' && e.sequenceId === 1);
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
        }
    }
    constructEntities(entities: Array<Object>, entity_info: Array<Object>) {
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

    handleBarsFile(filePath, fileData, screenGenerationPath, screenName) {
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
                    switch (operator)
                    {
                        case "==":
                            return (v1==v2)?options.fn(this):options.inverse(this);
                
                        case "!=":
                            return (v1!=v2)?options.fn(this):options.inverse(this);
                
                        case "===":
                            return (v1===v2)?options.fn(this):options.inverse(this);
                
                        case "!==":
                            return (v1!==v2)?options.fn(this):options.inverse(this);
                
                        case "&&":
                            return (v1&&v2)?options.fn(this):options.inverse(this);
                
                        case "||":
                            return (v1||v2)?options.fn(this):options.inverse(this);
                
                        case "<":
                            return (v1<v2)?options.fn(this):options.inverse(this);
                
                        case "<=":
                            return (v1<=v2)?options.fn(this):options.inverse(this);
                
                        case ">":
                            return (v1>v2)?options.fn(this):options.inverse(this);
                
                        case ">=":
                         return (v1>=v2)?options.fn(this):options.inverse(this);
                
                        default:
                            return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
                    }
                });
                var source = data;
                var template = Handlebars.compile(source);
                var result = template(fileData);
                Common.createFolders(screenGenerationPath);
                fs.writeFile(screenGenerationPath + `/${screenName}.component.ts`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
}