import * as mongoose from 'mongoose';
// import { ConnectorSchema } from '../models/Connector';
import { Request, Response } from 'express';
import ConnectorModel from '../models/connector/connector.model';
import IConnector from '../models/connector/connector.interface';
import ConnectorDto from '../models/connector/connector.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';

// const Connector = mongoose.model('connector', ConnectorSchema);

export class ConnectorDao {

    private connector = ConnectorModel;

    saveConnector = async (req, callback: CallableFunction) => {
        const connectorData: ConnectorDto = req.body;
        const createdConnector = new this.connector({
            ...connectorData
        });
        const savedConnector = await createdConnector.save();
        callback(savedConnector);
    }

    getAllConnector = async (req: Request, callback: CallableFunction) => {
        const connectors = await this.connector.find();
        callback(connectors);
    }

    getConnectorByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const data = await this.connector.findById(id);
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    deleteConnector = async (connectorID, next, callback: CallableFunction) => {
        const id = connectorID;
        const successResponse = await this.connector.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateConnector = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IConnector = req.body;
        postData.updated_date = new Date();
        const post = await this.connector.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }
}