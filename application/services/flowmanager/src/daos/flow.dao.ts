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
        const id = req.params.id;
        let gen_data;

        await this.genFlow.findOne({ flow: id }).then(async genData => {
            gen_data = genData;
            let dat = await genData.flow_comp_seq.find(o => o.component_name === req.body.component_name);
            return dat;
        }).then(async dat => {
            let index = gen_data.flow_comp_seq.indexOf(dat);

            Object.keys(dat).map(key => {
                if (req.body[key]) {
                    dat[key] = req.body[key]
                }
            })

            gen_data.flow_comp_seq[index] = dat;
            const post = await this.genFlow.findByIdAndUpdate(gen_data._id, gen_data);
            return post;

        }).then(res => {
            callback({
                status: 200,
                message: "flow component updated successfully."
            });
        });
    }

    updateLinkedConnector = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        const comp_name = req.params.cname;
        let gen_data;

        const data = await this.genFlow.findOne({ flow: id }).then(async genData => {
            gen_data = genData;
            let dat = await genData.flow_comp_seq.find(o => o.component_name === comp_name);
            return dat;
        }).then(async dat => {
            let index = gen_data.flow_comp_seq.indexOf(dat)
            Object.keys(dat.linked_connector).map(key => {
                if (req.body[key]) {
                    dat.linked_connector[key] = req.body[key]
                }
            })
            gen_data.flow_comp_seq[index] = dat;
            const post = await this.genFlow.findByIdAndUpdate(gen_data._id, gen_data);
            return post;
        }).then(res => {
            callback({
                status: 200,
                message: "default connector updated successfully."
            });
        });

    }

    addFlowComponent = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        // let gen_data;
        console.log("+f=fgen=+FiddddF+F :F:F", id)

        await this.genFlow.findOne({ flow: id }).then(async genData => {
            if (!genData) {
                console.log("+f=fgen111111=+FF+F :F:F", genData)
                let flow_comp = req.body
                let dataToSave = {
                    flow: id,
                    flow_comp_seq: [flow_comp]
                }
                const createdGenFlow = new this.genFlow(dataToSave);
                let promise = await createdGenFlow.save();
                return promise;
            } else {
                // gen_data = genData;
                genData.flow_comp_seq.push(req.body);
                console.log("+f=fgen=222222+FF+F :F:F", req.body)
                console.log("+f=fgen=33333+FF+F :F:F", genData)
                let promise = await this.genFlow.findOneAndUpdate({ _id: genData._id }, genData);
                return promise;
            }
        }).then(res => {
            callback({
                status: 200,
                message: "flow component added successfully."
            });
        });
    }

    addLinkedConnector = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        const comp_name = req.params.cname;
        let gen_data;

        const data = await this.genFlow.findOne({ flow: id }).then(async genData => {
            gen_data = genData;
            let dat = await genData.flow_comp_seq.find(o => o.component_name === comp_name);
            return dat;
        }).then(async dat => {
            let index = gen_data.flow_comp_seq.indexOf(dat);
            gen_data.flow_comp_seq[index]['linked_connector'] = req.body;
            const post = await this.genFlow.findOneAndUpdate({ _id: gen_data._id }, gen_data);
            return post;
        }).then(res => {
            callback({
                status: 200,
                message: "flow component updated successfully."
            });
        });

    }

}