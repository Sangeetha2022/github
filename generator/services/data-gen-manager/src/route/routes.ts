 import {DataGenEntityController} from '../controller/dataGenEntityController';
 import { Response , Request} from 'express';


 export class Routes{

    public  entityController: DataGenEntityController = new  DataGenEntityController;

 

    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/backend/datagen/entity').get(this.entityController.getAllEntity);

        }

}