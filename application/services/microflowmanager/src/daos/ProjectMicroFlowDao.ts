import * as mongoose from 'mongoose';
import  ProjectMicroFlowModel  from '../models/ProjectMicroFlows';
import { Request, Response } from 'express';


export class ProjectMicroFlowDao {

    private ProjectMicroFlow = ProjectMicroFlowModel;


    public saveProjectMicroFlow(microFlowArray, callback: CallableFunction) {
        this.ProjectMicroFlow.create(microFlowArray).then((err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(result);
            }
        });
    }

    public updateProjectMicroFlow(ProjectMicroFlowId, ProjectMicroFlowData, callback: CallableFunction) {
        this.ProjectMicroFlow.findOneAndUpdate({ _id: ProjectMicroFlowId }, ProjectMicroFlowData, { new: true }, (err, ProjectMicroFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(ProjectMicroFlow);
            }
        });
    }

    public getAllProjectMicroFlow(callback: CallableFunction) {
        this.ProjectMicroFlow.find({}, (err, ProjectMicroFlow) => {
            if(err) {
                callback(err)
            } else {
                callback(ProjectMicroFlow)
            }
        });
    }

    public getProjectMicroFlowByID(ProjectMicroFlowId, callback: CallableFunction) {
        this.ProjectMicroFlow.findOne({_id: ProjectMicroFlowId}, (err, ProjectMicroFlow) => {
            if(err) {
                callback(err)
            } else {
                callback(ProjectMicroFlow)
            }
        });
    }

    public getProjectMicroFlowByProjectId(projectId, callback: CallableFunction) {
        this.ProjectMicroFlow.find({project: projectId}, (err, ProjectMicroFlow) => {
            if(err) {
                callback(err)
            } else {
                callback(ProjectMicroFlow)
            }
        });
    }

    
    public getProjectMicroFlow(ProjectMicroFlowIDs, callback: CallableFunction) {
        console.log('get micro flows are ---IDs--- ', ProjectMicroFlowIDs);
        this.ProjectMicroFlow.find().where('_id').in(ProjectMicroFlowIDs).exec((err, ProjectMicroFlow) => {
            if(err) {
                callback(err)
            } else {
                callback(ProjectMicroFlow)
            }
        });
    }

    public getBackendProjectMicroFlow(ProjectMicroFlowIDs, callback: CallableFunction) {
        this.ProjectMicroFlow.find().where('_id').in(ProjectMicroFlowIDs).exec((err, ProjectMicroFlow) => {
            if(err) {
                callback(err)
            } else {
                callback(ProjectMicroFlow)
            }
        });
    }


    public deleteProjectMicroFlow(ProjectMicroFlowIds, callback: CallableFunction) {
        this.ProjectMicroFlow.deleteMany({_id: {$in: ProjectMicroFlowIds}}, (err, ProjectMicroFlow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}