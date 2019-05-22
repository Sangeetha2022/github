import { CodeGenerationController } from '../controllers/codeGenerationController';
import { Request, Response } from 'express';
export class Routes {


    public codeController: CodeGenerationController = new CodeGenerationController()

    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/generate/code').put(this.codeController.createProject);

        }


    // public socketIO(socket: any) {
    //     //WebSocket
    //     this.projectgenController.socketIOProjectgen(socket);
    // }


}