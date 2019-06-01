import * as flowJSON from './assests/flow.json';
import * as flowComponentJSON from './assests/flowcomponent.json';
import * as connectoJSON from './assests/connector.json';
import FlowModel from './models/Flows';
import FlowComponents from './models/FlowComponents';
import connector from './models/Connectors';


export class seedData {

    private flowModel = FlowModel;
    private flowComponentModel = FlowComponents;
    private connectorModel = connector;

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


}