import { SefDependencySupportWorker } from '../../supportworker/sefdependencysupportworker/sefdependencysupportworker';
import { Constant } from '../../config/Constant';

let sefdependencySupportWorker = new SefDependencySupportWorker();

export class PackageJsonFileWorker {
    public modifyPackageFile(applicationPath, information) {
        const staticPackage = {

        }
        const file = sefdependencySupportWorker.readFile(applicationPath, Constant.PACKAGE_JSON_FILENAME);
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
        sefdependencySupportWorker.writeStaticFile(applicationPath, Constant.PACKAGE_JSON_FILENAME,
            file.join(`\n`), (response) => { })
    }
}
