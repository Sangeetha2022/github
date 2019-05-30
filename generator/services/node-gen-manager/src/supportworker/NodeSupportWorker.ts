
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';



export class NodeSupportWorker {

    private templatePath = path.resolve(__dirname , '../../template');
    private sourcePath: String = path.resolve(__dirname , '../../originalCode');

    nodeModelWorker(model , callback) {
       let modelPath = this.sourcePath+'/server';
       if (!fs.existsSync(modelPath)) {
        fs.mkdirSync(modelPath)
    }
        let generateModel = st.loadGroup(require(this.templatePath + '/server_stg.js'));
        let modelData = generateModel.render("server", [model]);
        fs.writeFile(modelPath + `/server.ts`, modelData, function (err) {
            if (err) throw err;
            console.log(`sserver file saved!!`)
            callback(`server created`)
        })
    }

    nodeModelServiceWorker(serviceData , callback){
        let modelPath = this.sourcePath+'/service';
        if(!fs.existsSync(modelPath)){
            fs.mkdirSync(modelPath)
        }

        let generateModel = st.loadGroup(require(this.templatePath + '/service_stg.js'));
        let modelData = generateModel.render('service', [serviceData]);
        fs.writeFile(modelPath + `service.ts`,modelData , function(err){
            if(err) throw err;
            console.log('service')
            callback('sucess :) ---service file created---')
        })
    }
}

