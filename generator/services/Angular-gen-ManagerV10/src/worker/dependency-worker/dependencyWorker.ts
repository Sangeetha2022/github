import {AngularJsonFileWorker} from './AngularJsonFileWorker';
import { PackageJsonFileWorker } from '../dependency-worker/packageJsonFileWorker'
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';
import { AppRoutingModuleWorker } from './AppRoutingModuleWorker';
import { AppModuleWorker } from './AppModuleWorker';

let angularJsonFileWorker = new AngularJsonFileWorker();
let packageJsonFileWorker = new PackageJsonFileWorker();
const appRoutingModuleWorker = new AppRoutingModuleWorker();
const appModuleWorker = new AppModuleWorker();

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
}