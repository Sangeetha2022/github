import { DependencySupportWorker } from '../../supportworker/dependencysupportworker/dependencysupportworker';
import { Constant } from '../../config/Constant';

let dependencySupportWorker = new DependencySupportWorker();

export class PackageJsonFileWorker {
    public modifyPackageFile(applicationPath, information) {
        const staticPackage = {

        }
        const file = dependencySupportWorker.readFile(applicationPath, Constant.PACKAGE_JSON_FILENAME);
        const index = file.findIndex(x => /router/.test(x));
        if (index) {
            information.forEach(element => {
                const splitted = element.split(":");
                const regExpression = new RegExp(splitted[0]);
                if (file.findIndex(x => regExpression.test(x)) < 0) {
                    file.splice(index, 0, element);
                }

            })
        }
        dependencySupportWorker.writeStaticFile(applicationPath, Constant.PACKAGE_JSON_FILENAME,
            file.join(`\n`), (response) => { })
    }
}
