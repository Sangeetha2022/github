import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class MongoSupportWorker {


    createProjectModel(modelName, fields, modelPath, templatePath, callback) {
        const modelGenerationPath = path.join(__dirname, modelPath);
        const  mongoTemplatePath = path.resolve(__dirname, templatePath);
        let generateModel = st.loadGroup(require(mongoTemplatePath + '/model_stg'));
        let modelData = generateModel.render("model", [modelName.trim(), fields]);
        fs.writeFile(modelGenerationPath + `/${modelName.trim()}.ts`, modelData, function (err) {
            if (err) throw err;
            const temp = {
                schemaName: `${modelName.trim()}Schema`,
                modelName: `${modelName.trim()}Model`,
                fileName: modelName.trim()
            }
            callback(temp)
        })
    }

}