import { Request } from 'express';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService';
import { AngularGenManagerService } from '../apiservices/AngularGenManagerService';
import { ReactGenManagerService } from '../apiservices/ReactGenManagerService'
import * as util from 'util';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { ScreenManagerService } from '../apiservices/ScreenManagerService';
import { TemplateManagerService } from '../apiservices/TemplateManagerService';
import { Common } from '../config/Common';
import { Constant } from '../config/Constant';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

export class FrontendService {
    private desktopScreenName = 'desktop';
    private mobileScreenName = 'mobile';
    private angular7Name = 'angular7';
    sharedService = new SharedService();
    angularGenManagerService = new AngularGenManagerService();
    microFlowService = new MicroFlowManagerService();
    screenManagerService = new ScreenManagerService();
    templateManagerService = new TemplateManagerService();
    reactgenManagerService = new ReactGenManagerService ();
    apiAdapter = new ApiAdaptar()
    backend: String;

    public async frontendProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        let screenFlows = [];
        // Common.createFolders();
        // const projectGenerationPath = `${details.project.projectGenerationPath}/${details.project.name}/frontend`;
        let projectGenerationPath = `${details.projectGenerationPath}/${Constant.DESKTOP_FOLDERNAME}`;
        Common.createFolders(projectGenerationPath);
        projectGenerationPath += `/${details.project.name}`
        const feature = {
            featureName: details.feature.name,
            projectGenerationPath: projectGenerationPath,
            templateLocation: details.project.templateLocation,
            projectName: details.project.name,
            primaryLanguage: details.project.defaultHumanLanguage,
            secondaryLanguage: details.project.otherHumanLanguage,
            clientLanguage: details.project.clientLanguage,
            clientFramework: details.project.clientFramework,
            entities: details.feature.entities,
            nodeResponse: details.nodeResponse,
            cssGuidelines: [],
            desktop: null,
            mobile: null,
            flows: []
        }
        // const flows = await this.getFlows(details.flows);
        console.log('backend server language  ---- ', details.project);
        // console.log('backend flows length-- ', details.flows.length);
        // console.log('backend flows  component length -0- ', details.flows[0].components.length);
        // console.log('backend flows  component length -1- ', details.flows[1].components.length);
        console.log('frontend gen manager create project are ---- ', util.inspect(details, { showHidden: true, depth: null }));
        const screenDetails = await this.getScreenByFeatureId(details.feature.id);
        console.log('screens project are ---- ', util.inspect(screenDetails, { showHidden: true, depth: null }));
        const screenJSON = JSON.parse(screenDetails.toString());
        console.log('json screens ttest are ---- ', screenJSON);
        console.log('json screens ttest are -body345--- ', screenJSON.body);
        if (!screenJSON) {
            console.error('screen based on feature id is not exist');
        }
        console.log('screen json values are ----#$#$#$#$#$#$$$$-------- ', screenJSON);
        const desktopJSON = screenJSON.body.filter((data) => {
            return data.screenType === this.desktopScreenName;
        })
        const mobileJSON = screenJSON.body.filter((data) => {
            return data.screenType === this.mobileScreenName;
        })
        // const templateDetails = await this.getTemplateByProjectId(details.projectId);
        const templateDetails = await this.getTemplateByName(details.project.projectTemplatename);

        // console.log('screens project are ---- ', util.inspect(screenDetails, { showHidden: true, depth: null }));
        const templateJSON = JSON.parse(templateDetails.toString());
        if (templateJSON) {
            feature.cssGuidelines = templateJSON.body['css-guidelines'];
        }
        // const start = new Date()
        // const hrstart = process.hrtime()
        // console.info('starting Execution time: %dms', start)
        // console.info('starting Execution time (hr): %ds %dms', hrstart[0], hrstart[1] / 1000000)
        // // const test = new Date();
        // // const end = test - start,

        // screenJSON.body.forEach(screenElement => {
        //     console.log('secreen object are -----  ', screenElement);
        //     screenFlows = screenFlows.concat(screenElement.flows_info);
        // });

        // let hrend = process.hrtime(hrstart)
        // // console.info('ending Execution time: %dms', end)
        // console.info('ending Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
        // console.log('after added in screenFlows -----  ', screenFlows);

