import * as path from 'path';

import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import { Constant } from "../../config/Constant";

const componentSupportWorker = new ComponentSupportWorker();
export class CommonWorker {
    /**
     * Generate styles.scss file
     * @param filePath 
     * @param grapesjsCSS 
     * @param callback 
     */
    public async generateStyleScss(filePath, grapesjsCSS, callback) {
        const fileData = {
            styleScssContent: [
                {data: grapesjsCSS}
            ]
        }
        const templatePath = path.resolve(__dirname, '../../../templates/StyleScss.handlebars');
        await componentSupportWorker.handleBarsFile(templatePath, fileData, filePath, Constant.STYLE_FILENAME);
    }
}