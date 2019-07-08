import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class ScreenSupportWorker {

    screenfilegenerate(screenname, generationnpath, templatepath,callback) {
        let assetsfolder = generationnpath + `/assets`;
        let generateModel = st.loadGroup(require(templatepath + '/seed_stg'));
        let modelData = generateModel.render("seed", [screenname]);
        if (!fs.existsSync(assetsfolder)) {
            fs.mkdirSync(assetsfolder);
        }
        fs.writeFile(assetsfolder + `/Screen.ts`, modelData, function (err) {
            if (err) throw err;
            var response = {
                body: 'Login file Generated'
            }
            callback(response);
        })

    }
}