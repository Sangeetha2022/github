import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class DmnSupportWorker {

    public dmnSupportWorker(screenname, generationpath, templatepath, callback) {
        let dmnFolder = generationpath;
        if (!fs.existsSync(dmnFolder)) {
            fs.mkdirSync(dmnFolder);
        }
        let pathfile = path.resolve(__dirname, templatepath);
        let generateModel = st.loadGroup(require(pathfile + '/dmnfile_stg'));
        // console.log('------dmnpathfile-----', screenname);
        let modelData = generateModel.render("dmnfile", [screenname]);
        console.log('dmn json ', modelData, generationpath, '----', templatepath);
        fs.writeFile(dmnFolder + `/Gep_authorize.dmn`, modelData, function (err) {
            if (err) throw err;
            callback(' DMN file generated');
        })

    }


}