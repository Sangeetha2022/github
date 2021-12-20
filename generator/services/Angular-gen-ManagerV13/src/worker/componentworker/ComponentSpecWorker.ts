import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';
import { Constant } from '../../config/Constant';

const componentSupportWorker = new ComponentSupportWorker();
export class ComponentSpecWorker {
    generateComponentSpecFile(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        asyncLoop(details.desktop, async (desktopElement, next) => {
            const screenName = desktopElement.screenName.toLowerCase();
            const firstElement = screenName.charAt(0).toUpperCase();
            const otherElements = screenName.substring(1, screenName.length);
            const GpHeaders = {
                importName: firstElement + otherElements + 'Component',
                importPath: './' + screenName + '.component'
            };
            const templatePath = path.resolve(__dirname, '../../../templates/ComponentSpec.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/' + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME;
            const screenGenerationPath = applicationPath + `/${screenName}`;
            await componentSupportWorker.handleBarsFile(templatePath, {GpHeaders}, screenGenerationPath, screenName + '.component.spec.ts');
            next();
        }, (err) => {
            if (!err) {
                callback('Component Spec File Generated Successfully', null);
            } else {
                callback(null, err);
            }
        });
    }
}