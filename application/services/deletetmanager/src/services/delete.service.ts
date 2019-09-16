import { Request } from 'express';
import {
    FeatureManagerService,
    MenuBuilderManagerService,
    EntityManagerService,
    ScreenManagerService,
    ProjectManagerService

} from '../apiservices/index';


export class DeleteService {

    private featureManagerService = new FeatureManagerService();
    private menuBuilderManagerService = new MenuBuilderManagerService();
    private entityManagerService = new EntityManagerService();
    private screenManagerService = new ScreenManagerService();
    private projectManagerService = new ProjectManagerService();


    public deleteProjectFlow(req: Request, callback) {
        const projectId = req.params.id;
        this.deleteFeature(projectId);
        this.deleteMenu(projectId);
        this.deleteEntity(projectId);
        this.deleteScreen(projectId);
        this.deleteProject(projectId);
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

}