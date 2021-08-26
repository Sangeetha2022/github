import { Request, response } from 'express';
import * as express from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
import * as Constants from '../config/Constants';

let serviceWorker = new ServiceWorker();

export class NodeService {

    // constant

    public async createProjectConnector(req: Request, callback) {
        console.log('create project node ----body---  ', req.body.projectName, util.inspect(req.body, { showHidden: true, depth: null }));
    }

    public uniqueByLast(data, key) {
        return [...new Map(
            data.map(x => [key(x), x])
        ).values()]
    }

    

}

