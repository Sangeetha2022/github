import * as path from 'path';
import * as util from 'util'

import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import { Constant } from "../../config/Constant";
import { Footer } from '../../strategy/HTML/Footer';
import { AssetWorker } from '../assetWorker/assetsWorker';
import { DependencyWorker } from '../dependency-worker/dependencyWorker';

const componentSupportWorker = new ComponentSupportWorker();
const assetWorker = new AssetWorker();
const footer = new Footer()
const dependencyWorker = new DependencyWorker();
const templatePath = path.resolve(__dirname, '../../../templates');
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
        const generationPath = `${filePath}/${Constant.SRC_FOLDERNAME}`
        assetWorker.checkAssetFile(filePath, CSSData, templatePath);
        await componentSupportWorker.handleBarsFile(`${templatePath}/StyleScss.handlebars`, fileData, generationPath, Constant.STYLE_FILENAME);
        callback('style.scss file generated');
    }

    public createFooterHtml(generationPath, metaData) {
        const footerHtmlMetaData = JSON.parse(JSON.stringify(metaData))
        footer.footerHTMLGeneration(generationPath, footerHtmlMetaData, async (res) => {
        })
    }

    generateMainFile(generationPath,  details, sharedObj, projectName, callback) {
        return dependencyWorker.generateSharedFile(generationPath, templatePath, sharedObj, (response) => {
            return dependencyWorker.generateNginxFile(generationPath, templatePath, details, (res) => {
                return dependencyWorker.generateProxyFile(generationPath, templatePath, details, (res) => {
                    return dependencyWorker.generateDockerFile(generationPath, templatePath, details, (res) => {
                        return dependencyWorker.generateTranslatorModuleFile(generationPath, templatePath, details, (res) => {
                            return dependencyWorker.generateTranslatorJsonFile(generationPath, templatePath, details, (res) => {
                                dependencyWorker.modifyTsConfig(generationPath, (tsConfigRes, tsConfigErr) => {
                                    callback('main files are generated');
                                });
                            })
                        })
                    })
                })
            })
        });
    }
}