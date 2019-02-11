import * as flowjson from './assests/flow.json';
import FlowModel from './models/flow/flow.model';
import FlowCompModel from './models/flowcomponent/flowcomponent.model';
import ConnectorModel from './models/connector/connector.model';
import GenFlowModel from './models/generationflow/generationflow.model';

import * as flowComponentjson from './assests/flowcomponent.json'
import * as generationflowjson from './assests/generationflow.json'
import * as connectorflowjson from './assests/connector.json'

export class FeedSeedData {

    private flow = FlowModel;
    private flowComp = FlowCompModel;
    private connector = ConnectorModel;
    private genFlow = GenFlowModel;

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
            const data = await this.connector.findOne({ flow_name: key });
            if (data === null) {
                let dataToSave = {
                    flow_name: key,
                    flow_comp_seq: generationflowjson[key]
                }
                const createdGenFlow = new this.connector(dataToSave);
                createdGenFlow.save();
            }
        })
    }

    public seedConnectorData(): void {
        connectorflowjson.connector.map(async (cont) => {
            const data = await this.connector.findOneAndUpdate({ name: cont['name'] }, cont, { new: true });
            if (data === null) {
                const createdConnector = new this.connector(cont);
                createdConnector.save();
            }
        })
    }
}