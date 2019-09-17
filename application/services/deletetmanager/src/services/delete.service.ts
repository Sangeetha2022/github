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


    public async deleteProjectFlow(req: Request, callback) {
        const projectId = req.params.id;
        await this.deleteProject(projectId);
        await this.getFeatureByProjectId(projectId);
        this.deleteFeature(projectId);
        this.deleteMenu(projectId);
        this.deleteEntity(projectId);
        this.deleteScreen(projectId);
        callback({ message: 'Successfully deleted records connected with project!' })
    }

    deleteFeature(projectId) {
        return new Promise(resolve => {
            this.featureManagerService.deleteProjectFeature(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteMenu(projectId) {
        return new Promise(resolve => {
            this.menuBuilderManagerService.deleteProjectMenu(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteScreen(projectId) {
        return new Promise(resolve => {
            this.screenManagerService.deleteProjectScreen(projectId, (data) => {
                resolve(data);
            })
        });
    }

    deleteEntity(projectId) {
        return new Promise(resolve => {
            this.entityManagerService.deleteProjectEntity(projectId, (data) => {
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

    getProjectFlowById(flowId) {
        return new Promise(resolve => {
            this.flowManagerService.getProjectFlowById(flowId, (data) => {
                data.body.body.map(({ components }) => {
                    components.map(async component => {
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

    deleteProjectFlowCompById(flowCompId) {
        return new Promise(resolve => {
            this.flowManagerService.deleteProjectFlowComponent(flowCompId, (data) => {
                resolve(data);
            })
        });
    }

}