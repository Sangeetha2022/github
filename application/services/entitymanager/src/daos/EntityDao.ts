'use strict'
import * as mongoose from 'mongoose';
import { EntitySchema } from '../models/Entity';

const entityModel = mongoose.model('Entity', EntitySchema);

export class EntityDao {
    constructor() { }

    public createEntity(entityData, callback) {
        let entity = new entityModel(entityData);
        entity.save().then((result) => {
            console.log('save entity result ----- ', result);
            callback(result);
        }).catch((error) => {
            console.log('save entity error -----  ', error);
            callback(error);
        });
    }

    public updateEntity(entityData, callback) {
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

    public upateEntityField(entityData, callback) {
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

    public deleteEntity(entityId, callback) {
        console.log('before delete entity values a-- ', entityId);
        entityModel.findByIdAndRemove(entityId).then((result) => {
            console.log('delete entity result ----- ', result);
            callback(result);
        }).catch((error) => {
            console.log('delete entity error -----  ', error);
            callback(error);
        });
    }

    public getByEntityId(entityId, callback) {
        console.log('get entity by id are ---- ', entityId);
        entityModel.findById(entityId).then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        })
    }

    public getAllEntity(callback) {
        entityModel.find().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }


    public getEntityByProjectId(projectId, callback) {
        console.log('project id  in entity dao ------ ', projectId);
        entityModel.find({ project_id: projectId }).
            exec(function (err, result) {
                if (err) {
                    callback(err);
                    console.log('project id in entityt dao error ---- ', err);
                } else {
                    console.log('project id in entityt dao result ---- ', result);
                    callback(result);
                }
            })
    }

    public getEntityByFeatureId(id, callback) {
        console.log('project id  in entity dao ------ ', id);
        entityModel.find({ feature_id: id }).
            exec(function (err, result) {
                if (err) {
                    callback(err);
                    console.log('project id in entityt dao error ---- ', err);
                } else {
                    console.log('project id in entityt dao result ---- ', result);
                    callback(result);
                }
            })
    }
}