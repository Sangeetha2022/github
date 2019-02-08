import * as mongoose from 'mongoose';
import { FlowComponentSchema } from '../models/FlowComponents';
import { Request, Response } from 'express';

const FlowComponent = mongoose.model('flowcomponents', FlowComponentSchema);

export class FlowComponentDao {

    public saveFlowComonents(req: Request, callback: CallableFunction) {
        let newGenerationFlow = new FlowComponent(req.body);
        newGenerationFlow.save((err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public updateFlowComponent(req: Request, callback: CallableFunction) {
        FlowComponent.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public getAllFlowComponents(req: Request, callback: CallableFunction) {
        FlowComponent.find({}, (err, flowComponent) => {
            if (err) {
                callback(err);
            } else {
                callback(flowComponent);
            }
        });
    }

    public getFlowComponentsByID(req: Request, callback: CallableFunction) {
        FlowComponent.findById(req.params.id, (err, flowComponent) => {
            if (err) {
                callback(err);
            } else {
                callback(flowComponent);
            }
        });
    }

    public getFlowComponentsByName(req: Request, callback: CallableFunction) {
        FlowComponent.findOne({ name: req.params.name }, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

}