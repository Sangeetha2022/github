import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class ComponentSupportWorker {

    async generateRouteFile(generationPath, templatePath, cObj, callback) {
        const RoutePath = path.join(__dirname, `${generationPath}`)
        await this.createFolders(RoutePath);
        const projectPath = path.join(RoutePath, `${'billing'}`)
        const sourcePath = path.join(projectPath, `/src`)
        await this.createFolders(sourcePath);
        const appSource = path.join(sourcePath, `/app`)
        await this.createFolders(appSource);
        if (cObj.name.lower === "header") {
            const headerSource = path.join(appSource, `/header`)
            await this.createFolders(headerSource);
            const RouteTemplatePath = path.resolve(__dirname, templatePath);
            let generateRoute = st.loadGroup(require(RouteTemplatePath + '/component_stg'));
            let RouteFile = generateRoute.render("component", [cObj]);
            await fs.writeFile(headerSource + `/header.component.ts`, RouteFile, function (err) {
                if (err) throw err;
                callback('file generated');
            })
        }
        if (cObj.name.lower === "footer") {
            const headerSource = path.join(appSource, `/footer`)
            await this.createFolders(headerSource);
            const RouteTemplatePath = path.resolve(__dirname, templatePath);
            let generateRoute = st.loadGroup(require(RouteTemplatePath + '/component_stg'));
            let RouteFile = generateRoute.render("component", [cObj]);
            await fs.writeFile(headerSource + `/footer.component.ts`, RouteFile, function (err) {
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