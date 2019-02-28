'use strict'
import * as mongoose from 'mongoose';
import { EntityTypeSchema } from '../models/EntityType';

const entityModel = mongoose.model('EntityType', EntityTypeSchema);

export class EntityTypeDao {
    constructor() { }
    
    public getAllEntity(callback) {
        entityModel.find().then((result) => {
            console.log('therresult from get all entity are ------- ', result.length)
            callback(result);
            
        }).catch((error) => {
            callback(error);
        });
    }
}