import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class DmnSupportWorker {


    public dmnSupportWorker(screenname, generationpath, templatepath, callback) {
        let dmnFolder = generationpath;
        if (!fs.existsSync(dmnFolder)) {
            fs.mkdirSync(dmnFolder);
        }
        let generateModel = st.loadGroup(require(templatepath + '/dmnfile_stg'));
        console.log('------generatormodel-----', generateModel);
        let modelData = generateModel.render("dmnfile", [screenname]);
        fs.writeFile(dmnFolder + `/Gep_authorize.dmn`, modelData, function (err) {
            if (err) throw err;
            callback(' DMN file generated');
        })

    }


}