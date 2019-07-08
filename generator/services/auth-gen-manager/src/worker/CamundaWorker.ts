import {Response, response} from 'express';
import {CamundaSupportWorker} from '../Supportworker/CamundaSupportWorker'



export class CamundaWorker {
    public camundaSupportWorker = new CamundaSupportWorker();


    public  createConfig(camundaFolder, authorizeTemplatePath,callback){
        console.log('camundasupport -->>',authorizeTemplatePath)
        const templatePath = `${authorizeTemplatePath}`;
        console.log('camundasupport -->>',templatePath)
        this.camundaSupportWorker.camundaConfig(camundaFolder,templatePath ,(response)=>{
            console.log('i am camundaWorker --->>>', response)
            callback(response)
        })

    }

}