import { Request, Response } from 'express';
import { ApiGatewayService } from '../services/ApiGatewayService';

let apiGatewayService = new ApiGatewayService();

export class ApiGatewayController {

    public createApiGateway(req: Request, res: Response) {
        apiGatewayService.createApiGateway(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}