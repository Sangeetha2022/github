
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const projectsSchema = new Schema({
   name: String,
   description: String,
   owner: String,
   startedDate: Date,
   createdat: Date,
   updatedat: Date
})

const projectsModel = mongoose.model('projects', projectsSchema, 'projects');
export default projectsModel;
