import { Constant } from '../assets/constant';
import { ComponentWorker } from "./componentWorker";
import { HeaderWorker } from "./headerWorker";

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

export class AcousticWorker {
    private componentWorker = new ComponentWorker();
    private headerWorker = new HeaderWorker();
    private pageRoute = [];


    async acoustic_rendercontent(details, callback) {

        const foldername = details.title.toLowerCase();
        const componentName = details.title;
        const componentPath = `${Constant.APPLICATION_PATH}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;

        // add component page name for routing in header
        const routeTemp = {
            key: '',
            value: '',
            componentName: ''
        }
        routeTemp.key = details.title;
        routeTemp.value = foldername;
        routeTemp.componentName = componentName;

        this.pageRoute.push({
            key: details.title,
            value: foldername,
            componentName: componentName
        });

        const htmlContent = [foldername, await this.htmlContent(entities.decode(details.htmlcontent.toString()))];
        
        const htmlInfo = {
            folderName: foldername,
            componentName: componentName,
            content: htmlContent,
            component: details.component
        }
        const cssInfo = {
            folderName: foldername,
            componentName: componentName,
            content: [details.csscontent]
        }
        const specInfo = {
            folderName: foldername,
            componentName: componentName,
            content: []
        }
        const moduleInfo = {
            folderName: foldername,
            componentName: componentName,
            content: []
        }
        // component html
        this.componentWorker.componentHtmlFile(componentPath, Constant.TEMPLATE_PATH,
            htmlInfo);
        // // component ts
        this.componentWorker.componentTsFile(componentPath, Constant.TEMPLATE_PATH,
            htmlInfo);
        // component css
        this.componentWorker.componentCssFile(componentPath, Constant.TEMPLATE_PATH,
            cssInfo);
        // component spec
        this.componentWorker.componentSpecFile(componentPath, Constant.TEMPLATE_PATH,
            specInfo);
        // component module
        this.componentWorker.componentModuleFile(componentPath, Constant.TEMPLATE_PATH,
            moduleInfo);

        callback();

    }


    modifyDependency() {
        this.componentWorker.modifyDependency(Constant.APPLICATION_PATH, this.pageRoute);
    }

    async modifyHeader() {
        this.headerWorker.modifyHeader(Constant.APPLICATION_PATH, this.pageRoute);
    }



    async htmlContent(content) {
        const hrefRegex = /href=".*"/g
        const isAnchorTag = content.includes(`<${Constant.HTML_ANCHOR_TAG} `);
        const href = content.match(hrefRegex);
        if (isAnchorTag && href && href.length > 0) {
            const temp = href[0];
            const pageId = temp.charAt(temp.lastIndexOf('=') + 1);
            const key = temp.replace('href="', '').replace('"', '');
            const pageName = this.pageRoute.find(x => x.key === key);
            let routerLink = null;
            if (routerLink) {
                content = content.replace(temp, routerLink);
            }
        }
        return content;
    }

}
