import { Request, Response } from 'express';
import { AcousticService } from '../services/acousticservice';

const acousticservice = new AcousticService();

export class AcousticController {

    public acousticgenerator(req: Request, res: Response) {
        acousticservice.acousticgenerate((response,error) => {
            if (error) {
                res.status(500);
                res.json(error);
            } else {
                res.status(200);
                res.json(response);
            }
        })
    }

    public acousticPages(req: Request, res: Response) {
        acousticservice.getPageTitles(req.body, (response) => {
            res.status(201);
            res.json(response);
        });
    }
}