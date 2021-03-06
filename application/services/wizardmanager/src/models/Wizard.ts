
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const WizardSchema = new Schema({
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },
   wizardName: { type: String },
   wizardDescription: { type: String },
   featureId: { type: String },
   screen_info:
   [{
      posInWizard: { type: Number },
      screenName: { type: String },
      screenId: { type: String }
   }]
})

const WizardModel = mongoose.model('Wizard', WizardSchema, 'Wizard');
export default WizardModel;