        // console.log('desktop json values rae ---@@@@@------- ', desktopJSON, ' ---length0---- ', desktopJSON.length);
        // console.log('mobile json values rae ----######------ ', mobileJSON, ' ---length---- ', mobileJSON.length);
        let flowCount = 0;
        let flowComponentCount = 0;
        try {
            asyncLoop(details.feature.flows, (flowElement, flowNext) => {
                if (!flowElement) {
                    flowNext();
                } else {
                    console.log(`each flows are --@@@@@@@@@@@  ${flowCount}  `, flowElement);
                    const flows = {
                        _id: '',
                        name: '',
                        label: '',
                        description: '',
                        type: '',
                        actionOnData: '',
                        createWithDefaultActivity: 0,
                        components: [],

                    }

                    if (flowElement === undefined) {
                        flowCount++;
                        flowNext();
                    } else {
                        flows._id = flowElement._id;
                        flows.name = flowElement.name;
                        flows.label = flowElement.label;
                        flows.description = flowElement.description;
                        flows.type = flowElement.type;
                        flows.actionOnData = flowElement.actionOnData;
                        flows.createWithDefaultActivity = flowElement.createWithDefaultActivity;
                    }
                    if (!flowElement.components ||
                        (flowElement.components && flowElement.components.length === 0)) {
                        flowCount++;
                        flowNext();
                    } else {
                        console.log('before asyn loop of components rae -tttttttttt--- ', flowElement);
                        asyncLoop(flowElement.components, async (componentElement, componentNext) => {

                            console.log(`each compopneont are ---$$$$$$$$- ${flowComponentCount} - `, componentElement.connector);

                            const flowComponent = {
                                name: '',
                                label: '',
                                description: '',
                                type: '',
                                sequenceId: 0,
                                devLanguage: '',
                                devFramework: '',
                                microFlows: [],
                                connector: []
                            }
                            if (componentElement === undefined && componentElement.length === 0) {
                                flowComponentCount++;
                                componentNext();
                            } else {
                                flowComponent.name = componentElement.name;
                                flowComponent.label = componentElement.label;
                                flowComponent.description = componentElement.description;
                                flowComponent.type = componentElement.type;
                                flowComponent.sequenceId = componentElement.sequenceId;
                                flowComponent.devLanguage = componentElement.devLanguage;
                                flowComponent.devFramework = componentElement.devFramework;

                                if (componentElement.devLanguage !== feature.clientLanguage.name) {
                                    flowComponentCount++;
                                    componentNext();
                                } else if (componentElement.microFlows.length === 0) {
                                    flows.components.push(flowComponent);
                                    flowComponentCount++;
                                    componentNext();
                                } else {
                                    const microFlows = await this.getMicroFlows(componentElement.microFlows);
                                    flowComponent.microFlows = JSON.parse(JSON.stringify(microFlows)).body;
                                    flowComponent.connector = componentElement.connector;
                                    flows.components.push(flowComponent);
                                    flowComponentCount++;
                                    componentNext();
                                }
                            }

                        }, (compErr) => {
                            if (compErr) {

                            } else {
                                feature.flows.push(flows);
                                console.log('flow component iteration done %%%%%11%%%%%%%%%% ', feature);
                                flowCount++;
                                flowNext();
                            }
                        })
                    }


                }

            }, async (flowErr) => {
                if (flowErr) {

                } else {
                    console.log('flow iteration completed %%%%%%%%%%%%% ----- ', util.inspect(feature, { showHidden: true, depth: null }));
                    let angularDesktopResponse = null;
                    if (desktopJSON.length > 0) {
                        if (feature.clientFramework.label == 'Angular 12') {
                            console.log("inside angular 12 angulargenmanager frontend");
                            feature.desktop = desktopJSON;
                            angularDesktopResponse = await this.generateAngularV12(feature);
                            console.log('final angular desktop response values are for version 12 -----  ', angularDesktopResponse);
                        }
                        if (feature.clientFramework.label == 'Angular 13') {
                            console.log("inside angular 13 angulargenmanager frontend");
                            feature.desktop = desktopJSON;
                            angularDesktopResponse = await this.generateAngularV13(feature);
                            console.log('final angular desktop response values are for version 13 -----  ', angularDesktopResponse);
                        }
                        if(feature.clientFramework.label.includes('Angular') && feature.clientFramework.label != 'Angular 12') {
                            feature.desktop = desktopJSON;
                            angularDesktopResponse = await this.generateAngular(feature);
                            console.log('final angular desktop response values are -----  ', angularDesktopResponse);
                        }
                        if(feature.clientFramework.label.includes('React')) {
                            feature.desktop = desktopJSON;
                            // angularDesktopResponse = await this.generateReact(feature);
                        }
                       
                    }
                    if (mobileJSON.length > 0) {
                        feature.mobile = mobileJSON;
                    }
                    console.log('final flow of angular desktop response ----->>  ', angularDesktopResponse);
                    if(!angularDesktopResponse) {
                        angularDesktopResponse = 'Data not found';
                    }
                    callback(angularDesktopResponse);

                    // const node = await this.generateNode(feature);
                    // console.log('node %%%%%%%%%%%%% ----- ', util.inspect(node, { showHidden: true, depth: null }));
                    // callback(node);
                }
            })
        }
        catch (e) {
            console.log('each catches are-- ----   ', e);
            callback(e);
            // callback('Something went wrong in backend gen manager microservices', 400);
        }

    }

    generateAngular(details) {
        return new Promise(resolve => {
            console.log('angular generate manager ang gen', details);
            this.angularGenManagerService.generateAngular(details, (data) => {
                resolve(data);
            })
        })
    }

    generateAngularV13(details) {
        return new Promise(resolve => {
            console.log('angular generate manager ang gen for version 13', details);
            this.angularGenManagerService.generateAngularV13(details, (data) => {
                resolve(data);
            })
        })
    }

    generateAngularV12(details) {
        return new Promise(resolve => {
            console.log('angular generate manager ang gen for version 12', details);
            this.angularGenManagerService.generateAngularV12(details, (data) => {
                resolve(data);
            })
        })
    }

    generateReact(details) {
        return new Promise(resolve => {
            console.log('entering to the generate react app--------->>>');
            this.reactgenManagerService.generateReact(details, (data) => {
                resolve(data);
            })
        })
    }

    getMicroFlows(microFlowIDs) {
        return new Promise(resolve => {
            this.microFlowService.getMicroFlows(microFlowIDs, (data) => {
                resolve(data);
            });
        })
    }

    getScreenByFeatureId(featureId) {
        return new Promise(resolve => {
            this.screenManagerService.getScreenByFeatureId(featureId, (data) => {
                resolve(data);
            })
        })
    }

    getTemplateByProjectId(projectId) {
        return new Promise(resolve => {
            this.screenManagerService.getTemplateByProjectId(projectId, (data) => {
                resolve(data);
            })
        })
    }

    getTemplateByName(templateName) {
        return new Promise(resolve => {
            this.templateManagerService.getTemplateByName(templateName, (data) => {
                resolve(data);
            })
        })
    }

}