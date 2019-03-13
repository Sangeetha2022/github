'use strict'
import * as mongoose from 'mongoose';
import { EntitySchema } from '../models/Entity';

const entityModel = mongoose.model('Entity', EntitySchema);

export class EntityDao {
    constructor() { }

    public generateEntity(entityData, callback) {
     
    }

    public getEntityByProjectId(projectId, callback) {
        console.log('project id  in entity dao ------ ', projectId);
        entityModel.find({ project_id: projectId }).
            populate({
                path: 'field.entity_id',
                model: 'Entity',
                // second level entities are populated
                populate: {
                    path: 'field.entity_id',
                    model: 'Entity',
                    // third level entities are populated
                    populate: {
                        path: 'field.entity_id',
                        model: 'Entity',
                        // fourth level entities are populated
                        populate: {
                            path: 'field.entity_id',
                            model: 'Entity'
                        }
                    }
                }
            }).
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