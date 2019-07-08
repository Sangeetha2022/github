import { Response, response } from 'express';
import { DmnSupportWorker } from '../Supportworker/DMNSupportWorker';

let dmnSupportFile = new DmnSupportWorker();

export class DmnWorkerFile {
    public dmnTable(screens, generationpath, templatepath, callback) {
        console.log('------templatepath----->>>', templatepath);
        dmnSupportFile.dmnSupportWorker(screens, generationpath, templatepath, (response) => {
            callback(response);
        })
    }

}