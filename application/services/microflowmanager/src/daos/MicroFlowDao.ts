import * as mongoose from 'mongoose';
import  microFlowModel  from '../models/MicroFlows';
import { Request, Response } from 'express';

// const MicroFlow = mongoose.model('MicroFlow', MicroFlowSchema);

export class MicroFlowDao {

    private MicroFlow = microFlowModel;


    public saveMicroFlow(featureData, callback: CallableFunction) {
        let microflow = new this.MicroFlow(featureData);
        microflow.save((err, microflow) => {
            if (err) {
                callback(err);
            } else {
                callback(microflow);
            }
        });
    }

    public updateMicroFlow(microflowId, microflowData, callback: CallableFunction) {
        this.MicroFlow.findOneAndUpdate({ _id: microflowId }, microflowData, { new: true }, (err, microflow) => {
            if (err) {
                callback(err);
            } else {
                callback(microflow);
            }
        });
    }

    public getAllMicroFlow(callback: CallableFunction) {
        this.MicroFlow.find({}, (err, microflow) => {
            if(err) {
                callback(err)
            } else {
                callback(microflow)
            }
        });
    }

    public getMicroFlowByID(microflowId, callback: CallableFunction) {
        this.MicroFlow.findOne({_id: microflowId}, (err, microflow) => {
            if(err) {
                callback(err)
            } else {
                callback(microflow)
            }
        });
    }

    public getMicroFlowByProjectId(projectId, callback: CallableFunction) {
        this.MicroFlow.find({project: projectId}, (err, microflow) => {
            if(err) {
                callback(err)
            } else {
                callback(microflow)
            }
        });
    }

    
    public getMicroFlow(callback: CallableFunction) {
        this.MicroFlow.find({}, (err, microflow) => {
            if(err) {
                callback(err)
            } else {
                callback(microflow)
            }
        });
    }


    public deleteMicroFlow(microflowId, callback: CallableFunction) {
        this.MicroFlow.remove({ _id: microflowId }, (err, microflow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}