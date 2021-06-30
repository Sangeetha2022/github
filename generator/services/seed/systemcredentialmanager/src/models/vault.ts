
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;




export const vaultSchema = new Schema({
   type: {type:String },
   credentials: {type: String},
   userId: {type: String},
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },
   
})

const vaultModel = mongoose.model('vault', vaultSchema, 'vault');
export default vaultModel;
