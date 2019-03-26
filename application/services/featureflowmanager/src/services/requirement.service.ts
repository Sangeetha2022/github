import { Request, NextFunction } from 'express';
import { RequirementDao } from '../daos/requirement.dao';

let requirementDao = new RequirementDao()

export class RequirementService {

    public saveRequirement(req: Request, callback: CallableFunction) {
        const requirement = req.body;
        requirementDao.saveRequirement(requirement, (response) => {
            callback(response);
        })
    }

    public getAllRequirement(req: Request, callback: CallableFunction) {
        requirementDao.getAllRequirement(req, (flow) => {
            callback(flow);
        })
    }

    public getRequirementByID(req: Request, next: NextFunction, callback: CallableFunction) {
        requirementDao.getRequirementByID(req, next, (flow) => {
            callback(flow);
        })
    }

    public deleteRequirement(req: Request, next: NextFunction, callback: CallableFunction) {
        const flowID = req.params.id;
        requirementDao.deleteRequirement(flowID, next, (response) => {
            callback(response);
        })
    }

    updateRequirement = (req: Request, next: NextFunction, callback: CallableFunction) => {
        requirementDao.updateRequirement(req, next, (response) => {
            callback(response);
        })
    }
}