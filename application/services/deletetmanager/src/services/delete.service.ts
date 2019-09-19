import { Request } from 'express';
import {
    FeatureManagerService,
    MenuBuilderManagerService,
    EntityManagerService,
    ScreenManagerService,
    ProjectManagerService,
    FlowManagerService

} from '../apiservices/index';


export class DeleteService {

    private featureManagerService = new FeatureManagerService();
    private menuBuilderManagerService = new MenuBuilderManagerService();
    private entityManagerService = new EntityManagerService();
    private screenManagerService = new ScreenManagerService();
    private projectManagerService = new ProjectManagerService();
    private flowManagerService = new FlowManagerService();


    public async deleteProjectById(req: Request, callback) {
        const projectId = req.params.id;
        await this.deleteProject(projectId);
        await this.getFeatureByProjectId(projectId);
        await this.getProjectEntity(projectId)
        this.deleteProjectFeature(projectId);
        this.deleteProjectMenu(projectId);
        this.deleteProjectEntity(projectId);
        this.deleteProjectScreen(projectId);
        callback({ message: 'Successfully deleted records connected with project!' })
    }


    public async deleteEntity(req: Request, callback) {
        const entityId = req.params.id;
        await this.deleteConnectorByEntityId(entityId)
        this.deleteEntityById(entityId)
        callback({ message: 'Successfully deleted records connected with Entity!' });
    }


    public async deleteFeature(req: Request, callback) {
        const featureId = req.params.id;
        await this.getFeatureById(featureId);
        this.getScreenByFeatureId(featureId);
        this.deleteFeatureById(featureId)
        callback({ message: 'Successfully deleted records connected with Feature!' });
    }

    public async deleteMenu(req: Request, callback) {
        const menuId = req.params.id;
        this.deletetMenuById(menuId)
        callback({ message: 'Successfully deleted records connected with Menu!' });
    }

    public async deleteScreen(req: Request, callback) {
        const screenId = req.params.id;
        this.deleteScreenById(screenId);
        callback({ message: 'Successfully deleted records connected with Screen!' });
    }


    public async deleteFlow(req: Request, callback) {
        const flowId = req.params.id;
        await this.getProjectFlowById(flowId)
        this.deleteProjectFlowById(flowId);
        callback({ message: 'Successfully deleted records connected with Screen!' });
    }

    deleteProjectFeature(projectId) {
        return new Promise(resolve => {
            this.featureManagerService.deleteProjectFeature(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectMenu(projectId) {
        return new Promise(resolve => {
            this.menuBuilderManagerService.deleteProjectMenu(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectScreen(projectId) {
        return new Promise(resolve => {
            this.screenManagerService.deleteProjectScreen(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectEntity(projectId) {
        return new Promise(resolve => {
            this.entityManagerService.deleteProjectEntity(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteEntityById(projectId) {
        return new Promise(resolve => {
            this.entityManagerService.deleteEntityById(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProject(projectId) {
        return new Promise(resolve => {
            this.projectManagerService.deleteProjectById(projectId, (data) => {
                resolve(data);
            })
        });
    }


    getFeatureByProjectId(projectId) {
        return new Promise(resolve => {
            this.featureManagerService.getFeatureByProjectId(projectId, (data) => {
                data.body.body.map(({ flows }) => {
                    if (flows.length > 0) {
                        flows.map(async flowId => {
                            await this.getProjectFlowById(flowId);
                            this.deleteProjectFlowById(flowId);
                        })
                    }
                })
                resolve(data);
            })
        });
    }

    getFeatureById(featureId) {
        return new Promise(resolve => {
            this.featureManagerService.getFeatureById(featureId, (data) => {
                if (data.body.body.flows.length > 0) {
                    data.body.body.flows.map(async flowId => {
                        await this.getProjectFlowById(flowId);
                        this.deleteProjectFlowById(flowId);
                    })
                }
                if (data.body.body.entities.length > 0) {
                    data.body.body.entities.map(({ entityId }) => {
                        this.deleteEntityById(entityId)
                    })
                }
                resolve(data);
            })
        });
    }

    getScreenByFeatureId(featureId) {
        return new Promise(resolve => {
            this.screenManagerService.getScreenByFeatureId(featureId, (data) => {
                data.body.body.map(({ _id }) => {
                    this.deleteScreenById(_id);
                })
                resolve(data);
            })
        });
    }

    deleteFeatureById(featureId) {
        return new Promise(resolve => {
            this.featureManagerService.deleteFeatureById(featureId, (data) => {
                resolve(data);
            })
        });
    }

    getProjectEntity(projectId) {
        return new Promise(resolve => {
            this.entityManagerService.getProjectEntity(projectId, (data) => {
                data.body.body.map(({ _id, is_default }) => {
                    if (!is_default) {
                        this.deleteConnectorByEntityId(_id);
                    }
                })
                resolve(data);
            })
        });
    }

    getProjectFlowById(flowId) {
        return new Promise(resolve => {
            this.flowManagerService.getProjectFlowById(flowId, (data) => {
                data.body.body.map(({ components }) => {
                    components.map(async component => {
                        await this.getProjectFlowCompById(component);
                        await this.deleteProjectFlowCompById(component)
                    })
                })
                resolve(data);
            })
        });
    }


    deleteProjectFlowById(flowId) {
        return new Promise(resolve => {
            this.flowManagerService.deleteProjectFlow(flowId, (data) => {
                resolve(data);
            })
        });
    }

    deleteConnectorById(id) {
        return new Promise(resolve => {
            this.flowManagerService.deleteConnectorById(id, (data) => {
                resolve(data);
            })
        });
    }

    deleteConnectorByEntityId(entityId) {
        return new Promise(resolve => {
            this.flowManagerService.deleteConnectorByEntityId(entityId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectFlowCompById(flowCompId) {
        return new Promise(resolve => {
            this.flowManagerService.deleteProjectFlowComponent(flowCompId, (data) => {
                resolve(data);
            })
        });
    }


    deleteScreenById(screenId) {
        return new Promise(resolve => {
            this.screenManagerService.deletetScreenById(screenId, (data) => {
                resolve(data);
            })
        });
    }

    deletetMenuById(menuId) {
        return new Promise(resolve => {
            this.menuBuilderManagerService.deleteMenuById(menuId, (data) => {
                resolve(data);
            })
        });
    }

    getProjectFlowCompById(flowCompId) {
        return new Promise(resolve => {
            this.flowManagerService.getProjectFlowCompById(flowCompId, (data) => {
                data.body.body.map(({ name, connector }) => {
                    if (name === 'GpExpressDao' || name === 'GpAngularService' || name === 'GpIonicAngularService') {
                        connector.map(id => {
                            this.deleteConnectorById(id)
                        })
                    }
                })
                resolve(data);
            })
        });
    }

}