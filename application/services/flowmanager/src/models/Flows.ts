import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let flowSchema = mongoose.Schema({
  _id: {
      type: String,
      default: uuid.v1
  },
  name: String,
  description: String,
  project: {
      type: mongoose.Schema.Types.String,
      ref: 'projects'
  },
  flows: [
      {
          type: mongoose.Schema.Types.String,
          ref: 'flows'
      }
  ],
  entities: [{
      entityType: String,
      entityId: { type: mongoose.Schema.Types.String, ref: 'entities' }
  }],
  microFlowStepName: String,
  sequenceId: String,
  createdAt: {
      type: Date,
      default: Date.now
  }
});

const FlowModel = mongoose.model('flows', flowSchema, 'flows');

export default FlowModel;
