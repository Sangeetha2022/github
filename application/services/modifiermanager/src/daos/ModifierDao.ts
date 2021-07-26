import * as mongoose from 'mongoose';
import DefaultModifierModel from '../models/DefaultModifier';
import projectmodifierModel from '../models/ModifierUsage';
import { Request, Response } from 'express';

// const Features = mongoose.model('Features', FeaturesSchema);

export class ModifierDao {

    private modifier = DefaultModifierModel;
    private projectmodifier = projectmodifierModel;


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

    public async saveModifierUsage(modifierData, callback: CallableFunction) {
        let useageModifiers: any = await this.getAllProjectModifiers();
        let filteredModifiers = useageModifiers.filter((x) => x === modifierData);
        if (filteredModifiers.length > 0) {
            callback("exist");
        } else {
            projectmodifierModel.insertMany(modifierData, (err, modifier) => {
                if (err) {
                    callback(err);
                } else {
                    callback(modifier);
                }
            });
        }
    }

    public getModifierByProjectDetails(projectObject, callback: CallableFunction) {
        this.projectmodifier.find({
            project_id: projectObject.project_id,
            feature_id: projectObject.feature_id,
            modify_target_type_id: projectObject.modify_target_type_id
        }, (err, modifier) => {
            if (err) {
                callback(err)
            } else {
                callback(modifier)
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
        this.modifier.find({ flag: 'active' }).populate('components').exec((err, modifier) => {
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

    public getAllProjectModifiers() {
        return new Promise(resolve => {
            this.projectmodifier.find({}, (err, modifier) => {
                if (err) {
                    resolve(err)
                } else {
                    resolve(modifier)
                }
            });
        })
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