import {Request , Response} from 'express';
import {ProjectFlowComponentService} from '../services/projectFlowComponentService'


const projectFlowComponentService = new ProjectFlowComponentService();


export class ProjectFlowComponentController {

    public saveProjectFlowComponent(req: Request , res: Response){
        projectFlowComponentService.saveProjectFlowComponent(req , (response)=> {
            res.status(200);
            res.json(response)
        })

    }

    public getProjectFlowComponent(req: Request, res: Response) {
        projectFlowComponentService.getProjectFlowComponents(req, (respone) => {
            res.status(200);
            res.json(respone)
        })
    }

    public getProjectFlowComponentById(req: Request, res: Response) {
        projectFlowComponentService.getProjectFlowComponentById(req, (respone) => {
            res.status(200);
            res.json(respone)
        })
    }

    public deleteProjectFlowComp(req: Request, res: Response) {
        projectFlowComponentService.deleteProjectFlowComp(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public updateProjectFlowComponent(req: Request, res: Response) {
        projectFlowComponentService.updateProjectFlowComponent(req, (respone) => {
            res.status(200);
            res.json(response)
        })
    }

    // public updateProjectFlowComponent(req: Request, res: Response) {
    //     projectFlowComponentService.updateProjectFlowComponent(req, (respone) => {
    //         res.status(200);
    //         res.json(200)
    //     })
    // }

}