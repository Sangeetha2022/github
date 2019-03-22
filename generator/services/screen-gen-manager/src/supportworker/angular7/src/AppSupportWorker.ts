
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as base64Img from 'base64-img';


export class AppSupportWorker {

    // generate Custom Html
    generateHtmlFile(path, folderName, htmlCode, callback) {
        // create folder if not exists
        const destinationPath = `${path.destination}/${folderName}`;
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath)
        }
        // generate custom.component.html files
        var htmlStg = st.loadGroup(require(path.source + '/component_html_stg'));
        var htmlConf = htmlStg.render("component_html", [htmlCode]);
        fs.writeFile(destinationPath + `/${folderName}.component.html`, htmlConf, function (err) {
            if (err) throw err;
            console.log(`${folderName}.component.html file saved!!`)
            callback(`${folderName}.component.html file saved!!`);
        })
    }
    // generate Custom Ts
    generateTsFile(path, folderName,
        componentObj, callback) {

        const destinationPath = `${path.destination}/${folderName}`;;
        // create folder if not exists
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath)
        }
        console.log('component object aer --- ', componentObj, ' -- ', folderName);
        const className = folderName.charAt(0).toUpperCase() + folderName.slice(1);
        // generate custom.component.ts files
        var tsStg = st.loadGroup(require(path.source + '/component_ts_stg'));
        var tsConf = tsStg.render("component_ts", [className, folderName,
            componentObj.importDependency, componentObj.importComponent,
            componentObj.componentVariable, componentObj.componentConstructorParams,
            componentObj.componentOnInit, componentObj.componentMethod]);
        fs.writeFile(destinationPath + `/${folderName}.component.ts`, tsConf, function (err) {
            if (err) throw err;
            console.log(`${folderName}.component.ts file saved!!`)
            callback(`${folderName}.component.ts file saved!!`);
        })
    }
    // generate Custom Spec
    generateSpecFile(path, folderName, callback) {
        // create folder if not exists
        let destinationPath = path.destination;
        if (folderName !== 'app') {
            destinationPath = `${path.destination}/${folderName}`;
        }
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath)
        }
        const className = folderName.charAt(0).toUpperCase() + folderName.slice(1);
        // generate custom.component.spec.ts files
        var specStg = st.loadGroup(require(path.source + '/component_spec_stg'));
        var specConf = specStg.render("component_spec", [className, folderName]);
        fs.writeFile(destinationPath + `/${folderName}.component.spec.ts`, specConf, function (err) {
            if (err) throw err;
            console.log(`${folderName}.component.spec.ts file saved!!`)
            callback(`${folderName}.component.spec.ts file saved!!`);
        })
    }
    // generate Custom css
    generateCssFile(path, folderName, styles, callback) {
        // create folder if not exists
        let destinationPath = path.destination;
        if (folderName !== 'app') {
            console.log('entering into if condition')
            destinationPath = `${path.destination}/${folderName}`;
        }
        console.log('css folder path are ---- ', destinationPath, ' -- ', folderName)
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath)
        }
        // generate custom.component.scss files
        var cssStg = st.loadGroup(require(path.source + '/component_scss_stg'));
        var cssConf = cssStg.render("component_scss", [styles]);
        fs.writeFile(destinationPath + `/${folderName}.component.scss`, cssConf, function (err) {
            if (err) throw err;
            console.log(`${folderName}.component.scss file saved!!`)
            callback(`${folderName}.component.scss file saved!!`);
        })
    }
    // generate App Html
    generateAppHtmlFile(path, folderName, appHtml, callback) {

        // generate app.component.html files
        var appHtmlStg = st.loadGroup(require(path.source + '/app_html_stg'));
        var appHtmlConf = appHtmlStg.render("app_html", [appHtml]);
        fs.writeFile(path.destination + `/${folderName}.component.html`, appHtmlConf, function (err) {
            if (err) throw err;
            console.log('app.component.html file saved!!')
            callback('app.component.html file generated');
        })
    }
    // generate app Ts
    generateAppTsFile(path, folderName, callback) {

        const className = folderName.charAt(0).toUpperCase() + folderName.slice(1);
        // generate app.component.ts files
        var appTsStg = st.loadGroup(require(path.source + '/app_ts_stg'));
        var appTsConf = appTsStg.render("app_ts", [className, folderName]);
        fs.writeFile(path.destination + '/app.component.ts', appTsConf, function (err) {
            if (err) throw err;
            console.log('app.component.ts file saved!!')
            callback('app.component.ts file generated')
        })
    }
    // generaate app module file
    generateAppModuleFile(path,
        folderName, importComponent, importModuleDependency, callback) {

        // generate app.module.ts files
        var appModuleStg = st.loadGroup(require(path.source + '/app_module_ts_stg'));
        var appModuleConf = appModuleStg.render("app_module_ts", [importComponent, importModuleDependency]);
        fs.writeFile(path.destination + `/${folderName}.module.ts`, appModuleConf, function (err) {
            if (err) throw err;
            console.log(`${folderName}.module.ts file saved!!`)
            callback(`${folderName}.module.ts file saved!!`);
        })
    }
    // generate app routing file
    generateAppRoutingFile(path, importComponent, componentPath, callback) {
        console.log('genearte app routing path --- ', path);

        // generate app-routing files
        var routingStg = st.loadGroup(require(path.source + '/app_routing_module_ts_stg'));
        var routingConf = routingStg.render("app_routing_module_ts", [importComponent, componentPath]);
        fs.writeFile(path.destination + '/app-routing.module.ts', routingConf, function (err) {
            if (err) throw err;
            console.log('app-routing.module.ts file saved!!')
            callback('app-routing.module.ts file saved!!');
        })
    }

    // generate assets file
    generateAssetFile(path, assetData, filename, callback) {
        console.log('generateassetfile in supportworker are ---- ', path, filename);
        // neccessary don't remove
        if (!fs.existsSync(path.destination)) {
            fs.mkdirSync(path.destination)
        }
        var assetStg = st.loadGroup(require(path.source + '/assets_stg'));
        var assetConf = assetStg.render("assets", [assetData]);
        fs.writeFile(path.destination + `/${filename}`, assetConf, function (err) {
            if (err) throw err;
            console.log(`${filename} file saved!!`)
            callback(`${filename} file saved!!`);
        })
    }
// generate img file
generateImgFile(path, imageFile, callback) {
       // neccessary don't remove
       if (!fs.existsSync(path.destination)) {
        fs.mkdirSync(path.destination)
    }
    // base64Img.base64(`/home/dhina/Videos/StahlsJenkins/GrapesJS/generate_code/angularApp/src/assets/img/home.jpg`, function(err, data) {
    //     console.log('err data --- ', err);
    //     console.log('base 64 img ---- ', data);
        base64Img.img(imageFile.image, path.destination, imageFile.imagename, function(err, filepath) {
            
            callback()
        });
    
}

}