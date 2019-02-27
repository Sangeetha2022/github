'use strict'
import * as mongoose from 'mongoose';
import { DefaultEntitySchema } from '../models/DefaultEntity';

const entityModel = mongoose.model('Default_Entity', DefaultEntitySchema);

export class DefaultEntityDao {
    constructor() { }

    public createDefaultEntity(entityData, callback) {
        let entity = new entityModel(entityData);
        entity.save().then((result) => {
            console.log('save entity result ----- ', result);
            callback(result);
        }).catch((error) => {
            console.log('save entity error -----  ', error);
            callback(error);
        });
    }

    public updateDefaultEntity(entityData, callback) {
        entityModel.findOneAndUpdate({ _id: entityData._id },
             entityData,
            { new: true })
            .then((result) => {
                console.log('update entity result ----- ', result);
                callback(result);
            }).catch((error) => {
                console.log('update entity error -----  ', error);
                callback(error);
            });
    }

    public upateDefaultEntityField(entityData, callback) {
        entityModel.update({ _id: entityData._id },
            { $set: { 'field': entityData.field }},
            { new: true })
            .then((result) => {
                console.log('update entity field result ----- ', result);
                callback(result);
            }).catch((error) => {
                console.log('update entity field error -----  ', error);
                callback(error);
            });
    }

    public deleteDefaultEntity(entityId, callback) {
        console.log('before delete entity values a-- ', entityId);
        entityModel.findByIdAndRemove(entityId).then((result) => {
            console.log('delete entity result ----- ', result);
            callback(result);
        }).catch((error) => {
            console.log('delete entity error -----  ', error);
            callback(error);
        });
    }

    public getByDefaultEntityId(entityId, callback) {
        console.log('get entity by id are ---- ', entityId);
        entityModel.findById(entityId).then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        })
    }

    public getDefaultEntityByProjectId(entityId, callback) {
        console.log('get entity by id are ---- ', entityId);
        entityModel.findOne({project_id:entityId}).then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        })
    }

    public getDefaultEntityByUserId(entityId, callback) {
        console.log('get entity by id are ---- ', entityId);
        entityModel.findOne({user_id:entityId}).then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        })
    }

    

    public getAllDefaultEntity(callback) {
        entityModel.find().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
}