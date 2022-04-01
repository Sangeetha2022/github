import * as uuid from 'uuid';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const gfcSchema = new Schema({ 
   _id: {
      type: String,
      default: uuid.v1
   },
   created_date: {  type: Date, default: Date.now  },
   created_by: {  type: String, default: null  },
   last_modified_by: {  type: String, default: null  },
   last_modified_date: {  type: Date, default: Date.now  },
   feature_name: {  type: String, default: null  },
   sharing_visibility_status: {  type: String, default: null  },
   type: { type: String, default: null },
   feature_type: { type: String, default: null },
   description: { type: String, default: null },
   author_email: { type: String, default: null },
   author_name: { type: String, default: null },
   organization: { type: String, default: null },
   icon_location: { type: String, default: null },
   repo: { 
      type: { type: String, default: null },
      location: { type: String, default: null },
      branch: { type: String, default: null },
      release_version_tag: { type: String, default: null }
   },
   security: { 
      verification_status: { type: String, default: null },
      verification_id: { type: String, default: null } 
   },
   quality: { 
      quality_status: { type: String, default: null },
      quality_id: { type: String, default: null } 
   },
   geppetto_framework: { 
      generator_version: { type: String, default: null },
      generator_build_id: { type: String, default: null }
   },
   license: { 
      type: { type: String, default: null },
      name: { type: String, default: null },
      price: { type: String, default:null },
      term: { type: String, default: null },
      comments: { type: String, default: null }
   },
   primary_entity: { type: Object, default: null },
   secondary_entities: { 
      type: [ String ],
      default: null
   },
   entities: [{ 
      name: { type: String, default: null },
      fields: [
         {
            name: { type: String, default: null },
            description: { type: String, default: null },
            type: { type: String, default: null }
         }
      ]
   }],
   configuration: { 
      admin_ui_entry_point: {   type: String, default: null },
      admin_ui_feature_component: {   type: String, default: null },
      admin_backend_services: [
         {
            service_name: { type: String, default: null },
            apis: [{
               name: { type: String, default: null },
               route: { type: String, default: null },
               api_method: { type: String, default: null },
               input: { type: String, default: null },
               output: { type: String, default: null }
            }]
         }
      ]
   },
   entry_point: { 
      default_entry: {   type: String, default: null },
      entry_point_access: {   type: String, default: null },
      alternate_entry: {   type: String, default: null },
      alternate_entry_point_access: {   type: String, default: null }
   },
   server_properties: { 
      runtime: {   type: String, default: null },
      runtime_version: {   type: String, default: null },
      dev_framework: {   type: String, default: null },
      dev_framework_version: {   type: String },
      datastore: {   type: String, default: null },
      datastore_version: {   type: String, default: null },
      flows: [
         {
            name: { type: String, default: null },
            api: { type: String, default: null },
            api_method: { type: String, default: null },
            input: { type: String, default: null },
            output: { type: String, default: null }
         },
      ]
   },
   web_client_properties: { 
      framework: {   type: String, default: null },
      framework_version: {   type: String, default: null },
      screens: [],
      flows: []
   }
})

const gfcModel = mongoose.model('shareable_features', gfcSchema, 'shareable_features');
export default gfcModel;
