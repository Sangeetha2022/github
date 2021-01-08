import * as path from 'path';
import * as util from 'util'

import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import { Constant } from "../../config/Constant";
import { Footer } from '../../strategy/HTML/Footer';

const componentSupportWorker = new ComponentSupportWorker();
const footer = new Footer()
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
                { data: grapesjsCSS }
            ]
        }
        const templatePath = path.resolve(__dirname, '../../../templates/StyleScss.handlebars');
        await componentSupportWorker.handleBarsFile(templatePath, fileData, filePath, Constant.STYLE_FILENAME);
    }

    public createFooterHtml(generationPath , metaData) {
        const footerHtmlMetaData = JSON.parse(JSON.stringify(metaData))
        footer.footerHTMLGeneration(generationPath,footerHtmlMetaData, async (res) => {
        })
    }
}