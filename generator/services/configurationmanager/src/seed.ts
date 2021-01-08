import GenFlowModel from './models/configuration.model';

import * as configjson from './assests/configuration.json'

export class FeedSeedData {

    private genFlow = GenFlowModel;

    seedGenFlowComponentData = async () => {
        configjson.base_config.map(async (flowObj) => {
            if(flowObj.name == 'build_date') {
                flowObj.value = new Date().toString();
            }
            const data = await this.genFlow.findOneAndUpdate({ name: flowObj['name'] }, flowObj, { new: true });
            if (data === null) {
                const createdFlow = new this.genFlow(flowObj);
                createdFlow.save();
            }
        })
    }

}