
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
   name: String,
   dob: Date,
   doj: Date,
   //projectid: { type: Schema.Types.ObjectId, ref: 'projects' },
   projectid: Number,
   teamid: String,
   organization: String,
   createdOn: Date,
   updatedOn: Date,
   email: String,
   password: String,
   loginDate: Date,
   logoutDate: Date,
   Idtoken: String,
})

const userModel = mongoose.model('user', userSchema, 'user');
export default userModel;
