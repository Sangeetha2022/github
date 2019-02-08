import * as mongoose from 'mongoose';
import { FlowSchema } from './models/Flow';
import { FlowComponentSchema } from './models/FlowComponents'
import { GenerationFlowSchema } from './models/GenerationFlows'
import * as flowjson from './assests/flow.json';
import * as flowComponentjson from './assests/flowcomponent.json'
import * as generationflowjson from './assests/generationflow.json'

const Flow = mongoose.model('Flow', FlowSchema);
const FlowComponent = mongoose.model('flowcomponents', FlowComponentSchema);
const GenerationFlow = mongoose.model('flow_comp_sequence', GenerationFlowSchema);

export class FeedSeedData {

    public seedFlowData(): void {
        flowjson.flow.map((flow) => {
            Flow.findOneAndUpdate({ name: flow['name'] }, flow, { new: true }, (err, data) => {
                if (data === null) {
                    let newFlow = new Flow(flow);
                    newFlow.save();
                }
            });
        })
    }

    public seedFlowComponentData(): void {
        flowComponentjson.flow_components.map((flow_components) => {
            FlowComponent.findOneAndUpdate({ name: flow_components['name'] }, flow_components, { new: true }, (err, data) => {
                if (data === null) {
                    let newFlowComp = new FlowComponent(flow_components);
                    newFlowComp.save();
                }
            });
        })
    }

    public seedGenFlowComponentData(): void {
        Object.keys(generationflowjson).map((key, index) => {
            GenerationFlow.findOne({ flow_name: key }, { new: true }, (err, data) => {
                if (data === null) {
                    let dataToSave = {
                        flow_name: key,
                        flow_comp_seq: generationflowjson[key]
                    }
                    let newFlowComp = new GenerationFlow(dataToSave);
                    newFlowComp.save();
                }
            });
        })
    }
}