import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class CssSupportWorker {

    async generateRouteFile(generationPath, templatePath, cssObj, callback) {
        const RoutePath = path.join(__dirname, `${generationPath}`)
        await this.createFolders(RoutePath);
        const projectPath = path.join(RoutePath, `${'billing'}`)
        const sourcePath = path.join(projectPath, `/src`)
        await this.createFolders(sourcePath);
        await fs.writeFile(sourcePath + `/styles.css`, cssObj.css, function (err) {
            if (err) throw err;
            callback('file generated');
        })
    }
    
    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };

}