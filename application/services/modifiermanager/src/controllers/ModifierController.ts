import { Request, Response, NextFunction } from 'express';
import { ModifierService } from '../services/ModifierService';

let modifierService = new ModifierService();

export class modifierController {

    public saveModifier(req: Request, res: Response) {
        modifierService.saveModifier(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public updateModifier(req: Request, res: Response) {
        modifierService.updateModifier(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getAllModifier(req: Request, res: Response) {
        modifierService.getAllModifier(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getModifierById(req: Request, res: Response) {
        modifierService.getModifierById(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getFeatureModifiers(req: Request, res: Response) {
        modifierService.getFeatureModifiers(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getFeatureModifiersByLanguage(req: Request, res: Response) {
        modifierService.getFeatureModifiersByLanguage(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }


    public getModifierByProjectId(req: Request, res: Response) {
        modifierService.getModifierByProjectId(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public deleteModifier(req: Request, res: Response) {
        modifierService.deleteModifier(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

}
