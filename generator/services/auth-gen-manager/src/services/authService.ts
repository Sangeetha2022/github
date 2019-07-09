import { Request } from 'express'
import * as fs from 'fs';
import * as path from 'path';
import * as makeDir from 'make-dir';
import { MenuBuilderService, EntityMicroService } from '../apiservices/index';
import { ScreenWorker } from '../worker/ScreenWorker';
import { ModelWorker } from '../worker/ModelWorker';
import { CamundaWorker } from '../worker/CamundaWorker';
import { DmnWorkerFile } from '../worker/DMNWoker';
import { Routes } from '../assets/route.json';
import { Common } from '../config/Common';
export class AuthService {

    private authGenFiles: any = {
        projectpath: '',
        projectId: '',
        pathFile: '',
        folder: '',
        templatepath: '',
        proxyFolder: '',
        camundaFolder: '',
        securityPath: '',
        authProxyPath: '',
        camundaPath: '',
        apigatewaypath: '',
        FrontendLogin: '',
        Logingenerated: '',

    }
    private menubuilder = new MenuBuilderService();
    private entityservice = new EntityMicroService();
    private camundaworker = new CamundaWorker();
    private dmnworker = new DmnWorkerFile();
    private workernode = new ScreenWorker();
    private modelworker = new ModelWorker();
    private sourcePath: any;
    private frontendpath: any;

