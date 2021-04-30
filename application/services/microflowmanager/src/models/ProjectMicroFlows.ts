import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let projectMicroFlowSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    componentName: String,
    microFlowStepName: String,
    sequenceId: String,
    connector: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const microFlowModel = mongoose.model('project_micro_flows', projectMicroFlowSchema, 'project_micro_flows');

export default microFlowModel;
