import * as mongoose from 'mongoose';
import { FlowComponentSchema } from '../models/FlowComponents';
import { GenerationFlowSchema } from '../models/GenerationFlows';
import { Request, Response } from 'express';

const FlowComponent = mongoose.model('flowcomponents', FlowComponentSchema);
const GenerationFlow = mongoose.model('flow_comp_sequence', GenerationFlowSchema);

export class GenerationFlowDao {

    public addGenerationFlow(req: Request, callback: CallableFunction) {
        let newGenerationFlow = new GenerationFlow(req.body);
        newGenerationFlow.save((err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public getAllGenerationFlow(req: Request, callback: CallableFunction) {
        GenerationFlow.find({}, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public getGenerationFlowByID(req: Request, callback: CallableFunction) {
        GenerationFlow.findById(req.params.id, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public getGenerationFlowByName(req: Request, callback: CallableFunction) {
        GenerationFlow.findOne({ flow_name: req.params.name }, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                let genFLowToSend = generationFlow
                let data = false
                // generationFlow['flow_comp_seq'].map((cname, index) => {
                //     // console.log("hvjhvjhfjhh", cname)
                //     FlowComponent.findOne({ name: cname.component_name }, (err, compDetails) => {
                //         if (err) {
                //         } else {
                //             // console.log("----No data available-11111--> . ", index)
                //             console.log("----No data available-11111--> . ", compDetails)
                //             // genFLowToSend['flow_comp_seq'].push({
                //             //     comp_details: compDetails
                //             // })
                //             genFLowToSend['flow_comp_seq'][index].comp_details = compDetails

                //             console.log("----No data available-2222222--> . ", genFLowToSend)
                //         }
                //     });
                //     if(index ===  generationFlow['flow_comp_seq'].length -1){
                //         data = true
                //     }   
                // })
                // if(data){
                //     console.log("- - - - - -  -  -> ", data)
                    callback(generationFlow);

                // }
                // console.log("----No data available--333333-> . ", genFLowToSend)
            }
        });
    }

    public updateGenerationFlow(req: Request, callback: CallableFunction) {
        GenerationFlow.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback(generationFlow);
            }
        });
    }

    public deleteGenerationFlow(req: Request, callback: CallableFunction) {
        GenerationFlow.remove({ _id: req.params.id }, (err, generationFlow) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

}