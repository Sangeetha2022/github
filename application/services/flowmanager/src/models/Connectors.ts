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
    entityName: String,
    api_key: {},
    service: String,
    isQueryParams: Boolean,
    endPointUrl: String,
    connectorsType: String,
    availableApi: [
        {
            name: { type: String, default: null },
            description: { type: String, default: null },
            type: { type: String, default: null },
            properties: [],
        }
    ],
    mls: [
        {
            name: { type: String, default: null },
            auth: {type: String, default: false },
            bearer: [{
                key: { type: String, default: false },
                value: { type: String, default: false },
                type: { type: String, default: false },
            }],
            method: { type: String, default: false },
            header: [{
                type: String, default: false
            }],
            url: [{
                raw: { type: String, default: null },
                name: { type: String, default: null },
                protocol: { type: String, default: null },
                path: { type: String, default: null },
                host: [{    
                    raw: { type: Array, default: null },
                }],
                query: [{
                    key: { type: String, default: null },
                    value: { type: String, default: null },

                }]
            }],
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
    properties: [],
    type: {
        type: String,
        default: false
    },
    call_from: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const connectorModel = mongoose.model('connectors', connectorSchema, 'connectors');

export default connectorModel;