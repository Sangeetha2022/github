import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let connectorSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: String,
    description: String,
    availableApi: [
        {
            name: { type: String, default: null },
            description: { type: String, default: null },
            type: { type: String, default: null },
            properties: [],
        }
    ],
    url: String,
    componentName: String,
    isDisabled: Boolean,
    properties: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const connectorModel = mongoose.model('connector', connectorSchema, 'connector');

export default connectorModel;
