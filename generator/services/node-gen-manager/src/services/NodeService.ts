import { Request } from 'express';
import { NodeDao } from '../daos/NodeDao';
import * as util from 'util';
import { NodeWorker } from '../worker/NodeWorker';

let nodeDao = new NodeDao();
let nodeWorker = new NodeWorker();

export class NodeService {



    public generateNode = async (req: Request, callback) => {
        const projectId = req.params.projectId;
        nodeDao.getNodeByProjectId(projectId, (response) => {
            console.log('generate entity in services are -----------  ', response.length, ' -- ',
                util.inspect(response, { showHidden: false, depth: null }));
                let count = 0;
            if (response.length > 0) {
                response.forEach(element => {
                    nodeWorker.nodeModelWorker(element, (result) => {
                        count++;
                        console.log('inside one in controller')
                        if(count === response.length - 1) {
                            callback('file created successfully')
                        }
                    })
                })
            }
            console.log('ouside one in controller')
        });
    }

}