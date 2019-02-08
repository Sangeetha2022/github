import * as mongoose from 'mongoose';
import { MicroFlowSchema } from '../models/MicroFlow';
import { Request, Response } from 'express';

const MicroFlow = mongoose.model('MicroFlow', MicroFlowSchema);

export class MicroFlowDao {

    public getAllFlow(req: Request, callback: CallableFunction) {
        MicroFlow.find({}, (err, mflow) => {
            if (err) {
                callback(err);
            } else {
                callback(mflow);
            }
        });
    }

    public getFlowByID(req: Request, callback: CallableFunction) {
        MicroFlow.findById(req.params.id, (err, mflow) => {
            if (err) {
                callback(err);
            } else {
                callback(mflow);
            }
        });
    }

    public getMicroFlowByName(req: Request, callback: CallableFunction) {
        MicroFlow.find({ component_name: req.params.name }, (err, mflow) => {
            if (err) {
                callback(err);
            } else {
                callback(mflow);
            }
        });
    }
}