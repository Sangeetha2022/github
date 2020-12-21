import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { Common } from '../../config/Common';
import { FlowServiceWorker } from './Flowserviceworker'

const flowServiceWorker = new FlowServiceWorker();
export class ComponentServiceWorker {
    generateComponentService(details: any, callback) {
        details = JSON.parse(JSON.stringify(details));
        details.desktop.forEach(async (desktopElement: any) => {
            const screenName = desktopElement.screenName;
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
            console.log('Service MicroflowObject------->>>>>>', JSON.stringify(microflowObject));
            const templatePath = path.resolve(__dirname, '../../../templates/service.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/src/app';
            const screenGenerationPath = applicationPath + `/${screenName}`;
            await this.handleBarsFile(templatePath, microflowObject, screenGenerationPath, screenName);
        });
    }

    private constructMicroFlows(flows: Array<Object>) {
        if (flows && flows.length > 0) {
            const flow: any = flows[0];
            if (flow.components && flow.components.length > 0) {
                const components = flow.components.filter((e) => e.name === 'GpAngularService' && e.sequenceId === 2);
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

    private handleBarsFile(filePath, fileData, screenGenerationPath, screenName) {
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
                fs.writeFile(screenGenerationPath + `/${screenName}.service.ts`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
    // public generateComponentService(applicationPath, templatePath, componentName, information, callback) {
    //     const temp = {
    //         folderName: componentName.toLowerCase(),
    //         className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
    //         importDependency: [],
    //         importComponent: [],
    //         serviceVariable: null,
    //         serviceConstructorParams: [],
    //         serviceMethod: []
    //     }
    //     flowServiceWorker.generateServiceComponentFlow(information, temp, templatePath);
    //     componentSupportWorker.generateComponent(applicationPath, templatePath,
    //         `${componentName.toLowerCase()}.${Constant.SERVICE_EXTENSION}.${Constant.TS_EXTENSION}`,
    //         Constant.SERIVCE_TEMPLATENAME, temp, (response) => {
    //             callback();
    //         });
    // }
}
