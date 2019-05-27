
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
        console.log('generate model data ++++++++++',generateModel)
        let modelData = generateModel.render("model", [modelName,fields]);
        console.log('generate model data  ------------',modelData)
        fs.writeFile(modelPath + `/${modelName}.ts`, modelData, function (err) {
            if (err) throw err;
            console.log(`${modelName} file saved!!`)
            callback(`${modelName} created`)
        })
    }

    nodeServerWorker(port,callback){
        console.log('adjnaijdnbsadofnafno')
        let modelPath = this.sourcePath+'/model';
        if (!fs.existsSync(modelPath)) {
         fs.mkdirSync(modelPath)
     }
        let generateModel = st.loadGroup(require(this.templatePath + '/server_stg'));
        console.log('generate model data ',generateModel);
        let serverData = generateModel.render("server", [port]);
        console.log('generate model data  ------------',serverData)
        fs.writeFile(modelPath + `/server.ts`, serverData, function (err) {
            if (err) throw err;
            callback(`server created`)
        })
    }
}