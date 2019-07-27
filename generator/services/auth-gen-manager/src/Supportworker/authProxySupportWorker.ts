
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class AuthProxySupportWorker {

    public proxyConfig(configPathTemplate, writeConfig, projectName, callback) {
        console.log('write--file --->>>', writeConfig)
        const configFolder = writeConfig + `/src/config`;
        if (!fs.existsSync(configFolder)) {
            fs.mkdirSync(configFolder);
        }

        let pathfile = path.resolve(__dirname, configPathTemplate);
        const generateModel = st.loadGroup(require(pathfile + '/constants_stg'));
        let modelData = generateModel.render("constants");
        // if (!fs.existsSync(configFolder)) {
        //     fs.mkdirSync(configFolder);
        // }

        fs.writeFile(configFolder + `/constants.ts`, modelData, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }
}