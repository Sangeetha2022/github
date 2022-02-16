import * as express from 'express';
import { Request, Response } from 'express';
import { Constants } from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';
import Controller from '../interfaces/controller.interface'

export class SharedFeaturesController implements Controller {

    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.delete('/gfc/:id', this.deleteById);
        this.router.get('/gfc', this.getAllGfc);
        this.router.post('/gfc', this.createGfc);
        this.router.put('/gfc', this.updateGfc);
        this.router.get('/gfc/get/search', this.searchByName);
        this.router.put('/gfc/get/update', this.searchByUpdate);
        this.router.get('/gfc/get/:id', this.getGfcById);
    }

    public async deleteById(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().delete(`${Constants.SharedFeaturesUrl}/gfc/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllGfc(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.SharedFeaturesUrl}/gfc` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async createGfc(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().post(`${Constants.SharedFeaturesUrl}/gfc` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateGfc(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().put(`${Constants.SharedFeaturesUrl}/gfc` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async searchByName(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.SharedFeaturesUrl}/gfc/get/search` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async searchByUpdate(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().put(`${Constants.SharedFeaturesUrl}/gfc/get/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getGfcById(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.SharedFeaturesUrl}/gfc/get/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


}