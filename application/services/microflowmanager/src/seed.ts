import * as microFlowJSON from './assests/microflow.json';
import MicroFlows from './models/MicroFlows';


export class seedData {

    private microFlowModel = MicroFlows;
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
}