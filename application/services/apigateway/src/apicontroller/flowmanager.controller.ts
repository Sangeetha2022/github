
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

    public async saveFlow(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/flow/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateFlow(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().put(`${Constants.flowUrl}/flow/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllFlow(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/flow/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getFlowById(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/flow/get?flowId=${req.query.flowId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectFlowById(req: Request, res: Response) {
        try {
            let flow = await  Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/flow/getprojectflowbyid/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getFeatureFlows(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/get` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getFeatureFlowsByLanguage(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/language/get?language=${req.query.language}` + `&log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getFlowByProjectId(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/flow/project/get?projectId=${req.query.projectId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteFlow(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().delete(`${Constants.flowUrl}/flow/delete?flowId=${req.query.flowId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    // project flows

    public async createProjectFlow(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/flow/project/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async ProjectFlow(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/flow/project/bulksave` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllProjectFlow(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/flow/project/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectFeatureFlows(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/flow/projectfeature/get` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateFlowComponents(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().put(`${Constants.flowUrl}/flow/project/updatecomponent?projectFlowId=${req.query.projectFlowId}` + `&log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async deleteProjectFlow(req: Request, res: Response) {
        try {

            let flow = await Promise.resolve(new ApiAdaptar().delete(`${Constants.flowUrl}/flow/project/delete?projectFlowId=${req.query.projectFlowId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    //project flow components--
    public async saveProjectFlowComponent(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/flowcomponent/project/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectFlowComponent(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/flowcomponent/project/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectFlowComponentByID(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/flowcomponent/project/getbyid/${req.params.id}`+`?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteProjectFlowComponent(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().delete(`${Constants.flowUrl}/flowcomponent/project/delete?projectFlowCompId=${req.query.projectFlowCompId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateProjectFlowComponent(req: Request, res: Response) {
        try {
            console.log('api--gateway-->>', req.body);
            let flow = await Promise.resolve(new ApiAdaptar().put(`${Constants.flowUrl}/flowcomponent/project/updateconnector` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    //save connectors:

    public async saveConnectors(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().post(`${Constants.flowUrl}/save/quickConnectors` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    // Get connector based on entity

    public async getConnectorByEntity(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/get/quickConnectorbyentity/${req.params.entityid}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getConnectorById(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/get/quickConnectorbyid/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getConnectors(req: Request , res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().get(`${Constants.flowUrl}/getConnectors` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch(err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }



    // delete connector based on entity

    public async deleteConnectorById(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().delete(`${Constants.flowUrl}/delete/quickConnectorbyid/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async deleteConnectorByEntityId(req: Request, res: Response) {
        try {
            let flow = await Promise.resolve(new ApiAdaptar().delete(`${Constants.flowUrl}/delete/quickConnectorbyentityid/${req.params.entityid}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }

    }

    public async updateQuickConnectorsById(req:Request , res: Response){
        try {
            let response = await Promise.resolve(new ApiAdaptar().put(`${Constants.flowUrl}/quickUpdateConnectorsById/${req.body._id}` +`?log_id=${req.query.log_id}`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }

}

export { FlowManagerController };
