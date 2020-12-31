import { Constant } from '../../config/Constant'
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';
import * as path from 'path';


const componentSupportWorker = new ComponentSupportWorker();

export class ComponentCSSworker {

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
        details.desktop.forEach(async desktopElement => {
            const screenName = desktopElement.screenName.toLowerCase();
            let cssPayload = this.constructPayLoad()
            const className = await this.setClassNameCss(desktopElement["gjs-css"])
            cssPayload.screenCssContent.push({ data: className });
            const templatePath = path.resolve(__dirname, '../../../templates/ComponentScss.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/' + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME;
            const screenGenerationPath = applicationPath + `/${screenName}`;
            await componentSupportWorker.handleBarsFile(templatePath, cssPayload, screenGenerationPath, screenName + '.component.scss');
            callback('Component scss File Generated Successfully', null);

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