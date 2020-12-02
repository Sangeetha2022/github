
import { Request, Response } from 'express';
import { SwaggerGenService } from '../services/SwaggerGenService';

let swaggerGenService = new SwaggerGenService();

export class SwaggerGenController {

    public createSwagger(req: Request, res: Response) {
        swaggerGenService.createSwagger(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}