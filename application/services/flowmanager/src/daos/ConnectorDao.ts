import * as mongoose from 'mongoose';
import { ConnectorSchema } from '../models/Connector';
import { Request, Response } from 'express';

const Connector = mongoose.model('connector', ConnectorSchema);

export class ConnectorDao {

    public saveConnector(connector, callback: CallableFunction) {
        const connectorObject = new Connector(connector);
        connectorObject.save().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error)
        })
    }

    public getAllConnector(req: Request, callback: CallableFunction) {
        Connector.find({}, (err, connector) => {
            if (err) {
                callback(err);
            } else {
                callback(connector);
            }
        });
    }

    public getConnectorByID(req: Request, callback: CallableFunction) {
        Connector.findById(req.params.id, (err, connector) => {
            if (err) {
                callback(err);
            } else {
                callback(connector);
            }
        });
    }

    public deleteConnector(connectorID, callback: CallableFunction) {
        console.log('delete connector in connectorDao ----  ', connectorID);
        Connector.remove({ _id: connectorID }).then((result) => {
            callback(result);
        }).catch((error) => {
            console.log('error while delete the connector', error)
            callback(error);
        })
    }

    public updateConnector(req: Request, callback: CallableFunction) {
        Connector.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, connector) => {
            if (err) {
                callback(err);
            } else {
                callback(connector);
            }
        });
    }
}