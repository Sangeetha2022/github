import { HpLanding } from './HpLanding';
import { CommonWorker } from '../../../worker/commonWorker/commonWorker';
import { Constant } from '../../../config/Constant';
import { ComponentSupportWorker } from '../../../supportworker/componentSupportWorker'
import { response } from 'express';
import { callbackify } from 'util';
import { Footer } from './HPFooter';
import { Common } from '../../../config/Common';
import { ComponentCssWorker } from '../../../worker/componentWorker/componentCSSworker';

let commonWorker = new CommonWorker();
let componentSupportWorker = new ComponentSupportWorker();
const componentCssWorker = new ComponentCssWorker()

export class HpTemplateGenerator {
    hpTemplateGeneration(details) {
        const projectName = details.project.name;
        const projectGenerationPath = details.projectGenerationPath
        this.footerComponent(projectName, projectGenerationPath, (res) => {
        })
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
        let geppettoTemplateHTMLData = HpLanding.HTML_TAG;
        let projectName = details.project.name;
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.TEMPLATE_FOLDERNAME;
        const filePath = templateGenerationPath + '/template.component.html';
        componentSupportWorker.writeFile(filePath, geppettoTemplateHTMLData, (response) => {
            callback(response);
        })
    }

    generateCss(details) {
        let cssData = HpLanding.CSS_DATA;
        let projectName = details.project.name;
        const filePath = details.projectGenerationPath + '/' + projectName + '/' + Constant.SRC_FOLDERNAME;
        commonWorker.generateStyleScss(filePath, cssData, (res) => {

        });
    }

    // generate Footer
    public footerComponent(projectName, projectGenerationPath, callback) {
        let generationPath = `${projectGenerationPath}/${projectName}/${Constant.SRC_FOLDERNAME}/${Constant.FOOTER_FOLDERNAME}`
        //HTMl
        const geppettoFooterHTML = Footer.HTML_TAG;
        //Css
        const footerCss = Footer.CSS_DATA;

        this.ComponentHtmlGeneration(generationPath, geppettoFooterHTML, 'footer.component.html', (res) => {
            componentCssWorker.ComponentCssGeneration(generationPath, footerCss, 'footer.component.scss', (res) => {
                callback("Geppetto Footer HTML and CSS generated ")
            })
        })
    }

    public ComponentHtmlGeneration(filePath, htmlMetaData, fileName, callback) {
        Common.createFolders(filePath);
        const path = `${filePath}/${fileName}`
        componentSupportWorker.writeFile(path, htmlMetaData, (response) => {
            callback(response);
        })
    }

}