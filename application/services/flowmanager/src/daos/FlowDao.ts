import * as mongoose from 'mongoose';
import FlowModel from '../models/Flows';
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
        this.Flow.find({}).populate('components').exec((err, flow) => {
            if (err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public getFlowById(flowId, callback: CallableFunction) {
        this.Flow.findById(flowId, (err, flow) => {
            if (err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public getFeatureFlows(flowsId, callback: CallableFunction) {
        // this.testingConnection();
        console.log('get feature flows in doa');
        // const User = mongoose.model('micro_flows');
        // const SongSchema = require('mongoose').model('micro_flows').schema;
        // console.log('song schema -----  ', User)
        this.Flow.find().where('_id')
        .in(flowsId)
        .populate({
            path: 'components',
            populate: {
                path: 'connector',
              }
        }).exec((err, flow) => {
            console.log('flows exec error ----  ', err);
            console.log('flows exec success ----  ', flow);
            if (err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public getFeatureFlowsByLanguage(flowsId, language, callback: CallableFunction) {
        this.Flow.find().where('_id')
        .in(flowsId)
        .populate({
            path: 'components',
            match: { 'devLanguage': language}
        }).exec((err, flow) => {
         
            if (err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    testingConnection() {
        console.log('testing connection of all documnets ')
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            console.log("all documents names are ---- ", names); // [{ name: 'dbname.myCollection' }]
            module.exports.Collection = names;
        });
        mongoose.connection.on('open', function (ref) {
            console.log('Connected to mongo server.');
            //trying to get collection names
            mongoose.connection.db.listCollections().toArray(function (err, names) {
                console.log("all documents names are ---- ", names); // [{ name: 'dbname.myCollection' }]
                module.exports.Collection = names;
            });
        })
    }

    // public getBackendFlow(flowsId, callback: CallableFunction) {
    //     console.log('get backend flows are ----- ', flowsId);
    //     this.Flow.find().where('_id').in(flowsId).exec((err, flow) => {
    //         if (err) {
    //             callback(err)
    //         } else {
    //             callback(flow)
    //         }
    //     });
    // }

    public getFlowByProjectId(projectId, callback: CallableFunction) {
        this.Flow.find({ project: projectId }, (err, flow) => {
            if (err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public deleteFlow(flowId, callback: CallableFunction) {
        this.Flow.findByIdAndDelete(flowId, (err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}