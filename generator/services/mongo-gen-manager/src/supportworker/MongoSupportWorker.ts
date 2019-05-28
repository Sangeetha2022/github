import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class MongoSupportWorker {

    private templatePath = path.resolve(__dirname, '../../template');

    createProjectModel(modelName, fields, modelPath, callback) {
        const modelGenerationPath = path.join(__dirname, modelPath);
        let generateModel = st.loadGroup(require(this.templatePath + '/model_stg'));
        let modelData = generateModel.render("model", [modelName.trim(), fields]);
        fs.writeFile(modelGenerationPath + `/${modelName}.ts`, modelData, function (err) {
            if (err) throw err;
            const temp = {
                schemaName: `${modelName}Schema`,
                modelName: `${modelName}Model`
            }
            callback(temp)
        })
    }

}