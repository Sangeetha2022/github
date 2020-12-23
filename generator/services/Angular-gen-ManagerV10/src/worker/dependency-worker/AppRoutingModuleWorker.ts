import * as fs from 'fs';

export class AppRoutingModuleWorker {

  public importRoutingModules(details: any, callback) {
    details = JSON.parse(JSON.stringify(details));
    const projectGenerationPath = details.projectGenerationPath;
    const applicationPath = projectGenerationPath + '/src/app/app-routing.module.ts';
    this.readFile(applicationPath, (res, err) => {
      if (res) {
        const fileArray: Array<string> = res.split('\n');
        details.desktop.forEach(async (desktopElement: any) => {
          const screenName = desktopElement.screenName.toLowerCase();
          const firstElement = screenName.charAt(0).toUpperCase();
          const otherElements = screenName.substring(1, screenName.length);
          const moduleClassName = firstElement + otherElements + 'Module';
          const importRoute = `{ path : '${screenName}', loadChildren: () => import('./${screenName}/${screenName}.module').then(m => m.${moduleClassName}) } , `
          const ngModuleIndex = fileArray.indexOf('const routes: Routes = [');
          fileArray.forEach((element, index) => {
            if (element.includes('const routes: Routes = [')) {
              const importDataIndex = fileArray.indexOf(importRoute);
              if (importDataIndex === -1) {
                fileArray.splice(index + 1, 0, importRoute);
              }
            }
          });
        });
        this.writeFile(applicationPath, fileArray.join('\n'), (res) => {
          callback('Child Modules Imported Successfully');
        });
      }
    });

  }
  private readFile(filePath: string, callback) {
    const file = fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            callback(null, err);
        } else {
            callback(data, null);
        }
    });
}
private writeFile(filePath, data, callback) {
    fs.writeFile(filePath, data, (response) => {
        callback(response);
    })
}
}
