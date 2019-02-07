import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const GenerationFlowSchema = new Schema({
    flow_name: { type: Object },
    flow_comp_seq: { type: Array }
});