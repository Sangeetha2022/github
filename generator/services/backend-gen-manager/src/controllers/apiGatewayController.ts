
import { Request, Response } from 'mongoose';
import { ApiGatewayService } from '../services/apiGatewayService';

let apigatewayService = new ApiGatewayService();

export class ApiGatewayController {

    public createApiGateway(req: Request, res: Response) {
        apigatewayService.createApiGateway(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}