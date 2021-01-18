import { ComponentSupportWorker } from "../../supportworker/componentsupportworker/componentsupportworker";

const componentSupportWorker = new ComponentSupportWorker();
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
        componentSupportWorker.readFile(applicationPath, (res, err) => {
            if (res) {
                const fileArray: Array<string> = res.split('\n');
                details.desktop.forEach(async (desktopElement: any) => {
                    const screenName = desktopElement.screenName.toLowerCase();
                    const firstElement = screenName.charAt(0).toUpperCase();
                    const otherElements = screenName.substring(1, screenName.length);
                    const moduleClassName = firstElement + otherElements + 'Module';
                    const importData = "import { " + moduleClassName + " } from './" + screenName + "/" + screenName + ".module';";
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
                        if (element.includes('bootstrap: [')) {
                            let moduleClassNameIndex = -1;
                            if(fileArray.indexOf('AppComponent') !== -1) {
                                moduleClassNameIndex = fileArray.indexOf('AppComponent');
                            }
                            if(fileArray.indexOf('\t\tAppComponent') !== -1) {
                                moduleClassNameIndex = fileArray.indexOf('\t\tAppComponent');
                            }
                            if (moduleClassNameIndex === -1) {
                                fileArray.splice(index + 1, 0, '\t\tAppComponent');
                            }
                        }
                        if(element === ',') {
                            fileArray.splice(index, 1);
                        }
                    });
                });
                componentSupportWorker.writeFile(applicationPath, fileArray.join('\n'), (res) => {
                    callback('Child Modules Imported Successfully');
                });
            }
        });
    }
}