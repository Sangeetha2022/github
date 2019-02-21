import { ProjectgenController } from "../controllers/projectgen.controller";
import { Request, Response, NextFunction } from "express";

import { ProjectgenService } from '../services/projectgen.service';

export class Routes {


    public projectgenController: ProjectgenController = new ProjectgenController()

    public projectgenService: ProjectgenService = new ProjectgenService()


    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        //generation
        app.post('/generate/:project_id', (req: Request, res: Response) => {
            this.projectgenService.saveProjectgen(req, (response) => {
                socket.emit('gen_notify_' + req.body.project_id, req.body);
                res.send({ "message": "success" });
            })
        })

        app.post('/generate/update/:project_id', (req: Request, res: Response) => {
            this.projectgenService.saveProjectgen(req, (response) => {
                socket.emit('gen_notify_' + req.body.project_id, req.body);
                res.send({ "message": "success" });
            })
        })

        app.route('/projectgen/project/:project_id').get(this.projectgenController.getProjectgenByProjectId);
        app.route('/projectgen/user/:user_id').get(this.projectgenController.getProjectgenByUserId);


    }


    public socketIO(socket: any) {
        //WebSocket
        this.projectgenController.socketIOProjectgen(socket);
    }


}