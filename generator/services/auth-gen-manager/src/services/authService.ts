import { Request } from 'express'
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as makeDir from 'make-dir';
import { MenuBuilderService, EntityMicroService } from '../apiservices/index';
import { ScreenWorker } from '../worker/ScreenWorker';
import { ModelWorker } from '../worker/ModelWorker';
import { CamundaWorker } from '../worker/CamundaWorker';
import { GcamWorker } from '../worker/gcamWorker';
import { DmnWorkerFile } from '../worker/DMNWorker';
import { Routes } from '../../template/route.json';
import { Common } from '../config/Common';
import { AuthProxyWorker } from '../worker/authProxyWorker'
import { resolve } from 'dns';
import * as ncp from 'ncp';


export class AuthService {

    private authGenFiles: any = {
        projectpath: '',
        projectId: '',
        pathFile: '',
        folder: '',
        templatepath: '',
        proxyFolder: '',
        camundaFolder: '',
         gcamFolder:'',
         securityPath: '',
        authProxyPath: '',
         gcamPath:'',
         systemCredsManagerPath: '',
         systemCredsManagerFolder: '',
        camundaPath: '',
        apigatewaypath: '',
        FrontendLogin: '',
        Logingenerated: '',
    }
    private menubuilder = new MenuBuilderService();
    private entityservice = new EntityMicroService();
    private camundaworker = new CamundaWorker();
    private gcamworker = new GcamWorker();
    private dmnworker = new DmnWorkerFile();
    private workernode = new ScreenWorker();
    private modelworker = new ModelWorker();
    private authProxyConfig = new AuthProxyWorker();
     private projectName = '';
     private sourcePath: any;
    private ports = {
        security: 8003,
        camunda: 8002,
        authProxy: 8001,
        system_credential: 8005,
        gcam: 8007,
    }
    // templateName
    private SERVER_TEMPLATENAME = 'server_file';

    // fileName
    private SERVER_FILENAME = 'server';

    //folderName
    private CAMUNDA_FOLDERNAME = 'camunda';
    private AUTH_PROXY_FOLDERNAME = 'Auth-Proxy';
    private SECURITY_FOLDERNAME = 'securitymanager';
    private SYSTEM_CREDENTIAL_MANAGER = 'systemcredentialmanager';
    private GCAM_FOLDERNAME = 'gcam';

