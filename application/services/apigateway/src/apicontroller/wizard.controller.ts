import * as express from 'express';
import { Request, Response } from 'express';
import { Constants } from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';
import Controller from '../interfaces/controller.interface'

export class WizardController implements Controller 
{
    public router = express.Router();

    constructor()
    {
        this.initializeRoutes();
    }

    private initializeRoutes() 
    {
        this.router.delete('/wizard/:id', this.deleteById);
        this.router.get('/wizard', this.getAllWizard);
        this.router.post('/wizard', this.createWizard);
        this.router.put('/wizard', this.updateWizard);
        this.router.get('/wizard/get/search', this.searchByName);
        this.router.put('/wizard/get/update', this.searchByUpdate);
        this.router.get('/wizard/get/:id', this.getWizardById);
    }

    public async deleteById(req: Request, res: Response) 
    {
        try 
        {
            let result = await Promise.resolve(new ApiAdapter().delete(`${Constants.wizardUrl}/wizard/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
            req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } 
        catch (err) 
        {
            req.baseUrl === '/mobile' ? res.send(err) :
            req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllWizard(req: Request, res: Response) 
    {
        try 
        {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.wizardUrl}/wizard` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
            req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } 
        catch (err) 
        {
            req.baseUrl === '/mobile' ? res.send(err) :
            req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async createWizard(req: Request, res: Response) 
    {
        try 
        {
            let result = await Promise.resolve(new ApiAdapter().post(`${Constants.wizardUrl}/wizard` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
            req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } 
        catch (err) 
        {
            req.baseUrl === '/mobile' ? res.send(err) :
            req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateWizard(req: Request, res: Response) 
    {
        try 
        {
            let result = await Promise.resolve(new ApiAdapter().put(`${Constants.wizardUrl}/wizard` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
            req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } 
        catch (err) 
        {
            req.baseUrl === '/mobile' ? res.send(err) :
            req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async searchByName(req: Request, res: Response) 
    {
        try 
        {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.wizardUrl}/wizard/get/search?wizard_name=${req.query.wizard_name}`));
            req.baseUrl === '/mobile' ? res.send(result) :
            req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } 
        catch (err) 
        {
            req.baseUrl === '/mobile' ? res.send(err) :
            req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async searchByUpdate(req: Request, res: Response) 
    {
        try 
        {
            let result = await Promise.resolve(new ApiAdapter().put(`${Constants.wizardUrl}/wizard/get/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
            req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } 
        catch (err) 
        {
            req.baseUrl === '/mobile' ? res.send(err) :
            req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getWizardById(req: Request, res: Response) 
    {
        try 
        {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.wizardUrl}/wizard/get/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
            req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } 
        catch (err) 
        {
            req.baseUrl === '/mobile' ? res.send(err) :
            req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }
}