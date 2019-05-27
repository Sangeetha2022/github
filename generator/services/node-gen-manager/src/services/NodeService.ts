import { Request } from 'express';
import { NodeDao } from '../daos/NodeDao';
import * as util from 'util';
import { NodeWorker } from '../worker/NodeWorker';
import {Model} from '../../assert/utilies'

let nodeDao = new NodeDao();
let nodeWorker = new NodeWorker();
let model = Model;

export class NodeService {

    public generateNode = (req: Request, callback) => {
        console.log(' i am comimggg---->>>')
        nodeWorker.nodeModelWorker(model ,(result) =>{
            console.log('i am callback------>>>>',result);
             callback(result)
        })

    }

}

