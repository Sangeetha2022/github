import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let generationFlowSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    flow: {
        type: String,
        ref: 'flows'
    },
    flow_comp_seq: Array,
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: null
    }
});

const GenFlowModel = mongoose.model('flowmanager_sequence', generationFlowSchema);

export default GenFlowModel;