import * as mongoose from 'mongoose';
import featureModel from '../models/Feature';
import { Request, Response } from 'express';

// const Features = mongoose.model('Features', FeaturesSchema);

export class FeatureDao 
{
    private Features = featureModel;

    public saveFeatures(featureData, callback: CallableFunction) 
    {
        let feature = new this.Features(featureData);
        feature.save((err, features) => 
        {
            if (err) 
            {
                callback(err);
            } 
            else 
            {
                callback(features);
            }
        });
    }

    public updateFeatures(featureId, featureData, callback: CallableFunction) 
    {
        this.Features.findOneAndUpdate({ _id: featureId }, featureData, { new: true }, (err, features) => 
        {
            if (err) 
            {
                callback(err);
            } 
            else 
            {
                callback(features);
            }
        });
    }

    public getAllFeature(callback: CallableFunction) 
    {
        this.Features.find({}, (err, features) => 
        {
            if (err)             
            {
                callback(err)
            } 
            else 
            {
                callback(features)
            }
        });
    }

    public getFeatureById(featureId, callback: CallableFunction) 
    {
        this.Features.findOne({ _id: featureId }, (err, features) => 
        {
            if (err) 
            {
                callback(err)
            } 
            else 
            {
                callback(features)
            }
        });
    }

    public getFeatureByProjectId(projectId, callback: CallableFunction) 
    {
        this.Features.find({ project: projectId }, (err, features) => 
        {
            if (err) 
            {
                callback(err)
            } 
            else 
            {
                callback(features)
            }
        });
    }

    public deleteFeatures(featureId, callback: CallableFunction) 
    {
        this.Features.findByIdAndDelete(featureId, (err, feature) => 
        {
            if (err) 
            {
                callback(err);
            } 
            else 
            {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

    public deleteProjectFeature(projectId, callback: CallableFunction) 
    {
        this.Features.deleteMany({ project: projectId }, (err, feature) => 
        {
            if (err) 
            {
                callback(err);
            } 
            else 
            {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

    public featureUpdateEntity(entity, featureId, callback: CallableFunction) 
    {
        let entityData = entity[0].entities.entityId;
        this.Features.findById(featureId, (err, data) => 
        {
            if (data.entities.length > 0) 
            {
                const entityarray = data.entities;
                const index = entityarray.findIndex(arrayindex => arrayindex.entityId === entityData);
                const updateEntity = entityarray.find(arrayvalue => arrayvalue.entityId === entityData);
                if (index > -1) 
                {
                    updateEntity.entityType = entity[0].entities.entityType;
                    this.Features.update(
                        { "entities.entityId": entityData },
                        {
                            $set: {
                                'entities.$.entityType': updateEntity.entityType
                            }
                        }).then(res => {
                            callback(res);
                        });
                } 
                else 
                {
                    this.Features.update({ _id: featureId }, { $push: { 'entities': entity[0].entities } }, { $set: { 'updated_date': new Date(), 'description': entity[0].description, 'name': entity[0].name } }, (err, data) => 
                    {
                        if (err) 
                        {
                            callback(err)
                        } 
                        else 
                        {
                            callback(data)
                        }
                    });
                }
            } 
            else 
            {
                this.Features.update({ _id: featureId }, { $push: { 'entities': entity[0].entities } }, { $set: { 'updated_date': new Date(), 'description': entity[0].description, 'name': entity[0].name } }, (err, data) => 
                {
                    if (err) 
                    {
                        callback(err)
                    } 
                    else 
                    {
                        callback(data)
                    }
                });
            }
        })

    }

    public updateFeatureEntity(featureId, details, callback: CallableFunction) 
    {
        this.Features.update({ _id: featureId },{ $addToSet: { 'entities': details } }).then(result => 
        {
            callback(result)
        }).catch(error => 
           {
            callback(error);
           })
    }

    public featuredeleteentity(entityId, featureId, callback: CallableFunction) 
    {
        this.Features.findById(featureId, (err, feature) => 
        {
            let entitiesarray = feature.entities;
            const index = entitiesarray.findIndex(entity => entity.entityId === entityId);
            if (index > -1) 
            {
                entitiesarray.splice(index, 1);
            }
            feature.updated_date = new Date();
            this.Features.findOneAndUpdate({ _id: feature._id }, feature).then((result) => 
            {
                callback(result);
            }).catch((error) => 
               {
                callback(error);
               })
        });
    }
}