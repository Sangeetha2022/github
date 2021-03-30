
import * as express from "express";
import { Request, Response } from 'express';
import { Constants } from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { constants } from "crypto";

class ModifierManagerController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/modifier/save', this.saveModifier);
        this.router.post('/modifier/usage/save', this.saveModifierUsage);
        this.router.put('/modifier/update', this.updateModifier);
        this.router.get('/modifier/getall', this.getAllModifier);
        this.router.get('/modifier/default/getall', this.getAllDefaultModifiers);
        this.router.get('/modifier/get', this.getModifierById);
        this.router.post('/modifier/flow/get', this.getFlowModifiers);
        this.router.post('/modifier/feature/language/get', this.getFeatureModifiersByLanguage);
        this.router.get('/modifier/project/get', this.getModifierByProjectId);
        this.router.delete('/modifier/delete', this.deleteModifier);
        this.router.get('/modifier/usage/get/projectdetials', this.getModifierByProjectDetails);

    }

    public async saveModifier(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().post(`${Constants.modifierUrl}/modifier/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async saveModifierUsage(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().post(`${Constants.modifierUrl}/modifier/usage/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getModifierByProjectDetails(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().get(`${Constants.modifierUrl}/modifier/usage/get/projectdetials
                ?project_id=${req.query.project_id}&feature_id=${req.query.feature_id}&modify_target_type_id=${req.query.modify_target_type_id}`
                + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateModifier(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().put(`${Constants.modifierUrl}/modifier/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllModifier(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().get(`${Constants.modifierUrl}/modifier/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllDefaultModifiers(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().get(`${Constants.modifierUrl}/modifier/default/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getModifierById(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().get(`${Constants.modifierUrl}/modifier/get?modifierId=${req.query.modifierId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectModifierById(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().get(`${Constants.modifierUrl}/modifier/getprojectmodifierbyid/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getFlowModifiers(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().post(`${Constants.modifierUrl}/modifier/flow/get` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getFeatureModifiersByLanguage(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().post(`${Constants.modifierUrl}/modifier/feature/language/get?language=${req.query.language}` + `&log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getModifierByProjectId(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().get(`${Constants.modifierUrl}/modifier/project/get?projectId=${req.query.projectId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteModifier(req: Request, res: Response) {
        try {
            let modifier = await Promise.resolve(new ApiAdaptar().delete(`${Constants.modifierUrl}/modifier/delete?modifierId=${req.query.modifierId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(modifier) :
                req.baseUrl === '/desktop' ? res.send(modifier) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


}

export { ModifierManagerController };
