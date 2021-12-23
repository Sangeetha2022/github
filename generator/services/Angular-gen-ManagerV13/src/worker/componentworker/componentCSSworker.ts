import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import * as beautify from 'beautify';

import { Constant } from '../../config/Constant'
import {grapesjsGjscomponents} from './grapesjs';
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';

const componentSupportWorker = new ComponentSupportWorker();
const GrapesjsGjscomponents =new grapesjsGjscomponents();

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
            console.log("details is css1",details);
            console.log("clientFramework choosen is",details.clientFramework.label);
            
            console.log("details is css",details.desktop);
            let cssData = '';
            const screenName = desktopElement.screenName.toLowerCase();
            let cssPayload = this.constructPayLoad()
            let className = await this.setClassNameCss(desktopElement["gjs-css"]);
            let gjsStyles = JSON.parse(desktopElement['gjs-styles']);
            console.log("gjs styles angular 13",gjsStyles);
            //For grapesjs version v0.17.29
            await GrapesjsGjscomponents.grapesjs_V01729(gjsStyles);

           //For grapesjs version v0.16.27
        //   await GrapesjsGjscomponents.grapesjs_V01627(gjsStyles);
          
       cssData=GrapesjsGjscomponents.cssData;
          console.log("cssData after completing",cssData);
           
        //    gjsStyles.forEach(element => {
        //     if (Object.keys(element).includes('style') && Object.keys(element).includes('selectors')) {
        //         element.selectors.forEach((selector, index) => {
        //             if(selector.name){
        //                 console.log("inside selector -->");
                        
        //                 cssData += '.' + selector.name;
        //                 console.log("inside selector --> css data",cssData);
                        
        //             }
        //             else if(!selector.name){
        //                 cssData += '#' + selector.split('#')[1];
        //                 console.log("inside selector not name --> css data",cssData);
        //             }
        //             if (element.selectors.length - 1 === index) {
        //                 cssData += ' {';
        //                 const styleArray: string[] = Object.keys(element.style);
        //                 styleArray.forEach(style => {
        //                     cssData += style + ':' + element.style[style] + ';\n'
        //                 });
        //             }
        //         });
        //         cssData += '}';
        //     }
        // });
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