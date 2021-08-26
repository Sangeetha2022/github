
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

    public deleteConnectorById(id, callback) {
        connector.deleteOne({ _id: id }).then((result) => {
            callback(result);
        })
    }

    public deleteConnectorByEntityId(entityId, callback) {
        connector.deleteOne({ entity_id: entityId }).then((result) => {
            callback(result);
        })
    }

    public getConnectorById(connectorId, callback) {
        connector.findById({ _id: connectorId }).then((result) => {
            callback(result);
        })
    }

    public getConnectorsByIds(connectorId, callback) {
        connector.find().where('_id').in(connectorId).exec((err, connectorArray) => {
            if(err) {
                callback(err)
            } else {
                callback(connectorArray)
            }
        });
    }

    public updateQuickConnectorsById(updateConnectors, callback: CallableFunction) {
        console.log('update --response-- /,', updateConnectors);
        connector.findOneAndUpdate({ _id: updateConnectors }, updateConnectors, { new: true }, (err, connectors) => {
            console.log('result--find --', connectors);
            console.log('error -->>', err)
            if (err) {
                callback(err);
            } else {
                callback(connectors);
            }
        });
    }

    public getConnectors(callback: CallableFunction) {
        connector.find().then((result , err) => {
            if(err) {
                callback(err);
            }else {
                callback(result);
            }
        })

    }
}