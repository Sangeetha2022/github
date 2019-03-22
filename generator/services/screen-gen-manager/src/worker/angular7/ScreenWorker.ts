import { ScreenSupportWorker } from "../../supportworker/angular7/ScreenSupportWorker";
import { E2eSupportWorker } from "../../supportworker/angular7/e2e/E2eSupportWorker";
import { SrcSupportWorker } from '../../supportworker/angular7/src/SrcSupportWorker';
import { AppSupportWorker } from '../../supportworker/angular7/src/AppSupportWorker';
import * as fs from 'fs';
import { EnvironmentSupportWorker } from "../../supportworker/angular7/environments/EnvironmentSupportWorker";


let screenSupportWorker = new ScreenSupportWorker();
let e2eSupportWorker = new E2eSupportWorker();
let srcSupportWorker = new SrcSupportWorker();
let appSupportWorker = new AppSupportWorker();
let environmentSupportWorker = new EnvironmentSupportWorker();

export class ScreenWorker {

    private e2eFolder: String = 'e2e';
    private SourceFolder: String = 'src';
    private paths: any[] = [];
    private appFolderName: String = 'app';
    private envFolder: String = 'environments';

    // generate e2e folder
    generateE2E(path, callback) {
        // const appE2EPath = `${appPath}/e2e`;
        // const E2ETemplatePath = `${templatePath}/e2e`;
        const e2ePath = `${path.destination}/${this.e2eFolder}`;
        const e2eSourcePath = `${e2ePath}/${this.SourceFolder}`;
        this.paths.push(e2ePath);
        this.paths.push(e2eSourcePath);
        this.createFolders();
        const workerPath = {
            source: `${path.source}/${this.e2eFolder}`,
            destination: e2ePath
        }
        e2eSupportWorker.generateE2E(workerPath, (e2eResponse) => {
            workerPath.destination = e2eSourcePath;
            e2eSupportWorker.generateE2ESrc(workerPath, (e2eSrcResponse) => {
                callback(e2eSrcResponse);
            });
        });
    }

    // generateEnvironment folder 
    generateEnvironment(path, callback) {
        const environmentPath = `${path.destination}/${this.SourceFolder}/${this.envFolder}`;
        this.paths.push(environmentPath);
        this.createFolders();
        const workerPath = {
            source: `${path.source}/${this.envFolder}`,
            destination: environmentPath
        }
        environmentSupportWorker.generateEnvironmentFile(workerPath, (response) => {
            callback(response);
        })
    }

    // generate constant files 
    generateConstantFile(path, callback) {
        screenSupportWorker.generateConstant(path, (constResponse) => {
            screenSupportWorker.generateTsConfig(path, (tsResponse) => {
                callback(tsResponse);
            });
        });
        // screenSupportWorker.generateAngularJson(appPath, templatePath, projectName);

    }

    // generate src ts files
    generateSrcTsFile(path, callback) {
        const workerPath = {
            source: `${path.source}/${this.SourceFolder}`,
            destination: `${path.destination}/${this.SourceFolder}`
        }
        srcSupportWorker.generateAppTsConfig(workerPath, (response) => {
            callback(response);
        })
    }

    // generate karma files
    generateKarmaFile(path, callback) {
        const workerPath = {
            source: `${path.source}/${this.SourceFolder}`,
            destination: `${path.destination}/${this.SourceFolder}`
        }
        srcSupportWorker.generateKarmaFile(workerPath, (response) => {
            callback(response);
        })
    }

    // generate src constant ts files
    generateSrcConstantFile(path, callback) {
        const workerPath = {
            source: `${path.source}/${this.SourceFolder}`,
            destination: `${path.destination}/${this.SourceFolder}`
        }
        srcSupportWorker.generateSrcConstantFile(workerPath, (response) => {
            callback(response);
        })
    }

    // generate index.html files
    generateIndexFile(path, script, stylesheet, title, callback) {
        const workerPath = {
            source: `${path.source}/${this.SourceFolder}`,
            destination: `${path.destination}/${this.SourceFolder}`
        }
        srcSupportWorker.generateIndexHtml(workerPath, title, script, stylesheet, (response) => {
            callback(response);
        })
    }

