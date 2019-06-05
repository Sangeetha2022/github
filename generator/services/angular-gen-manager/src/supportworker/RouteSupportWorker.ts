import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class RouteSupportWorker {

    async generateRouteFile(generationPath, templatePath, routeObj, callback) {
        const RoutePath = path.join(__dirname, `${generationPath}`)
        await this.createFolders(RoutePath);
        const sourcePath = path.join(RoutePath, `/src`)
        await this.createFolders(sourcePath);
        const appSource = path.join(sourcePath, `/app`)
        await this.createFolders(appSource);
        const RouteTemplatePath = path.resolve(__dirname, templatePath);
        let generateRoute = st.loadGroup(require(RouteTemplatePath + '/route_stg'));
        let RouteFile = generateRoute.render("route", [routeObj]);
        await fs.writeFile(appSource + `/app-routing.modulemodule.ts`, RouteFile, function (err) {
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