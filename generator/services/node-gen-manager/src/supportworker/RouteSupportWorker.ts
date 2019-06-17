import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class RouteSupportWorker {



    generateRouteFile(generationPath, templatePath, routeData, callback) {
        const RoutePath = `${generationPath}/src/routes`;
        const RouteTemplatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(RoutePath);
        let generateRoute = st.loadGroup(require(RouteTemplatePath + '/route_stg'));
        let RouteFile = generateRoute.render("route", [routeData]);
        fs.writeFile(RoutePath + `/Routes.ts`, RouteFile, function (err) {
            if (err) throw err;
            callback('file generated');
        })

    }
}