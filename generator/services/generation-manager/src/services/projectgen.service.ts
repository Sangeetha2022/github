import { Request, NextFunction } from 'express';
import { ProjectgenDao } from '../daos/projectgen.dao';
import { ProjectManagerService } from '../apiservices/ProjectManagerService';
import { ConfigurationManagerService } from '../apiservices/ConfigurationManagerService';
import { CodeGenManagerService } from '../apiservices/CodeGenManagerService';
import { InfraStructureManagerService } from '../apiservices/InfrastructureManagerService';
import { GithubManagerService } from '../apiservices/GithubManagerService';
import { DeploymentManagerService } from '../apiservices/DeploymentManagerService';
import {PrivateGithubManagerService} from '../apiservices/PrivateGithubManagerService'
export class ProjectgenService {

    private projectgenDao: ProjectgenDao = new ProjectgenDao()
    private projectManagerService: ProjectManagerService = new ProjectManagerService();
    private configManagerService: ConfigurationManagerService = new ConfigurationManagerService();
    private codeGenManagerService: CodeGenManagerService = new CodeGenManagerService();
    private githubService = new GithubManagerService();
    private infraStructureManagerService: InfraStructureManagerService = new InfraStructureManagerService();
    private deploymentManagerService: DeploymentManagerService = new DeploymentManagerService();
    private privategithubservice: PrivateGithubManagerService = new PrivateGithubManagerService();
    private projectObj: any = {
        id:  '',
        name: '',
        description: '',
        defaultHumanLanguage: '',
        otherHumanLanguage: '',
        projectGenerationPath: '',
        projectTemplatename: '',
        templateLocation: {
            frontendTemplate: '',
            backendTemplate: '',
            mongoTemplate: '',
            authTemplatePath: '',
            authorizationTempPath: '',
            adminManagerTemplatePath: ''
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

        try {
            this.projectManagerService.getProjectById(projectId, (projectResponse) => {
                console.log('####### project response ----- ', projectResponse);

                const projectInfo = JSON.parse(projectResponse);
                if (projectInfo.body === null) {
                    callback('sorry the project is not available')
                } else {
                    console.log('i am the prblm', projectInfo);
                    console.log('i am the prblm%%%% body ', projectInfo.body);
                    this.projectObj.name = projectInfo.body.name;
                    this.projectObj.id = projectInfo.body._id;
                    this.projectObj.project_unique_id = projectInfo.body.project_unique_id;
                    this.projectObj.projectTemplatename = projectInfo.body.app_ui_template;
                    this.projectObj.description = projectInfo.body.description;
                    this.projectObj.defaultHumanLanguage = projectInfo.body.default_human_language;
                    this.projectObj.otherHumanLanguage = projectInfo.body.other_human_languages;
                    this.setTechnicalField(projectInfo);

                    this.configManagerService.getAllDetails((configResponse) => {
                        const configInfo = JSON.parse(configResponse);
                        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  ", configInfo, '  lenghtt   ');
                        if (configInfo.error) {
                            callback('Something went wrong in configuration manager', 400);
                        } else if (configInfo.body !== null && configInfo.body.length > 0 && configInfo.body !== undefined) {
                            console.log("@@@@@@@@@@@@@ entering into info condition ------------ ")
                            this.setConfigurationField(configInfo.body);
                            console.log('project object are -22222---- ', this.projectObj);

                        }
                        this.codeGenManagerService.createProjectCode(projectId, this.projectObj, (codeResponse) => {
                            console.log('hello i need this', codeResponse);
                            this.projectObj.app_db_pod = true;
                            this.projectObj.app_pod = true;
                            this.projectObj.system_entry_pod = true;
                            this.projectObj.telemetry_pod = { "vault": true, "EFK": false };
                            this.projectObj.dev_ops_db_pod = false;
                            this.projectObj.dev_ops_pod = false;
                            this.projectObj.customBackendList = codeResponse.body;
                            console.log("Going to the generateInfrastructure")
                            this.infraStructureManagerService.generateInfrastructure(projectId, this.projectObj, async (infraResponse) => {
                                this.deploymentManagerService.generateDeployment(projectId, this.projectObj, async (deploymentResponse) => {
                                console.log('Deployment Response', deploymentResponse);
                                console.log('Infra Response:', infraResponse);
                                const gitBody = {
                                    name: "",
                                    project_unique_id: "",
                                    description: "Generated by Geppetto",
                                    codeGenerationPath: "",
                                    homepage: "",
                                    private: false,
                                    has_issues: true,
                                    has_projects: true,
                                    has_wiki: true
                                }
                                gitBody.name = this.projectObj.name;
                                gitBody.project_unique_id = this.projectObj.project_unique_id;
                                gitBody.codeGenerationPath = `${this.projectObj.projectGenerationPath}/${this.projectObj.project_unique_id}`;
                                console.log("--------->>>>>>", this.projectObj.deploymentTarget.label)
                                if (this.projectObj.deploymentTarget.label == 'Local Machine') {
                                    await this.pushTogithub(projectId, gitBody).catch(err => {
                                        console.log('cannot able to push the code into github repo');
                                    });
                                } else {
                                    await this.pushToPrivategithub(projectId, gitBody).catch(err => {
                                        console.log('cannot able to push the code into private github repo');
                                    });
                                }
                                callback('code generation completed');
                                })
                            })
                        })
                        // try {
                        //     this.codeGenManagerService.createProjectCode(projectId, this.projectObj, (codeResponse) => {
                        //         console.log('hello i need this', codeResponse);
                        //         callback(codeResponse);
                        //     })
                        // } catch (err) {
                        //     console.log('errrin  generating the code in main are ----- ', err);
                        //     callback(err);
                        // }
                    })
                }

            })
        } catch (err) {
            console.log('errrin  generating the code in main are ----- ', err);
            callback(err);
        }
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

    setConfigurationField(configInformation) {
        console.log('setconfigfiled config ----->>  ', configInformation.length);
        // project generation path
        const projectPath = configInformation.find(x =>
            x.name.toString().toLowerCase() === 'projectgenerationdirectory'
        );
        this.projectObj.projectGenerationPath = projectPath.value;

        // frontend template location
        const frontendPath = configInformation.find(x =>
            x.name.toString().toLowerCase() === 'frontendtemplatelocation'
        );
        this.projectObj.templateLocation.frontendTemplate = frontendPath.value;

        // backend template location
        const backendPath = configInformation.find(x =>
            x.name.toString().toLowerCase() === 'backendtemplatelocation'
        );
        this.projectObj.templateLocation.backendTemplate = backendPath.value;

        // mongo template location
        const mongoTemplatePath = configInformation.find(x =>
            x.name.toString().toLowerCase() === 'mongotemplatelocation'
        );
        this.projectObj.templateLocation.mongoTemplate = mongoTemplatePath.value;
        console.log('project object in generation application ------>>>>   ', this.projectObj);
        // auth template location
        const authPath = configInformation.find(x =>
            x.name.toString().toLowerCase() === 'authgenerationdirectory'
        );
        console.log('project object in generation application --2222---->>>>   ', authPath);
        this.projectObj.templateLocation.authTemplatePath = authPath.value;

        // authorization Template location
        const authorizationPath = configInformation.find(x =>
            x.name.toString().toLowerCase() === 'authorizationdirectory'
        );
        console.log('project object in generation application --677787---->>>>   ', authorizationPath);
        this.projectObj.templateLocation.authorizationTempPath = authorizationPath.value;
        console.log('project object in generation application --99999999999---->>>>   ', authPath);
        console.log('project object in generation application --3333---->>>>   ', this.projectObj);

        // Seed path for the Admin Manager
        const adminManagerSeedPath = configInformation.find(x =>
            x.name.toString().toLowerCase() === 'adminmanagerseeddirectory'
        );
        console.log('project object in admin application --kishan---->>>>   ', adminManagerSeedPath);
        this.projectObj.templateLocation.adminManagerTemplatePath = adminManagerSeedPath.value;
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

    pushTogithub(projectId, gitBody) {
        return new Promise(resolve => {
            console.log("codegen service-------->", projectId)
            console.log("gitBody------->", gitBody)
            this.githubService.pushProject(projectId, gitBody, (data) => {
                resolve(data);
            })
        });
    }
    pushToPrivategithub(projectId, gitBody) {
        return new Promise(resolve => {
            console.log("codegen service-------->", projectId)
            console.log("gitBody------->", gitBody)
            this.privategithubservice.pushProjectToPrivaterepo(projectId, gitBody, (data) => {
                resolve(data);
            })
        });
    }
}