    public async auth(req: Request, callback) {
         console.log('path ---- >>>', req.query.projectName);
        this.sourcePath = this.authGenFiles.projectpath = req.query.projectPath;
        this.authGenFiles.templatepath = req.query.authTemplate;
         this.authGenFiles.pathFile = req.query.authPath;
        this.authGenFiles.projectId = req.query.projectID;
        if (req.query.projectName) {
            console.log("req.query.projectName--->",req.query.projectName);
            (req.query.projectName as string).split(" ").forEach((element, index) => {
                if (index === 0) {
                    this.projectName = element;
                    console.log("this.projectName",this.projectName);
                } else {
                    this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
                    console.log(" this.projectName ", this.projectName );
                }
            })
        }
        await Common.createFolders(this.authGenFiles.projectpath);
        if (this.sourcePath) {
            console.log("this.sourcePath",this.sourcePath);
            if (!fs.existsSync(this.sourcePath)) {
                console.log('createfolder--->', this.sourcePath);
                fs.mkdirSync(this.sourcePath);
            }
        }

        this.authGenFiles.gcamPath = `${this.authGenFiles.pathFile}/${this.GCAM_FOLDERNAME}`;
        this.authGenFiles.securityPath = `${this.authGenFiles.pathFile}/${this.SECURITY_FOLDERNAME}`;
        this.authGenFiles.authProxyPath = `${this.authGenFiles.pathFile}/${this.AUTH_PROXY_FOLDERNAME}`;
        this.authGenFiles.camundaPath = `${this.authGenFiles.pathFile}/${this.CAMUNDA_FOLDERNAME}`;
        this.authGenFiles.systemCredsManagerPath = `${this.authGenFiles.pathFile}/${this.SYSTEM_CREDENTIAL_MANAGER}`;
        this.authGenFiles.folder = this.sourcePath + `/${this.SECURITY_FOLDERNAME}`;
        this.authGenFiles.proxyFolder = this.sourcePath + `/authproxy`;
        this.authGenFiles.camundaFolder = this.sourcePath + `/${this.CAMUNDA_FOLDERNAME}`;
        this.authGenFiles.systemCredsManagerFolder = this.sourcePath + `/${this.SYSTEM_CREDENTIAL_MANAGER}`;
        this.authGenFiles.gcamFolder = this.sourcePath + `/${this.GCAM_FOLDERNAME}`

        console.log(" this.authGenFiles.pathFile", this.authGenFiles.pathFile);
        console.log(" this.authGenFiles.authProxyPath", this.authGenFiles.authProxyPath);
        console.log(" this.authGenFiles.securityPath", this.authGenFiles.securityPath);
        console.log(" this.authGenFiles.pathFile", this.authGenFiles.pathFile);
        console.log(" this.authGenFiles.camundaPath", this.authGenFiles.camundaPath);
        console.log("  this.authGenFiles.systemCredsManagerPath",  this.authGenFiles.systemCredsManagerPath);
     

        if (this.authGenFiles) {

            if (this.authGenFiles.securityPath) {
                this.createFolder();
                this.securityManagerService(callback)
            }
            if (this.authGenFiles.authProxyPath) {
                this.createFolder();
                this.authProxyService(callback);
            }
            if (this.authGenFiles.camundaPath) {
                this.createFolder();
                this.camundaService(callback)
            }
            if(this.authGenFiles.systemCredsManagerPath) {
                this.createFolder();
                console.log("----->",this.credentialManagerService);
                this.credentialManagerService(callback);
            }
            if (this.authGenFiles.gcamPath) {
                this.createFolder();
                this.gcamService(callback)
            }
            
        }
    }

    createFolder() {
        if (this.authGenFiles.authProxyPath) {
            if (!fs.existsSync(this.authGenFiles.proxyFolder)) {
                fs.mkdirSync(this.authGenFiles.proxyFolder);
            }
        }
        if (this.authGenFiles.securityPath) {
            if (!fs.existsSync(this.authGenFiles.folder)) {
                fs.mkdirSync(this.authGenFiles.folder);
            }
        } if (this.authGenFiles.camundaPath) {
            if (!fs.existsSync(this.authGenFiles.camundaFolder)) {
                fs.mkdirSync(this.authGenFiles.camundaFolder);
            }
        }
        if (this.authGenFiles.apigatewaypath) {
            if (!fs.existsSync(this.authGenFiles.apigatewayfolder)) {
                fs.mkdirSync(this.authGenFiles.apigatewayfolder);
            }
        }
        if (this.authGenFiles.systemCredsManagerPath) {
            if (!fs.existsSync(this.authGenFiles.systemCredsManagerFolder)) {
                fs.mkdirSync(this.authGenFiles.systemCredsManagerFolder);
            }
        }
        if (this.authGenFiles.gcamPath) {
            if (!fs.existsSync(this.authGenFiles.gcamFolder)) {
                fs.mkdirSync(this.authGenFiles.gcamFolder);
            }
        }
    }

    // System Credential Manager
    public async credentialManagerService(callback) {
        console.log("scm",this.authGenFiles.systemCredsManagerPath);
        console.log("scm",this.authGenFiles.systemCredsManagerFolder);
        ncp.limit = 16;
        ncp(this.authGenFiles.systemCredsManagerPath, this.authGenFiles.systemCredsManagerFolder, { clobber: false }, (err) => {
            console.log("path---->",this.authGenFiles.systemCredsManagerPath);
            console.log("path---->",this.authGenFiles.systemCredsManagerFolder);
            if (err) {
                console.error('---error occured in the ncp of system credential feature----', err);
            }
            const temp = {
                port: this.ports.system_credential,
                projectName: this.projectName.toLowerCase(),
                databaseName: this.projectName.toLowerCase(),
                isDmnFile: false,
                isSeed: false
            }
            console.log('system credential generation folder are ------before authProxyPath---------   ', this.authGenFiles);
            this.generateServerFile(`${this.authGenFiles.systemCredsManagerFolder}/src`, this.authGenFiles.templatepath,
                this.SERVER_TEMPLATENAME, this.SERVER_FILENAME, temp);
            console.log('code added.....');
        });
    }

