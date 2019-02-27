import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let connectorSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  name: { type: String, default: null },
  description: { type: String, default: null },
  url: { type: String, default: null },
  available_apis: [{
    name: { type: String, default: null },
    description: { type: String, default: null },
    type: { type: String, default: null },
    properties: [{
      key: { type: String, default: null },
      value: { type: String, default: null }
    }]
  }],
  properties: [{
    key: { type: String, default: null },
    value: { type: String, default: null }
  }],
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
