import { Request } from 'express';
import PprojectgenModel from '../models/projectgen/projectgen.model';
import IPprojectgen from '../models/projectgen/projectgen.interface';
import PprojectgenDto from '../models/projectgen/projectgen.dto';
import PostNotFoundException from '../exceptions/PostNotFoundException';

export class ProjectgenDao {

    private projectgen = PprojectgenModel;

    saveProjectgen = async (projectgen, callback: CallableFunction) => {
        const projectgenData: PprojectgenDto = projectgen;
        const createdPprojectgen = new this.projectgen({
            ...projectgenData
        });
        const savedProjectgen = await createdPprojectgen.save();
        callback(savedProjectgen);
    }

    getProjectgenByProjectId = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.project_id;
        const projectgen = await this.projectgen.find({project_id: id});
        if (projectgen) {
            callback(projectgen);
        } else {
            next(new PostNotFoundException(id));
        }
    }  

    getProjectgenByUserId = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.user_id;
        const projectgen = await this.projectgen.find({user_id: id}).limit(20);
        if (projectgen) {
            callback(projectgen);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    getAllProjectgen = async (req: Request, callback: CallableFunction) => {
        const posts = await this.projectgen.find();
        callback(posts);
    }

    getProjectgenByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const projectgen = await this.projectgen.findById(id);
        if (projectgen) {
            callback(projectgen);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    deleteProjectgen = async (projectgenID, next, callback: CallableFunction) => {
        const id = projectgenID;
        const successResponse = await this.projectgen.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateProjectgen = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IPprojectgen = req.body;
        const post = await this.projectgen.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }
}