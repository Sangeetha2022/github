import * as mongoose from 'mongoose';
import { PrimaryTemplateSchema } from './models/primarytemplate.model';
import { primaryTemplate } from './assets/primaryTemplate';

const PrimaryTemplate = mongoose.model('PrimaryTemplate', PrimaryTemplateSchema);

export class FeedSeedData {

    public primaryTemplateData(): void {
        console.log('primary template constant data length ----  ', primaryTemplate.length);
        primaryTemplate.map(template => {
            PrimaryTemplate.findOneAndUpdate({ name: template['name'] }, template, { new: true }, (err, data) => {
                if (data === null) {
                    let Template = new PrimaryTemplate(template);
                    Template.save();
                }
            });
        });
    }

}