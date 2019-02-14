import GenFlowModel from './models/configuration.model';

import * as generationflowjson from './assests/configuration.json'

export class FeedSeedData {

    private genFlow = GenFlowModel;

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
    
}