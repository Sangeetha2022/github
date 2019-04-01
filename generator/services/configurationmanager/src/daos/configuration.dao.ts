import { Request, Response } from 'express';

import GenFlowModel from '../models/configuration.model';
import IGenFlow from '../models/configuration.interface';
import GenFlowDto from '../models/configuration.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import DataNotFoundException from '../exceptions/DataNotFoundException';

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
        const data = await this.genFlow.findOne({ name: name });
        if (data) {
            callback(data);
        } else {
            next(new PostNotFoundException(name));
        }
    }

    updateGenerationFlow = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IGenFlow = req.body;
        postData.updated_at = new Date();
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

    getTechPropertyFlow = async(req: Request,next, callback: CallableFunction) => {
        const successResponse = await this.genFlow.find({$or: [
            {type: "GpClientLanguage"},
            {type: "GpClientDevFramework"},
            {type: "GpServerLanguage"},
            {type: "GpServerDevFramework"},
            {type: "GpServerDBMS"},
            {type: "GpUserDeploymentTarget"},
            {type: "GpUserDeploymentServer"},
        ]});
        if(successResponse) {
            callback(successResponse)
        } else {
            next(new DataNotFoundException())
        }
    }

}