/*
Don't delete this comment what so ever !!!.
In this file a condition has been added to check the flows array length if there is no flow 
been added to project feature we are not going to generate any node code except for the model file.
This issue is addressed in brief on the github card number #386 created by Kishan.R on 11th May 2020.
*/
import { Request } from 'mongoose';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService';
import { NodeGenManagerService } from '../apiservices/NodeGenManagerService';
import * as util from 'util';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { DataStoreManagerService } from '../apiservices/DataStoreManagerService';
import { Common } from '../config/Common';

export class BackendService {
    sharedService = new SharedService();
    nodeService = new NodeGenManagerService();
    microFlowService = new MicroFlowManagerService();
    dataStoreService = new DataStoreManagerService();
    apiAdapter = new ApiAdaptar()
    backend: String;

    public async createProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        // const flows = await this.getFlows(details.flows);
        // console.log('backend server language  ---- ', details.project.serverLanguage);
        // console.log('backend flows length-- ', details.flows.length);
        // console.log('backend flows  component length -0- ', details.flows[0].components.length);
        // console.log('backend flows  component length -1- ', details.flows[1].components.length);
        console.log('backend gen manager create project are ---- ', util.inspect(details, { showHidden: true, depth: null }));
        const backendPath = `${details.projectGenerationPath}`;
        const microservicePath = `${backendPath}/${details.name}`;
        Common.createFolders(backendPath);
        Common.createFolders(microservicePath);
        const feature = {
            featureName: details.name,
            applicationPort: details.applicationPort,
            projectGenerationPath: microservicePath,
            templateLocation: details.project.templateLocation,
            projectName: details.project.name,
            primaryLanguage: details.project.defaultHumanLanguage,
            secondaryLanguage: details.project.otherHumanLanguage,
            serverLanguage: details.project.serverLanguage,
            serverFramework: details.project.serverFramework,
            serverDatabase: details.project.serverDatabase,
            entities: details.entities,
            entitySchema: [],
            flows: []
        }
        const dataStore = await this.getDataStore(feature);
        console.log('dataStore values are backend services are --###@@@@@@--- ', dataStore);
        feature.entitySchema = JSON.parse(JSON.stringify(dataStore)).body;
        console.log('all feature value are------  ', feature);

        // const flows = {
        //     name: '',
        //     label: '',
        //     description: '',
        //     type: '',
        //     actionOnData: '',
        //     createWithDefaultActivity: 0,
        //     components: [],

        // }
        // const flowComponent = {
        //     name: '',
        //     label: '',
        //     description: '',
        //     type: '',
        //     sequenceId: 0,
        //     devLanguage: '',
        //     devFramework: '',
        //     microFlows: [],
        //     connector: []
        // }
        let flowCount = 0;
        let flowComponentCount = 0;
        try {
            if (details.flows.length > 0) { // the above comment refers this !!!.
                asyncLoop(details.flows, (flowElement, flowNext) => {
                    console.log(`each flows are --@@@@@@@@@@@  ${flowCount}  `, flowElement);
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
                    if (!flowElement.components ||
                        (flowElement.components && flowElement.components.length === 0)) {
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

                                if (componentElement.devLanguage !== feature.serverLanguage.name &&
                                    componentElement.devFramework !== feature.serverFramework.name) {
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
                                if (flows.components && flows.components.length > 0) {
                                    feature.flows.push(flows);
                                }
                                console.log('flow component iteration done %%%%%11%%%%%%%%%% ', feature);
                                flowCount++;
                                flowNext();
                            }
                        })
                    }

                }, async (flowErr) => {
                    if (flowErr) {
                        console.log('-------------flowerror is ?????????????', flowErr);
                    } else {
                        console.log('flow iteration completed %%%%%%%%%%%%% ----- ', util.inspect(feature, { showHidden: true, depth: null }));
                        const node = await this.generateNode(feature);
                        console.log('node %%%%%%%%%%%%% ???????----- ', util.inspect(node, { showHidden: true, depth: null }));
                        callback(node);
                    }
                })
            }
            else {
                console.log('no flow has been added for this project so please add a flow');
            }
        }
        catch (e) {
            console.log('each catches are-- ----   ', e);
            callback('Something went wrong in backend gen manager microservices', 400);
        }

        // if(details.project.serverLanguage.name === 'Node.js') {
        //     console.log('entering into if condition  ');
        //     const filteredComponent = details.flows.find(element => {
        //         console.log('each filtering vlaues are--- ---  ', element);
        //         return element.devLanguage === 'Node.js'
        //     });
        //     console.log('filteredComponent ----node---  ', filteredComponent);
        //     // console.log('filteredComponent ----node- length--  ', filteredComponent.length);
        //     // this.microFlowService.getBackendMicroFlow()
        // }
        // callback();
        // const backendServiceName = details.project.
    }

    generateNode(details) {
        return new Promise(resolve => {
            this.nodeService.generateNode(details, (data) => {
                resolve(data);
            })
        })
    }

    getDataStore(details) {
        return new Promise(resolve => {
            this.dataStoreService.getDataStore(details, (data) => {
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




    // public createbackend(req: Request, callback: CallableFunction) {
    //     const backendDetails = req.body;
    //     console.log('backendDetails are ----- ', backendDetails);
    //     this.backend = backendDetails.language;
    //     if (this.backend === 'node') {
    //         this.apiAdapter.post(
    //             `${SharedService.apiGatewayURL}/desktop/node/generate`,backendDetails
    //         ).then(
    //             data => {
    //                 callback(data);
    //             }
    //         ).catch(error => {
    //             callback(error);
    //         })
    //     }

    //     else if (this.backend === 'java') {
    //         this.apiAdapter.get(
    //             `${SharedService.apiGatewayURL}/desktop/entity/getall`
    //         ).then(
    //             data => {
    //                 console.log('create project code ---- ', data);
    //                 callback(data);
    //             }
    //         ).catch(error => {
    //             callback(error);
    //         })
    //     }

    //     else if (this.backend === 'python') {
    //         this.apiAdapter.get(
    //             `${SharedService.apiGatewayURL}/desktop/feature/getall`
    //         ).then(
    //             data => {
    //                 console.log('create project code ---- ', data);
    //                 callback(data);
    //             }
    //         ).catch(error => {
    //             callback(error);
    //         })
    //     }
    // }
}