import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';

export class RouteSupportWorker {



    generateRouteFile(generationPath, templatePath, routeData, callback) {
        // const RoutePath = path.join(__dirname, `${generationPath}/src/routes`)
        const RoutePath = `${generationPath}/src/routes`;
        const RouteTemplatePath = path.resolve(__dirname, templatePath);
        this.createFolders(RoutePath);
        let generateRoute = st.loadGroup(require(RouteTemplatePath + '/route_stg'));
        let RouteFile = generateRoute.render("route", [routeData]);
        fs.writeFile(RoutePath + `/Routes.ts`, RouteFile, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim()
            // }
            callback('file generated');
        })

    }

    createFolders(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    };

}