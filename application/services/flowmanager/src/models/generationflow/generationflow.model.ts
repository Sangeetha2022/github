import * as mongoose from 'mongoose';
import IGenFlowModel from './generationflow.interface';

const generationFlowSchema = new mongoose.Schema({
    flow_name: String,
    flow_comp_seq: Array
});

const GenFlowModel = mongoose.model<IGenFlowModel & mongoose.Document>('flomanager_sequence', generationFlowSchema);

export default GenFlowModel;