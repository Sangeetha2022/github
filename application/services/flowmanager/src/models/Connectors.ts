import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let connectorSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: String,
    description: String,
    apiMethods: String,
    entity_id: String,
    api_key: String,
    service: String,
    params: String,
    availableApi: [
        {
            name: { type: String, default: null },
            description: { type: String, default: null },
            type: { type: String, default: null },
            properties: [],
        }
    ],
    url: {
        type: String,
        default: null
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    fromComponentName: String,
    toComponentName: String,
    isDisabled: {
        type: Boolean,
        default: false
    },
    properties: [{
        type: String,
        default: null
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const connectorModel = mongoose.model('connectors', connectorSchema, 'connectors');

export default connectorModel;
