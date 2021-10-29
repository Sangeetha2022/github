import { ComponentSupportWorker } from '../../supportworker/componentSupportWorker';
import { Constant } from '../../config/Constant';
const componentSupportWorker = new ComponentSupportWorker();
export class AppModuleWorker {
    /**
     * 
     * @param details 
     * @param callback 
     * Read the existing app.module.ts file and adding child module imports
     */
    importComponentModules(details, callback) {
        console.log('enter the import modules');
        details = JSON.parse(JSON.stringify(details));
        const projectGenerationPath = details.projectGenerationPath;
        const projectName = details.project.name;
        const applicationPath = projectGenerationPath + '/' + projectName + '/src/app/app.module.ts';
        componentSupportWorker.readFile(applicationPath, (res, err) => {
            if (res) {
                const importDataArray = Constant.APP_MODULE_IMPORTS;
                const fileArray: Array<string> = res.split('\n');
                importDataArray.forEach(async (importElement: any) => {
                    fileArray.forEach((element: any, index) => {
                        if(element) {
                            if (element.includes('@NgModule({')) {
                                const importDataIndex = fileArray.indexOf(importElement.importData);
                                if (importDataIndex === -1) {
                                    fileArray.splice(index - 1, 0, importElement.importData);
                                }
                            }
                            if (element.includes('imports: [')) {
                                const moduleClassNameIndex = fileArray.indexOf(importElement.className + ',');
                                if (moduleClassNameIndex === -1) {
                                    fileArray.splice(index + 1, 0, importElement.className + ',');
                                }
                            }
                            if (element.includes('providers: [],') && importElement.provider) {
                                fileArray[index] = `providers: [\n\t${importElement.provider},\n\t],`
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