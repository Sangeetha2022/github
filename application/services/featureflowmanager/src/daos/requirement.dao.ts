import { Request } from 'express';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import RequirementModel from '../models/requirement/requirement.model';

export class RequirementDao {

    private requirement = RequirementModel;

    saveRequirement = async (requirement, callback: CallableFunction) => {
        const createdRequirement = this.requirement
        const savedRequirement = await createdRequirement.save();
        callback(savedRequirement);
    }

    getAllRequirement = async (req: Request, callback: CallableFunction) => {
        const posts = await this.requirement.find();
        callback(posts);
    }

    getRequirementByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const requirement = await this.requirement.findById(id);
        if (requirement) {
            callback(requirement);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    deleteRequirement = async (requirementID, next, callback: CallableFunction) => {
        const id = requirementID;
        const successResponse = await this.requirement.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateRequirement = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData = req.body;
        postData.updated_date = new Date();
        const post = await this.requirement.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }

}