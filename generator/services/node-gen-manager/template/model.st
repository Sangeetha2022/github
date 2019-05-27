model(model, fields) ::= <<

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const $model$Schema = new Schema({
   $fields:{name | $name$};separator=",\n"$
})

>>