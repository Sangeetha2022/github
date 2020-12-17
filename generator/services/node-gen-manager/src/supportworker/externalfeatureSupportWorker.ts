import * as path from 'path';
import * as fs from 'fs';
import * as ncp from 'ncp';

export class ExternalFeatureSupportWorker {

    public externalfeaturesupport(projecttemplatepath, value, callback) {
            const seedpath = value.body[0].gitRepoUrl; // Source Path
            ncp.limit = 16;
                /** 
                 * 1st Parameter Source path , 
                 * 2nd Parameter Destination path , 
                 * 3rd parameter is for override options so that even if the file is present it gets overridden.
                */
            ncp(seedpath, projecttemplatepath, {clobber: false} , (err) => {
                if (err) {
                    console.error('---error occured in the ncp of external feature----',err);
                    callback(err);
                }
                console.log('code added.....');
                const response = {
                    res:'External Feature added',
                    value: value.body[0]
                }
                callback(response);
            });
    }
}