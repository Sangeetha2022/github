import { NodeSupportWorker } from "../supportworker/NodeSupportWorker";
import { response } from "express";
import { Model } from '../../asset/utilies'


let nodeSupportWorker = new NodeSupportWorker();
let model = Model;
export class NodeWorker {

    nodeModelWorker(model, callback) {
        nodeSupportWorker.nodeModelWorker(model, (response) => {
            console.log('response--->>>', response)
            callback(response);
        })

    }

    nodeModelServiceWorker(service , callback){
        nodeSupportWorker.nodeModelServiceWorker(service ,(response) =>{
            console.log('response--->>>',response)
            callback(response)
        })
    }
}
