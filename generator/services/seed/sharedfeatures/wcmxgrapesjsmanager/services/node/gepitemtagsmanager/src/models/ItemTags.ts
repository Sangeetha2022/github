
import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const ItemTagsSchema = new Schema({
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },
   name: String,
   description: String,
   itemtag: [{
     name: { type: String },
     description: { type: String }
   }]
})

const ItemTagsModel = mongoose.model('ItemTags', ItemTagsSchema, 'ItemTags');
export default ItemTagsModel;
