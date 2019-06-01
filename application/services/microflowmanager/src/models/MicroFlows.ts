import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let microFlowSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    componentName: String,
    microFlowStepName: String,
    sequenceId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const microFlowModel = mongoose.model('micro_flows', microFlowSchema, 'micro_flows');

export default microFlowModel;
