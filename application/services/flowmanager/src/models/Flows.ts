import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let flowSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  name: String,
  label: String,
  description: String,
  type: String,
  components: [
    { type: mongoose.Schema.Types.String, ref: 'flow_components' }
  ],
  actionOnData: String,
  createWithDefaultActivity: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

const FlowModel = mongoose.model('flows', flowSchema, 'flows');

export default FlowModel;
