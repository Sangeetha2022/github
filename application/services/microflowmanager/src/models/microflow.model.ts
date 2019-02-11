import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MicroFlowSchema = new Schema({
    sequence_id: { type: Number},
    component_name: { type: String},
    micro_flow_step_name: { type: String},
});