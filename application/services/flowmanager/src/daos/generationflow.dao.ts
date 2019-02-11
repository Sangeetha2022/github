import { Request, Response } from 'express';

import GenFlowModel from '../models/generationflow/generationflow.model';
import IGenFlow from '../models/generationflow/generationflow.interface';
import GenFlowDto from '../models/generationFlow/generationflow.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';

export class GenerationFlowDao {

    private genFlow = GenFlowModel;

    addGenerationFlow = async (req: Request, callback: CallableFunction) => {
        const flowData: GenFlowDto = req.body;
        const createdGenFlow = new this.genFlow({
            ...flowData
        });
        const generationFlow = await createdGenFlow.save();
        callback(generationFlow);
    }

    getAllGenerationFlow = async (req: Request, callback: CallableFunction) => {
        const data = await this.genFlow.find();
        callback(data);
    }

    getGenerationFlowByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const data = await this.genFlow.findById(id);
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    getGenerationFlowByName = async (req: Request, next, callback: CallableFunction) => {
        const name = req.params.name;
        const data = await this.genFlow.findOne({ flow_name: name });
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(name));
        }
    }

    updateGenerationFlow = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IGenFlow = req.body;
        const post = await this.genFlow.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    deleteGenerationFlow = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const successResponse = await this.genFlow.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

}