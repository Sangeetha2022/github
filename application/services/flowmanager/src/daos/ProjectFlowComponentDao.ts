import * as mongoose from 'mongoose'
import projectFlowComponentModel from '../models/ProjectFlowComponent';


export class ProjectFlowComponentDao {
    private projectFlow = projectFlowComponentModel;

    public saveProjectFlowComponent(data, callback: CallableFunction) {
        let flowDetails = new this.projectFlow(data);
        flowDetails.save().then(result => {
            callback(result)
        })
    }

    public projectFlowComponentService(callback: CallableFunction) {
        this.projectFlow.find().then(result => {
            callback(result)
        })
    }
}   