import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let generationFlowSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    flow: { type: String, ref: 'flows' },
    flow_comp_seq: [{
        _id: { type: String, default: uuid.v1 },
        component_name: { type: String },
        label: { type: String, default: null },
        type: { type: String, default: null },
        sequence_id: { type: Number, default: null },
        dev_language: { type: String, default: null },
        dev_framework: { type: String, default: null },
        description: { type: String, default: null },
        default_connector: [{
            _id: { type: String, default: uuid.v1 },
            name: { type: String, default: null },
            description: { type: String, default: null },
            url: { type: String, default: null },
            comp_name: { type: String, default: null },
            available_apis: {
                name: { type: String, default: null },
                description: { type: String, default: null },
                type: { type: String, default: null },
                properties: [{
                    key: { type: String, default: null },
                    value: { type: String, default: null }
                }]
            },
            disable: { type: Boolean, default: false },
            properties: [{
                key: { type: String, default: null },
                value: { type: String, default: null }
            }],
            created_date: { type: Date, default: Date.now },
            updated_date: { type: Date, default: null }
        }],
        created_date: { type: Date, default: Date.now },
        updated_date: { type: Date, default: null }
    }],
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: null
    }
});

const GenFlowModel = mongoose.model('flowmanager_sequence', generationFlowSchema);

export default GenFlowModel;