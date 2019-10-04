import * as mongoose from 'mongoose';
import projectFlowModel from '../models/projectFlows';
import { Request, Response } from 'express';
import { constants } from 'crypto';

// const Features = mongoose.model('Features', FeaturesSchema);

export class ProjectFlowDao {

    private projectFlow = projectFlowModel;


    public ProjectFlows(details, callback: CallableFunction) {
        this.projectFlow.create(details).then(resutl => {
            callback(resutl);
        }).catch((error) => {
            callback(error);
        })

    }

    public createProjectFlows(details, callback: CallableFunction) {
        let data = new this.projectFlow(details);
        data.save().then(resutl => {
            callback(resutl);
        }).catch((error) => {
            callback(error);
        })

    }

    public getProjectFlowById(flowId, callback: CallableFunction) {
        this.projectFlow.find({ _id: flowId }).exec((err, flow) => {
            if (err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }


    public updateFlowComponents(flowId, flowComponents, callback: CallableFunction) {
        this.projectFlow.updateOne({ _id: flowId },
            { $set: { 'components': flowComponents } },
            { new: true }, (err, flow) => {
                console.log('error ---- ', err);
                console.log('flow ---- ', flow);
                if (err) {
                    callback(err);
                } else {
                    callback(flow);
                }
            });
    }


    public getAllProjectFlows(callback: CallableFunction) {
        this.projectFlow.find({}).populate('components').exec((err, flow) => {
            if (err) {
                callback(err)
            } else {
                callback(flow)
            }
        });
    }

    public getProjectFeatureFlows(ProjectFlowsId, callback: CallableFunction) {
        // this.testingConnection();
        console.log('get projectFeatureFlows flows in doa----->>>>', ProjectFlowsId);
        // const User = mongoose.model('micro_flows');
        // const SongSchema = require('mongoose').model('micro_flows').schema;
        // console.log('song schema -----  ', User)
        this.projectFlow.find().where('_id')
            .in(ProjectFlowsId)
            .populate({
                path: 'components',
                populate: {
                    path: 'connector',
                }
            }).exec((err, flow) => {
                console.log('----populat--1234->>>', flow);
                console.log('errorrrr--1234-->>>', err);
                if (err) {
                    callback(err)
                } else {
                    callback(flow)
                }
            });

        // this.Flow.find().where('_id')
        // .in(flowsId)
        // .populate({
        //     path: 'components',
        //     populate: {
        //         path: 'connector',
        //       }
        // })
    }

    public deleteProjectFlow(projectFlowId, callback: CallableFunction) {
        this.projectFlow.deleteOne({ _id: projectFlowId }, (err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

}