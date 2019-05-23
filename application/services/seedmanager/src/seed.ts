// import * as flowjson from './assests/flow.json';
// import FlowModel from './models/flow/flow.model';
// import FlowCompModel from './models/flowcomponent/flowcomponent.model';
// import ConnectorModel from './models/connector/connector.model';
// import GenFlowModel from './models/generationflow/generationflow.model';

// import * as flowComponentjson from './assests/flowcomponent.json'
// import * as generationflowjson from './assests/generationflow.json'
// import * as connectorflowjson from './assests/connector.json'
// import * as linkedconnectorflowjson from './assests/linkedconnector.json'

import * as flowJSON from './assests/flow.json';
import * as flowComponentJSON from './assests/flowcomponent.json';
import * as microFlowJSON from './assests/microflow.json';
import * as connectoJSON from './assests/connector.json';
import FlowModel from './models/Flows';
import FlowComponents from './models/FlowComponents';
import MicroFlows from './models/MicroFlows';
import connector from './models/Connectors';

export class seedData {

    private flowModel = FlowModel;
    private flowComponentModel = FlowComponents;
    private microFlowModel = MicroFlows;
    private connectorModel = connector;
    // private flow = FlowModel;
    // private flowComp = FlowCompModel;
    // private connector = ConnectorModel;
    // private genFlow = GenFlowModel;

    // flows() {
    //     const createdFlow = new this.flowModel(flowJSON.flow[0]);
    //     createdFlow.save();
    // }

    public flows() {

        flowJSON.flow.map(flowElement => {
            this.flowModel.findOneAndUpdate({ _id: flowElement['_id'] }, flowElement, { new: true }, (err, data) => {
                if (data === null) {
                    let Flow = new this.flowModel(flowElement);
                    Flow.save();
                }
            });
        });

    }

    public flowComponents() {

        flowComponentJSON.flowComponents.map(flowComponentElement => {
            this.flowComponentModel.findOneAndUpdate({ _id: flowComponentElement['_id'] }, flowComponentElement, { new: true }, (err, data) => {
                if (data === null) {
                    let FlowComponent = new this.flowComponentModel(flowComponentElement);
                    FlowComponent.save();
                }
            });
        });

    }

    public microFlow() {

        microFlowJSON.microFlows.map(microFlowElement => {
            this.microFlowModel.findOneAndUpdate({ _id: microFlowElement['_id'] }, microFlowElement, { new: true }, (err, data) => {
                if (data === null) {
                    let microFlow = new this.microFlowModel(microFlowElement);
                    microFlow.save();
                }
            });
        });

    }

    public connectors() {

        connectoJSON.connector.map(connectorElement => {
            this.connectorModel.findOneAndUpdate({ _id: connectorElement['_id'] }, connectorElement, { new: true }, (err, data) => {
                if (data === null) {
                    let connector = new this.connectorModel(connectorElement);
                    connector.save();
                }
            });
        });

    }



    // flows() {
    //     flowJSON.flow.map(async (flowObj) => {
    //         console.log('each flow objects are ---- ', flowObj)
    //         await this.flowModel.findOne({_id: flowObj['_id']}).then(async flowData => {
    //             if(flowData) {
    //                 const createFlow = new this.flowModel(flowObj);
    //                 let data = await createFlow.save();
    //                 return data;
    //             } else {
    //                 return null;
    //             }
    //         })
    //     })
    // }

    // flowComponent() {
    //     flowComponentJSON.flowComponents.map(async (flowComponentObj) => {
    //         await this.flowComponents.findOne({_id: flowComponentObj['_id']}).then(async flowComponentData => {
    //             if(flowComponentData) {
    //                 const createFlowComponent = new this.flowModel(flowComponentObj);
    //                 let data = await createFlowComponent.save();
    //                 return data;
    //             } else {
    //                 return null;
    //             }
    //         })
    //     })
    // }

    // seedFlowData = async () => {
    //     flowjson.flow.map(async (flowObj) => {
    //         await this.flow.findOne({ name: flowObj['name'] }).then(async data => {
    //             if (data === null) {
    //                 const createdFlow = new this.flow(flowObj);
    //                 let cdata = await createdFlow.save();
    //                 return cdata;
    //             } else {
    //                 return null;
    //             }
    //         }).then(async flow => {
    //             if (flow !== null) {
    //                 await this.seedGenFlowComponentData(flow);
    //             }
    //         })
    //     })
    // }

    // seedFlowComponentData = async () => {
    //     flowComponentjson.flow_components.map(async (flow_components) => {
    //         const data = await this.flowComp.findOne({ name: flow_components['name'] });
    //         if (data === null) {
    //             const createdFlowComp = new this.flowComp(flow_components);
    //             createdFlowComp.save();
    //         }
    //     })
    // }

    // seedConnectorData = () => {
    //     connectorflowjson.available_connectors.map(async (available_connectors) => {
    //         const data = await this.connector.findOne({ name: available_connectors['name'] });
    //         if (data === null) {
    //             const createdFlowComp = new this.connector(available_connectors);
    //             createdFlowComp.save();
    //         }
    //     })
    // }

    // private seedGenFlowComponentData = async (flow) => {
    //     this.genFlow.findOne({ flow_name: flow['name'] }).then(async data => {
    //         if (data === null) {
    //             let flow_seq = await this.modifyFlowSeq(flow);
    //             return flow_seq;
    //         } else {
    //             return null;
    //         }
    //     }).then(async flow_seq => {
    //         let dataToSave = {
    //             flow: flow['_id'],
    //             flow_comp_seq: flow_seq
    //         }
    //         const createdGenFlow = new this.genFlow(dataToSave);
    //         await createdGenFlow.save();
    //     }).catch(err => {
    //         console.log("=== == =    ?? ?   ? ", err)
    //     })
    // }

    // private modifyFlowSeq = async (flow) => {
    //     let flow_seq = [];
    //     let flow_comp_seq = generationflowjson[flow['name']];
    //     let promises = flow_comp_seq.map(element => {
    //         if (linkedconnectorflowjson[element.component_name]) {
    //             element['default_connector'] = [{
    //                 name: linkedconnectorflowjson[element.component_name].name,
    //                 comp_name: element.component_name,
    //                 description: linkedconnectorflowjson[element.component_name].description,
    //                 url: linkedconnectorflowjson[element.component_name].url,
    //                 properties: linkedconnectorflowjson[element.component_name].properties,
    //             }]
    //         }
    //         flow_seq.push(element)
    //     })
    //     await Promise.all(promises);
    //     return flow_seq;
    // }

}