
import * as  mongoose from 'mongoose';
import { connectorSchema } from '../models/Connectors'

const connector = mongoose.model('connectors', connectorSchema)

export class QuickConnectorsDao {

    public saveConnectors(data, callback) {
        let alldata = new connector(data);
        alldata.save().then((result) => {
            console.log('i am resut')
            callback(result);
        })
    }

    public getConnectorByEntity(entityId, callback) {
        connector.find({ entity_id: entityId }).then((result) => {
            callback(result);
        })
    }

    public deleteConnectorById(entityId, callback) {
        connector.deleteOne({ _id: entityId }).then((result) => {
            callback(result);
        })
    }

    public getConnectorById(connectorId, callback) {
        connector.findById({ _id: connectorId }).then((result) => {
            callback(result);
        })
    }
}