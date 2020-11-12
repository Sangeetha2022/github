import * as util from 'util';
import { DependencySupportWorker } from '../supportworker/dependencySupportWorker';
import { Common } from '../config/Common';
import { AssetWorker } from './assetWorker';
import { translator } from '../assets/translator';
import { Constant } from '../config/Constant';

let dependencySupportWorker = new DependencySupportWorker();
let assetWorker = new AssetWorker();

export class DependencyWorker {

    generateIndexHtml(generationPath, templatePath, baseTag: Array<any>, scriptTag, callback) {
        // const index = baseTag.join('').findIndex(element => element.includes('gjs-base.css'));
        // console.log('gjs-base css is present are -----  ', index);
        const baseHrefTag: Array<string> = baseTag.filter(element => element.includes('<base href'));
        if(baseHrefTag.length === 0) {
            baseTag.push(`<base href="/" />`);
        }
        const temp = {
            baseTag: baseTag,
            scriptTag: scriptTag
        }
        console.log('generate index html file in angular template ------ ', temp);
        assetWorker.checkAssetFile(baseTag.join(''), generationPath, templatePath);
        assetWorker.checkAssetFile(scriptTag.join(''), generationPath, templatePath);

        return dependencySupportWorker.generateIndexHtml(generationPath, templatePath,
            Constant.INDEX_HTML_TEMPLATE_NAME, temp, (response) => {
                callback('index html files are generated')
            })
    }

    public generateAppRoutingFile(generationPath, templatePath, menuInformation, callback) {
        console.log('generate app routing files are -component worker--------  ', util.inspect(menuInformation, { showHidden: true, depth: null }));
        const routing = {
            importComponent: [],
            isAuthImport: false,
            componentPath: []
        }
        const folderName = Constant.TEMPLATE_FOLDERNAME;
        routing.importComponent.push({ classname: folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase(), foldername: folderName });
        routing.componentPath.push({ path: '', component: folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase(), isAuthProtected: false });
        // app routing file path
        const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        dependencySupportWorker.generateFiles(templatePath, filePath, Constant.APP_ROUTING_FILENAME,
            Constant.APP_ROUTING_TEMPLATE_NAME, routing, (response) => {
                callback();
            })
    }

    generateStyleSCSS(generationPath, templatePath, css, callback) {
        assetWorker.checkAssetFile(css, generationPath, templatePath);
        // styles css file path
        const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}`;
        return dependencySupportWorker.generateFiles(templatePath, filePath,
            Constant.STYLE_FILENAME, Constant.STYLE_TEMPLATE_NAME, css, (response) => {
                callback('style.css files are generated');
            })
    }

    generateSharedFile(generationPath, templatePath, sharedObj, callback) {
        // shared file path
        const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.SHARED_FOLDERNAME}`;
        return dependencySupportWorker.generateFiles(templatePath, filePath, Constant.SHARED_FILENAME,
            Constant.SHARED_SERVICE_TEMPLATE_NAME, sharedObj, (response) => {
                callback();
            })
    }

    generateProxyFile(generationPath, templatePath, callback) {
        return dependencySupportWorker.generateFiles(templatePath, generationPath, Constant.PROXY_CONFIG_FILENAME,
            Constant.PROXY_CONFIG_TEMPLATE_NAME, null, (response) => {
                this.modifyAngularJsonFile(generationPath, Constant.ANGULAR_JSON_FILENAME);
                callback();
            })
    }

    generateTranslatorModuleFile(generationPath, templatePath, sharedObj, callback) {
        // translator file path
        const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}/${Constant.TRANSLATOR_FOLDERNAME}`;
        return dependencySupportWorker.generateFiles(templatePath, filePath, Constant.TRANSLATOR_MODULE_FILENAME,
            Constant.TRANSLATOR_TEMPLATE_NAME, sharedObj, (response) => {
                callback();
            })
    }
    generateTranslatorJsonFile(generationPath, templatePath, sharedObj, callback) {
        const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.ASSETS_FOLDERNAME}/${Constant.LOCALES_FOLDERNAME}`;
        Common.createFolders(filePath)
        const langFolderName = translator.folderName;
        const fileName = translator.fileName[0];
        const source = translator.source;
        return dependencySupportWorker.generateTranslateJsonFiles(filePath, langFolderName, fileName, source, (response) => {
            callback();
        })
    }

    generateNginxDockerFile(generationPath, templatePath, projectName, callback) {
        Constant.proxyDesktop.projectName = Constant.proxyMobile.projectName = projectName;
        const proxyArray = [{ ...Constant.proxyDesktop }, { ...Constant.proxyMobile }];
        console.log('proxyArray for nginx are --- ', proxyArray);
        const temp = {
            proxy: proxyArray
        }
        const generateNginxPath = `${generationPath}/${Constant.NGINX_FOLDERNAME}`;
        Common.createFolders(generateNginxPath);
        // generate nginx file
        dependencySupportWorker.generateFiles(templatePath, generateNginxPath, Constant.NGINX_FILENAME,
            Constant.NGINX_CONF_TEMPLATE_NAME, temp, (response) => { });
        // generate docker file
        dependencySupportWorker.generateFiles(templatePath, generationPath, Constant.DOCKERFILE_FILENAME,
            Constant.DOCKERFILE_TEMPLATE_NAME, projectName, (response) => {
                callback();
            })
    }

    modifyAngularJsonFile(applicationPath, fileName) {
        const angularData = dependencySupportWorker.readFile(applicationPath, fileName);
        console.log('angularData values are---------   ', angularData);
        const serveIndex = angularData.findIndex(x => /"browserTarget"/.test(x));
        const proxyConfigIndex = angularData.findIndex(x => /"proxyConfig"/.test(x));
        console.log('after finded index no --- ', serveIndex, '  --data--  ', angularData[serveIndex]);
        let temp = '';
        if (serveIndex > -1 && proxyConfigIndex < 0) {
            temp += `${angularData[serveIndex]},`;
            temp += `\n\t\t\t\t\t "proxyConfig": "${Constant.PROXY_CONFIG_FILENAME}"`;
            angularData.splice(serveIndex, 1, temp);
            console.log('final anguardata rae ----------  ', angularData);
            dependencySupportWorker.writeStaticFile(applicationPath, fileName, angularData.join('\n'), (response) => {
                console.log('successfully write the angular json file');
            });
        }
    }


}