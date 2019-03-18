import { Request } from 'express';
import FlowModel from '../models/featureflow/flow.model';
import IFlow from '../models/featureflow/flow.interface';
import FlowDto from '../models/featureflow/flow.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import GenFlowModel from '../models/featuregenerationflow/generationflow.model';

export class FlowDao {

    private flow = FlowModel;
    private genFlow = GenFlowModel;

    saveFeatureFlow = async (flow, callback: CallableFunction) => {
        const flowData: FlowDto = flow;
        const createdFlow = new this.flow({
            ...flowData
        });
        const savedFlow = await createdFlow.save();
        callback(savedFlow);
    }

    getAllFeatureFlow = async (req: Request, callback: CallableFunction) => {
        const posts = await this.flow.find();
        callback(posts);
    }

    getFeatureFlowByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const flow = await this.flow.findById(id);
        if (flow) {
            callback(flow);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    deleteFeatureFlow = async (flowID, next, callback: CallableFunction) => {
        const id = flowID;
        const successResponse = await this.flow.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateFeatureFlow = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IFlow = req.body;
        postData.updated_date = new Date();
        const post = await this.flow.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    getFeatureFlowDetails = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        let dataToSend = await this.genFlow.findOne({ flow: id });
        callback(dataToSend);
    }

    updateFeatureFlowComponent = async (req, next, callback: CallableFunction) => {
        const fcid = req.params.id;

        await this.genFlow.update(
            {
                // flow: id,
                "flow_comp_seq._id": fcid
            },
            {
                $set: {
                    "flow_comp_seq.$.component_name": req.body.component_name,
                    "flow_comp_seq.$.label": req.body.label,
                    "flow_comp_seq.$.type": req.body.type,
                    "flow_comp_seq.$.sequence_id": req.body.sequence_id,
                    "flow_comp_seq.$.dev_language": req.body.dev_language,
                    "flow_comp_seq.$.dev_framework": req.body.dev_framework,
                    "flow_comp_seq.$.description": req.body.description,
                    "flow_comp_seq.$.updated_date": new Date(),
                }
            }
        ).then(res => {
            callback({
                status: 200,
                message: "flow component updated successfully."
            });
        });
    }


    addFeatureFlowComponent = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;

        await this.genFlow.findOne({ flow: id }).then(async genData => {
            if (!genData) {
                let flow_comp = req.body
                let dataToSave = {
                    flow: id,
                    flow_comp_seq: [flow_comp]
                }
                const createdGenFlow = new this.genFlow(dataToSave);
                let promise = await createdGenFlow.save();
                return promise;
            } else {
                console.log("==f=f=f=ff=f=f=ff>>  ", req.body)
                let promise = await this.genFlow.update(
                    { _id: genData._id },
                    {
                        $push: {
                            "flow_comp_seq": req.body
                        }
                    }
                );
                return promise;
            }
        }).then(res => {
            if (res.nModified !== 0) {
                callback({
                    status: 200,
                    message: "flow component updated successfully."
                });
            } else {
                callback({
                    status: 500,
                    message: "error occured"
                });
            }
        });
    }

    removeFlowComponent = async (req, next, callback: CallableFunction) => {
        // db.flowmanager_sequences.update(
        //     { _id : '8d27a264-3361-11e9-81d5-7904d9a5e24d'},
        //     { $pull: {"flow_comp_seq": {_id: '8d27a260-3361-11e9-81d5-7904d9a5e24d'}}}
        // )
    }

}