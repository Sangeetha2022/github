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

        // entity field
        this.router.route('/entity/field/update').put(this.updateEntityField);

        // entity types
        this.router.route('/entity_type/get').get(this.getAllEntityType);

        // default entity
        // this.router.route('/project/default/create').get(this.createDefaultEntity);
        // this.router.post('/projects/my/add', this.addProject);
        // this.router.put('/projects/my/:id/update', this.updateProject);
        // this.router.get('/projects/my/getall', this.getAllMyProject);
        // this.router.get('/projects/my/:id/get', this.getByProjectId);
        // this.router.delete('/projects/my/:id/delete', this.deleteProject);
    }

    // createDefaultEntity(projectId: String) {
    //     new ApiAdaptar().get(`${Constants.entityUrl}/create/default/?projectId=${projectId}`).then(res => {
    //         console.log('create default entity success ----- ', res);
    //     }).catch(err => {
    //         console.log('create default entity error ----  ', err);
    //         res.send(err);
    //     });
    // }


    public createEntity(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.entityUrl}/entity/save`, req.body).then((response) => {

            res.send(response);
        }).catch(err => {
            console.log('create entity error ----  ', err);
            res.send(err);
        });
    }


    public updateEntity(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.entityUrl}/entity/update`, req.body).then((response) => {

            res.send(response);
        }).catch(err => {
            console.log('update entity error ----  ', err);
            res.send(err);
        });
    }

    public updateEntityField(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.entityUrl}/entity/field/update`, req.body).then((response) => {

            res.send(response);
        }).catch(err => {
            console.log('update entity field error ----  ', err);
            res.send(err);
        });
    }

    public deleteEntity(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.entityUrl}/entity/delete/${req.params.id}`).then((response) => {

            res.send(response);
        }).catch(err => {
            console.log('delete entity error ----  ', err);
            res.send(err);
        });
    }

    public getByEntityId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/get/${req.params.id}`).then((response) => {

            res.send(response);
        }).catch(err => {
            console.log('get entity by id error ----  ', err);
            res.send(err);
        });
    }

    public getEntityByProjectId(req: Request, res: Response) {
        console.log('entering into getEntityByProjectId ---- ', `${Constants.entityUrl}/entity/get/?projectId=${req.query.projectId}`)
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/get/?projectId=${req.query.projectId}`).then((response) => {
console.log('get entity by project id values are --------  ', response);
            res.send(response);
        }).catch(err => {
            console.log('get entity by project id error ----  ', err);
            res.send(err);
        });
    }

    public getAllEntity(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity/getall`).then((response) => {

            res.send(response);
        }).catch(err => {
            console.log('get all entity error ----  ', err);
            res.send(err);
        });
    }

    public getAllEntityType(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.entityUrl}/entity_type/get`).then((response) => {

            res.send(response);
        }).catch(err => {
            console.log('create default entity error ----  ', err);
            res.send(err);
        });
    }

}