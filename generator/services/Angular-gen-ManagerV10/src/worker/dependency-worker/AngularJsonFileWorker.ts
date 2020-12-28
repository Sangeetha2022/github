import {DependencySupportWorker} from '../../supportworker/dependencysupportworker/dependencysupportworker';
import { Constant } from '../../assets/Constant';

let dependencySupportWorker = new DependencySupportWorker();


export class AngularJsonFileWorker {
    public modifyAngularJsonFile(applicationPath, information) {
        const file = dependencySupportWorker.readFile(applicationPath, Constant.ANGULAR_JSON_FILE)
        const styleIndex = file.findIndex(x => /styles/.test(x))
        if (styleIndex != -1) {
            if (!file[styleIndex + 1].includes(`${information}`)) {
                file.splice(styleIndex + 1, 0, `"${information}", `)
            }
            dependencySupportWorker.writeStaticFile(applicationPath, Constant.ANGULAR_JSON_FILE,
                file.join(`\n`), (response) => {
                    console.log("Response----write00---file---", response)
                })
        }


    }
}