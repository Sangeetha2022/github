import { Request, Response, NextFunction } from 'express';
import { RequirementService } from '../services/requirement.service';

let requirementService = new RequirementService()

export class RequirementController {

    public saveRequirement(req: Request, res: Response, next: NextFunction) {
        requirementService.saveRequirement(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllRequirement(req: Request, res: Response, next: NextFunction) {
        requirementService.getAllRequirement(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getRequirementByID(req: Request, res: Response, next: NextFunction) {
        requirementService.getRequirementByID(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteRequirement(req: Request, res: Response, next: NextFunction) {
        requirementService.deleteRequirement(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateRequirement(req: Request, res: Response, next: NextFunction) {
        requirementService.updateRequirement(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}