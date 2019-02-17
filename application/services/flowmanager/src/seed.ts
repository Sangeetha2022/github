import * as flowjson from './assests/flow.json';
import FlowModel from './models/flow/flow.model';
import FlowCompModel from './models/flowcomponent/flowcomponent.model';
import ConnectorModel from './models/connector/connector.model';
import GenFlowModel from './models/generationflow/generationflow.model';

import * as flowComponentjson from './assests/flowcomponent.json'
import * as generationflowjson from './assests/generationflow.json'
import * as connectorflowjson from './assests/connector.json'
import * as linkedconnectorflowjson from './assests/linkedconnector.json'

export class FeedSeedData {

    private flow = FlowModel;
    private flowComp = FlowCompModel;
    private connector = ConnectorModel;
    private genFlow = GenFlowModel;

    seedFlowData = async () => {
        flowjson.flow.map(async (flowObj) => {
            await this.flow.findOne({ name: flowObj['name'] }).then(async data => {
                if (data === null) {
                    const createdFlow = new this.flow(flowObj);
                    let cdata = await createdFlow.save();
                    return cdata;
                } else {
                    return null;
                }
            }).then(async flow => {
                if (flow !== null) {
                    await this.seedGenFlowComponentData(flow);
                }
            })
        })
    }

    seedFlowComponentData = async () => {
        flowComponentjson.flow_components.map(async (flow_components) => {
            const data = await this.flowComp.findOne({ name: flow_components['name'] });
            if (data === null) {
                const createdFlowComp = new this.flowComp(flow_components);
                createdFlowComp.save();
            }
        })
    }

    seedConnectorData = () => {
        connectorflowjson.available_connectors.map(async (available_connectors) => {
            const data = await this.connector.findOne({ name: available_connectors['name'] });
            if (data === null) {
                const createdFlowComp = new this.connector(available_connectors);
                createdFlowComp.save();
            }
        })
    }

    private seedGenFlowComponentData = async (flow) => {
        this.genFlow.findOne({ flow_name: flow['name'] }).then(async data => {
            if (data === null) {
                console.log("=====>> . ", flow)
                let flow_seq = await this.modifyFlowSeq(flow);
                return flow_seq;
            } else {
                return null;
            }
        }).then(async flow_seq => {
            let dataToSave = {
                flow: flow['_id'],
                flow_comp_seq: flow_seq
            }
            const createdGenFlow = new this.genFlow(dataToSave);
            await createdGenFlow.save();
        }).catch(err => {
            console.log("=== == =    ?? ?   ? ", err)
        })
    }

    private modifyFlowSeq = async (flow) => {
        let flow_seq = [];
        let flow_comp_seq = generationflowjson[flow['name']];
        let promises = flow_comp_seq.map(element => {
            if(linkedconnectorflowjson[element.component_name]) {
                element['linked_connector'] = {
                    name: linkedconnectorflowjson[element.component_name].name,
                    comp_name: element.component_name,
                    description: linkedconnectorflowjson[element.component_name].description,
                    url: linkedconnectorflowjson[element.component_name].url,
                    properties: linkedconnectorflowjson[element.component_name].properties,
                }
            }
            flow_seq.push(element)
        })
        await Promise.all(promises);
        return flow_seq;

    }

}