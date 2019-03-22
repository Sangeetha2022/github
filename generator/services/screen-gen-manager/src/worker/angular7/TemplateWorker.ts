import * as fs from 'fs';
import { AppSupportWorker } from '../../supportworker/angular7/src/AppSupportWorker';
import * as asyncLoop from 'node-async-loop';

const appSupportWorker = new AppSupportWorker();

// path extention, create folder and foldername declaration
export class TemplateWorker {

    private paths: any[] = [];
    private srcFolder: String = 'src';
    private appFolder: String = 'app';
    private assetFolder: String = 'assets';

    // header file worker
    generateHeader(templateHeader, folderName, path, componentObj, callback) {
        this.createFolders(path);
        // path.source = `${path.source}/${this.appFolder}`;
        // path.destination = `${path.destination}/${this.srcFolder}/${this.appFolder}`;
        const workerPath = {
            source: `${path.source}/${this.appFolder}`,
            destination: `${path.destination}/${this.srcFolder}/${this.appFolder}`
        }
        console.log('template header path ----- ', path);
        appSupportWorker.generateTsFile(workerPath, folderName,
            componentObj, (tsResponse) => {
                appSupportWorker.generateHtmlFile(workerPath, folderName, templateHeader, (htmlResponse) => {
                    appSupportWorker.generateCssFile(workerPath, folderName, null, (cssResponse) => {
                        appSupportWorker.generateSpecFile(workerPath, folderName, (specResponse) => {
                            callback('header folder created');
                        })
                    })
                })
            })
    }

    // template content file worker
    generateTemplate(content, folderName, path, componentObj, callback) {
        this.createFolders(path);
        // path.source = `${path.source}/${this.appFolder}`;
        // path.destination = `${path.destination}/${this.srcFolder}/${this.appFolder}`;
        const workerPath = {
            source: `${path.source}/${this.appFolder}`,
            destination: `${path.destination}/${this.srcFolder}/${this.appFolder}`
        }
        console.log('template path ----- ', path);
        appSupportWorker.generateTsFile(workerPath, folderName,
            componentObj, (tsResponse) => {
                appSupportWorker.generateHtmlFile(workerPath, folderName, content, (htmlResponse) => {
                    appSupportWorker.generateCssFile(workerPath, folderName, null, (cssResponse) => {
                        appSupportWorker.generateSpecFile(workerPath, folderName, (specResponse) => {
                            callback('header folder created');
                        })
                    })
                })
            })
    }

    // footer file worker
    generateFooter(templateFooter, folderName, path, componentObj, callback) {
        this.createFolders(path);
        // path.source = `${path.source}/${this.appFolder}`;
        // path.destination = `${path.destination}/${this.srcFolder}/${this.appFolder}`;
        console.log('footer path ar ---- ', path);
        const workerPath = {
            source: `${path.source}/${this.appFolder}`,
            destination: `${path.destination}/${this.srcFolder}/${this.appFolder}`
        }
        appSupportWorker.generateTsFile(workerPath, folderName,
            componentObj, (tsResponse) => {
                appSupportWorker.generateHtmlFile(workerPath, folderName, templateFooter, (htmlResponse) => {
                    appSupportWorker.generateCssFile(workerPath, folderName, null, (cssResponse) => {
                        appSupportWorker.generateSpecFile(workerPath, folderName, (specResponse) => {
                            callback('header folder created');
                        })
                    })
                })
            })
    }

    // assets files worker
    generateAssetsFile(assetFiles, path, callback) {
        const assetPath = `${path.destination}/src/assets`;
        // const assetScriptPath = `${assetPath}/js`;
        // const assetStylePath = `${assetPath}/css`;
        const workerPath = {
            source: `${path.source}/${this.assetFolder}`,
            destination: ``
        }
        this.createFolders(path);
        console.log("assetFiles values -- ", assetFiles.length);
        asyncLoop(assetFiles, (assetElement, next) => {
            if (assetElement.type == 'style') {
                workerPath.destination = `${assetPath}/css`;
            }
            if (assetElement.type == 'script') {
                workerPath.destination = `${assetPath}/js`;
            }
            appSupportWorker.generateAssetFile(workerPath, assetElement.file, assetElement.filename, (response) => {
                next();
            })
        }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback('asset file generated');
                
            }
        })
    }

    // assets image worker
    generateAssetImage(imageFiles, path, callback) {
        const assetPath = `${path.destination}/src/assets/img`;
        const workerPath = {
            source: `${path.source}`,
            destination: assetPath
        }
        this.createFolders(path);
        asyncLoop(imageFiles, (assetElement, next) => {
           appSupportWorker.generateImgFile(workerPath, assetElement, (response) => {
                next();
            })
        }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback('asset image file generated');
                
            }
        })
    }

    // create src app and assets folder
    createFolders(path) {
        // const srcPath = `${path.source}/src`
        // this.paths.push(srcPath);
        // this.paths.push(`${srcPath}/app`);
        this.paths.push(`${path.destination}/${this.srcFolder}`)
        this.paths.push(`${path.destination}/${this.srcFolder}/${this.appFolder}`)
        this.paths.push(`${path.destination}/${this.srcFolder}/${this.assetFolder}`)
        this.paths.forEach(pathElement => {
            if (!fs.existsSync(pathElement)) {
                fs.mkdirSync(pathElement)
            }
        })
    }

}