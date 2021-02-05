import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class ScreenSupportWorker {

    async screenfilegenerate(screenname, applicationPath, templatePath,callback) {
        applicationPath += `/src`;
        await Common.createFolders(applicationPath);
        applicationPath += `/assets`;
        await Common.createFolders(applicationPath);
        let pathFile = path.resolve(__dirname, templatePath);
        console.log('------screenpathFile-----', pathFile);
        let generateModel = st.loadGroup(require(pathFile + '/seed_stg'));
        let modelData = generateModel.render("seed", [screenname]);
        console.log('-------assetsfolder----',applicationPath);
        fs.writeFile(applicationPath + `/screen.ts`, modelData, function (err) {
            if (err) throw err;
            var response = {
                body: 'Login file Generated'
            }
            callback(response);
        })

    }
}