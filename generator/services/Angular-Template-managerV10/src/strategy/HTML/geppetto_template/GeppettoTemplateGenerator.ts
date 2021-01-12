import { GeppettoLanding } from './GeppettoLanding';
import { CommonWorker } from '../../../worker/commonWorker/commonWorker';
import { Constant } from '../../../config/Constant';
import { ComponentSupportWorker } from '../../../supportworker/componentSupportWorker'
import { response } from 'express';
import { callbackify } from 'util';
import { GeppettoHeader } from './GeppettoHeader';
import { GeppettoSideNav } from './GeppettoSideNav';
import { Footer } from './GeppettoFooter';
import { Common } from '../../../config/Common';
import { ComponentCssWorker } from '../../../worker/componentWorker/componentCSSworker';
import { AssetWorker } from '../../../worker/assetWorker/assetsWorker';

const commonWorker = new CommonWorker();
const componentSupportWorker = new ComponentSupportWorker();
const geppettoSideNav = new GeppettoSideNav();
const componentCssWorker = new ComponentCssWorker();
const assetWorker = new AssetWorker()

export class GeppettoTemplateGenerator {
    geppettoTemplateGeneration(details) {

        const projectName = details.project.name;
        const projectGenerationPath = details.projectGenerationPath

        this.footerComponent(projectName, projectGenerationPath, (res) => {
        })

        this.generateHTML(details, (response) => {

        });
        this.generateCss(details, (res) => { });
    }

    generateHTML(details, callback) {
        this.generateTemplateHtml(details, (response) => {

        });
        this.generateHeaderHtml(details, (res, err) => {
        });
        callback();
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
        let geppettoTemplateHTMLData = GeppettoLanding.HTML_TAG.toString();
        let projectName = details.project.name;
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.TEMPLATE_FOLDERNAME;
        const filePath = templateGenerationPath + `/${Constant.TEMPLATE_FOLDERNAME}.component.html`;
        Common.createFolders(templateGenerationPath);
        componentSupportWorker.writeFile(filePath, geppettoTemplateHTMLData, (response) => {
            callback(response);
        })
    }

    generateCss(details, callback) {
        let cssData = GeppettoLanding.CSS_DATA;
        let projectName = details.project.name;
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.TEMPLATE_FOLDERNAME;
        componentCssWorker.ComponentCssGeneration(templateGenerationPath, cssData, `${Constant.TEMPLATE_FOLDERNAME}.component.scss`, (res) => {
            callback("Geppetto Footer HTML and CSS generated ")
        });
        this.generateHeaderCss(details, (res) => {
            callback(res);
        });
    }
    generateHeaderCss(details, callback) {
        const cssData = GeppettoHeader.CSS_DATA;
        const projectName = details.project.name;
        const templateGenerationPath = details.projectGenerationPath + '/' + projectName + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.HEADER_FOLDERNAME;
        Common.createFolders(templateGenerationPath);
        componentSupportWorker.writeFile(`${templateGenerationPath}/${Constant.HEADER_FOLDERNAME}.component.scss`, cssData, (res) => {
            callback('Header scss generated');
        });
    }

    // generate Footer
    public footerComponent(projectName, projectGenerationPath, callback) {
        let generationPath = `${projectGenerationPath}/${projectName}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}/${Constant.FOOTER_FOLDERNAME}`
        //HTMl
        const geppettoFooterHTML = Footer.HTML_TAG;
        const assetGenerationPath = `${projectGenerationPath}/${projectName}/${Constant.SRC_FOLDERNAME}`
        const template = "../../../templates"
        //Css
        const footerCss = Footer.CSS_DATA;
        assetWorker.checkAssetFile(assetGenerationPath, geppettoFooterHTML, template)
        this.ComponentHtmlGeneration(generationPath, geppettoFooterHTML, 'footer.component.html', (res) => {
            componentCssWorker.ComponentCssGeneration(generationPath, footerCss, `${Constant.FOOTER_FOLDERNAME}.component.scss`, (res) => {
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