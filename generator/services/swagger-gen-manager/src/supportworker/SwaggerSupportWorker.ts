import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as removeEmptyLines from 'remove-blank-lines';

export class SwaggerSupportWorker {


    createSwagger(details, servers, tags, paths, components, swaggerPath, templatePath, callback) {
        // const modelGenerationPath = path.join(__dirname, modelPath);
        const swaggerGenerationPath = swaggerPath;
        console.log('servers data', servers);
        console.log('tags', tags);
        console.log('paths data', paths);
        console.log('components', components);
        const swaggerTemplatePath = path.resolve(__dirname, templatePath);
        let generateModel = st.loadGroup(require(swaggerTemplatePath + '/swagger_stg'));
        let swaggerData = generateModel.render("swagger", [details, servers, tags, paths, components]);
        let swaggerInformation = removeEmptyLines(swaggerData);
        console.log('swagger data', removeEmptyLines(swaggerData));
        fs.writeFile(swaggerGenerationPath + `/swagger.yaml`, swaggerInformation, function (err) {
            if (err) throw err;
            const temp = {
                swaggerServers: servers,
                swaggerTags: tags,
                swaggerPaths: paths,
                swaggerComponents: components
            }
            callback(temp)
        })
    }

}