'use strict'
import * as mongoose from 'mongoose';
import { DefaultEntitySchema } from '../models/DefaultEntity';

const defaultEntityModel = mongoose.model('Default_Entity', DefaultEntitySchema);

export class DefaultEntityDao {
    constructor() { }

   public getDefaultEntity(callback) {
   defaultEntityModel.find({},{_id: false, versionKey: false}).then(response => {
       callback(response);
   }).catch((error) => {
       callback(error);
   })
   }
}