import * as path from 'path';
import * as asyncLoop from 'node-async-loop';

import { Constant } from '../../config/Constant'
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';

const componentSupportWorker = new ComponentSupportWorker();

export class ComponentCSSworker {
    public bootstrap_css = Constant.bootstrap_css;


    /**
  * Constructing Microflows for Handlebars
  */
    private constructPayLoad() {
        const cssObject = {
            screenCssContent: [],
        }
        return cssObject;
    }


    public generateComponentCss(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        asyncLoop(details.desktop, async (desktopElement, next) => {
            const screenName = desktopElement.screenName.toLowerCase();
            let cssPayload = this.constructPayLoad()
            let className = await this.setClassNameCss(desktopElement["gjs-css"])
            details.desktop.forEach(element => {
                if (element.is_grid_present == true && element.is_bootStrapTable_present == true) {
                    className = this.bootstrap_css[0] + className
                }
            })
            cssPayload.screenCssContent.push({ data: className });
            cssPayload.screenCssContent.push({data: Constant.CSSDATA});
            const templatePath = path.resolve(__dirname, '../../../templates/ComponentScss.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/' + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME;
            const screenGenerationPath = applicationPath + `/${screenName}`;
            await componentSupportWorker.handleBarsFile(templatePath, cssPayload, screenGenerationPath, screenName + '.component.scss');
            next();
        }, (err) => {
            if(!err) {
                callback('Component scss File Generated Successfully', null);
            }
        })
    }

    //Remove the # and set the .class css
    private setClassNameCss(cssElement) {
        return new Promise((reslove) => {
            const replaceClass = cssElement.split("#").join('.');
            reslove(replaceClass)
        })

    }
}