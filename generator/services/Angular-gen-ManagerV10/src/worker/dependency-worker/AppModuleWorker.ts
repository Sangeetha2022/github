import { Common } from '../../config/Common';

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
        Common.readFile(applicationPath, (res, err) => {
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
                Common.writeFile(applicationPath, fileArray.join('\n'), (res) => {
                    callback('Child Modules Imported Successfully');
                });
            }
        });
    }
}