import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let sefFeatureSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: String,
    description: String,
    type: String,
    project: {
        type: mongoose.Schema.Types.String,
        ref: 'projects'
    },
    flows: [
        {
            type: mongoose.Schema.Types.String,
            ref: 'flows'
        }
    ],
    entities: [{
        _id: false,
        entityType: String,
        entityId: { type: mongoose.Schema.Types.String, ref: 'entities' }
    }],
    microFlowStepName: String,
    sequenceId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const sefFeatureModel = mongoose.model('seffeature', sefFeatureSchema, 'seffeature');

export default sefFeatureModel;
