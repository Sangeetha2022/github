import * as path from 'path';
import { Common } from '../../config/Common';
import { AssetSupportWorker } from '../../supportworker/assetSupportWorker';
import * as fs from 'fs';

export class AssetWorker {

    private assetSupportWorker = new AssetSupportWorker();
    private ASSET_JAVASCRIPT_NAME: any[] = [];
    private IMAGE_FOLDERNAME = 'img';
    private CSS_FOLDERNAME = 'css';
    private JAVASCRIPT_FOLDERNAME = 'js';

    checkAssetFile(generationPath, arrayData, templatePath) {
        templatePath = path.resolve(__dirname, templatePath);
        fs.readdirSync(`${templatePath}/${this.IMAGE_FOLDERNAME}`).forEach(imageElement => {
            const index = arrayData.indexOf(imageElement);
            if (index > -1) {
                if (imageElement === 'hsbc-logo.svg') {
                    console.log('element name ---- ', imageElement, '  --index--   ', index, ' --arrayval-- ', arrayData);
                }
                this.generateAssetFile(imageElement, generationPath, templatePath, this.IMAGE_FOLDERNAME);
            }
        });
        fs.readdirSync(`${templatePath}/${this.CSS_FOLDERNAME}`).forEach(cssElement => {
            const index = arrayData.indexOf(cssElement);
            if (index > -1) {
                this.generateAssetFile(cssElement, generationPath, templatePath, this.CSS_FOLDERNAME);
            }
        });
        this.ASSET_JAVASCRIPT_NAME.forEach(javascriptElement => {
            const index = arrayData.indexOf(javascriptElement);
            if (index > -1) {
                this.generateAssetFile(javascriptElement, generationPath, templatePath, this.JAVASCRIPT_FOLDERNAME);
            }
        });
    }

    private generateAssetFile(assetElement, generationPath, templatePath, assetFolderName) {
        templatePath = path.resolve(__dirname, templatePath);
        templatePath += `/${assetFolderName}`;
        generationPath = `${generationPath}/src/assets/${assetFolderName}`;
        Common.createFolders(generationPath);
        this.assetSupportWorker.generateStaticFile(generationPath, templatePath, assetElement);
    }


}