import * as mongoose from 'mongoose';
import { FlowComponentSchema } from '../models/FlowComponents';
import { Request, Response } from 'express';

const FlowComponent = mongoose.model('flowcomponents', FlowComponentSchema);

export class FlowComponentDao {

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