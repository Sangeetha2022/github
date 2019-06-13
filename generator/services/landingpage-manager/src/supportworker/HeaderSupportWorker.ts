import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class HeaderSupportWorker {

    async generateRouteFile(generationPath, templatePath, routeObj, callback) {
        console.log(typeof(routeObj));
        const RoutePath = path.join(__dirname, `${generationPath}`)
        await this.createFolders(RoutePath);
        const sourcePath = path.join(RoutePath, `/src`)
        await this.createFolders(sourcePath);
        const appSource = path.join(sourcePath, `/app`)
        await this.createFolders(appSource);
        const headerSource = path.join(appSource, `/header`)
        await this.createFolders(headerSource);
        const RouteTemplatePath = path.resolve(__dirname, templatePath);
        let generateRoute = st.loadGroup(require(RouteTemplatePath + '/header_stg'));
        let RouteFile = generateRoute.render("header", [routeObj]);
        await fs.writeFile(headerSource + `/header.component.html`, RouteFile, function (err) {
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