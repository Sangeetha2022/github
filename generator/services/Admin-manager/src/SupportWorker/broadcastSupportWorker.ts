import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';


export class Broadcastsupportworker {

    public broadcastservice(templatepath,generationpath,callback) {
        let brodcastfolder = generationpath;
        console.log('----boradcast----folder-----', templatepath);
        if (!fs.existsSync(brodcastfolder)) {
            fs.mkdirSync(brodcastfolder);
        }
        let pathfile = templatepath;
        let generateModel = st.loadGroup(require(pathfile + '/broadcast_stg'));
        console.log('------dmnpathfile-----', pathfile);
        let modelData = generateModel.render("broadcast");
        fs.writeFile(brodcastfolder + `/broadcast.service.ts`, modelData, function (err) {
            if (err) throw err;
            callback('Broadcast file generated');
        })

    }
}