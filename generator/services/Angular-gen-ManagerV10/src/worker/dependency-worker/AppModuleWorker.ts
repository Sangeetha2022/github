import * as fs from 'fs';

export class AppModuleWorker {
    /**
     * 
     * @param details 
     * @param callback 
     * Read the existing app.module.ts file and adding child module imports
     */
    importComponentModules(details, callback) {
        details = JSON.parse(JSON.stringify(details));
        const projectGenerationPath = details.projectGenerationPath;
        const applicationPath = projectGenerationPath + '/src/app/app.module.ts';
        this.readFile(applicationPath, (res, err) => {
            if (res) {
                const fileArray: Array<string> = res.split('\n');
                details.desktop.forEach(async (desktopElement: any) => {
                    const screenName = desktopElement.screenName.toLowerCase();
                    const firstElement = screenName.charAt(0).toUpperCase();
                    const otherElements = screenName.substring(1, screenName.length);
                    const moduleClassName = firstElement + otherElements + 'Module';
                    const importData = "import { " + moduleClassName + " } from './" + screenName + "/" + screenName + ".module';";
                    const ngModuleIndex = fileArray.indexOf('@NgModule({');
                    fileArray.forEach((element, index) => {
                        if (element.includes('@NgModule({')) {
                            const importDataIndex = fileArray.indexOf(importData);
                            if (importDataIndex === -1) {
                                fileArray.splice(index - 1, 0, importData);
                            }
                        }
                        if (element.includes('imports: [')) {
                            const moduleClassNameIndex = fileArray.indexOf(moduleClassName + ',');
                            if (moduleClassNameIndex === -1) {
                                fileArray.splice(index + 1, 0, moduleClassName + ',');
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