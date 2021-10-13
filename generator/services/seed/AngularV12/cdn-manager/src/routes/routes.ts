import { Request, Response, NextFunction } from 'express';
import { CdnController } from '../controllers/CdnController';

export class Routes {

    public cdncontroller: CdnController = new CdnController()

    public routes(app): void {

        app.route('/cdn').post(this.cdncontroller.chunktos3);

    }
}