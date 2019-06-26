import { Request, NextFunction } from 'express';
import { ProjectgenDao } from '../daos/projectgen.dao';
import { ProjectManagerService } from '../apiservices/ProjectManagerService';
import { ConfigurationManagerService } from '../apiservices/ConfigurationManagerService';
import { CodeGenManagerService } from '../apiservices/CodeGenManagerService';

export class ProjectgenService {

    private projectgenDao: ProjectgenDao = new ProjectgenDao()
    private projectManagerService: ProjectManagerService = new ProjectManagerService();
    private configManagerService: ConfigurationManagerService = new ConfigurationManagerService();
    private codeGenManagerService: CodeGenManagerService = new CodeGenManagerService();

    private projectObj: any = {
        name: '',
        description: '',
        defaultHumanLanguage: '',
        otherHumanLanguage: '',
        projectGenerationPath: '',
        templateLocation: {
            frontendTemplate: '',
            backendTemplate: '',
            mongoTemplate: '',
            authTemplatePath: ''
        },
        clientLanguage: {},
        clientFramework: {},
        serverLanguage: {},
        serverFramework: {},
        serverDatabase: {},
        deploymentTarget: {},
        deploymentType: {}
    }

    public saveProjectgen(req: Request, callback: CallableFunction) {
        const projectgen = req.body;
        this.projectgenDao.saveProjectgen(projectgen, (response) => {
            callback(response);
            // if(response.status==="gen_requested"){
            //     this.startGenerate(response);
            // }
        })
    }

    public getProjectgenByProjectId(req: Request, next: NextFunction, callback: CallableFunction) {
        this.projectgenDao.getProjectgenByProjectId(req, next, (projectgen) => {
            callback(projectgen);
        })
    }

    public getProjectgenByUserId(req: Request, next: NextFunction, callback: CallableFunction) {
        this.projectgenDao.getProjectgenByUserId(req, next, (projectgen) => {
            callback(projectgen);
        })
    }


    public getAllProjectgen(req: Request, callback: CallableFunction) {
        this.projectgenDao.getAllProjectgen(req, (projectgen) => {
            callback(projectgen);
        })
    }

    public getProjectgenByID(req: Request, next: NextFunction, callback: CallableFunction) {
        this.projectgenDao.getProjectgenByID(req, next, (projectgen) => {
            callback(projectgen);
        })
    }

    public deleteProjectgen(req: Request, next: NextFunction, callback: CallableFunction) {
        const projectgenID = req.params.id;
        this.projectgenDao.deleteProjectgen(projectgenID, next, (response) => {
            callback(response);
        })
    }

    public updateProjectgen(req: Request, next: NextFunction, callback: CallableFunction) {
        this.projectgenDao.updateProjectgen(req, next, (response) => {
            callback(response);
        })
    }

    public createProjectGen(req: Request, next: NextFunction, callback: CallableFunction) {
        const projectId = req.params.id;

        this.projectManagerService.getProjectById(projectId, (projectResponse) => {
            console.log('####### project response ----- ', projectResponse);

            const projectInfo = JSON.parse(projectResponse);
            if (projectInfo.body === null) {
                callback('sorry the project is not available')
            } else {
                console.log('i am the prblm', projectInfo);
                console.log('i am the prblm%%%% body ', projectInfo.body);
                this.projectObj.name = projectInfo.body.name;
                this.projectObj.description = projectInfo.body.description;
                this.projectObj.defaultHumanLanguage = projectInfo.body.default_human_language;
                this.projectObj.otherHumanLanguage = projectInfo.body.other_human_languages;
                this.setTechnicalField(projectInfo);

                this.configManagerService.getAllDetails((configResponse) => {
                    // console.log('i am the one u r need', configResponse);
                    const configInfo = JSON.parse(configResponse);
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  ", configInfo, '  lenghtt   ', configInfo.body.length);
                    if (configInfo.body !== null && configInfo.body.length > 0 && configInfo.body !== undefined) {
                        console.log("@@@@@@@@@@@@@ entering into info condition ------------ ")
                        this.setConfigurationField(configInfo);
                        console.log('project object are -22222---- ', this.projectObj);

                    }
                    this.codeGenManagerService.createProjectCode(projectId, this.projectObj, (codeResponse) => {
                        console.log('hello i need this', codeResponse);
                        callback('code generated');
                    })
                })
            }

        })
    }

