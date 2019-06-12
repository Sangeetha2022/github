import { Request, Response } from 'express';
import { LandingPageService } from '../services/LandingPageService';

let landingPageService = new LandingPageService();

export class LandingPageController {
    constructor() { }

    public getLandingPage(req: Request, res: Response) {
        landingPageService.getLandingPage(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}