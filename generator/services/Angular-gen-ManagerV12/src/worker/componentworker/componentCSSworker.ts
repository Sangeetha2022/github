import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import * as beautify from 'beautify';

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
            let cssData = '';
            const screenName = desktopElement.screenName.toLowerCase();
            let cssPayload = this.constructPayLoad()
            let className = await this.setClassNameCss(desktopElement["gjs-css"]);
            let gjsStyles = JSON.parse(desktopElement['gjs-styles']);
            gjsStyles.forEach(element => {
                if (Object.keys(element).includes('style') && Object.keys(element).includes('selectors')) {
                    element.selectors.forEach((selector, index) => {
                        cssData += '.' + selector.name;
                        if (element.selectors.length - 1 === index) {
                            cssData += ' {';
                            const styleArray: string[] = Object.keys(element.style);
                            styleArray.forEach(style => {
                                cssData += style + ':' + element.style[style] + ';\n'
                            });
                        }
                    });
                    cssData += '}';
                }
            });
            details.desktop.forEach(element => {
                if (element.is_grid_present == true && element.is_bootStrapTable_present == true) {
                    cssData += this.bootstrap_css[0];
                }
            });
            const beautifyCss = beautify(cssData, { format: 'css' });
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/' + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME;
            const screenGenerationPath = applicationPath + `/${screenName}/`;
            await componentSupportWorker.writeFile(screenGenerationPath + screenName + '.component.scss', beautifyCss, () => {
            });
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
            reslove(cssElement)
        })

    }
}