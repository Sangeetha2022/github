import { Request, NextFunction } from 'express';
import { ModifierDao } from '../daos/ModifierDao';

let modifierDao = new ModifierDao()

export class ModifierService {

    public saveModifier(req: Request, callback: CallableFunction) {
        const modifierData = req.body;
        modifierDao.saveModifier(modifierData, (modifier) => {
            callback(modifier)
        })
    }
    public saveModifierUsage(req: Request, callback: CallableFunction) {
        const modifierData = req.body;
        modifierDao.saveModifierUsage(modifierData, (modifier) => {
            callback(modifier)
        })
    }

    public getModifierByProjectDetails(req: Request, callback: CallableFunction) {
        const projectDetials = {
            project_id: req.query.project_id,
            feature_id: req.query.feature_id,
            modify_target_type_id: req.query.modify_target_type_id
        };
        modifierDao.getModifierByProjectDetails(projectDetials, (modifier) => {
            callback(modifier)
        })
    }

    public updateModifier(req: Request, callback: CallableFunction) {
        const modifierId = req.body._id;
        const modifierData = req.body;
        modifierDao.updateModifier(modifierId, modifierData, (modifier) => {
            callback(modifier)
        })
    }


    public getAllModifier(req: Request, callback: CallableFunction) {
        modifierDao.getAllModifier((modifier) => {
            callback(modifier)
        })
    }
    public getAllDefaultModifiers(req: Request, callback: CallableFunction) {
        modifierDao.getAllDefaultModifiers((modifier) => {
            callback(modifier)
        })
    }

    public getModifierById(req: Request, callback: CallableFunction) {
        const modifierId = req.query.modifierId;
        modifierDao.getModifierById(modifierId, (modifier) => {
            callback(modifier)
        })
    }

    public getFlowModifiers(req: Request, callback: CallableFunction) {
        const modifiersId = req.body;
        modifierDao.getFlowModifiers(modifiersId, (modifier) => {
            callback(modifier)
        })
    }
    public getFeatureModifiersByLanguage(req: Request, callback: CallableFunction) {
        const modifiersId = req.body;
        const language = req.query.language;
        modifierDao.getFeatureModifiersByLanguage(modifiersId, language, (modifier) => {
            callback(modifier)
        })
    }


    public getModifierByProjectId(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        console.log('getmodifier by project id are ------ ', projectId);
        modifierDao.getModifierByProjectId(projectId, (modifier) => {
            callback(modifier)
        })
    }

    public deleteModifier(req: Request, callback: CallableFunction) {
        const modifierId = req.query.modifierId;
        modifierDao.deleteModifier(modifierId, (modifier) => {
            callback(modifier)
        })
    }


}
