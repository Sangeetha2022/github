
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';



export class EntitySupportWorker {

    private templatePath = path.resolve(__dirname, '../../template');
    private sourcePath: String = path.resolve(__dirname, '../../originalCode');

    entityModelWorker(modelName, fields, callback) {

    
        console.log('template path are --------- ', this.templatePath);
        console.log('source path value are ----------- ', this.sourcePath);
       let modelPath = this.sourcePath+'/model';
       if (!fs.existsSync(modelPath)) {
        fs.mkdirSync(modelPath)
    }
        let generateModel = st.loadGroup(require(this.templatePath + '/model_stg'));
        let modelData = generateModel.render("model", [modelName,fields]);
        fs.writeFile(modelPath + `/${modelName}.ts`, modelData, function (err) {
            if (err) throw err;
            console.log(`${modelName} file saved!!`)
            callback(`${modelName} created`)
        })
    }
}