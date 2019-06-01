model(ModelName, fields) ::= <<

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const $ModelName$Schema = new Schema({
   $fields:{name | $name$};separator=",\n"$
})

const $ModelName$Model = mongoose.model('$ModelName$', $ModelName$Schema, '$ModelName$');
export default $ModelName$Model;

>>