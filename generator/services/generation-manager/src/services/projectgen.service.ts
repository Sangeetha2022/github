import { Request, NextFunction } from 'express';
import { ProjectgenDao } from '../daos/projectgen.dao';
import { ProjectManagerService } from '../apiservices/ProjectManagerService';
import { ConfigurationManagerService } from '../apiservices/ConfigurationManagerService';

let projectgenDao = new ProjectgenDao()
let projectManagerService = new ProjectManagerService();
let configManagerService = new ConfigurationManagerService();

export class ProjectgenService {

    private projectObj: any = {
        name: '',
        description: '',
        defaultHumanLanguage: '',
        otherHumanLanguage: '',
        frontEndPath: {
            source: '',
            destination: ''
        },
        backEndPath: {
            source: '',
            destination: ''
        },
        clientLanguage: '',
        clientFramework: '',
        serverLanguage: '',
        serverFramework: '',
        serverDatabase: '',
        deploymentTarget: '',
        deploymentType: ''
    }

    public saveProjectgen(req: Request, callback: CallableFunction) {
        const projectgen = req.body;
        projectgenDao.saveProjectgen(projectgen, (response) => {
            callback(response);
            // if(response.status==="gen_requested"){
            //     this.startGenerate(response);
            // }
        })
    }

    public getProjectgenByProjectId(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.getProjectgenByProjectId(req, next, (projectgen) => {
            callback(projectgen);
        })
    }

    public getProjectgenByUserId(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.getProjectgenByUserId(req, next, (projectgen) => {
            callback(projectgen);
        })
    }


    public getAllProjectgen(req: Request, callback: CallableFunction) {
        projectgenDao.getAllProjectgen(req, (projectgen) => {
            callback(projectgen);
        })
    }

    public getProjectgenByID(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.getProjectgenByID(req, next, (projectgen) => {
            callback(projectgen);
        })
    }

    public deleteProjectgen(req: Request, next: NextFunction, callback: CallableFunction) {
        const projectgenID = req.params.id;
        projectgenDao.deleteProjectgen(projectgenID, next, (response) => {
            callback(response);
        })
    }

    public updateProjectgen(req: Request, next: NextFunction, callback: CallableFunction) {
        projectgenDao.updateProjectgen(req, next, (response) => {
            callback(response);
        })
    }

    public createProjectGen(req: Request, next: NextFunction, callback: CallableFunction) {
        const projectId = req.params.id;

        projectManagerService.getProjectById(projectId, (projectResponse) => {
            //   console.log('project response ----- ', projectResponse);
            const projectInfo = JSON.parse(projectResponse);
            this.projectObj.name = projectInfo.name;
            this.projectObj.description = projectInfo.description;
            this.projectObj.defaultHumanLanguage = projectInfo.default_human_language;
            this.projectObj.otherHumanLanguage = projectInfo.other_human_languages;
            this.setTechnicalField(projectInfo);
            configManagerService.getAllDetails((configResponse) => {
                const configInfo = JSON.parse(configResponse);
                if (configInfo !== null && configInfo.length > 0 && configInfo !== undefined) {
                    this.setConfigurationField(configInfo);
                    console.log('project object are -22222---- ', this.projectObj);
                }
            })
        })
    }

    setTechnicalField(projectInfo) {
        if (projectInfo.clientlanguage !== null && projectInfo.clientlanguage.label !== null) {
            this.projectObj.clientLanguage = projectInfo.clientlanguage.label;
        }
        if (projectInfo.clientframework !== null && projectInfo.clientframework.label !== null) {
            this.projectObj.clientFramework = projectInfo.clientframework.label;
        }
        if (projectInfo.serverlanguage !== null && projectInfo.serverlanguage.label !== null) {
            this.projectObj.serverLanguage = projectInfo.serverlanguage.label;
        }
        if (projectInfo.serverframework !== null && projectInfo.serverframework.label !== null) {
            this.projectObj.serverFramework = projectInfo.serverframework.label;
        }
        if (projectInfo.serverdatabase !== null && projectInfo.serverdatabase.label !== null) {
            this.projectObj.serverDatabase = projectInfo.serverdatabase.label;
        }
        if (projectInfo.servertarget !== null && projectInfo.servertarget.label !== null) {
            this.projectObj.deploymentTarget = projectInfo.servertarget.label;
        }
        if (projectInfo.server_deployment_type !== null && projectInfo.server_deployment_type.label !== null) {
            this.projectObj.deploymentType = projectInfo.server_deployment_type.label;
        }
    }

    setConfigurationField(configInfo) {
        const frontendSourcePath = configInfo.find(x =>
            x.name.toString().toLowerCase() === 'frontendtemplatelocation'
        );
        const frontendDestPath = configInfo.find(x =>
            x.name.toString().toLowerCase() === 'frontendgenerationdirectory');
        const backendSourcePath = configInfo.find(x =>
            x.name.toString().toLowerCase() === 'backendtemplatelocation');
        const backendDestPath = configInfo.find(x =>
            x.name.toString().toLowerCase() === 'backendgenerationdirectory');
        this.projectObj.frontEndPath.source = frontendSourcePath.value;
        this.projectObj.frontEndPath.destination = frontendDestPath.value;
        this.projectObj.backEndPath.source = backendSourcePath.value;
        this.projectObj.backEndPath.destination = backendDestPath.value;
    }

}