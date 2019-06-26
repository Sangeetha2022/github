import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class HtmlSupportWorker {

    async generateRouteFile(generationPath, templatePath, obj, callback) {
        console.log(typeof (obj));
        const RoutePath = path.join(__dirname, `${generationPath}`)
        await this.createFolders(RoutePath);
        const sourcePath = path.join(RoutePath, `/src`)
        await this.createFolders(sourcePath);
        const appSource = path.join(sourcePath, `/app`)
        if (obj.name === "header") {
            await this.createFolders(appSource);
            const headerSource = path.join(appSource, `/header`)
            await this.createFolders(headerSource);
            const RouteTemplatePath = path.resolve(__dirname, templatePath);
            let generateRoute = st.loadGroup(require(RouteTemplatePath + '/html_stg'));
            console.log('================== header',obj)
            let RouteFile = generateRoute.render("html", [obj]);
            await fs.writeFile(headerSource + `/header.component.html`, RouteFile, function (err) {
                if (err) throw err;
                callback('file generated');
            })
        }
        if (obj.name === "footer") {
            const headerSource = path.join(appSource, `/Footer`)
            await this.createFolders(headerSource);
            const RouteTemplatePath = path.resolve(__dirname, templatePath);
            let generateRoute = st.loadGroup(require(RouteTemplatePath + '/html_stg'));
            console.log('================== footer',obj)
            let RouteFile = generateRoute.render("html", [obj]);
            await fs.writeFile(headerSource + `/footer.component.html`, RouteFile, function (err) {
                if (err) throw err;
                callback('file generated');
            })
        }
    }
    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };

}