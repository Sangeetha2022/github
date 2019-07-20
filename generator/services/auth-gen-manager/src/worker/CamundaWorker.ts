import {Response, response} from 'express';
import {CamundaSupportWorker} from '../Supportworker/CamundaSupportWorker'



export class CamundaWorker {
    public camundaSupportWorker = new CamundaSupportWorker();


    public  createConfig(camundaFolder, authorizeTemplatePath,projectName ,callback){
        const templatePath = `${authorizeTemplatePath}`;
        this.camundaSupportWorker.camundaConfig(camundaFolder,templatePath,projectName,(response)=>{
            console.log('i am camundaWorker --->>>', response)
            callback(response)
        })

    }

}