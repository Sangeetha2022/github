import * as mongoose from 'mongoose';
import { MicroFlowSchema } from './models/MicroFlow';
import * as microflowjson from './assests/microflow.json';

const MicroFlow = mongoose.model('MicroFlow', MicroFlowSchema);

export class FeedSeedData {

    public seedFlowData(): void {
        MicroFlow.find({}, (err, data) => {
            if (data === null || data.length === 0) {
                microflowjson.microflow.map((mflow) => {
                    let newFlow = new MicroFlow(mflow);
                    newFlow.save();
                })
            }
        });
    }
}