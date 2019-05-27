
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';



export class NodeSupportWorker {

    private templatePath = path.resolve(__dirname , '../../template');
    private sourcePath: String = path.resolve(__dirname , '../../originalCode');

    nodeModelWorker(model , callback) {
       let modelPath = this.sourcePath+'/model';
       if (!fs.existsSync(modelPath)) {
        fs.mkdirSync(modelPath)
    }
        let generateModel = st.loadGroup(require(this.templatePath + '/model_stg'));
        console.log('generate model data ++++++++++',generateModel)
        let modelData = generateModel.render("model", [model]);
        console.log('generate model data  ------------',modelData)
        fs.writeFile(modelPath + `/${{model}}.ts`, modelData, function (err) {
            if (err) throw err;
            console.log(`${model} file saved!!`)
            callback(`${model} created`)
        })
    }
   
}

