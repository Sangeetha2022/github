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

    public saveModifierUsage(req: Request, res: Response) {
        modifierService.saveModifierUsage(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getModifierByProjectDetails(req: Request, res: Response) {
        modifierService.getModifierByProjectDetails(req, (response) => {
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

    public getAllDefaultModifiers(req: Request, res: Response) {
        modifierService.getAllDefaultModifiers(req, (response) => {
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

    public getFlowModifiers(req: Request, res: Response) {
        modifierService.getFlowModifiers(req, (response) => {
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
