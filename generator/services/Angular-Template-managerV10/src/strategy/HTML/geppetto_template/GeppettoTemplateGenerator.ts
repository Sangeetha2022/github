import {GeppettoLanding} from './GeppettoLanding';
import { CommonWorker } from '../../../worker/commonWorker/commonWorker';
import {Constant} from '../../../config/Constant';
import {ComponentSupportWorker} from '../../../supportworker/componentSupportWorker'
import { response } from 'express';
import { callbackify } from 'util';

let commonWorker = new CommonWorker();
let componentSupportWorker = new ComponentSupportWorker();

export class GeppettoTemplateGenerator {
    geppettoTemplateGeneration(details) {
        this.generateHTML(details, (response) => {

        });
        this.generateCss(details);
    }

    generateHTML(details, callback) {
        
        this.generateTemplateHtml(details, (response) => {
            callback(response)
        });

    }

    generateTemplateHtml(details, callback) {
        let generationPath = details.projectGenerationPath;
        console.log('generation path================>>>>>>>', generationPath);
        let geppettoTemplateHTMLData = GeppettoLanding.HTML_TAG;
        let projectName = details.project.name;
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/' 
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.TEMPLATE_FOLDERNAME ;
        const filePath = templateGenerationPath + '/template.component.html';
        componentSupportWorker.writeFile(filePath, geppettoTemplateHTMLData, (response) => {
            callback(response);
        })
    }

    generateCss(details) {
        let cssData = GeppettoLanding.CSS_DATA;
        let projectName = details.project.name;
        const filePath = details.projectGenerationPath + '/' + projectName + '/' + Constant.SRC_FOLDERNAME;
        commonWorker.generateStyleScss(filePath, cssData, (res) => {

        });
    }
}