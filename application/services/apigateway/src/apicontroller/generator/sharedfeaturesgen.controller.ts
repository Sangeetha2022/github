import * as express from 'express';
import { Request, Response } from 'express';
import { Constants } from '../../config/Constants';
import { ApiAdapter } from '../../config/apiAdapter';
import Controller from '../../interfaces/controller.interface'

export class SharedFeaturesGenController implements Controller {

    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/gfcclient', this.sharedFeatureClient);
        this.router.post('/gfcservice', this.sharedFeratureService);
    }

    public async sharedFeatureClient(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().post(`${Constants.sharedFeaturesGenUrl}/gfcclient` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async sharedFeratureService(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().post(`${Constants.sharedFeaturesGenUrl}/gfcservice` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }
}