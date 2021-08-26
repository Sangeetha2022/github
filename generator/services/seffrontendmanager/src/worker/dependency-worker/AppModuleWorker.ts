import { SefComponentSupportWorker } from "../../supportworker/sefcomponentsupportworker/sefcomponentsupportworker";

const sefcomponentSupportWorker = new SefComponentSupportWorker();
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
        sefcomponentSupportWorker.readFile(applicationPath, (res, err) => {
            if (res) {
                const fileArray: Array<string> = res.split('\n');
                // details.desktop.forEach(async (desktopElement: any) => {
                    // const screenName = desktopElement.screenName.toLowerCase();
                    // const firstElement = screenName.charAt(0).toUpperCase();
                    // const otherElements = screenName.substring(1, screenName.length);
                    // const moduleClassName = firstElement + otherElements + 'Module';
                    // const importData = "import { " + moduleClassName + " } from './" + screenName + "/" + screenName + ".module';";
                    fileArray.forEach((element, index) => {
                        // if (element.includes('@NgModule({')) {
                        //     const importDataIndex = fileArray.indexOf(importData);
                        //     if (importDataIndex === -1) {
                        //         fileArray.splice(index - 1, 0, importData);
                        //     }
                        // }
                        // if (element.includes('imports: [')) {
                        //     const moduleClassNameIndex = fileArray.indexOf(moduleClassName + ',');
                        //     if (moduleClassNameIndex === -1) {
                        //         fileArray.splice(index + 1, 0, moduleClassName + ',');
                        //     }
                        // }
                        if (element.includes('bootstrap: [')) {
                            if (fileArray[index + 1].includes(']')) {
                                fileArray.splice(index + 1, 0, 'AppComponent');
                            }
                        }
                        if(element === ',') {
                            fileArray.splice(index, 1);
                        }
                        // imports secton is getting duplicated. To avoid this, adding the condition
                        for (let i = 1; i < fileArray.length; i++) {
                            if(element && fileArray[index + i] && element.trim().split(',')[0] === fileArray[index + i].trim().split(',')[0] && element !== '],') {
                                fileArray.splice(index, 1);
                                break;
                            }
                        }
                    });
                // });
                sefcomponentSupportWorker.writeFile(applicationPath, fileArray.join('\n'), (res) => {
                    callback('Child Modules Imported Successfully');
                });
            }
        });
    }
}