
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const gfcSchema = new Schema({
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },
   feature_name: String,
   sharingvisibilitystatus: String,
   type: String,
   author_name: String,
   datecreated: String,
   datemodified: String,
   authoremail: String,
   organization: String,
   iconlocation: String
})

const gfcModel = mongoose.model('gfc', gfcSchema, 'gfc');
export default gfcModel;
