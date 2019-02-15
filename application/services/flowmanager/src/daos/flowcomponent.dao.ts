import { Request, Response } from 'express';
import FlowCompModel from '../models/flowcomponent/flowcomponent.model';
import IFlowComponent from '../models/flowcomponent/flowcomponent.interface';
import FlowCompDto from '../models/flowcomponent/flowcomponent.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';

export class FlowComponentDao {

    private flowcomponent = FlowCompModel;

    saveFlowComonents = async (req: Request, callback: CallableFunction) => {
        const flowCompData: FlowCompDto = req.body;
        const createdFlowComp = new this.flowcomponent({
            ...flowCompData
        });
        const savedFlowComp = await createdFlowComp.save();
        callback(savedFlowComp);
    }

    updateFlowComponent = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IFlowComponent = req.body;
        const post = await this.flowcomponent.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    getAllFlowComponents = async (req: Request, next, callback: CallableFunction) => {
        const flowcomponents = await this.flowcomponent.find();
        callback(flowcomponents);
    }

    getFlowComponentsByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const data = await this.flowcomponent.findById(id);
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    getFlowComponentsByName = async (req: Request, next, callback: CallableFunction) => {
        const name = req.params.name;
        const data = await this.flowcomponent.findOne({ name: name });
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(name));
        }
    }

}