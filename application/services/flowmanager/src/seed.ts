import * as flowjson from './assests/flow.json';
import FlowModel from './models/flow/flow.model';
import FlowCompModel from './models/flowcomponent/flowcomponent.model';
import ConnectorModel from './models/connector/connector.model';
import GenFlowModel from './models/generationflow/generationflow.model';
import linkedConnectorSchema from './models/linkedconnector/linkedconnector.model'

import * as flowComponentjson from './assests/flowcomponent.json'
import * as generationflowjson from './assests/generationflow.json'
import * as connectorflowjson from './assests/connector.json'
import * as linkedconnectorflowjson from './assests/linkedconnector.json'

export class FeedSeedData {

    private flow = FlowModel;
    private flowComp = FlowCompModel;
    private connector = ConnectorModel;
    private genFlow = GenFlowModel;
    private linkedConnectorFlow = linkedConnectorSchema

    seedFlowData = async () => {
        flowjson.flow.map(async (flowObj) => {
            const data = await this.flow.findOneAndUpdate({ name: flowObj['name'] }, flowObj, { new: true });
            if (data === null) {
                const createdFlow = new this.flow(flowObj);
                createdFlow.save();
            }
        })
    }

    seedFlowComponentData = async () => {
        flowComponentjson.flow_components.map(async (flow_components) => {
            const data = await this.flowComp.findOneAndUpdate({ name: flow_components['name'] }, flow_components, { new: true });
            if (data === null) {
                const createdFlowComp = new this.flowComp(flow_components);
                createdFlowComp.save();
            }
        })
    }

    seedGenFlowComponentData = async () => {
        Object.keys(generationflowjson).map(async (key, index) => {
            const data = await this.genFlow.findOne({ flow_name: key });
            if (data === null) {
                let dataToSave = {
                    flow_name: key,
                    flow_comp_seq: generationflowjson[key]
                }
                const createdGenFlow = new this.genFlow(dataToSave);
                createdGenFlow.save();
            }
        })
    }

    public seedConnectorData(): void {
        connectorflowjson.available_connectors.map(async (available_connectors) => {
            const data = await this.connector.findOneAndUpdate({ name: available_connectors['name'] }, available_connectors, { new: true });
            if (data === null) {
                const createdFlowComp = new this.connector(available_connectors);
                createdFlowComp.save();
            }
        })
    }

    seedLinkedConnectorData = async () => {
        Object.keys(linkedconnectorflowjson).map(async (key, index) => {
            const data = await this.linkedConnectorFlow.findOne({ comp_name: key });
            if (data === null) {
                let dataToSave = {
                    name: linkedconnectorflowjson[key].name,
                    comp_name: key,
                    description: linkedconnectorflowjson[key].description,
                    url: linkedconnectorflowjson[key].url,
                    properties: linkedconnectorflowjson[key].properties,
                }
                const createdlinkedConnectorFlow = new this.linkedConnectorFlow(dataToSave);
                createdlinkedConnectorFlow.save();
            }
        })
    }
}