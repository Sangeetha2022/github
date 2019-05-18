import * as mongoose from 'mongoose';
import  microFlowModel  from '../models/MicroFlows';
import { Request, Response } from 'express';

// const MicroFlow = mongoose.model('MicroFlow', MicroFlowSchema);

export class MicroFlowDao {

    private MicroFlow = microFlowModel;


    public saveMicroFlow(req: Request, callback: CallableFunction) {
        let newGenerationFlow = new this.MicroFlow(req.body);
        newGenerationFlow.save((err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public updateMicroFlow(req: Request, callback: CallableFunction) {
        this.MicroFlow.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public getAllFlow(req: Request, callback: CallableFunction) {
        this.MicroFlow.find({}, (err, mflow) => {
            if (err) {
                callback(err);
            } else {
                callback(mflow);
            }
        });
    }

    public getFlowByID(req: Request, callback: CallableFunction) {
        this.MicroFlow.findById(req.params.id, (err, mflow) => {
            if (err) {
                callback(err);
            } else {
                callback(mflow);
            }
        });
    }

    public getMicroFlowByName(req: Request, callback: CallableFunction) {
        this.MicroFlow.find({ component_name: req.params.name }, (err, mflow) => {
            if (err) {
                callback(err);
            } else {
                callback(mflow);
            }
        });
    }

    public deleteMicroFlow(req: Request, callback: CallableFunction) {
        this.MicroFlow.remove({ _id: req.params.id }, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}