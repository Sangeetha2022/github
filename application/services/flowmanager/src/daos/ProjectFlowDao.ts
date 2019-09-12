import * as mongoose from 'mongoose';
import projectFlowModel from '../models/projectFlows';
import { Request, Response } from 'express';

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
        console.log('get projectFeatureFlows flows in doa');
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
                console.log('flows exec error -projectFeatureFlows---  ', err);
                console.log('flows exec success -projectFeatureFlows---  ', flow);
                if (err) {
                    callback(err)
                } else {
                    callback(flow)
                }
            });
    }

    public deleteProjectFlow(projectFlowId, callback: CallableFunction) {
        this.projectFlow.remove({ _id: projectFlowId }, (err, flow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

}