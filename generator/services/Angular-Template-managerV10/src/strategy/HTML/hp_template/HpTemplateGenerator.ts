import { HpLanding } from './HpLanding';
import { CommonWorker } from '../../../worker/commonWorker/commonWorker';
import { Constant } from '../../../config/Constant';
import { ComponentSupportWorker } from '../../../supportworker/componentSupportWorker'
import { response } from 'express';
import { callbackify } from 'util';
import { Footer } from './HPFooter';
import { Common } from '../../../config/Common';
import { ComponentCssWorker } from '../../../worker/componentWorker/componentCSSworker';
import { HPHeader } from './HPHeader';
import { HpTopNav } from './HpTopNav';

let commonWorker = new CommonWorker();
let componentSupportWorker = new ComponentSupportWorker();
const componentCssWorker = new ComponentCssWorker();
const hpTopNav = new HpTopNav();

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
        this.generateHeaderHtml(details, (res, err) => {

        });
    }

    generateHeaderHtml(details, callback) {
        const menuList = details.menuBuilder.filter(x => x.language.toLowerCase() === details.project.defaultHumanLanguage.toLowerCase());
        const projectName = details.project.name;
        const htmlTag = HPHeader.HTML_TAG;
        const topNavHtml = hpTopNav.generateTopNav(menuList);
        const handlebarsResArray = htmlTag.split('\n');
        for (let i = 0; i < handlebarsResArray.length; i++) {
            if (handlebarsResArray[i].includes(`<nav class='nav-menu d-none d-lg-block' id='template-in2xm'>`)) {
                handlebarsResArray.splice(i + 1, 0, '\t\t' + topNavHtml);
                break;
            }
        }
        const final = handlebarsResArray.join('\n');
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.HEADER_FOLDERNAME;
        const filePath = templateGenerationPath + '/header.component.html';
        componentSupportWorker.writeFile(filePath, final, (response) => {
            callback(response);
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
       this.generateTemplateCss(details);
    }

    generateTemplateCss(details) {
        let cssData = HpLanding.CSS_DATA;
        let projectName = details.project.name;
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.TEMPLATE_FOLDERNAME;
        componentCssWorker.ComponentCssGeneration(templateGenerationPath, cssData, `${Constant.TEMPLATE_FOLDERNAME}.component.scss`, (res) => {
        })
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