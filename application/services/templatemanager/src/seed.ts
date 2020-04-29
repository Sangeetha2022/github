import * as mongoose from 'mongoose';
import { TemplateSchema } from './models/template.model';
import { TemplateParserSchema } from './models/templateParser.model';
import { geppettoTemplate } from './assets/geppettoTemplate';
import { content } from './assets/templateParser';

const GeppettoTemplateModel = mongoose.model('Geppetto_Template', TemplateSchema);
const gepTemplateParserModel = mongoose.model('template_parser', TemplateParserSchema);

export class FeedSeedData {

    public geppettoTemplateData(): void {
        geppettoTemplate.map(template => {
            GeppettoTemplateModel.findOneAndUpdate({ name: template['name'], template_name: 'gep_' + template['name'] },template, {upsert: true, new: true}, (err, data) => {
                if (data === null) {
                    let Template = new GeppettoTemplateModel(template);
                    Template.save();
                }
            });
        });
    }

    public templateParser(): void {
        gepTemplateParserModel.find().then((response) => {
            if (response && response.length < 1) {
                const templateParser = new gepTemplateParserModel(content);
                templateParser.save((err, response) => {
                    console.log('template parser err --- ', err);
                    console.log('template parser response --- ', response);
                });
            }
        })

    }

}