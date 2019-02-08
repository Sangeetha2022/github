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
                callback(generationFlow);
            }
        });
    }

    public updateGenerationFlow(req: Request, callback: CallableFunction) {
        console.log( "  = = = == = = = = = = == = = = = = = = = =  > ", req.body)
        GenerationFlow.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, generationFlow) => {
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