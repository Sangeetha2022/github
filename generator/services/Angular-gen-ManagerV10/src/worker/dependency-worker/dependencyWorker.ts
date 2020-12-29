import {AngularJsonFileWorker} from './AngularJsonFileWorker';
import { PackageJsonFileWorker } from '../dependency-worker/packageJsonFileWorker'
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';

let angularJsonFileWorker = new AngularJsonFileWorker();
let packageJsonFileWorker = new PackageJsonFileWorker();

export class DependencyWorker {
    public angularJsonData: any;
    public packageModule: any;
    public modifyDependency(packagePath, srcPath, applicationPath, globalStyle, microFlows, callback) {

    //toaster implemented angular.json and package.json files
        if (microFlows.length > 0) {
            microFlows.map(data => {
                if (data.actionOnData == 'GpCreate' || data.actionOnData == 'GpUpdate') {
                    this.angularJsonData = [];
                    this.packageModule.push(`"ngx-toastr": "^10.1.0",`)
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
    //     // dependencyWorker.modifyConfigAppJSONFile(packagePath, this.configAppModule);
    //     this.initializePackageModule();
    //     // }
    //     if (globalStyle.import.length > 0 || globalStyle.others.length > 0) {
    //         dependencyWorker.modifyGlobalStyles(srcPath, globalStyle);
    //         this.initializeOtherInfo();
    //     }
    //     // modify proxy file
    //     flowServiceWorker.modifyProxyFile(packagePath);
    //     callback();
    }
}