    public auth(req: Request, callback) {
        console.log('path ---- >>>', req.query.authTemplate);
        this.sourcePath = this.authGenFiles.projectpath = req.query.projectPath;
        this.authGenFiles.templatepath = req.query.authTemplate;
        this.authGenFiles.pathFile = req.query.authPath;
        this.authGenFiles.projectId = req.query.projectID;
        // this.sourcePath = path.resolve(`${this.authGenFiles.projectpath}/loginbackend`);
        Common.createFolders(this.authGenFiles.projectpath);
        this.frontendpath = path.resolve(`${this.authGenFiles.projectpath}/loginfrontend`);
        if (this.sourcePath) {
            if (!fs.existsSync(this.sourcePath)) {
                console.log('-----coming here for floder creation---', this.sourcePath);
                fs.mkdirSync(this.sourcePath);
            }
        }
        if (this.frontendpath) {
            if (!fs.existsSync(this.frontendpath)) {
                console.log('-----coming here for floder creation---', this.frontendpath);
                fs.mkdirSync(this.frontendpath);
            }
        }

        this.authGenFiles.securityPath = `${this.authGenFiles.pathFile}/securitymanager`;
        this.authGenFiles.authProxyPath = `${this.authGenFiles.pathFile}/Auth-Proxy`;
        this.authGenFiles.camundaPath = `${this.authGenFiles.pathFile}/Camunda`;
        this.authGenFiles.FrontendLogin = `${this.authGenFiles.pathFile}/Login`;
        this.authGenFiles.folder = this.sourcePath + `/securitymanager`;
        this.authGenFiles.proxyFolder = this.sourcePath + `/authproxy`;
        this.authGenFiles.camundaFolder = this.sourcePath + `/camunda`;
        this.authGenFiles.Logingenerated = this.frontendpath + ``;

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
            if (this.authGenFiles.FrontendLogin) {
                this.createFolder();
                this.Loginfrontcomponents(callback);
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
        if (!this.authGenFiles.FrontendLogin) {
            if (!fs.existsSync(this.authGenFiles.FrontendLogin)) {
                fs.mkdirSync(this.authGenFiles.Logingenerated);
            }
        }
        if (this.authGenFiles.apigatewaypath) {
            if (!fs.existsSync(this.authGenFiles.apigatewayfolder)) {
                fs.mkdirSync(this.authGenFiles.apigatewayfolder);
            }
        }
    }

    public Loginfrontcomponents(callback) {
        fs.readdirSync(`${this.authGenFiles.FrontendLogin}`).forEach((file) => {
            if (file === 'login.component.html') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.html', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'login.component.scss') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.scss', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'login.component.spec.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.spec.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'login.component.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'loginservice.service.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.service.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'loginservice.service.spec.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.service.spec.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            }
        })
    }
    // AuthProxy
    public authProxyService(callback) {
        fs.readdirSync(`${this.authGenFiles.authProxyPath}`).forEach((file) => {

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
            }
            else if (file === 'src') {
                let src = this.authGenFiles.proxyFolder + `/src`
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.authProxyPath}/${file}`
                // @ts-ignore
                fs.readdirSync(srcFolder).find(x => {
                    if (x === 'server.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, serverFile) => {
                            fs.writeFile(src + `/server.ts`, serverFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'controllers') {
                        let contoller = this.authGenFiles.proxyFolder + `/controllers`;
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
                        let route = this.authGenFiles.proxyFolder + `/routes`;
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

                        let service = this.authGenFiles.proxyFolder + `/services`;
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
                        let dao = this.authGenFiles.proxyFolder + `/daos`;
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
                        let model = this.authGenFiles.proxyFolder + `/model`;
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
                        let config = this.authGenFiles.proxyFolder + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/MongoConfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            fs.writeFile(config + `/MongoConfig.ts`, mongoconfigFile, (err) => {
                                if (err) {
                                    return (err)
                                } else if (`${srcFolder}/${x}/Constants.ts`) {
                                    fs.readFile(`${srcFolder}/${x}/Constants.ts`, 'utf8', (err, Constants) => {
                                        fs.writeFile(config + `/Constants.ts`, Constants, (err) => {
                                            if (err) {
                                                return (err)
                                            } else {
                                                fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                                                    fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                                        return (err)
                                                    })
                                                })
                                            }
                                        })
                                    })

                                }
                            })
                        })
                    }
                })
            }

        })

    }

    //security
    public async securityManagerService(callback) {
        const entitydetails = await this.getEntities();
        // console.log('-----entitydetails----', entitydetails);
        fs.readdirSync(`${this.authGenFiles.securityPath}`).forEach((file) => {
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
                    fs.writeFile(this.authGenFiles.folder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            }
            else if (file === 'src') {
                let src = this.authGenFiles.folder + `/src`
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.securityPath}/${file}`;
                // @ts-ignore
                fs.readdirSync(srcFolder).find(x => {
                    if (x === 'server.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, serverFile) => {
                            fs.writeFile(src + `/server.ts`, serverFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'seed.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, seedFile) => {
                            fs.writeFile(src + `/seed.ts`, seedFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    } else if (x === 'controllers') {
                        let controller = src + `/controllers`;
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
                    } else if (x === 'service') {
                        let service = src + `/services`;
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
                        let dao = src + `/daos`;
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
                        this.modelworker.createfile(entitydetails, this.authGenFiles.folder, (modeldata => {
                            // console.log('------workerdata----', modeldata);

                        }));
                        let model = src + `/models`;
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
                        let config = src + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/Mongoconfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            fs.writeFile(config + `/Mongoconfig.ts`, mongoconfigFile, (err) => {
                                if (err) {
                                    return (err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                                        fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                            return (err)
                                        })
                                    })
                                }
                            })
                        })
                    } else if (x === 'assets') {
                        let assets = src + `/assets`;
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

    }

    //camunda

    public async camundaService(callback) {

        const screens = await this.getMenubuilder();
        // console.log('-----screens-----', screens);
        this.workernode.createfile(screens, this.authGenFiles.camundaFolder, (data => {
            // console.log('------workerdata----', data);
            return callback(Routes)
        }));
        this.dmnworker.dmnTable(screens, this.authGenFiles.camundaFolder, this.authGenFiles.templatepath, (dmndata => {
            // callback(dmndata);
        }));

        this.camundaworker.createConfig(this.authGenFiles.camundaFolder, this.authGenFiles.templatepath, (configdata => {

        }));
        fs.readdirSync(`${this.authGenFiles.camundaPath}`).forEach((file) => {

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
            }
            else if (file === 'src') {
                let src = this.authGenFiles.camundaFolder + `/src`
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.camundaPath}/${file}`
                // @ts-ignore
                fs.readdirSync(srcFolder).find(x => {
                    if (x === 'server.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, serverFile) => {
                            fs.writeFile(src + `/server.ts`, serverFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    } else if (x === 'seed.ts') {
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
                    } else if (x === 'config') {
                        let config = src + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/Mongoconfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            fs.writeFile(config + `/Mongoconfig.ts`, mongoconfigFile, (err) => {
                                if (err) {
                                    return (err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                                        fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                            return (err)
                                        })
                                    })
                                }
                            })
                        })
                    }
                })
            }
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
                // console.log('------enititiesdata------', entityvalue);
                entitymodel(entityvalue);
            })
        })
    }
}