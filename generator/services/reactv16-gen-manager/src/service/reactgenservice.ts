import { Request, response } from 'express';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';

export class ReactService {
    constructor() {
    }
    async createReactProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        console.log('entered to the create react project details------', details);
        callback(details);
    }


}

