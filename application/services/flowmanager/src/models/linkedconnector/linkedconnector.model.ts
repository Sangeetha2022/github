import * as mongoose from 'mongoose';
import ILinkedConnector from './linkedconnector.interface';

const linkedConnectorSchema = new mongoose.Schema({
  name: String,
  comp_name: String,
  url: String,
  description: String,
  properties: Array
});

const linkedConnectorModel = mongoose.model<ILinkedConnector & mongoose.Document>('linked_connectors', linkedConnectorSchema);

export default linkedConnectorModel;
