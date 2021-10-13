import { AcousticDao } from "../dao/acousticdao";
const fs = require("fs");

const acousticdao = new AcousticDao();

export class WriteImages {
    getImages(imageObject: any, path, callback) {
        const imageurl = imageObject.renditions.small.url.split('?')[0];
        const imageName = imageObject.asset.fileName;
        acousticdao.getImages(imageurl, (res) => {
            res.pipe(fs.createWriteStream(path + imageName));
            callback(imageName);
        });

    }
}