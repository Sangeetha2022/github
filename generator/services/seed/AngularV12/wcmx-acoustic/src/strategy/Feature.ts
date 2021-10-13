import { Constant } from '../assets/constant';
import { WriteImages } from '../image-download/image.write';

const writeImages = new WriteImages();

export class FeatureService {
    feature_arr = [];
    FeatureComponent(value, callback) {
        let feature = {
            featureHeadline: '',
            imagePlacement: '',
            image: '',
            imageSize: '',
            descriptionOfFeature: '',
            readMoreLink: {
                value: '',
                link: ''
            }
        }
        this.feature_arr = [];
        Object.keys(value.elements).forEach(async(key) => {
            // console.log('feature object iteration----->>>', value.elements[key]);
            if (key == "featureHeadline") {
                feature.featureHeadline = value.elements[key].value
            } else if (key == 'descriptionOfFeature') {
                feature.descriptionOfFeature = value.elements[key].value
            } else if (key == 'imagePlacement') {
                feature.imagePlacement = value.elements[key]
            } else if (key == 'image') {
                this.WriteImage(value.elements[key]);
                feature.image = value.elements[key].asset.fileName;
            } else if (key == 'imageSize') {
                feature.imageSize = value.elements[key]
            } else if (key == 'readMoreLink') {
                feature.readMoreLink.value = value.elements[key].linkText;
                feature.readMoreLink.link = value.elements[key].linkURL;
            } else {
                console.log('------new key has been added');
            }

        })
        this.feature_arr.push(feature);
        callback(this.feature_arr);
    }



    WriteImage(image) {
        return new Promise((resolve, reject) => {
            writeImages.getImages(image, Constant.IMAGE_PATH, (image_res, image_err) => {
                if (image_err) {
                    reject(image_err);
                }
                resolve(image_res);
            });
        });
    }
}