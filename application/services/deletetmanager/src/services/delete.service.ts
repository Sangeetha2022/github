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
        await this.deleteProject(req, projectId);
        await this.getFeatureByProjectId(req, projectId);
        await this.getProjectEntity(req, projectId)
        this.deleteProjectFeature(req, projectId);
        this.deleteProjectMenu(req, projectId);
        this.deleteProjectEntity(req, projectId);
        this.deleteProjectScreen(req, projectId);
        callback({ message: 'Successfully deleted records connected with project!' })
    }


    public async deleteEntity(req: Request, callback) {
        const entityId = req.params.id;
        await this.deleteConnectorByEntityId(req, entityId)
        await this.deleteEntityById(req, entityId)
        callback({ message: 'Successfully deleted records connected with Entity!' });
    }


    public async deleteFeature(req: Request, callback) {
        const featureId = req.params.id;
        await this.getFeatureById(req, featureId);
        await this.getScreenByFeatureId(req, featureId);
        await this.deleteFeatureById(req, featureId)
        callback({ message: 'Successfully deleted records connected with Feature!' });
    }

    public async deleteMenu(req: Request, callback) {
        const menuId = req.params.id;
        this.deletetMenuById(req, menuId)
        callback({ message: 'Successfully deleted records connected with Menu!' });
    }

    public async deleteScreen(req: Request, callback) {
        const screenId = req.params.id;
        await this.getScreenById(req, screenId);
        await this.deleteScreenById(req, screenId);
        callback({ message: 'Successfully deleted records connected with Screen!' });
    }


    public async deleteFlow(req: Request, callback) {
        const flowId = req.params.id;
        await this.getProjectFlowById(req, flowId)
        await this.deleteProjectFlowById(req, flowId);
        callback({ message: 'Successfully deleted records connected with Screen!' });
    }

    deleteProjectFeature(req, projectId) {
        return new Promise(resolve => {
            this.featureManagerService.deleteProjectFeature(req, projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectMenu(req, projectId) {
        return new Promise(resolve => {
            this.menuBuilderManagerService.deleteProjectMenu(req, projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectScreen(req, projectId) {
        return new Promise(resolve => {
            this.screenManagerService.deleteProjectScreen(req, projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectEntity(req, projectId) {
        return new Promise(resolve => {
            this.entityManagerService.deleteProjectEntity(req, projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteEntityById(req, projectId) {
        return new Promise(resolve => {
            this.entityManagerService.deleteEntityById(req, projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProject(req, projectId) {
        return new Promise(resolve => {
            this.projectManagerService.deleteProjectById(req, projectId, (data) => {
                resolve(data);
            })
        });
    }


    getFeatureByProjectId(req, projectId) {
        return new Promise(resolve => {
            this.featureManagerService.getFeatureByProjectId(req, projectId, (data) => {
                data.body.body.map(({ flows }) => {
                    if (flows.length > 0) {
                        flows.map(async flowId => {
                            await this.getProjectFlowById(req, flowId);
                            await this.deleteProjectFlowById(req, flowId);
                        })
                    }
                })
                resolve(data);
            })
        });
    }

    getFeatureById(req, featureId) {
        return new Promise(resolve => {
            this.featureManagerService.getFeatureById(req, featureId, (data) => {
                if (data.body.body.flows.length > 0) {
                    data.body.body.flows.map(async flowId => {
                        await this.getProjectFlowById(req, flowId);
                        await this.deleteProjectFlowById(req, flowId);
                    })
                }
                if (data.body.body.entities.length > 0) {
                    data.body.body.entities.map(async ({ entityId }) => {
                        await this.deleteEntityById(req, entityId)
                    })
                }
                resolve(data);
            })
        });
    }

    getScreenByFeatureId(req, featureId) {
        return new Promise(resolve => {
            this.screenManagerService.getScreenByFeatureId(req, featureId, (data) => {
                data.body.body.map(async ({ _id }) => {
                    await this.deleteScreenById(req, _id);
                })
                resolve(data);
            })
        });
    }

    deleteFeatureById(req, featureId) {
        return new Promise(resolve => {
            this.featureManagerService.deleteFeatureById(req, featureId, (data) => {
                resolve(data);
            })
        });
    }

    getProjectEntity(req, projectId) {
        return new Promise(resolve => {
            this.entityManagerService.getProjectEntity(req, projectId, (data) => {
                data.body.body.map(async ({ _id, is_default }) => {
                    if (!is_default) {
                        await this.deleteConnectorByEntityId(req, _id);
                    }
                })
                resolve(data);
            })
        });
    }

    getProjectFlowById(req, flowId) {
        return new Promise(resolve => {
            this.flowManagerService.getProjectFlowById(req, flowId, (data) => {
                data.body.body.map(({ components }) => {
                    components.map(async component => {
                        await this.getProjectFlowCompById(req, component);
                        await this.deleteProjectFlowCompById(req, component)
                    })
                })
                resolve(data);
            })
        });
    }


    deleteProjectFlowById(req, flowId) {
        return new Promise(resolve => {
            this.flowManagerService.deleteProjectFlow(req, flowId, (data) => {
                resolve(data);
            })
        });
    }

    deleteConnectorById(req, id) {
        return new Promise(resolve => {
            this.flowManagerService.deleteConnectorById(req, id, (data) => {
                resolve(data);
            })
        });
    }

    deleteConnectorByEntityId(req, entityId) {
        return new Promise(resolve => {
            this.flowManagerService.deleteConnectorByEntityId(req, entityId, (data) => {
                resolve(data);
            })
        });
    }

    deleteProjectFlowCompById(req, flowCompId) {
        return new Promise(resolve => {
            this.flowManagerService.deleteProjectFlowComponent(req, flowCompId, (data) => {
                resolve(data);
            })
        });
    }


    deleteScreenById(req, screenId) {
        return new Promise(resolve => {
            this.screenManagerService.deletetScreenById(req, screenId, (data) => {
                resolve(data);
            })
        });
    }

    deletetMenuById(req, menuId) {
        return new Promise(resolve => {
            this.menuBuilderManagerService.deleteMenuById(req, menuId, (data) => {
                resolve(data);
            })
        });
    }

    getProjectFlowCompById(req, flowCompId) {
        return new Promise(resolve => {
            this.flowManagerService.getProjectFlowCompById(req, flowCompId, (data) => {
                data.body.body.map(({ name, connector }) => {
                    if (name === 'GpExpressDao' || name === 'GpAngularService' || name === 'GpIonicAngularService') {
                        connector.map(id => {
                            this.getConnectorById(req, id)
                            this.deleteConnectorById(req, id)
                        })
                    }
                })
                resolve(data);
            })
        });
    }


    getConnectorById(req, connectorId) {
        return new Promise(resolve => {
            this.flowManagerService.getConnectorById(req, connectorId, (data) => {
                this.deleteEntityById(req, data.body.body.entity_id)
                resolve(data);
            })
        });
    }

    getScreenById(req, screenId) {
        return new Promise(resolve => {
            this.screenManagerService.getScreenById(req, screenId, (data) => {
                data.body.body.map(({ feature }) => {
                    this.deleteFeatureById(req, feature)
                })
                resolve(data);
            })
        });
    }

}