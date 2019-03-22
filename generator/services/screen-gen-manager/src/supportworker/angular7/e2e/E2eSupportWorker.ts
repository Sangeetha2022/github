
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';



export class E2eSupportWorker {


    generateE2E(path, callback) {
     
        // generate protractor.conf.js files
        var protractorStg = st.loadGroup(require(path.source + '/protractor_conf_js_stg'));
        var protractorConf = protractorStg.render("protractor_conf_js");
        fs.writeFile(path.destination + '/protractor.conf.js', protractorConf, function (err) {
            if (err) throw err;
            console.log('protractor.conf.js file saved!!')
        })

        // generate tsconfig.e2e.json file
        var tsconfigStg = st.loadGroup(require(path.source + '/tsconfig_e2e_json_stg'));
        var tsconfigE2EJSON = tsconfigStg.render("tsconfig_e2e_json");
        fs.writeFile(path.destination + '/tsconfig.e2e.json', tsconfigE2EJSON, function (err) {
            if (err) throw err;
            console.log('tsconfig.e2e.json file saved!!')
            callback('e2e file saved');
        })
    }

    generateE2ESrc(path, callback) {
        
        // generate src/app.e2e-spec.ts files
        var e2eSpecStg = st.loadGroup(require(path.source + '/app_e2espec_ts_stg'));
        var e2eSpecTs = e2eSpecStg.render("app_e2espec_ts", []);
        fs.writeFile(path.destination + '/app.e2e-spec.ts', e2eSpecTs, function (err) {
            if (err) throw err;
            console.log('app.e2e-spec.ts file saved!!')
        })

        // generate src/app.po.ts file
        var poTsStg = st.loadGroup(require(path.source + '/app_po_ts_stg'));
        var appPoTs = poTsStg.render("app_po_ts", []);
        fs.writeFile(path.destination + '/app.po.ts', appPoTs, function (err) {
            if (err) throw err;
            console.log('app.po.ts file saved!!')
            callback('e2e files generated')
        })
    }
}