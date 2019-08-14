import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class IonicSupportWorker {
    public async generateStaticFile(applicationPath, seedFilePath, fileName) {
        console.log('generate support worker applicationpaht ---- ', applicationPath);
        console.log('generate support worker seedfilepath ---- ', seedFilePath);
        console.log('generate support worker fileName ---- ', fileName);
        await fs.readFile(`${seedFilePath}/${fileName}`, 'utf8', (err, result) => {
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                })
            }
        })
    }

    public async generateImgFile(applicationPath, seedFilePath, fileName) {
        console.log('generate support worker applicationpaht ---- ', applicationPath);
        console.log('generate support worker seedfilepath ---- ', seedFilePath);
        console.log('generate support worker fileName ---- ', fileName);
        await fs.readFile(`${seedFilePath}/${fileName}`, (err, result) => {
            if (result) {
                fs.writeFile(applicationPath + `/${fileName}`, result, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} file generated`);
                })
            }
        })
    }

}