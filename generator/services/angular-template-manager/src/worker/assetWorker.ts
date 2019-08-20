import * as path from 'path';
import { Common } from '../config/Common';
import { AssetSupportWorker } from '../supportworker/assetSupportWorker';

export class AssetWorker {

    private assetSupportWorker = new AssetSupportWorker();
    private ASSET_IMAGE_NAME: any[] = [
        'stack.jpg',
        'home.jpg',
        'achivement.jpg',
        'bg-banner.jpg',
        'course01.jpg',
        'favicon.ico',
        'hsbc-logo.svg',
        'students.jpg',
        'cisco1.jpg',
        'cisco2.jpg',
        'cisco3.jpg',
        'cisco4.jpg',
        'ciscoAboutImg.jpg',
        'ciscohamburger.png',
        'ciscoHome.jpg',
        'ciscoImage.jpg',
        'ciscoLock.jpg',
        'ciscologo.png',
        'tpl-img-blue-mount--small.jpg',
        'tpl-img-cliff--small.jpg',
        'tpl-img-green-ch.jpg',
        'tpl-img-overlay-gray.png',
        'tpl-img-red-clouds.jpg',
        'tpl-img-s-lake.jpg',
        'tpl-img-sunset--small.jpg',
        'tpl-img-v-sea--small.jpg',
        'tpl-img-bg-night.jpg',
        'tpl-img-bottles.jpg',
        'tpl-img-cold-lake.jpg',
        'tpl-img-concert.jpg',
        'tpl-img-dark-cliff.jpg',
        'tpl-img-disco.jpg',
        'tpl-img-disco-neon.jpg',
        'tpl-img-dj-focus.jpg',
        'tpl-img-fireworks.jpg',
        'tpl-img-green-lake.jpg',
        'tpl-img-green-lake2.jpg',
        'tpl-img-green-night.jpg',
        'tpl-img-guy-concert.jpg',
        'tpl-img-hot-lake.jpg',
        'tpl-img-inside-ice.jpg',
        'tpl-img-neon-focus.jpg',
        'tpl-img-plane-ruin.jpg',
        'tpl-img-singer.jpg',
        'tpl-img-office-desk.jpg',
        'tpl-img-office-glass.jpg',
        'tpl-img-office-team.jpg',
        'tpl-img-city-walk.jpg',
        'tpl-img-girl-red-field.jpg',
        'tpl-img-mount-lake-top.jpg',
        'tpl-img-mount-top.jpg'
    ];
    private ASSET_CSS_NAME: any[] = [
        'gjs-base.css',
        `imagehover.min.css`
    ];
    private ASSET_JAVASCRIPT_NAME: any[] = [];
    private IMAGE_FOLDERNAME = 'img';
    private CSS_FOLDERNAME = 'css';
    private JAVASCRIPT_FOLDERNAME = 'js';

    checkAssetFile(arrayData, generationPath, templatePath) {
        this.ASSET_IMAGE_NAME.forEach(imageElement => {
            const index = arrayData.indexOf(imageElement);

            if (index > -1) {
                if (imageElement === 'hsbc-logo.svg') {
                    console.log('element name ---- ', imageElement, '  --index--   ', index, ' --arrayval-- ', arrayData);
                }
                this.generateAssetFile(imageElement, generationPath, templatePath, this.IMAGE_FOLDERNAME);
            }
        });
        this.ASSET_CSS_NAME.forEach(cssElement => {
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
        // arrayData.forEach(element => {
        //     // console.log('each arrayData are------------   ', element);
        //     // isFound = element.includes('tpl-img-green-ch.jpg')
        //     // console.log('after found the element are ------------   ', isFound);
        //     this.ASSET_IMAGE_NAME.forEach(assetElement => {
        //         if (element.includes(assetElement)) {
        //             // this.generateAssetFile(element, generationPath, templatePath, this.IMAGE_FOLDERNAME);
        //         }
        //     })

        // })
    }

    private generateAssetFile(assetElement, generationPath, templatePath, assetFolderName) {
        templatePath = path.resolve(__dirname, templatePath);
        templatePath += `/${assetFolderName}`;
        generationPath = `${generationPath}/src/assets/${assetFolderName}`;
        Common.createFolders(generationPath);
        this.assetSupportWorker.generateStaticFile(generationPath, templatePath, assetElement);
        // switch (isType) {
        //     case this.IMAGE_FOLDERNAME:
        //         templatePath += `/${isType}`;
        //         generationPath += `/${isType}`;
        //         Common.createFolders(generationPath);
        //         this.assetSupportWorker.generateStaticFile(generationPath, templatePath, assetElement);
        //         console.log('generate asset files of image are ---templatpath- ', templatePath, ' --generationpath ---  ', generationPath);
        //         break;
        //     case this.CSS_FOLDERNAME:
        //         templatePath += `${this.ASSET_CSS_NAME}/${assetElement}`;
        //         generationPath += `/${this.ASSET_CSS_NAME}`;
        //         break;
        //     default:
        //         break;
        // }
    }

    // private generateAssetFile(assetElement, generationPath, templatePath) {
    //     let assetGenerationPath = `${generationPath}/src/assets`;
    //     switch (assetElement) {
    //         case this.isAssetImage[0]:
    //             templatePath = path.resolve(__dirname, templatePath);
    //             templatePath = `${templatePath}/img/home.jpg`;
    //             const temp = `${assetGenerationPath}/img`;
    //             Common.createFolders(temp);
    //             const img = fs.readFile(templatePath, (err, data) => {
    //                 fs.writeFile(`${temp}/home.jpg`, data, 'binary', (err) => {
    //                     if (err) {
    //                         console.log("There was an error writing the image")
    //                     }

    //                     else {
    //                         console.log("There file was written")
    //                     }
    //                 })
    //             })
    //             break;
    //         default:
    //             break;
    //     }
    // }
}