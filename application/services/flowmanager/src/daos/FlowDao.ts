import * as mongoose from 'mongoose';
import { FlowSchema } from '../models/Flow';
import { Request, Response } from 'express';

const Flow = mongoose.model('Flow', FlowSchema);

export class FlowDao {

    public saveFlow(flow, callback: CallableFunction) {
        const flowObject = new Flow(flow);
        flowObject.save().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error)
        })
    }

    public getAllFlow(req: Request, callback: CallableFunction) {
        Flow.find({}, (err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback(flow);
            }
        });
    }

    public getFlowByID(req: Request, callback: CallableFunction) {
        Flow.findById(req.params.id, (err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback(flow);
            }
        });
    }

    public deleteFlow(flowID, callback: CallableFunction) {
        console.log('delete flow in flowDao ----  ', flowID);
        Flow.remove({ _id: flowID }).then((result) => {
            callback(result);
        }).catch((error) => {
            console.log('error while delete the flow', error)
            callback(error);
        })
    }

    public updateFlow(req, callback: CallableFunction) {
        console.log('before update ----- ', req.body);
        const flow = {
            name: req.body.name,
            label: req.body.label,
            description: req.body.description,
            action_on_data: req.body.action_on_data
        }
        Flow.findOneAndUpdate({ _id: req.params.id }, { $set: flow }, { new: true, runValidators: true }).then((result) => {
            callback(result);
        }).catch((error) => {
            console.log('error in flow update -- ', error);
        })
    }
}