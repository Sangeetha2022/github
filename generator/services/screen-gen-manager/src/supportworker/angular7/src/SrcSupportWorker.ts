
import { EnvironmentSupportWorker } from '../environments/EnvironmentSupportWorker';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';


let environmentSupportWorker = new EnvironmentSupportWorker();
export class SrcSupportWorker {

    generateIndexHtml(path, title, script, stylesheet, callback) {


        // generate index.html files
        var indexStg = st.loadGroup(require(path.source + '/index_html_stg'));
        var indexConf = indexStg.render("index_html", [title, script, stylesheet]);
        fs.writeFile(path.destination + '/index.html', indexConf, function (err) {
            if (err) throw err;
            console.log('index.html file saved!!')
            callback('index.html file generated');
        })
    }

    generateKarmaFile(path, callback) {

        // generate karma.conf.js files
        var karmaConfigStg = st.loadGroup(require(path.source + '/karma_conf_js_stg'));
        var karmaConf = karmaConfigStg.render("karma_conf_js");
        fs.writeFile(path.destination + '/karma.conf.js', karmaConf, function (err) {
            if (err) throw err;
            console.log('karma.conf.js file saved!!')
            callback('karma file generated')
        })
    }

    generateSrcConstantFile(path, callback) {

        // generate browsersList files
        var browsersListStg = st.loadGroup(require(path.source + '/browserslist_stg'));
        var browsersListConf = browsersListStg.render("browserslist");
        fs.writeFile(path.destination + '/browserslist', browsersListConf, function (err) {
            if (err) throw err;
            console.log('browsersList file saved!!')
        })
        // generate main.ts files
        var mainStg = st.loadGroup(require(path.source + '/main_ts_stg'));
        var mainConf = mainStg.render("main_ts");
        fs.writeFile(path.destination + '/main.ts', mainConf, function (err) {
            if (err) throw err;
            console.log('main.ts file saved!!')
        })
        // generate polyfills.ts files
        var ployFillsStg = st.loadGroup(require(path.source + '/polyfills_ts_stg'));
        var ployFillsConf = ployFillsStg.render("polyfills_ts");
        fs.writeFile(path.destination + '/polyfills.ts', ployFillsConf, function (err) {
            if (err) throw err;
            console.log('polyfills.ts file saved!!')
        })
        // generate test.ts files
        var testStg = st.loadGroup(require(path.source + '/test_ts_stg'));
        var testConf = testStg.render("test_ts");
        fs.writeFile(path.destination + '/test.ts', testConf, function (err) {
            if (err) throw err;
            console.log('test.ts file saved!!')
            callback('src constant file generated')
        })
    }

    generateAppTsConfig(path, callback) {

        // generate tsconfig.app.json files
        var tsConfigAppStg = st.loadGroup(require(path.source + '/tsconfig_app_json_stg'));
        var tsConfigAppConf = tsConfigAppStg.render("tsconfig_app_json");
        fs.writeFile(path.destination + '/tsconfig.app.json', tsConfigAppConf, function (err) {
            if (err) throw err;
            console.log('tsconfig.app.json file saved!!')

        })
        // generate tsconfig.spec.json files
        var tsConfigSpecStg = st.loadGroup(require(path.source + '/tsconfig_spec_json_stg'));
        var tsConfigSpecConf = tsConfigSpecStg.render("tsconfig_spec_json");
        fs.writeFile(path.destination + '/tsconfig.spec.json', tsConfigSpecConf, function (err) {
            if (err) throw err;
            console.log('tsconfig.spec.json file saved!!')
        })
        // generate tslint.json files
        var tslintJsonStg = st.loadGroup(require(path.source + '/tslint_json_stg'));
        var tslintJsonConf = tslintJsonStg.render("tslint_json");
        fs.writeFile(path.destination + '/tslint.json', tslintJsonConf, function (err) {
            if (err) throw err;
            console.log('tslint.json file saved!!')
            callback('tsconfig file saved!!')
        })
    }

    generateAppStyles(path, styleValue, callback) {

        // generate styles.scss files
        var stylesStg = st.loadGroup(require(path.source + '/styles_scss_stg'));
        var stylesConf = stylesStg.render("styles_scss", [styleValue]);
        fs.writeFile(path.destination + '/styles.scss', stylesConf, function (err) {
            if (err) throw err;
            console.log('styles.scss file saved!!')
            callback('styles.scss files');
        })
    }

    generateAssets(appPath, templatePath) {
        if (!fs.existsSync(appPath)) {
            fs.mkdirSync(appPath)
        }
    }

    generateEnvironmentFile(appPath, templatePath) {
        environmentSupportWorker.generateEnvironmentFile(appPath, templatePath);
    }


}