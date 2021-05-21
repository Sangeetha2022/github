
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const commentsSchema = new Schema({
   description: String,
   createdby: String,
   attachments: { type: Schema.Types.ObjectId, ref: 'attachment' },
   updatedby: String,
   createdat: Date,
   updatedat: Date
})

const commentsModel = mongoose.model('comments', commentsSchema, 'comments');
export default commentsModel;
