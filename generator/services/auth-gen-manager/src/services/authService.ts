import { Request } from 'express'
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as makeDir from 'make-dir';
import { MenuBuilderService, EntityMicroService } from '../apiservices/index';
import { ScreenWorker } from '../worker/ScreenWorker';
import { ModelWorker } from '../worker/ModelWorker';
import { CamundaWorker } from '../worker/CamundaWorker';
import { DmnWorkerFile } from '../worker/DMNWoker';
import { Routes } from '../../template/route.json';
import { Common } from '../config/Common';
import { AuthProxyWorker } from '../worker/authProxyWorker'
import { resolve } from 'dns';

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
    private authProxyConfig = new AuthProxyWorker();
    private projectName = '';
    private sourcePath: any;
    private ports = {
        security: 3007,
        camunda: 3008,
        authProxy: 3009
    }
    // templateName
    private SERVER_TEMPLATENAME = 'server_file';

    // fileName
    private SERVER_FILENAME = 'server';

    //folderName
    private CAMUNDA_FOLDERNAME = 'camunda';
    private AUTH_PROXY_FOLDERNAME = 'Auth-Proxy';
    private SECURITY_FOLDERNAME = 'securitymanager';

    public auth(req: Request, callback) {
        // console.log('i am project ********** --->>>>', req.query);
        // console.log('path ---- >>>', req.query.projectName);
        this.sourcePath = this.authGenFiles.projectpath = req.query.projectPath;
        this.authGenFiles.templatepath = req.query.authTemplate;
        this.authGenFiles.pathFile = req.query.authPath;
        this.authGenFiles.projectId = req.query.projectID;
        if (req.query.projectName) {
            req.query.projectName.split(" ").forEach((element, index) => {
                if (index === 0) {
                    this.projectName = element;
                } else {
                    this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
                }
            })
        }
        Common.createFolders(this.authGenFiles.projectpath);
        if (this.sourcePath) {
            if (!fs.existsSync(this.sourcePath)) {
                console.log('-----coming here for source floder creation---', this.sourcePath);
                fs.mkdirSync(this.sourcePath);
            }
        }

        this.authGenFiles.securityPath = `${this.authGenFiles.pathFile}/${this.SECURITY_FOLDERNAME}`;
        this.authGenFiles.authProxyPath = `${this.authGenFiles.pathFile}/${this.AUTH_PROXY_FOLDERNAME}`;
        this.authGenFiles.camundaPath = `${this.authGenFiles.pathFile}/${this.CAMUNDA_FOLDERNAME}`;
        this.authGenFiles.folder = this.sourcePath + `/${this.SECURITY_FOLDERNAME}`;
        this.authGenFiles.proxyFolder = this.sourcePath + `/authproxy`;
        this.authGenFiles.camundaFolder = this.sourcePath + `/${this.CAMUNDA_FOLDERNAME}`;

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
                            fs.writeFile(config + `/MongoConfig.ts`, mongoconfigFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                                else {
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
        // console.log('-----screens-----', screens);
        this.dmnworker.dmnTable(screens, this.authGenFiles.camundaFolder, this.authGenFiles.templatepath, (dmndata => {
            // callback(dmndata);
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
            // console.log('------workerdata----', data);
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

    async generateServerFile(applicationPath, templatePath, templateName, fileName, information) {
        console.log('generateServerfile are ----- ', applicationPath, ' --templatePath---  ', templatePath, ' --fileName-- ', fileName, ' --information-- ', information)
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(applicationPath);
        let renderTemplate = st.loadGroup(require(templatePath + `/${templateName}_stg`));
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
}