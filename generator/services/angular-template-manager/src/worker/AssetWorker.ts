import * as path from 'path';

export class AssetWorker {

    private ASSET_IMAGE_NAME: any[] = [
        'home.jpg',
        'tpl-img-blue-mount--small.jpg',
        'tpl-img-cliff--small.jpg',
        'tpl-img-green-ch.jpg',
        'tpl-img-overlay-gray.png',
        'tpl-img-red-clouds.jpg',
        'tpl-img-s-lake.jpg',
        'tpl-img-sunset--small.jpg',
        'tpl-img-v-sea--small.jpg'
    ];
    private ASSET_CSS_NAME: any[] = [
        'gjs-base.css'
    ];
    private IMAGE_FOLDERNAME = 'img';
    private CSS_FOLDERNAME = 'css';
    checkAssetFile(arrayData) {
        let isFound = false;
        arrayData.forEach(element => {
            // console.log('each arrayData are------------   ', element);
            // isFound = element.includes('tpl-img-green-ch.jpg')
            // console.log('after found the element are ------------   ', isFound);
            this.ASSET_IMAGE_NAME.forEach(assetElement => {
                if (element.includes(assetElement)) {
                    // this.generateAssetFile(element, generationPath, templatePath, this.IMAGE_FOLDERNAME);
                }
            })

        })
    }

    private generateAssetFile(assetElement, generationPath, templatePath, isType) {
        templatePath = path.resolve(__dirname, templatePath);
        generationPath = `${generationPath}/src/assets`;
        switch (isType) {
            case this.IMAGE_FOLDERNAME:
                templatePath += `${this.ASSET_IMAGE_NAME}/${assetElement}`;
                generationPath += `/${this.ASSET_IMAGE_NAME}`;
                console.log('generate asset files of image are ---templatpath- ', templatePath, ' --generationpath ---  ', generationPath);
                break;
            case this.CSS_FOLDERNAME:
                templatePath += `${this.ASSET_CSS_NAME}/${assetElement}`;
                generationPath += `/${this.ASSET_CSS_NAME}`;
                break;
            default:
                break;
        }
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