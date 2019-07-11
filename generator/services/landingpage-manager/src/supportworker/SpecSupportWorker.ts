import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class SpecSupportWorker {

    async generateRouteFile(generationPath, templatePath, sObj, callback) {
        const RoutePath = path.join(__dirname, `${generationPath}`)
        await this.createFolders(RoutePath);
        const projectPath = path.join(RoutePath, `${'billing'}`)
        const sourcePath = path.join(projectPath, `/src`)
        await this.createFolders(sourcePath);
        const appSource = path.join(sourcePath, `/app`)
        await this.createFolders(appSource);
        if (sObj.name.lower === "header") {
            const headerSource = path.join(appSource, `/header`)
            await this.createFolders(headerSource);
            const RouteTemplatePath = path.resolve(__dirname, templatePath);
            let generateRoute = st.loadGroup(require(RouteTemplatePath + '/spec_stg'));
            let RouteFile = generateRoute.render("spec", [sObj]);
            await fs.writeFile(headerSource + `/header.component.spec.ts`, RouteFile, function (err) {
                if (err) throw err;
                callback('file generated');
            })
        }
        if (sObj.name.lower === "footer") {
            const headerSource = path.join(appSource, `/footer`)
            await this.createFolders(headerSource);
            const RouteTemplatePath = path.resolve(__dirname, templatePath);
            let generateRoute = st.loadGroup(require(RouteTemplatePath + '/spec_stg'));
            let RouteFile = generateRoute.render("spec", [sObj]);
            await fs.writeFile(headerSource + `/footer.component.spec.ts`, RouteFile, function (err) {
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