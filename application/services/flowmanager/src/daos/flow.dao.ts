import { Request } from 'express';
import FlowModel from '../models/flow/flow.model';
import IFlow from '../models/flow/flow.interface';
import FlowDto from '../models/flow/flow.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import GenFlowModel from '../models/generationflow/generationflow.model';

export class FlowDao {

    private flow = FlowModel;
    private genFlow = GenFlowModel;

    saveFlow = async (flow, callback: CallableFunction) => {
        const flowData: FlowDto = flow;
        const createdFlow = new this.flow({
            ...flowData
        });
        const savedFlow = await createdFlow.save();
        callback(savedFlow);
    }

    getAllFlow = async (req: Request, callback: CallableFunction) => {
        const posts = await this.flow.find();
        callback(posts);
    }

    getFlowByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const flow = await this.flow.findById(id);
        if (flow) {
            callback(flow);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    deleteFlow = async (flowID, next, callback: CallableFunction) => {
        const id = flowID;
        const successResponse = await this.flow.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateFlow = async (req, next, callback: CallableFunction) => {
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

    getFlowDetails = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        let dataToSend = await this.genFlow.findOne({ flow: id });
        callback(dataToSend);
    }

    updateFlowComponent = async (req, next, callback: CallableFunction) => {
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

    updateLinkedConnector = async (req, next, callback: CallableFunction) => {
        const dcid = req.params.id;

        await this.genFlow.update(
            {
                // flow: id,
                "flow_comp_seq.default_connector._id": dcid
            },
            {
                $set: {
                    "flow_comp_seq.$.default_connector.$[j].name": req.body.name,
                    "flow_comp_seq.$.default_connector.$[j].comp_name": req.body.comp_name,
                    "flow_comp_seq.$.default_connector.$[j].description": req.body.description,
                    "flow_comp_seq.$.default_connector.$[j].url": req.body.url,
                    "flow_comp_seq.$.default_connector.$[j].properties": req.body.properties,
                    "flow_comp_seq.$.default_connector.$[j].updated_date": new Date(),
                }
            },
            {
                arrayFilters: [{
                    "j._id": 'e073c6f0-33b2-11e9-b32a-1d692aa78f47'
                }]
            }
        ).then(res => {
            callback({
                status: 200,
                message: "flow component updated successfully."
            });
        });

    }

    addFlowComponent = async (req, next, callback: CallableFunction) => {
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

    addLinkedConnector = async (req, next, callback: CallableFunction) => {
        const fcid = req.params.id;
        console.log("==f=f=f=ff=f=f=ccccccccc>>  ", req.body)
        this.genFlow.update(
            {
                'flow_comp_seq._id': fcid
            },
            {
                $push: {
                    'flow_comp_seq.$.default_connector': req.body
                }
            }
        ).then(res => {
            if (res.nModified !== 0) {
                callback({
                    status: 200,
                    message: "default component updated successfully."
                });
            } else {
                callback({
                    status: 500,
                    message: "error occured"
                });
            }
        });

    }

    removeLinkedConnector = async (req, next, callback: CallableFunction) => {
        // db.flowmanager_sequences.update(
        //     { _id : '6b3627a2-338c-11e9-9aa0-13801f6d385f',
        //         'flow_comp_seq._id': '6b360098-338c-11e9-9aa0-13801f6d385f'
        //     },
        //     { $pull: {'flow_comp_seq.$.default_connector':{_id:'6b360097-338c-11e9-9aa0-13801f6d385f'}}} 
        // )
    }

    removeFlowComponent = async (req, next, callback: CallableFunction) => {
        // db.flowmanager_sequences.update(
        //     { _id : '8d27a264-3361-11e9-81d5-7904d9a5e24d'},
        //     { $pull: {"flow_comp_seq": {_id: '8d27a260-3361-11e9-81d5-7904d9a5e24d'}}}
        // )
    }

}