    // generate styles.scss files
    generateStylesFile(path, styles, callback) {
        const workerPath = {
            source: `${path.source}/${this.SourceFolder}`,
            destination: `${path.destination}/${this.SourceFolder}`
        }
        srcSupportWorker.generateAppStyles(workerPath, styles, (response) => {
            callback(response);
        })
    }

    // generate angular.json files
    generateAngularJsonFile(path, projectName,
        cssArray, scriptArray, callback) {
        screenSupportWorker.generateAngularJson(path, projectName,
            cssArray, scriptArray, (response) => {
                callback(response);
            })
    }

    // generate package.json files
    generatePackageJsonFile(path, projectName, packageDependency, callback) {
        screenSupportWorker.generatePackageJson(path,
            projectName, packageDependency, (response) => {
                callback(response);
            });
    }

    // generate app component file
    // generateAppFiles(path, callback) {
    //     const appPath = `${path.source}/${this.SourceFolder}/${this.appFolderName}`;
    //     this.paths.push(appPath);
    //     this.createFolders();
    //     const workerPath = {
    //         source: appPath,
    //         destination: `${path.destination}/${this.SourceFolder}`
    //     }
    //     appSupportWorker.generateAppHtmlFile(workerPath, (htmlResponse) => {
    //         appSupportWorker.generateAppTsFile(workerPath, this.appFolderName, (tsResponse) => {
    //             appSupportWorker.generateCssFile(workerPath, this.appFolderName, null, (cssResponse) => {
    //                 appSupportWorker.generateSpecFile(workerPath, this.appFolderName, (specResponse) => {
    //                     callback('app component are generated')
    //                 });
    //             });
    //         });
    //     });
    // }

    // generate routing files
    generateRoutingFile(path, importComponent, componentPath, callback) {
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }
        appSupportWorker.generateAppRoutingFile(workerPath,
            importComponent, componentPath, (response) => {
                callback(response);
            });
    }

    // generate app.module.ts file
    generateAppModuleFile(path, projectName,
        importComponent, importModuleDependency, callback) {
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }
        appSupportWorker.generateAppModuleFile(workerPath,
            this.appFolderName, importComponent, importModuleDependency, (response) => {
                callback(response);
            });
    }

    // generate app html file
    generateAppHtmlFile(path, folderName, appHtml, callback) {
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }
        appSupportWorker.generateAppHtmlFile(workerPath, folderName, appHtml, (response) => {
            callback(response);
        })
    }

    // generate app ts file
    generateAppTsFile(path, folderName, callback) {
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }
        appSupportWorker.generateAppTsFile(workerPath, folderName, (response) => {
            callback(response);
        })
    }

    // generate custom Html component file
    generateCustomHtmlFile(path, folderName, htmlCode, callback) {
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }
        appSupportWorker.generateHtmlFile(workerPath, folderName, htmlCode, (response) => {
            callback(response);
        })
    }

    generateCustomTsFile(path, folderName, componentObj, callback) {
        // appSupportWorker.generateTsFile(appPath, templatePath, folderName,
        //     importDependency, importComponent,
        //     componentVariable, componentConstructorParams,
        //     componentOnInit, componentMethod, (response) => {
        //         callback(response);
        //     })
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }
        appSupportWorker.generateTsFile(workerPath, folderName, componentObj, (response) => {
            callback(response);
        })
    }

    generateCustomCssFile(path, folderName, styles, callback) {
        // appSupportWorker.generateCssFile(appPath, templatePath, folderName, styles, (response) => {
        //     callback(response);
        // })
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }
        console.log('custom css path are ----- ', workerPath);
        appSupportWorker.generateCssFile(workerPath, folderName, styles, (response) => {
            callback(response);
        })
    }

    generateCustomSpecFile(path, folderName, callback) {
        // appSupportWorker.generateSpecFile(appPath, templatePath, folderName, folderName, (response) => {
        //     callback(response);
        // })
        const workerPath = {
            source: `${path.source}/${this.appFolderName}`,
            destination: `${path.destination}/${this.SourceFolder}/${this.appFolderName}`
        }

        appSupportWorker.generateSpecFile(workerPath, folderName, (response) => {
            callback(response);
        })
    }



    // create src app and assets folder
    createFolders() {
        this.paths.forEach(pathElement => {
            if (!fs.existsSync(pathElement)) {
                fs.mkdirSync(pathElement)
            }
        })
    }
}