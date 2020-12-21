
import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const externalFeatureconfigschema = new Schema({
   featurename: String,
   is_payment: { type: Boolean, default: false },
   UIFramework: String,
   BackendFramework: String,
   Contributor_email: String,
   Licensetype: String,
   Entitiesarr: [{
      _id: {
         type: String,
         default: uuid.v1
      },
      name: { type: String, default: null },
      entity_id: { type: String, ref: 'entities' },
   }],
   Screenarr: [{
      _id: {
         type: String,
         default: uuid.v1
      },
      name: { type: String, default: null },
      screen_id: { type: String, ref: 'screens' },
   }],
   Featureflow: [{
      _id: {
         type: String,
         default: uuid.v1
      },
      name: { type: String, default: null },
      projectflow_id: { type: String, ref: 'projectflows' },
   }],
   gitRepoUrl: String,
   gitBranch: String,
   RouteDetails: [{
      Routes: [{
         Apiendpoint: String,
         ApiMethod: String,
         MethodName: String
      }]
   }],
   Portnumber: String,
   Featureadmin: {
      Admindescription: String,
      Field: {
         adminui_img: String,
         isapikey: { type: Boolean, default: false },
         Inputfields: [{}],
         description: String,
      }
   },
   Featurecontributor: {
      contributor_name: String,
      featureprice: Number
   },
   created_at: {
      type: Date,
      default: Date.now
   },
   updated_at: {
      type: Date,
      default: null
   }

}
   , {
      versionKey: false // You should be aware of the outcome after set to false
   })

const externalFeatureconfigModel = mongoose.model('externalFeatureconfig', externalFeatureconfigschema, 'externalFeatureconfig');
export default externalFeatureconfigModel;
