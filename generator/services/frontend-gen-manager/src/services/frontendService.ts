import { Request } from 'mongoose';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService';
import { AngularGenManagerService } from '../apiservices/AngularGenManagerService';
import * as util from 'util';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { ScreenManagerService } from '../apiservices/ScreenManagerService';
import { Common } from '../config/Common';

export class FrontendService {
    private desktopScreenName = 'desktop';
    private mobileScreenName = 'mobile';
    private angular7Name = 'angular7';
    sharedService = new SharedService();
    angularGenManagerService = new AngularGenManagerService();
    microFlowService = new MicroFlowManagerService();
    screenManagerService = new ScreenManagerService();
    apiAdapter = new ApiAdaptar()
    backend: String;

    public async frontendProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        const projectGenerationPath = `${details.project.projectGenerationPath}/${details.project.name}/frontend`;
        Common.createFolders(projectGenerationPath);
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
        console.log('desktop json values rae ---@@@@@------- ', desktopJSON, ' ---length0---- ', desktopJSON.length);
        console.log('mobile json values rae ----######------ ', mobileJSON, ' ---length---- ', mobileJSON.length);
        let flowCount = 0;
        let flowComponentCount = 0;
        try {
            asyncLoop(details.feature.flows, (flowElement, flowNext) => {
                console.log(`each flows are --@@@@@@@@@@@  ${flowCount}  `, flowElement, ' length  ', flowElement.components.length);
                const flows = {
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
                    flows.name = flowElement.name;
                    flows.label = flowElement.label;
                    flows.description = flowElement.description;
                    flows.type = flowElement.type;
                    flows.actionOnData = flowElement.actionOnData;
                    flows.createWithDefaultActivity = flowElement.createWithDefaultActivity;
                }
                if (flowElement.components.length === 0) {
                    flowCount++;
                    flowNext();
                } else {
                    console.log('before asyn loop of components rae -tttttttttt--- ', flowElement);
                    asyncLoop(flowElement.components, async (componentElement, componentNext) => {

                        console.log(`each compopneont are ---$$$$$$$$- ${flowComponentCount} - `, componentElement);

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



            }, async (flowErr) => {
                if (flowErr) {

                } else {
                    console.log('flow iteration completed %%%%%%%%%%%%% ----- ', util.inspect(feature, { showHidden: true, depth: null }));
                    if(desktopJSON.length > 0) {
                        feature.desktop = desktopJSON;
                        const angularDesktopResponse = await this.generateAngular(feature);
                    }
                    if(mobileJSON.length > 0) {
                        feature.mobile = mobileJSON;
                    }
                    // const node = await this.generateNode(feature);
                    // console.log('node %%%%%%%%%%%%% ----- ', util.inspect(node, { showHidden: true, depth: null }));
                    // callback(node);
                }
            })
        }
        catch (e) {
            console.log('each catches are-- ----   ', e);
            // callback('Something went wrong in backend gen manager microservices', 400);
        }

        callback();
    }

    generateAngular(details) {
        return new Promise(resolve => {
            this.angularGenManagerService.generateAngular(details, (data) => {
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

  }