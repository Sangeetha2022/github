import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { DependencySupportWorker } from '../supportworker/dependencySupportWorker';
import { Common } from '../config/Common';
import { ComponentWorker } from './componentWorker';
import { AssetWorker } from './assetWorker';

let dependencySupportWorker = new DependencySupportWorker();
let componentWorker = new ComponentWorker();
let assetWorker = new AssetWorker();

export class DependencyWorker {
    // template name
    private INDEX_HTML_TEMPLATE_NAME: String = 'index_html';
    private STYLE_TEMPLATE_NAME: String = 'styles_scss';
    private APP_ROUTING_TEMPLATE_NAME: String = 'app_routing';
    private SHARED_SERVICE_TEMPLATE_NAME: String = 'shared_service';
    private NGINX_DEFAULT_TEMPLATE_NAME: String = 'nginx_default';
    private DOCKERFILE_TEMPLATE_NAME: String = 'docker_file';

    // filename
    private STYLE_FILENAME: String = 'styles.scss';
    private APP_ROUTING_FILENAME: String = 'app-routing.module.ts';
    private SHARED_FILENAME: String = 'shared.service.ts';
    private NGINX_FILENAME: String = 'default.conf';
    private DOCKERFILE_FILENAME: String = 'Dockerfile';
    private DEFAULT_CONF_FILENAME: String = 'default.conf';

    // foldername
    private SHARED_FOLDERNAME: String = 'shared';
    private SRC_FOLDERNAME: String = 'src';
    private APP_FOLDERNAME: String = 'app';
    private NGINX_FOLDERNAME: String = 'nginx';
    private STATIC_TEMPLATE_FOLDERNAME: String = 'static';

    generateIndexHtml(generationPath, templatePath, baseTag, scriptTag, callback) {
        // const index = baseTag.join('').findIndex(element => element.includes('gjs-base.css'));
        // console.log('gjs-base css is present are -----  ', index);
        const temp = {
            baseTag: baseTag,
            scriptTag: scriptTag
        }
        console.log('generate index html file in angular template ------ ', temp);
        assetWorker.checkAssetFile(baseTag.join(''), generationPath, templatePath);
        assetWorker.checkAssetFile(scriptTag.join(''), generationPath, templatePath);
        
        return dependencySupportWorker.generateIndexHtml(generationPath, templatePath,
            this.INDEX_HTML_TEMPLATE_NAME, temp, (response) => {
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
        const folderName = componentWorker.TEMPLATE_FOLDERNAME;
        routing.importComponent.push({ classname: folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase(), foldername: folderName });
        routing.componentPath.push({ path: '', component: folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase(), isAuthProtected: false });
        // app routing file path
        const filePath = `${generationPath}/${this.SRC_FOLDERNAME}/${this.APP_FOLDERNAME}`;
        dependencySupportWorker.generateFiles(templatePath, filePath, this.APP_ROUTING_FILENAME,
            this.APP_ROUTING_TEMPLATE_NAME, routing, (response) => {
                callback();
            })
    }

    generateStyleSCSS(generationPath, templatePath, css, callback) {
        assetWorker.checkAssetFile(css, generationPath, templatePath);
        // styles css file path
        const filePath = `${generationPath}/${this.SRC_FOLDERNAME}`;
        return dependencySupportWorker.generateFiles(templatePath, filePath,
            this.STYLE_FILENAME, this.STYLE_TEMPLATE_NAME, css, (response) => {
                callback('style.css files are generated');
            })
    }

    generateSharedFile(generationPath, templatePath, sharedObj, callback) {
        // shared file path
        const filePath = `${generationPath}/${this.SRC_FOLDERNAME}/${this.SHARED_FOLDERNAME}`;
        return dependencySupportWorker.generateFiles(templatePath, filePath, this.SHARED_FILENAME,
            this.SHARED_SERVICE_TEMPLATE_NAME, sharedObj, (response) => {
                callback();
            })
    }

    generateNginxDockerFile(generationPath, templatePath, projectName, callback) {
        const generateNginxPath = `${generationPath}/${this.NGINX_FOLDERNAME}`;
        Common.createFolders(generateNginxPath);
        dependencySupportWorker.generateStaticFile(generateNginxPath, `${templatePath}/${this.STATIC_TEMPLATE_FOLDERNAME}`,
            this.DEFAULT_CONF_FILENAME);
        dependencySupportWorker.generateFiles(templatePath, generationPath, this.DOCKERFILE_FILENAME,
            this.DOCKERFILE_TEMPLATE_NAME, projectName, (response) => {
                callback();
            })
    }


}