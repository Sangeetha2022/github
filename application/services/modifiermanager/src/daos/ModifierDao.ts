import * as mongoose from 'mongoose';
import DefaultModifierModel from '../models/DefaultModifier';
import { Request, Response } from 'express';

// const Features = mongoose.model('Features', FeaturesSchema);

export class ModifierDao {

    private modifier = DefaultModifierModel;


    public saveModifier(modifierData, callback: CallableFunction) {
        let modifier = new this.modifier(modifierData);
        modifier.save((err, modifier) => {
            if (err) {
                callback(err);
            } else {
                callback(modifier);
            }
        });
    }

    public updateModifier(modifierId, modifierData, callback: CallableFunction) {
        this.modifier.findOneAndUpdate({ _id: modifierId }, modifierData, { new: true }, (err, modifier) => {
            if (err) {
                callback(err);
            } else {
                callback(modifier);
            }
        });
    }


    public getAllModifier(callback: CallableFunction) {
        this.modifier.find({flag: 'active'}).populate('components').exec((err, modifier) => {
            if (err) {
                callback(err)
            } else {
                callback(modifier)
            }
        });
    }

    public getAllDefaultModifiers(callback: CallableFunction) {
        this.modifier.find({}, (err, modifier) => {
            if (err) {
                callback(err)
            } else {
                callback(modifier)
            }
        });
    }


    public getModifierById(modifierId, callback: CallableFunction) {
        this.modifier.findById(modifierId, (err, modifier) => {
            if (err) {
                callback(err)
            } else {
                callback(modifier)
            }
        });
    }

    public getFlowModifiers(modifiersId, callback: CallableFunction) {
        console.log('get flow modifiers in doa');
        this.modifier.find().where('_id')
            .in(modifiersId)
            .exec((err, modifier) => {
                console.log('modifiers exec error ----  ', err);
                console.log('modifiers exec success ----  ', modifier);
                if (err) {
                    callback(err)
                } else {
                    callback(modifier)
                }
            });
    }

    public getFeatureModifiersByLanguage(modifiersId, language, callback: CallableFunction) {
        this.modifier.find().where('_id')
            .in(modifiersId)
            .populate({
                path: 'components',
                match: { 'devLanguage': language }
            }).exec((err, modifier) => {

                if (err) {
                    callback(err)
                } else {
                    callback(modifier)
                }
            });
    }

    public getModifierByProjectId(projectId, callback: CallableFunction) {
        this.modifier.find({ project: projectId }, (err, modifier) => {
            if (err) {
                callback(err)
            } else {
                callback(modifier)
            }
        });
    }

    public deleteModifier(modifierId, callback: CallableFunction) {
        this.modifier.findByIdAndDelete(modifierId, (err, modifier) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}