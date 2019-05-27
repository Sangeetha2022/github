import { NodeSupportWorker } from "../supportworker/NodeSupportWorker";
import { response } from "express";
import { Model } from '../../assert/utilies'


let nodeSupportWorker = new NodeSupportWorker();
let model = Model;
export class NodeWorker {

    nodeModelWorker(model, callback) {
        console.log(" i am node model worker--->>>>@@@@ ")

        nodeSupportWorker.nodeModelWorker(model, (response) => {
            console.log('response--->>>', response)
            callback(response);
        })

    }
}
