import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../interfaces/controller.interface";
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';



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
    }


    public createEntity(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.entityUrl}/entity/save`, req.body).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public updateEntity(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.entityUrl}/entity/update`, req.body).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateEntityField(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.entityUrl}/entity/field/update`, req.body).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteEntity(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.entityUrl}/entity/delete/${req.params.id}`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public deleteProjectEntity(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.entityUrl}/entity/deletebyproject/${req.params.id}`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getByEntityId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/get/${req.params.id}`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getEntityByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/get/?projectId=${req.query.projectId}`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getEntityByFeatureId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/feature/get?featureId=${req.query.featureId}`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllEntity(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/getall`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getProjectEntity(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/getbyproject/${req.params.id}`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllEntityType(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity_type/get`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getGlobalEntityByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/global?projectId=${req.query.projectId}`).then((response) => {
            req.baseUrl === '/mobile' ? res.send(response) :
                req.baseUrl === '/desktop' ? res.send(response) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


}