import * as fs from 'fs';
import { SefComponentSupportWorker } from '../../supportworker/sefcomponentsupportworker/sefcomponentsupportworker';
import { Constant } from '../../config/Constant';


const sefcomponentSupportWorker = new SefComponentSupportWorker();

export class AppRoutingModuleWorker {

  public importRoutingModules(details: any, callback) {
    details = JSON.parse(JSON.stringify(details));
    const projectGenerationPath = details.projectGenerationPath;
    const applicationPath = `${projectGenerationPath}/${Constant.SRC_APP}/${Constant.APP_ROUTING_FILENAME}`
    sefcomponentSupportWorker.readFile(applicationPath, (res, err) => {
      if (res) {
        const fileArray: Array<string> = res.split('\n');
        details.desktop.forEach(async (desktopElement: any) => {
          let importRoute;
          const screenName = desktopElement.screenName.toLowerCase();
          const firstElement = screenName.charAt(0).toUpperCase();
          const otherElements = screenName.substring(1, screenName.length);
          const moduleClassName = firstElement + otherElements + 'Module';
          if(screenName !== 'sefscreen'){
          importRoute = `{ path : '${screenName}', loadChildren: () => import('./${screenName}/${screenName}.module').then(m => m.${moduleClassName}), canActivate: [AuthGuard] } , `
          }
          const ngModuleIndex = fileArray.indexOf('@NgModule({');

          fileArray.forEach((element, index) => {
            if (element.includes('@NgModule({')) {
              const importDataIndex = fileArray.indexOf(importRoute);
              if (importDataIndex === -1) {
                fileArray.splice(index - 2, 0, importRoute);
              }
            }
          });
        });
        sefcomponentSupportWorker.writeFile(applicationPath, fileArray.join('\n'), (res) => {
          callback('Lazy loading Imported Successfully');
        });
      }
    });

  }

}
