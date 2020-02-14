
import * as express from "express";
import { Request, Response } from 'express';
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { constants } from "crypto";

class FlowManagerController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/flow/save', this.saveFlow);
        this.router.put('/flow/update', this.updateFlow);
        this.router.get('/flow/getall', this.getAllFlow);
        this.router.get('/flow/get', this.getFlowById);
        this.router.post('/flow/feature/get', this.getFeatureFlows);
        this.router.post('/flow/feature/language/get', this.getFeatureFlows);
        this.router.get('/flow/project/get', this.getFlowByProjectId);
        this.router.delete('/flow/delete', this.deleteFlow);

        // project flow
        this.router.post('/flow/project/save', this.createProjectFlow);
        this.router.post('/flow/project/bulksave', this.ProjectFlow);
        this.router.post('/flow/projectfeature/get', this.getProjectFeatureFlows);
        this.router.put('/flow/project/updatecomponent', this.updateFlowComponents);
        this.router.get('/flow/project/getall', this.getAllProjectFlow);
        this.router.get('/flow/getprojectflowbyid/:id', this.getProjectFlowById);
        this.router.delete('/flow/project/delete', this.deleteProjectFlow);


        //project flow component
        this.router.post('/flowcomponent/project/save', this.saveProjectFlowComponent);
        this.router.get('/flowcomponent/project/getall', this.getProjectFlowComponent);
        this.router.get('/flowcomponent/project/getbyid/:id', this.getProjectFlowComponentByID);
        this.router.delete('/flowcomponent/project/delete', this.deleteProjectFlowComponent);
        this.router.put('/flowcomponent/project/updateconnector', this.updateProjectFlowComponent)


        //qucik connectors
        this.router.post('/save/quickConnectors', this.saveConnectors);
        this.router.get('/get/quickConnectorbyentity/:entityid', this.getConnectorByEntity);
        this.router.get('/get/quickConnectorbyid/:id', this.getConnectorById);
        this.router.get('/getConnectors', this.getConnectors)
        this.router.delete('/delete/quickConnectorbyid/:id', this.deleteConnectorById);
        this.router.delete('/delete/quickConnectorbyentityid/:entityid', this.deleteConnectorByEntityId);
        this.router.route('/quickUpdateConnectorsById/:id').put(this.updateQuickConnectorsById)


    }

    public saveFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/save`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public updateFlow(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.flowUrl}/flow/update`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getAllFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/getall`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getFlowById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/get?flowId=${req.query.flowId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getProjectFlowById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/getprojectflowbyid/${req.params.id}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }


    public getFeatureFlows(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/get`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }


    public getFeatureFlowsByLanguage(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/language/get?language=${req.query.language}`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getFlowByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/project/get?projectId=${req.query.projectId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public deleteFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.flowUrl}/flow/delete?flowId=${req.query.flowId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    // project flows

    public createProjectFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/project/save`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public ProjectFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/project/bulksave`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getAllProjectFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/project/getall`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getProjectFeatureFlows(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/projectfeature/get`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public updateFlowComponents(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.flowUrl}/flow/project/updatecomponent?projectFlowId=${req.query.projectFlowId}`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }


    public deleteProjectFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.flowUrl}/flow/project/delete?projectFlowId=${req.query.projectFlowId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    //project flow components--
    saveProjectFlowComponent(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flowcomponent/project/save`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    getProjectFlowComponent(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flowcomponent/project/getall`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }

    public getProjectFlowComponentByID(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flowcomponent/project/getbyid/${req.params.id}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }

    public deleteProjectFlowComponent(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.flowUrl}/flowcomponent/project/delete?projectFlowCompId=${req.query.projectFlowCompId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    updateProjectFlowComponent(req: Request, res: Response) {
        console.log('api--gateway-->>', req.body);
        new ApiAdaptar().put(`${Constants.flowUrl}/flowcomponent/project/updateconnector`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }

    //save connectors:

    saveConnectors(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/save/quickConnectors`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }

    // Get connector based on entity

    getConnectorByEntity(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/get/quickConnectorbyentity/${req.params.entityid}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }

    getConnectorById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/get/quickConnectorbyid/${req.params.id}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }

    getConnectors(req: Request , res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/getConnectors`)
        .then(flow => {
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        })
    }



    // delete connector based on entity

    deleteConnectorById(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.flowUrl}/delete/quickConnectorbyid/${req.params.id}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }


    deleteConnectorByEntityId(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.flowUrl}/delete/quickConnectorbyentityid/${req.params.entityid}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })

    }

    public updateQuickConnectorsById(req:Request , res: Response){
        new ApiAdaptar().put(`${Constants.flowUrl}/quickUpdateConnectorsById/${req.body._id}`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        })

    }

}

export { FlowManagerController };
