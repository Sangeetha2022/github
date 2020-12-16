import * as util from 'util';
import { ExternalFeatureSupportWorker } from '../supportworker/externalfeatureSupportWorker';
import { response } from 'express';

let extfeaturesupworker = new ExternalFeatureSupportWorker();

export class ExternalFeatureWorker {

    public externalfeature(projectgenerationpath, value, callback) {

        extfeaturesupworker.externalfeaturesupport(projectgenerationpath,value,(response,err)=>{
            if(err){
                callback(err);
            }
            callback(response);
        })
    }
}