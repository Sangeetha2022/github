import { Request } from 'express';
import { NodeDao } from '../daos/NodeDao';
import * as util from 'util';
import { NodeWorker } from '../worker/NodeWorker';
import {Model} from '../../asset/utilies'

let nodeDao = new NodeDao();
let nodeWorker = new NodeWorker();
let model = Model;

export class NodeService {
    public generateNode = (req: Request, callback) => {
        nodeWorker.nodeModelWorker(model ,(result) =>{
             callback(result)
        })
    }

    public createProjectNode(req: Request, callback) {
        console.log('create project node -------  ', util.inspect(req.body, { showHidden: true, depth: null }));
        callback();
    }
}

