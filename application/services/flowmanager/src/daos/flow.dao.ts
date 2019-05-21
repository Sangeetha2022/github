import * as mongoose from 'mongoose';
import  FlowModel  from '../models/Flows';
import { Request, Response } from 'express';

// const Features = mongoose.model('Features', FeaturesSchema);

export class FlowDao {

    private Flow = FlowModel;


    public saveFlow(flowData, callback: CallableFunction) {
        let flow = new this.Flow(flowData);
        flow.save((err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback(flow);
            }
        });
    }

    public updateFlow(flowId, flowData, callback: CallableFunction) {
        this.Flow.findOneAndUpdate({ _id: flowId }, flowData, { new: true }, (err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback(flow);
            }
        });
    }

    public getAllFlow(callback: CallableFunction) {
        this.Flow.find({}, (err, flow) => {
            if(err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public getFlowById(flowId, callback: CallableFunction) {
        this.Flow.findById(flowId, (err, flow) => {
            if(err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public getFlowByProjectId(projectId, callback: CallableFunction) {
        this.Flow.find({project: projectId}, (err, flow) => {
            if(err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public deleteFlow(flowId, callback: CallableFunction) {
        this.Flow.remove({ _id: flowId }, (err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}