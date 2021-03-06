/*
Don't delete this comment what so ever !!!.
In this file a condition has been added to check the flows array length if there is no flow 
been added to project feature we are not going to generate any node code except for the model file.
This issue is addressed in brief on the github card number #386 created by Kishan.R on 11th May 2020.
*/
import { Request } from 'express';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdapter } from '../config/ApiAdapter';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService';
import { NodeGenManagerService } from '../apiservices/NodeGenManagerService';
import { SefNodeGenManagerService } from '../apiservices/SefNodeGenManagerService';
import * as util from 'util';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { DataStoreManagerService } from '../apiservices/DataStoreManagerService';
import { FlowConnectorManagerService } from '../apiservices/FlowConnectorManagerService';
import { Common } from '../config/Common';

export class BackendService {
    sharedService = new SharedService();
    nodeService = new NodeGenManagerService();
    sefNodeService = new SefNodeGenManagerService();
    microFlowService = new MicroFlowManagerService();
    dataStoreService = new DataStoreManagerService();
    apiAdapter = new ApiAdapter();
    flowConnectors = new FlowConnectorManagerService();
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
            featureId: details.id,
            featureName: details.name,
            applicationPort: details.applicationPort,
            projectGenerationPath: microservicePath,
            templateLocation: details.project.templateLocation,
            projectName: details.project.name,
            projectId: details.project.id,
            primaryLanguage: details.project.defaultHumanLanguage,
            secondaryLanguage: details.project.otherHumanLanguage,
            serverLanguage: details.project.serverLanguage,
            serverFramework: details.project.serverFramework,
            serverDatabase: details.project.serverDatabase,
            entities: details.entities,
            entitySchema: [],
            flows: [],
            externalfeature: details.externalfeatureconfig
        }
        if (details.entities.length > 0) {
            const dataStore = await this.getDataStore(feature);
            console.log('dataStore values are backend services are --###@@@@@@--- ', dataStore);
            feature.entitySchema = JSON.parse(JSON.stringify(dataStore)).body;
            console.log('all feature value are------  ', feature);
        } else {
            console.log('--------No entity present in this feature-----');
        }
        let flowCount = 0;
        let flowComponentCount = 0;
        try {
            if (details.flows.length > 0) { // the above comment refers this !!!.
                asyncLoop(details.flows, (flowElement, flowNext) => {
                    console.log(`each flows are --@@@@@@@@@@@  ${flowCount}  `, flowElement);
                    const flows = {
                        id: '',
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
                        flows.id = flowElement._id;
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
                                    console.log('flowComponent.microFlows =====>>>>', flowComponent.microFlows);
                                    if(componentElement.connector.length > 0) {
                                        let connectorResponse: any = await this.getFileByIds(componentElement);
                                        flowComponent.connector = connectorResponse;
                                    } else {
                                        flowComponent.connector = componentElement.connector;
                                    }
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
                        console.log('test what response from node services', node);
                        console.log('node %%%%%%%%%%%%% ???????----- ', util.inspect(node, { showHidden: true, depth: null }));
                        callback(node);
                    }
                })
            } else if (Object.values(details.externalfeatureconfig).includes('external')) {
                console.log('------feature -----value------', feature);
                const nodev2 = await this.generateNode(feature);
                console.log('test what response from node services', nodev2);
                callback(nodev2);
            }
            else {
                console.log('no flow has been added for this project so please add a flow');
                callback("no flow been added to this project so only model file generated");
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
            console.log('testing new feature', details.featureName !== 'systementry', details.featureName);
            if(details.featureName !== 'systementry'){
                this.nodeService.generateNode(details, (data) => {
                    resolve(data);
                });
            } else {
                this.sefNodeService.generateSefNode(details, (data) => {
                    resolve(data);
                });
            }
        })
    }

    getFileByIds(componentElement) {
        return new Promise(resolve => {
            let count = 0;
            asyncLoop(componentElement.connector, async (data, next) => {
                console.log('data.externalConnector =========>>>', data);
                if (data.externalConnector !== undefined && data.externalConnector.length > 0) {
                    this.flowConnectors.getFileByIds(data.externalConnector, (response) => {
                        componentElement.connector[count].externalConnector = response.body;
                    count++;
                    next();
                    })
                    
                } else {
                    count++;
                    next();
                }
            }, async (error) => {
                if (error) {
                    console.log(error);
                } else {
                    resolve(componentElement.connector);
                }
            });
            
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