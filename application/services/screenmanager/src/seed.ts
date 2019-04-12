import * as mongoose from 'mongoose';
import { GeppettoTemplateSchema } from './models/GeppettoTemplate';
import { geppettoTemplate } from './assets/geppettoTemplate';

const GeppettoTemplateModel = mongoose.model('Geppetto_Template', GeppettoTemplateSchema);

export class FeedSeedData {

    public geppettoTemplateData(): void {
        geppettoTemplate.map(template => {
            GeppettoTemplateModel.findOneAndUpdate({ name: template['name'] }, template, { new: true }, (err, data) => {
                if (data === null) {
                    let Template = new GeppettoTemplateModel(template);
                    Template.save();
                }
            });
        });
    }

}