import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import LinkedConnectorModel from '../models/linkedconnector/linkedconnector.model';
import ILinkedConnector from '../models/linkedconnector/linkedconnector.interface';
import LinkedConnectorDto from '../models/linkedconnector/linkedconnector.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';

export class LinkedConnectorDao {

    private linkedConnector = LinkedConnectorModel;

    saveLinkedConnector = async (req, callback: CallableFunction) => {
        const connectorData: LinkedConnectorDto = req.body;
        const createdConnector = new this.linkedConnector({
            ...connectorData
        });
        const savedConnector = await createdConnector.save();
        callback(savedConnector);
    }

    getAllLinkedConnector = async (req: Request, callback: CallableFunction) => {
        const connectors = await this.linkedConnector.find();
        callback(connectors);
    }

    getLinkedConnectorByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const data = await this.linkedConnector.findById(id);
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    getLinkedConnectorByName = async (req: Request, next, callback: CallableFunction) => {
        const name = req.params.name;
        const data = await this.linkedConnector.findOne({ comp_name: name });
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(name));
        }
    }

    deleteLinkedConnector = async (connectorID, next, callback: CallableFunction) => {
        const id = connectorID;
        const successResponse = await this.linkedConnector.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateLinkedConnector = async (req: Request, next, callback: CallableFunction) => {
        const id = req.body._id;
        const postData: ILinkedConnector = req.body;
        const post = await this.linkedConnector.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }
}