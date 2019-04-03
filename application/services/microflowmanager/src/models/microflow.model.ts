import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const MicroFlowSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    sequence_id: { type: Number},
    component_name: { type: String},
    micro_flow_step_name: { type: String},
});