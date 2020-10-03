import * as path from 'path';
import * as fs from 'fs';

export class Common {
    public static createFolders(path) {
        try {
            if (!fs.existsSync(path)) {
              fs.mkdirSync(path, { recursive: true });
            }
          } catch (err) {
            console.log('error for createing into -----  ', err);
          }
    };
}