import { Response, Request, response } from 'express';
import { SharedService } from '../config/shardService';
import { ApiAdapter } from '../config/apiAdapter';
import { Configuration } from '../apiservice/configuration'
import * as asyncLoop from 'node-async-loop';


export class DataGenEntityService {
    public configuration = new Configuration();



    public arrayEntity = [];
  
    public getAllEntity(req: Request, callback: CallableFunction) {
        this.configuration.getAllEntity((data) => {
            let entity = data.body[0].field;

            asyncLoop(entity, (data, next) =>   {
                let allEntity = {
                    name: '',
                    data_type: '',
                }
                allEntity.name = data.name;
                allEntity.data_type = data.data_type;
                this.arrayEntity.push(allEntity);
                next();
            })
            console.log('i am data arrrayy===>>', this.arrayEntity)
            callback(data)
        })
    }

}