    // AuthProxy
    public async authProxyService(callback) {

        await fs.readdirSync(`${this.authGenFiles.authProxyPath}`).forEach((file) => {

            if (file === 'package.json') {

                fs.readFile(`${this.authGenFiles.authProxyPath}/${file}`, 'utf8', (err, jsonFile) => {
                    fs.writeFile(this.authGenFiles.proxyFolder + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                fs.readFile(`${this.authGenFiles.authProxyPath}/${file}`, 'utf8', (err, tsFile) => {
                    fs.writeFile(this.authGenFiles.proxyFolder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            } else if (file === 'Dockerfile') {
                fs.readFile(`${this.authGenFiles.authProxyPath}/${file}`, 'utf8', (err, dockerFile) => {
                    fs.writeFile(this.authGenFiles.proxyFolder + `/Dockerfile`, dockerFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            }
            else if (file === 'src') {
                let src = this.authGenFiles.proxyFolder + `/src`
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.authProxyPath}/${file}`
                // @ts-ignore
                fs.readdirSync(srcFolder).find(x => {
                    if (x === 'controllers') {
                        let contoller = src + `/controllers`;
                        if (!fs.existsSync(contoller)) {
                            fs.mkdirSync(contoller);
                        }

                        fs.readFile(`${srcFolder}/${x}/ProxyController.ts`, 'utf8', (err, ProxyControllersFile) => {
                            fs.writeFile(contoller + `/ProxyController.ts`, ProxyControllersFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'routes') {
                        let route = src + `/routes`;
                        if (!fs.existsSync(route)) {
                            fs.mkdirSync(route);
                        }
                        fs.readFile(`${srcFolder}/${x}/routes.ts`, 'utf8', (err, routeFile) => {
                            fs.writeFile(route + `/routes.ts`, routeFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    } else if (x === 'services') {

                        let service = src + `/services`;
                        if (!fs.existsSync(service)) {
                            fs.mkdirSync(service);
                        }
                        fs.readFile(`${srcFolder}/${x}/Proxyservice.ts`, 'utf8', (err, Proxyservice) => {
                            fs.writeFile(service + `/Proxyservice.ts`, Proxyservice, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    } else if (x === 'dao') {
                        let dao = src + `/dao`;
                        if (!fs.existsSync(dao)) {
                            fs.mkdirSync(dao);
                        }
                        fs.readFile(`${srcFolder}/${x}/Proxydao.ts`, 'utf8', (err, Proxydao) => {
                            fs.writeFile(dao + `/Proxydao.ts`, Proxydao, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'model') {
                        let model = src + `/model`;
                        if (!fs.existsSync(model)) {
                            fs.mkdirSync(model);
                        }
                        fs.readFile(`${srcFolder}/${x}/Signin.ts`, 'utf8', (err, Signin) => {
                            fs.writeFile(model + `/Signin.ts`, Signin, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'config') {
                        let config = src + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/MongoConfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            if (mongoconfigFile) {
                                fs.writeFile(config + `/MongoConfig.ts`, mongoconfigFile, (err) => {
                                    if (err) {
                                        return (err)
                                    }
                                })
                            }
                        })
                        fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                            fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                return (err)
                            })
                        })
                        fs.readFile(`${srcFolder}/${x}/Logger.ts`, 'utf8', (err, flowloggerFile) => {
                            fs.writeFile(config + `/Logger.ts`, flowloggerFile, (err) => {
                                return (err)
                            })
                        })
                    }
                })
            }

        })
        const proxyConfigFile = await this.authConstants()

        const temp = {
            port: this.ports.authProxy,
            projectName: this.projectName.toLowerCase(),
            databaseName: this.projectName.toLowerCase(),
            isDmnFile: false,
            isSeed: false
        }
        console.log('authProxyPath generation folder are ------before authProxyPath---------   ', this.authGenFiles);
        this.generateServerFile(`${this.authGenFiles.proxyFolder}/src`, this.authGenFiles.templatepath,
            this.SERVER_TEMPLATENAME, this.SERVER_FILENAME, temp);
    }

    //security
    public async securityManagerService(callback) {
        const entitydetails = await this.getEntities();
        console.log('-----entitydetails----', this.authGenFiles.folder);
        await fs.readdirSync(`${this.authGenFiles.securityPath}`).forEach((file) => {
            if (file === 'package.json') {
                fs.readFile(`${this.authGenFiles.securityPath}/${file}`, 'utf8', (err, jsonFile) => {
                    fs.writeFile(this.authGenFiles.folder + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                fs.readFile(`${this.authGenFiles.securityPath}/${file}`, 'utf8', (err, tsFile) => {
                    console.log('-----tsconfig----', this.authGenFiles.folder);
                    fs.writeFile(this.authGenFiles.folder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            } else if (file === 'Dockerfile') {
                fs.readFile(`${this.authGenFiles.securityPath}/${file}`, 'utf8', (err, dockerFile) => {
                    fs.writeFile(this.authGenFiles.folder + `/Dockerfile`, dockerFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            }
            else if (file === 'src') {
                let securitysrc = this.authGenFiles.folder + `/src`
                if (!fs.existsSync(securitysrc)) {
                    fs.mkdirSync(securitysrc);
                }
                let srcFolder = `${this.authGenFiles.securityPath}/${file}`;
                // @ts-ignore
                fs.readdirSync(srcFolder).find(x => {
                    if (x === 'seed.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, seedFile) => {
                            console.log('-----seed----', securitysrc);
                            fs.writeFile(securitysrc + `/seed.ts`, seedFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    } else if (x === 'controllers') {
                        let controller = securitysrc + `/controllers`;
                        if (!fs.existsSync(controller)) {
                            fs.mkdirSync(controller);
                        }
                        console.log('-----controller----', controller);
                        fs.readFile(`${srcFolder}/${x}/Consentcontrollers.ts`, 'utf8', (err, ConsentcontrollersFile) => {
                            fs.writeFile(controller + `/Consentcontrollers.ts`, ConsentcontrollersFile, (err) => {
                                if (err) {
                                    return (err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Signincontrollers.ts`, 'utf8', (err, Signincontrollers) => {
                                        fs.writeFile(controller + `/Signincontrollers.ts`, Signincontrollers, (err) => {
                                            if (err) {
                                                return (err)
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    } else if (x === 'routes') {
                        let route = securitysrc + `/routes`;
                        if (!fs.existsSync(route)) {
                            fs.mkdirSync(route);
                        }
                        fs.readFile(`${srcFolder}/${x}/routes.ts`, 'utf8', (err, routeFile) => {
                            fs.writeFile(route + `/routes.ts`, routeFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    } else if (x === 'service') {
                        let service = securitysrc + `/service`;
                        if (!fs.existsSync(service)) {
                            fs.mkdirSync(service);
                        }
                        fs.readFile(`${srcFolder}/${x}/consentservice.ts`, 'utf8', (err, consentServiceFile) => {
                            fs.writeFile(service + `/consentservice.ts`, consentServiceFile, (err) => {
                                if (err) {
                                    return (err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Signinservice.ts`, 'utf8', (err, SigninserviceFile) => {
                                        fs.writeFile(service + `/Signinservice.ts`, SigninserviceFile, (err) => {
                                            return (err)
                                        })
                                    })
                                }
                            })

                        })
                    } else if (x === 'daos') {
                        let dao = securitysrc + `/daos`;
                        if (!fs.existsSync(dao)) {
                            fs.mkdirSync(dao);
                        }
                        fs.readFile(`${srcFolder}/${x}/ConsentDao.ts`, 'utf8', (err, consentDaoFile) => {
                            fs.writeFile(dao + `/ConsentDao.ts`, consentDaoFile, (err) => {
                                if (err) {
                                    return (err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/SigninDao.ts`, 'utf8', (err, SigninDaoFile) => {
                                        fs.writeFile(dao + `/SigninDao.ts`, SigninDaoFile, (err) => {
                                        })
                                    })
                                }
                            })
                        })
                    } else if (x === 'models') {
                        this.modelworker.createfile(entitydetails, this.authGenFiles.folder, this.authGenFiles.templatepath, (modeldata => {
                            // console.log('------workerdata----', modeldata);

                        }));
                        let model = securitysrc + `/models`;
                        if (!fs.existsSync(model)) {
                            fs.mkdirSync(model);
                        }
                        fs.readFile(`${srcFolder}/${x}/Role.ts`, 'utf8', (err, roleModelFile) => {
                            fs.writeFile(model + `/Role.ts`, roleModelFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'config') {
                        let config = securitysrc + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/Mongoconfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            if (mongoconfigFile) {
                                fs.writeFile(config + `/Mongoconfig.ts`, mongoconfigFile, (err) => {
                                    if (err) {
                                        return (err)
                                    }
                                })
                            }
                        })
                        fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                            fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                return (err)
                            })
                        })
                        fs.readFile(`${srcFolder}/${x}/Logger.ts`, 'utf8', (err, flowloggerFile) => {
                            fs.writeFile(config + `/Logger.ts`, flowloggerFile, (err) => {
                                return (err)
                            })
                        })
                    } else if (x === 'assets') {
                        let assets = securitysrc + `/assets`;
                        if (!fs.existsSync(assets)) {
                            fs.mkdirSync(assets);
                        }
                        fs.readFile(`${srcFolder}/${x}/role.ts`, 'utf8', (err, assetsFile) => {
                            fs.writeFile(assets + `/role.ts`, assetsFile, (err) => {
                                if (err) {

                                    return (err)
                                }
                            })
                        })
                    }
                })
            }
        })
        const temp = {
            port: this.ports.security,
            projectName: this.projectName.toLowerCase(),
            databaseName: this.projectName.toLowerCase(),
            isDmnFile: false,
            isSeed: true
        }
        console.log('security generation folder are ------before generate---------   ', this.authGenFiles);
        this.generateServerFile(`${this.authGenFiles.folder}/src`, this.authGenFiles.templatepath,
            this.SERVER_TEMPLATENAME, this.SERVER_FILENAME, temp);
    }

    //camunda
    public async camundaService(callback) {

        const screens = await this.getMenubuilder();
         console.log('-----screens-----', screens);
         console.log('ssss-------------');
        this.dmnworker.dmnTable(screens, this.authGenFiles.camundaFolder, this.authGenFiles.templatepath, (dmndata => {
            //  callback(dmndata);
        }));

        await fs.readdirSync(`${this.authGenFiles.camundaPath}`).forEach((file) => {

            if (file === 'package.json') {
                fs.readFile(`${this.authGenFiles.camundaPath}/${file}`, 'utf8', (err, jsonFile) => {
                    fs.writeFile(this.authGenFiles.camundaFolder + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                fs.readFile(`${this.authGenFiles.camundaPath}/${file}`, 'utf8', (err, tsFile) => {
                    fs.writeFile(this.authGenFiles.camundaFolder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            } else if (file === 'Dockerfile') {
                fs.readFile(`${this.authGenFiles.camundaPath}/${file}`, 'utf8', (err, dockerFile) => {
                    fs.writeFile(this.authGenFiles.camundaFolder + `/Dockerfile`, dockerFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            }
            else if (file === 'template') {
                var template = this.authGenFiles.camundaFolder + `/template`
                if (!fs.existsSync(template)) {
                    fs.mkdirSync(template);
                }
                fs.readFile(`${this.authGenFiles.camundaPath}/template/dmnfile.st`, 'utf8', (err, dmnfile) => {
                    fs.writeFile(template + `/dmnfile.st`, dmnfile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
                fs.readFile(`${this.authGenFiles.camundaPath}/template/dmnfile_stg.js`, 'utf8', (err, dmnfile_stg) => {
                    fs.writeFile(template + `/dmnfile_stg.js`, dmnfile_stg, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            }

            else if (file === 'src') {
                let src = this.authGenFiles.camundaFolder + `/src`
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.camundaPath}/${file}`
                // @ts-ignore
                fs.readdirSync(srcFolder).find(x => {
                    if (x === 'seed.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, seedFile) => {
                            fs.writeFile(src + `/seed.ts`, seedFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    } else if (x === 'controllers') {
                        let contoller = src + `/controllers`;
                        if (!fs.existsSync(contoller)) {
                            fs.mkdirSync(contoller);
                        }

                        fs.readFile(`${srcFolder}/${x}/Camundacontroller.ts`, 'utf8', (err, Camundacontroller) => {
                            fs.writeFile(contoller + `/Camundacontroller.ts`, Camundacontroller, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'routes') {
                        let route = src + `/routes`;
                        if (!fs.existsSync(route)) {
                            fs.mkdirSync(route);
                        }
                        fs.readFile(`${srcFolder}/${x}/routes.ts`, 'utf8', (err, routeFile) => {
                            fs.writeFile(route + `/routes.ts`, routeFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    } else if (x === 'services') {
                        let service = src + `/services`;
                        if (!fs.existsSync(service)) {
                            fs.mkdirSync(service);
                        }
                        fs.readFile(`${srcFolder}/${x}/Camundaservice.ts`, 'utf8', (err, Camundaservice) => {
                            fs.writeFile(service + `/Camundaservice.ts`, Camundaservice, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    }
                    else if (x === 'supportworker') {
                        let supportworker = src + `/supportworker`;
                        if (!fs.existsSync(supportworker)) {
                            fs.mkdirSync(supportworker);
                        }
                        fs.readFile(`${srcFolder}/${x}/DMNsupportWorker.ts`, 'utf8', (err, DMNsupportWorker) => {
                            fs.writeFile(supportworker + `/DMNsupportWorker.ts`, DMNsupportWorker, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    }
                    else if (x === 'worker') {
                        let worker = src + `/worker`;
                        if (!fs.existsSync(worker)) {
                            fs.mkdirSync(worker);
                        }
                        fs.readFile(`${srcFolder}/${x}/DMNWorker.ts`, 'utf8', (err, DMNWorker) => {
                            fs.writeFile(worker + `/DMNWorker.ts`, DMNWorker, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'model') {
                        let model = src + `/model`;
                        if (!fs.existsSync(model)) {
                            fs.mkdirSync(model);
                        }
                        fs.readFile(`${srcFolder}/${x}/resource.ts`, 'utf8', (err, resource) => {
                            fs.writeFile(model + `/resource.ts`, resource, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    }
                    else if (x === 'dao') {
                        let dao = src + `/dao`;
                        if (!fs.existsSync(dao)) {
                            fs.mkdirSync(dao);
                        }
                        fs.readFile(`${srcFolder}/${x}/Camundadao.ts`, 'utf8', (err, resource) => {
                            fs.writeFile(dao + `/Camundadao.ts`, resource, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'config') {
                        let config = src + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/Mongoconfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            if (mongoconfigFile) {
                                fs.writeFile(config + `/Mongoconfig.ts`, mongoconfigFile, (err) => {
                                    if (err) {
                                        return (err)
                                    }
                                })
                            }
                        })
                        fs.readFile(`${srcFolder}/${x}/camundaService.ts`, 'utf8', (err, camundaService) => {
                            fs.writeFile(config + `/camundaService.ts`, camundaService, (err) => {
                                return (err)
                            })
                        })
                        fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                            fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                return (err)
                            })
                        })
                        fs.readFile(`${srcFolder}/${x}/Logger.ts`, 'utf8', (err, flowloggerFile) => {
                            fs.writeFile(config + `/Logger.ts`, flowloggerFile, (err) => {
                                return (err)
                            })
                        })
                    } else if (x === 'dmnDeploye') {
                        let dmnfile = src + `/dmnDeploye`

                        if (!fs.existsSync(dmnfile)) {
                            fs.mkdirSync(dmnfile);
                        }

                        fs.readFile(`${srcFolder}/${x}/dmnFile.ts`, 'utf8', (err, dmnfilevalue) => {
                            fs.writeFile(dmnfile + `/dmnFile.ts`, dmnfilevalue, (err) => {
                                return (err)
                            })
                        })
                    }
                })
            }
        })

        this.workernode.createfile(screens, this.authGenFiles.camundaFolder, this.authGenFiles.templatepath, (data => {
             console.log('------workerdata----', data);
            return callback(Routes)
        }));

        const camundaServiceFile = await this.camundaConfig();

        const temp = {
            port: this.ports.camunda,
            projectName: this.projectName.toLowerCase(),
            databaseName: this.projectName.toLowerCase(),
            isDmnFile: true,
            isSeed: true
        }
        console.log('camunda generation folder are ------before generate---------   ', this.authGenFiles);
        this.generateServerFile(`${this.authGenFiles.camundaFolder}/src`, this.authGenFiles.templatepath,
            this.SERVER_TEMPLATENAME, this.SERVER_FILENAME, temp);
    }
    public async gcamService(callback) {
        const screens = await this.getMenubuilder();
        console.log('-----screens-----', screens);

        ncp.limit = 16;
        console.log("gcamService--->",this.authGenFiles. gcamPath)
        console.log("gcamService--->",this.authGenFiles. gcamFolder)
        ncp(this.authGenFiles.gcamPath, this.authGenFiles.gcamFolder, { clobber: false }, (err) => {
            console.log("gcam-->",this.authGenFiles. gcamPath);
            console.log("gcam-->",this.authGenFiles.gcamFolder);
            if (err) {
                console.error('---error occured in the ncp of gcam----', err);
            }

            this.workernode.createfile(screens, this.authGenFiles.gcamFolder, this.authGenFiles.templatepath, (data => {
                console.log('------workerdata----', data);
               //return callback(Routes)
            }));

            const gcamServiceFile =  this.gcamConfig();
            
            const temp = {
                port: this.ports.gcam,
                projectName: this.projectName.toLowerCase(),
                databaseName: this.projectName.toLowerCase(),
                isDmnFile: false,
                isSeed: true
            }
            console.log('gcam generation folder are ------before authProxyPath---------   ', this.authGenFiles);
             this.generateServerFile(`${this.authGenFiles.gcamFolder}/src`, this.authGenFiles.templatepath,
                 this.SERVER_TEMPLATENAME, this.SERVER_FILENAME, temp);
            console.log('code added.....');
        });
    }
    async generateServerFile(applicationPath, templatePath, templateName, fileName, information) {
        console.log('generateServerfile are ----- ', applicationPath, ' --templatePath---  ', templatePath, ' --fileName-- ', fileName, ' --information-- ', information)
        templatePath = path.resolve(__dirname, templatePath);
        await Common.createFolders(applicationPath);
        let renderTemplate = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        console.log('`/${templateName}_stg',`/${templateName}_stg`);
        console.log('templatePath',`/${templatePath}_stg`);
        let fileData = renderTemplate.render(templateName, [information]);
        await fs.writeFile(applicationPath + `/${fileName}.ts`, fileData, function (err) {
            if (err) throw err;
            console.log(`${fileName}.ts has been generated`)
        })
    }
    getMenubuilder() {
        return new Promise(resolve => {
            this.menubuilder.Menubuilder(this.authGenFiles.projectId, (data) => {
                // console.log('-------authdata-----', data);
                resolve(data);
            });

        });
    }
    getEntities() {
        return new Promise(entitymodel => {
            this.entityservice.Entityservice(this.authGenFiles.projectId, (entityvalue) => {
                console.log('------enititiesdata------', entityvalue);
                entitymodel(entityvalue);
            })
        })
    }

    authConstants() {
        return new Promise(resolve => {
            this.authProxyConfig.proxyConfig(this.authGenFiles.templatepath, this.authGenFiles.proxyFolder, this.projectName, (data) => {
                resolve(data);
            })
        })
    }

    camundaConfig() {
        return new Promise(resolve => {
            this.camundaworker.createConfig(this.authGenFiles.camundaFolder, this.authGenFiles.templatepath, this.projectName, (configdata => {
                resolve(configdata)
            }));

        })

    }
   gcamConfig() {
        return new Promise(resolve => {
            this.gcamworker.createConfig(this.authGenFiles.camundaFolder, this.authGenFiles.templatepath, this.projectName, (configdata => {
                resolve(configdata)
            }));

        })

    }
    
}