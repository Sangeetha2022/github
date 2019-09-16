import * as mongoose from 'mongoose'
import projectFlowComponentModel from '../models/ProjectFlowComponent';


export class ProjectFlowComponentDao {
    private projectFlowComponent = projectFlowComponentModel;

    public ProjectFlowComponent(details, callback: CallableFunction) {
        this.projectFlowComponent.create(details).then(resutl => {
            callback(resutl);
        }).catch((error) => {
            callback(error);
        })

    }

    public saveProjectFlowComponent(data, callback: CallableFunction) {
        let flowDetails = new this.projectFlowComponent(data);
        flowDetails.save().then(result => {
            callback(result)
        })
    }

    public getProjectFlowComponents(flowComponentsID, callback: CallableFunction) {
        console.log('get ProjectFLow components rae -----  ', flowComponentsID);
        this.projectFlowComponent.find().where('_id')
            .in(flowComponentsID)
            .exec((err, result) => {
                console.log('get all flow component -err--  ', err);
                console.log('all flow componnet result---  ', result);
                if (err) {
                    callback(err)
                } else {
                    callback(result)
                }
            });
    }
}   