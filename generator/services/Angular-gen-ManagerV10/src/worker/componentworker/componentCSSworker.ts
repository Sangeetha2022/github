import { Constant } from '../../assets/Constant'
export class ComponentCSSworker {
    public generateComponentCss(applicationPath, templatePath, componentName, information, callback) {
        console.log('---------Css information ------', information);
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            tag: information
        }
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.SCSS_EXTENSION}`,
            Constant.CSS_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }
}