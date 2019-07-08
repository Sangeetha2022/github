import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';

export class ModelSupportWorker {


    createUserModel(modelName, fields, modelPath, templatePath, callback) {
        // const modelGenerationPath = path.join(__dirname, modelPath);
        const modelGenerationPath = modelPath + `/src/models`;
        if (!fs.existsSync(modelGenerationPath)) {
            fs.mkdirSync(modelGenerationPath);
        }
        const mongoTemplatePath = path.resolve(templatePath);
        let generateModel = st.loadGroup(require(mongoTemplatePath + '/model_stg'));
        let modelData = generateModel.render("model", [modelName.trim(), fields]);

        fs.writeFile(modelGenerationPath + `/${modelName.trim()}.ts`, modelData, function (err) {
            if (err) throw err;
            // const temp = {
            //     schemaName: `${modelName.trim()}Schema`,
            //     modelName: `${modelName.trim()}Model`,
            //     fileName: modelName.trim(),
            // }
            callback('Model file generated succeddfully');
        })
    }

}