import {SefDependencySupportWorker} from '../../supportworker/sefdependencysupportworker/sefdependencysupportworker';
import { Constant } from '../../config/Constant';

let sefdependencySupportWorker = new SefDependencySupportWorker();


export class SefJsonFileWorker {
    public modifyAngularJsonFile(applicationPath, information) {
        const file = sefdependencySupportWorker.readFile(applicationPath, Constant.ANGULAR_JSON_FILE)
        const styleIndex = file.findIndex(x => /styles/.test(x))
        if (styleIndex != -1) {
            if (!file[styleIndex + 1].includes(`${information}`)) {
                file.splice(styleIndex + 1, 0, `"${information}", `)
            }
            sefdependencySupportWorker.writeStaticFile(applicationPath, Constant.ANGULAR_JSON_FILE,
                file.join(`\n`), (response) => {
                    console.log("Response----write00---file---", response)
                })
        }


    }
}