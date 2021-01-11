import { GeppettoLanding } from './GeppettoLanding';
import { CommonWorker } from '../../../worker/commonWorker/commonWorker';
import { Constant } from '../../../config/Constant';
import { ComponentSupportWorker } from '../../../supportworker/componentSupportWorker'
import { response } from 'express';
import { callbackify } from 'util';
import { GeppettoHeader } from './GeppettoHeader';
import { GeppettoSideNav } from './GeppettoSideNav';

const commonWorker = new CommonWorker();
const componentSupportWorker = new ComponentSupportWorker();
const geppettoSideNav = new GeppettoSideNav();

export class GeppettoTemplateGenerator {
    geppettoTemplateGeneration(details) {
        this.generateHTML(details, (response) => {

        });
        this.generateCss(details);
    }

    generateHTML(details, callback) {
        this.generateTemplateHtml(details, (response) => {
            callback(response);
        });
        this.generateHeaderHtml(details, (res, err) => {
        });
    }

    generateHeaderHtml(details, callback) {
        const htmlTag = GeppettoHeader.HTML_TAG;
        const menuList = details.menuBuilder.filter(x => x.language.toLowerCase() === details.project.defaultHumanLanguage.toLowerCase());
        const projectName = details.project.name;
        if (htmlTag.includes(`<div id='MainMenu'>`)) {
            // Call the sidenav generate function
            const sideNavHtml = geppettoSideNav.generateSideNav(menuList);
            const handlebarsResArray = htmlTag.split('\n');
            for (let i = 0; i < handlebarsResArray.length; i++) {
                if (handlebarsResArray[i].includes(`<div id='MainMenu'>`)) {
                    handlebarsResArray.splice(i + 1, 0, '\t\t' + sideNavHtml);
                    break;
                }
            }
            const final = handlebarsResArray.join('\n');
            console.log('finalHtml---->>>>>', final);
            const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
                + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.HEADER_FOLDERNAME;
            const filePath = templateGenerationPath + '/header.component.html';
            componentSupportWorker.writeFile(filePath, final, (response) => {
                callback(response);
            });
        }
    }

    generateTemplateHtml(details, callback) {
        let generationPath = details.projectGenerationPath;
        console.log('generation path================>>>>>>>', generationPath);
        let geppettoTemplateHTMLData = GeppettoLanding.HTML_TAG;
        let projectName = details.project.name;
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.TEMPLATE_FOLDERNAME;
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