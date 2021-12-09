import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import * as childProcess from 'child_process';

export class GCAMScreenSupportWorker {

    private exec = childProcess.exec;

    public gcamScreenSupportWorker(screenname, generationpath, templatepath, callback) {
        let dmnFolder = generationpath;
        if (!fs.existsSync(dmnFolder)) {
            fs.mkdirSync(dmnFolder);
            // this.exec(`cd ${dmnFolder.replace(/\s+/g, '\\ ')} && mkdir -p /src/assets`);
        }
        let pathfile = path.resolve(__dirname, templatepath);
        let generateModel = st.loadGroup(require(pathfile + '/gcam_resource_stg'));
        //console.log('------dmnpathfile-----', [screenname]);
        let modelData = generateModel.render("gcam_resource", [screenname]);
        console.log('gcam json', modelData, generationpath, templatepath,'=====', dmnFolder);
        fs.writeFile(`${dmnFolder}/src/assets` + `/resources.ts`, modelData, function (err) {
            if (err) throw err;
            callback(' DMN file generated');
        })

    }


}