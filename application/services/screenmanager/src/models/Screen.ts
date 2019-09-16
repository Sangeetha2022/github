import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const ScreenSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    'gjs-assets': [],
    'gjs-css': String,
    'gjs-styles': [String],
    'gjs-html': String,
    'gjs-components': [],
    'project-name': String,
    'default-language': String,
    'component-lifecycle': [],
    'special-events': [],
    screenName: String,
    is_grid_present: {
        type: Boolean,
        default: false
    },
    grid_fields: {
        htmlId: String,
        componentId: String,
        custom_field: [{
            columnid: String,
            columnname: String,
            entity: String,
            entityfield: String
        }],
        default_field: []
    },
    entity_info: [{
        htmlId: { type: String, default: null },
        componentId: { type: String, default: null },
        elementName: { type: String, default: null },
        entityId: { type: String, default: null },
        fields: {
            fieldId: { type: String, default: null },
            name: { type: String, default: null },
            description: { type: String, default: null },
            typeName: { type: String, default: null },
            dataType: { type: String, default: null }
        }
    }],
    flows_info: [{
        htmlId: { type: String, default: null },
        componentId: { type: String, default: null },
        elementName: { type: String, default: null },
        verb: { type: String, default: 'click' },
        flow: { type: String, ref: 'flows' },
        flowName: { type: String, default: null }
    }],
    route_info: [{
        htmlId: { type: String, default: null },
        componentId: { type: String, default: null },
        elementName: { type: String, default: null },
        flow: { type: String, ref: 'flows' },
        screenId: { type: String, default: null },
        screenName: { type: String, default: null },
        routeType: { type: String, default: null },
        methodName: { type: String, default: null },
        screenFlow: { type: String, default: null },
        screenFlowName: { type: String, default: null }
    }],
    project: { type: String, ref: 'projects', default: null },
    feature: { type: String, ref: 'feature_details', default: null },
    screenType: { type: String, default: null },
    isTemplate: { type: Boolean, default: false },
    stylesheets: [],
    scripts: [],
    'css-guidelines': [],
    created_at: {
        type: Date,
        default: Date.now
    }
})