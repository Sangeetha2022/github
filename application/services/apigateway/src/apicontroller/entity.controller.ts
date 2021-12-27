import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../interfaces/controller.interface";
import { Constants } from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';



export class EntityController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/entity/save').post(this.createEntity);
        this.router.route('/entity/update').put(this.updateEntity);
        this.router.route('/entity/delete/:id').delete(this.deleteEntity);
        this.router.route('/entity/get/:id').get(this.getByEntityId);
        this.router.route('/entity/getall').get(this.getAllEntity);
        this.router.route('/entity/get').get(this.getEntityByProjectId);
        this.router.route('/entity/getbyproject/:id').get(this.getProjectEntity);
        this.router.route('/entity/feature/get').get(this.getEntityByFeatureId);
        this.router.route('/entity/deletebyproject/:id').delete(this.deleteProjectEntity);

        // entity field
        this.router.route('/entity/field/update').put(this.updateEntityField);

        // entity types
        this.router.route('/entity_type/get').get(this.getAllEntityType);
        this.router.route('/entity/global').get(this.getGlobalEntityByProjectId);

        //Get all  feature entities with entity id
        
        this.router.route('/entity/feature').post(this.getFeatureEntities)
    }


    public async createEntity(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().post(`${Constants.entityUrl}/entity/save`+ `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async updateEntity(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().put(`${Constants.entityUrl}/entity/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateEntityField(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().put(`${Constants.entityUrl}/entity/field/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteEntity(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().delete(`${Constants.entityUrl}/entity/delete/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async deleteProjectEntity(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().delete(`${Constants.entityUrl}/entity/deletebyproject/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getByEntityId(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().get(`${Constants.entityUrl}/entity/get/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getEntityByProjectId(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().get(`${Constants.entityUrl}/entity/get/?projectId=${req.query.projectId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getEntityByFeatureId(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().get(`${Constants.entityUrl}/entity/feature/get?featureId=${req.query.featureId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllEntity(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().get(`${Constants.entityUrl}/entity/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectEntity(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().get(`${Constants.entityUrl}/entity/getbyproject/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllEntityType(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().get(`${Constants.entityUrl}/entity_type/get` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getGlobalEntityByProjectId(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().get(`${Constants.entityUrl}/entity/global?projectId=${req.query.projectId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getFeatureEntities(req: Request, res: Response) {
        try {
            let entity = await Promise.resolve(new ApiAdapter().post(`${Constants.entityUrl}/entity/feature`+ `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(entity) :
                req.baseUrl === '/desktop' ? res.send(entity) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }
}