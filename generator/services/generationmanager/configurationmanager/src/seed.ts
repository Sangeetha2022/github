import GenFlowModel from './models/configuration.model';

import * as configjson from './assests/configuration.json'

export class FeedSeedData {

    private genFlow = GenFlowModel;

    seedGenFlowComponentData = async () => {
        configjson.base_config.map(async (flowObj) => {
            const data = await this.genFlow.findOneAndUpdate({ name: flowObj['name'] }, flowObj, { new: true });
            if (data === null) {
                const createdFlow = new this.genFlow(flowObj);
                createdFlow.save();
            }
        })
    }

}