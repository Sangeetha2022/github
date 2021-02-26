model(ModelName, fields) ::= <<

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const $ModelName$Schema = new Schema({
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },
   $fields:{name | $name$};separator=",\n"$
})

const $ModelName$Model = mongoose.model('$ModelName$', $ModelName$Schema, '$ModelName$');
export default $ModelName$Model;

>>