import * as asyncLoop from 'node-async-loop';

import { AngularJsonFileWorker } from './AngularJsonFileWorker';
import { PackageJsonFileWorker } from '../dependency-worker/packageJsonFileWorker'
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';
import { AppRoutingModuleWorker } from './AppRoutingModuleWorker';
import { AppModuleWorker } from './AppModuleWorker';
import { ComponentSupportWorker } from '../../supportworker/componentsupportworker/componentsupportworker';

let angularJsonFileWorker = new AngularJsonFileWorker();
let packageJsonFileWorker = new PackageJsonFileWorker();
const appRoutingModuleWorker = new AppRoutingModuleWorker();
const appModuleWorker = new AppModuleWorker();
const componentSupportWorker = new ComponentSupportWorker();

export class DependencyWorker {
    public angularJsonData: any;
    public packageModule: any;
    public modifyDependency(details, callback) {

        //toaster implemented angular.json and package.json files
        const flows = details.flows
        const packagePath = details.projectGenerationPath;
        const srcPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}`;
        const applicationPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        if (flows.length > 0) {
            flows.map(data => {
                if (data.actionOnData == 'GpCreate' || data.actionOnData == 'GpUpdate') {
                    this.angularJsonData = [];
                    Constant.PACKAGE_MODULE.push(`"ngx-toastr": "^10.1.0",`)
                    this.angularJsonData.push('node_modules/ngx-toastr/toastr.css')
                    angularJsonFileWorker.modifyAngularJsonFile(packagePath, this.angularJsonData)
                }
            })
        }
        details.desktop.forEach(element => {
            if (element.is_grid_present == true && element.is_bootStrapTable_present == true) {
                Constant.PACKAGE_MODULE.push(`"jw-angular-pagination": "^1.2.0",`)
                Constant.PACKAGE_MODULE.push(`"bootstrap": "~4.5.0",`)
                Constant.PACKAGE_MODULE.push(`"@ng-bootstrap/ng-bootstrap": "~4.2.2",`)
                Constant.PACKAGE_MODULE.push(`"@angular/localize": "^11.0.7",`)
                this.modify_polyfills(details)
            }


        });


        //    if (this.routeModule.routePath.length > 0) {
        //         dependencyWorker.modifyAppRouteFile(applicationPath, this.routeModule);
        //         this.initializeRouteModule();
        //     }
        //     if (this.appModule.importDependency.length > 0) {
        //         dependencyWorker.modifyAppModuleFile(applicationPath, this.appModule);
        //         this.initializeAppModule();
        //     }
        //     // if (this.packageModule.length > 0) {
        //     this.configAppModule.push(`    "module": "esnext",`);
        //     console.log(`package json -------`, this.packageModule)
        packageJsonFileWorker.modifyPackageFile(packagePath, Constant.PACKAGE_MODULE);
        appRoutingModuleWorker.importRoutingModules(details, (res, err) => {

        })
        appModuleWorker.importComponentModules(details, (res, err) => {

        });
        this.modifyTranslateJson(details, (res) => {

        });

        //     // dependencyWorker.modifyConfigAppJSONFile(packagePath, this.configAppModule);
        //     this.initializePackageModule();
        //     // }
        //     if (globalStyle.import.length > 0 || globalStyle.others.length > 0) {
        //         dependencyWorker.modifyGlobalStyles(srcPath, globalStyle);
        //         this.initializeOtherInfo();
        //     }
        //     // modify proxy file
        //     flowServiceWorker.modifyProxyFile(packagePath);
        callback('Done');
    }

    modify_polyfills(details) {
        let applicationPath = `${details.projectGenerationPath}/src/polyfills.ts`
        const polyfills = componentSupportWorker.readFile(applicationPath, (fileRes) => {
            if (fileRes.includes(`import '@angular/localize/init'`)) {
                console.log("Alreay modified")
            } else {
                const index = fileRes.length;
                const output = [fileRes.slice(0, index), `import '@angular/localize/init';`].join('');
                componentSupportWorker.writeFile(applicationPath, output, (writeRes) => {
                });
            }
        });
    }

    modifyTranslateJson(details, callback) {
        const languages = ['en', 'es', 'ta']
        asyncLoop(details.desktop, (desktopElement, desktopNext) => {
            asyncLoop(languages, (language, languageNext) => {
                const path = details.projectGenerationPath + '/' + 'src/assets/locales/' + language + '/translation.json';
                componentSupportWorker.readFile(path, (fileRes) => {
                    if (fileRes) {
                        const index = fileRes.indexOf(`"source":{`);
                        const output = [fileRes.slice(0, index + 10), `"${desktopElement.screenName}":"${desktopElement.screenName}",`, fileRes.slice(index + 10)].join('');
                        componentSupportWorker.writeFile(path, output, (writeRes) => {
                            languageNext();
                        });
                    }
                });
            }, (languageErr) => {
                desktopNext();
            });
        }, (desktoperr) => {
            if (!desktoperr) {
                callback('Translate file modification completed');
            }
        });
    }
}