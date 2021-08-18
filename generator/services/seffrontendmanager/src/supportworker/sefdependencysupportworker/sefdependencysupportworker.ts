import * as fs from 'fs';
import * as util from 'util'

export class SefDependencySupportWorker {

    private writeFile = util.promisify(fs.writeFile);
    // read file and return
    public readFile(applicationPath, fileName) {
        if (fs.existsSync(`${applicationPath}/${fileName}`)) {
            return fs.readFileSync(`${applicationPath}/${fileName}`).toString().split("\n");
        } else {
            return null;
        }
    }

    // write file
    public writeStaticFile(applicationPath, fileName, information, callback) {
        this.writeFile(applicationPath + `/${fileName}`, information, null)
            .then(() => {
                console.log(`${fileName} modified successfully`);
                callback(`${fileName} modified successfully`);
            })
            .catch(error => {
                console.log(error);
                callback();
            });
    }
}