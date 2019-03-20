import * as featureflowjson from './assests/featureflow.json';
import FlowModel from './models/featureflow/flow.model';
import GenFlowModel from './models/featuregenerationflow/generationflow.model';

import * as featureflowcomponentjson from './assests/featureflowcomponent.json'
import * as requirementjson from './assests/recquirement.json'
import RequirementModel from './models/requirement/requirement.model';

export class FeedSeedData {

    private featureFlow = FlowModel;
    private genFlow = GenFlowModel;
    private requirement =  RequirementModel;

    seedFlowData = async () => {
        featureflowjson.feature_flow.map(async (flowObj) => {
            await this.featureFlow.findOne({ name: flowObj['name'] }).then(async data => {
                if (data === null) {
                    const createdFlow = new this.featureFlow(flowObj);
                    let cdata = await createdFlow.save();
                    return cdata;
                } else {
                    return null;
                }
            }).then(async feature_flow => {
                if (feature_flow !== null) {
                    await this.seedGenFlowComponentData(feature_flow);
                }
            })
        })
    }

    private seedGenFlowComponentData = async (flow) => {
        this.genFlow.findOne({ flow: flow['_id'] }).then(async data => {
            if (data === null) {
                let flow_seq = await this.modifyFlowSeq(flow);
                return flow_seq;
            } else {
                return null;
            }
        }).then(async flow_seq => {
            let dataToSave = {
                flow: flow['_id'],
                flow_comp_seq: flow_seq
            }
            const createdGenFlow = new this.genFlow(dataToSave);
            await createdGenFlow.save();
            this.seedFeatureRequirements(flow);
        }).catch(err => {
            console.log("=== == =    ?? ?   ? ", err)
        })
    }

    private modifyFlowSeq = async (flow) => {
        let flow_seq = [];
        let flow_comp_seq = featureflowcomponentjson[flow['name']];
        let promises = flow_comp_seq.map(element => {
            flow_seq.push(element)

        });
        await Promise.all(promises);
        return flow_seq;
    }

    private seedFeatureRequirements = async (flow) => {
        this.requirement.findOne({ flow_id: flow['_id'] }).then(async data => {
            if (data === null) {
                let flow_seq = await this.modifyRequirements(flow);
                return flow_seq;
            } else {
                return null;
            }
        }).then(async flow_seq => {
            let dataToSave = {
                flow: flow['_id'],
                flow_comp_seq: flow_seq
            }
            const createdReq = new this.requirement(dataToSave);
            await createdReq.save();
        }).catch(err => {
            console.log("=== == =    ?? ?   ? ", err)
        })
    }

    private modifyRequirements = async (flow) => {
        let feature_seq = [];
        let feature_requirements = requirementjson[flow['name']];
        let promises = feature_requirements.map(element => {
            feature_seq.push(element)

        });
        await Promise.all(promises);
        return feature_seq;
    }

}