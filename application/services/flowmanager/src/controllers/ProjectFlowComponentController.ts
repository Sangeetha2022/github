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

    // public getAllProjectFlowComponent(req: Request , res: Response){
    //     projectFlowComponentService.getAllProjectFlowComponent(req, (response)=>{
    //         res.status(200);
    //         res.json(response)
    //     })

    // }

    public updateProjectFlowComponent(req: Request , res: Response){
        projectFlowComponentService.updateProjectFlowComponent(req , (response) => {
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