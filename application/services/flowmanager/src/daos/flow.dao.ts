import { Request } from 'express';
import FlowModel from '../models/flow/flow.model';
import IFlow from '../models/flow/flow.interface';
import FlowDto from '../models/flow/flow.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';

export class FlowDao {

    private flow = FlowModel;

    saveFlow = async (flow, callback: CallableFunction) => {
        const flowData: FlowDto = flow;
        const createdFlow = new this.flow({
            ...flowData
        });
        const savedFlow = await createdFlow.save();
        callback(savedFlow);
    }

    getAllFlow = async (req: Request, callback: CallableFunction) => {
        const posts = await this.flow.find();
        callback(posts);
    }

    getFlowByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const flow = await this.flow.findById(id);
        if (flow) {
            callback(flow);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    deleteFlow = async (flowID, next, callback: CallableFunction) => {
        const id = flowID;
        const successResponse = await this.flow.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateFlow = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IFlow = req.body;
        const post = await this.flow.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }
}