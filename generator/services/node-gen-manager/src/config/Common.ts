import * as path from 'path';
import * as fs from 'fs';

export class Common {
    public static createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };
}