import { Request, Response, NextFunction } from 'express';
import { ProjectgenService } from '../services/projectgen.service';
import * as socketIo from 'socket.io';


let projectgenService = new ProjectgenService()



export class ProjectgenController {



    public saveProjectgen(req: Request, res: Response) {
        projectgenService.saveProjectgen(req, (response) => {
            res.status(200);
        })
    }


    //get project generation status by project_id
    public getProjectgenByProjectId(req: Request, res: Response, next: NextFunction) {
        projectgenService.getProjectgenByProjectId(req, next, (Projectgen) => {
            res.status(200);
            res.json(Projectgen);
        })
    }

    public getProjectgenByUserId(req: Request, res: Response, next: NextFunction) {
        projectgenService.getProjectgenByUserId(req, next, (Projectgen) => {
            res.status(200);
            res.json(Projectgen);
        })
    }



    public socketIOProjectgen(socket: any) {
        socket.on('gen_notify', (request) => {
            projectgenService.saveProjectgen(request, (response) => {
                socket.emit('gen_notify_' + request.project_id, request);
            })
        });
    }



    public getAllProjectgen(req: Request, res: Response) {
        projectgenService.getAllProjectgen(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    public getProjectgenByID(req: Request, res: Response, next: NextFunction) {
        projectgenService.getProjectgenByID(req, next, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    public deleteProjectgen(req: Request, res: Response, next: NextFunction) {
        projectgenService.deleteProjectgen(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateProjectgen(req: Request, res: Response, next: NextFunction) {
        projectgenService.updateProjectgen(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public createProjectGen(req: Request, res: Response, next: NextFunction) {
        console.log('entering into project controller')
        projectgenService.createProjectGen(req, next, (response) => {
            
        })
    }

}