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
    project_id: String,
    feature_id: String,
    flow_id: String,
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
    externalConnector:[],
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