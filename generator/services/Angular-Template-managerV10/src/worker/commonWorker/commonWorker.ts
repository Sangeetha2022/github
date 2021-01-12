import * as path from 'path';
import * as util from 'util'

import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import { Constant } from "../../config/Constant";
import { Footer } from '../../strategy/HTML/Footer';
import { AssetWorker } from '../assetWorker/assetsWorker';

const componentSupportWorker = new ComponentSupportWorker();
const assetWorker = new AssetWorker();
const footer = new Footer()
export class CommonWorker {
    /**
     * Generate styles.scss file
     * @param filePath 
     * @param grapesjsCSS 
     * @param callback 
     */
    public async generateStyleScss(filePath, CSSData, callback) {
        const fileData = {
            styleScssContent: [
                { data: CSSData }
            ]
        }
        const templatePath = path.resolve(__dirname, '../../../templates');
        const generationPath = `${fileData}/${Constant.SRC_FOLDERNAME}`
        //
        assetWorker.checkAssetFile(filePath, CSSData, templatePath);
        await componentSupportWorker.handleBarsFile(`${templatePath}/StyleScss.handlebars`, fileData, generationPath, Constant.STYLE_FILENAME);
    }

    public createFooterHtml(generationPath , metaData) {
        const footerHtmlMetaData = JSON.parse(JSON.stringify(metaData))
        footer.footerHTMLGeneration(generationPath,footerHtmlMetaData, async (res) => {
        })
    }
}