    setTechnicalField(projectInfo) {
        this.projectObj.clientLanguage = projectInfo.body.clientlanguage;
        this.projectObj.clientFramework = projectInfo.body.clientframework;
        this.projectObj.serverLanguage = projectInfo.body.serverlanguage;
        this.projectObj.serverFramework = projectInfo.body.serverframework;
        this.projectObj.serverDatabase = projectInfo.body.serverdatabase;
        this.projectObj.deploymentTarget = projectInfo.body.servertarget;
        this.projectObj.deploymentType = projectInfo.body.server_deployment_type;

        // if (projectInfo.clientlanguage !== null && projectInfo.clientlanguage.label !== null) {
        //     this.projectObj.clientLanguage = projectInfo.clientlanguage.label;
        // }
        // if (projectInfo.clientframework !== null && projectInfo.clientframework.label !== null) {
        //     this.projectObj.clientFramework = projectInfo.clientframework.label;
        // }
        // if (projectInfo.serverlanguage !== null && projectInfo.serverlanguage.label !== null) {
        //     this.projectObj.serverLanguage = projectInfo.serverlanguage.label;
        // }
        // if (projectInfo.serverframework !== null && projectInfo.serverframework.label !== null) {
        //     this.projectObj.serverFramework = projectInfo.serverframework.label;
        // }
        // if (projectInfo.serverdatabase !== null && projectInfo.serverdatabase.label !== null) {
        //     this.projectObj.serverDatabase = projectInfo.serverdatabase.label;
        // }
        // if (projectInfo.servertarget !== null && projectInfo.servertarget.label !== null) {
        //     this.projectObj.deploymentTarget = projectInfo.servertarget.label;
        // }
        // if (projectInfo.server_deployment_type !== null && projectInfo.server_deployment_type.label !== null) {
        //     this.projectObj.deploymentType = projectInfo.server_deployment_type.label;
        // }
    }

    setConfigurationField(configInfo) {
        // project generation path
        const projectPath = configInfo.body.find(x =>
            x.name.toString().toLowerCase() === 'projectgenerationdirectory'
        );
        this.projectObj.projectGenerationPath = projectPath.value;

        // frontend template location
        const frontendPath = configInfo.body.find(x =>
            x.name.toString().toLowerCase() === 'frontendtemplatelocation'
        );
        this.projectObj.templateLocation.frontendTemplate = frontendPath.value;

        // backend template location
        const backendPath = configInfo.body.find(x =>
            x.name.toString().toLowerCase() === 'backendtemplatelocation'
        );
        this.projectObj.templateLocation.backendTemplate = backendPath.value;

        // mongo template location
        const mongoTemplatePath = configInfo.body.find(x =>
            x.name.toString().toLowerCase() === 'mongotemplatelocation'
        );
        this.projectObj.templateLocation.mongoTemplate = mongoTemplatePath.value;

        // auth template location
        const authPath = configInfo.body.find(x =>
            x.name.toString().toLowerCase() === 'authgenerationdirectory'
        );
        this.projectObj.authTemplatePath = authPath.value;
        // const frontendSourcePath = configInfo.find(x =>
        //     x.name.toString().toLowerCase() === 'frontendtemplatelocation'
        // );
        // const frontendDestPath = configInfo.find(x =>
        //     x.name.toString().toLowerCase() === 'frontendgenerationdirectory');
        // const backendSourcePath = configInfo.find(x =>
        //     x.name.toString().toLowerCase() === 'backendtemplatelocation');
        // const backendDestPath = configInfo.find(x =>
        //     x.name.toString().toLowerCase() === 'backendgenerationdirectory');
        // this.projectObj.frontEndPath.source = frontendSourcePath.value;
        // this.projectObj.frontEndPath.destination = frontendDestPath.value;
        // this.projectObj.backEndPath.source = backendSourcePath.value;
        // this.projectObj.backEndPath.destination = backendDestPath.value;
    }

}