import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let connectorSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  name: String,
  url: String,
  description: String,
  properties: Array,
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: null
  }
});

const ConnectorModel = mongoose.model('available_connectors', connectorSchema);

export default ConnectorModel;
