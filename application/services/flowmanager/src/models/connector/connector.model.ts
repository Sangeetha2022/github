import * as mongoose from 'mongoose';
import IConnector from './connector.interface';

const connectorSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  properties: {
    apiKey: String,
    secretKey: String,
  }
});

const ConnectorModel = mongoose.model<IConnector & mongoose.Document>('connector', connectorSchema);

export default ConnectorModel;
