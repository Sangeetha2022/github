import { Request } from 'express'
import * as fs from 'fs';
import * as path from 'path';
import * as makeDir from 'make-dir';
import { MenuBuilderService } from '../apiservices/index';
import { ScreenWorker } from '../worker/ScreenWorker';
export class AuthService {

    private authGenFiles: any = {
        projectpath: '',
        projectId: '',
        pathFile: '',
        folder: '',
        apigatewayfolder: '',
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
    private workernode = new ScreenWorker();
    private sourcePath: any;
    private frontendpath: any;

    public auth(req: Request, callback) {
        console.log('path ---- >>>', req.query.projectID)

        this.authGenFiles.projectpath = req.query.projectPath;
        this.authGenFiles.pathFile = req.query.authPath;
        this.authGenFiles.projectId = req.query.projectID;
        this.sourcePath = path.resolve(`${this.authGenFiles.projectpath}/loginbackend`);
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
        this.authGenFiles.apigatewaypath = `${this.authGenFiles.pathFile}/apigateway`;
        console.log('-----login-----', this.authGenFiles.FrontendLogin);
        this.authGenFiles.folder = this.sourcePath + `/securitymanager`;
        this.authGenFiles.proxyFolder = this.sourcePath + `/authproxy`;
        this.authGenFiles.camundaFolder = this.sourcePath + `/camunda`;
        this.authGenFiles.apigatewayfolder = this.sourcePath + `/apigateway`;
        this.authGenFiles.Logingenerated = this.frontendpath + ``;

        if (this.authGenFiles) {
            if (this.authGenFiles.apigatewaypath) {
                this.createFolder();
                this.apigatewayservice(callback);
            }
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
        callback('Authorization backend code generated successfully');
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

    public apigatewayservice(callback) {
        fs.readdirSync(`${this.authGenFiles.apigatewaypath}`).forEach((file) => {
            if (file === 'package.json') {
                fs.readFile(`${this.authGenFiles.apigatewaypath}/${file}`, 'utf8', (err, packagejson) => {
                    fs.writeFile(this.authGenFiles.apigatewayfolder + '/package.json', packagejson, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                fs.readFile(`${this.authGenFiles.apigatewaypath}/${file}`, 'utf8', (err, tsconfigjson) => {
                    fs.writeFile(this.authGenFiles.apigatewayfolder + '/tsconfig.json', tsconfigjson, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            } else if (file === 'src') {
                let srcfolder = this.authGenFiles.apigatewayfolder + `/src`;
                if (!fs.existsSync(srcfolder)) {
                    fs.mkdirSync(srcfolder);
                }
                let apigatewaysrc = `${this.authGenFiles.apigatewaypath}/${file}`
                //@ts-ignore
                fs.readdirSync(apigatewaysrc).find(x => {
                    if (x === "server.ts") {
                        fs.readFile(`${apigatewaysrc}/${x}`, 'utf8', (err, serverFile) => {
                            fs.writeFile(srcfolder + `/server.ts`, serverFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })
                        })
                    } else if (x === 'interface') {
                        let interfacefolder = this.authGenFiles.apigatewayfolder + `/interface`;
                        if (!fs.existsSync(interfacefolder)) {
                            fs.mkdirSync(interfacefolder);
                        }
                        let interfacefile = `${this.authGenFiles.apigatewaypath}/${file}`;
                        // @ts-ignore
                        fs.readdirSync(interfacefile).find(y => {
                            if (y === 'controller.interface.ts') {
                                fs.readFile(`${interfacefile}/${x}`, 'utf8', (err, controllerfile) => {
                                    fs.writeFile(interfacefolder + `/controller.interface.ts`, controllerfile, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            }
                        })
                    } else if (x === 'config') {
                        let configfolder = this.authGenFiles.apigatewayfolder + `/config`;
                        if (!fs.existsSync(configfolder)) {
                            fs.mkdirSync(configfolder);
                        }
                        let configfile = `${this.authGenFiles.apigatewaypath}/${file}`;
                        // @ts-ignore
                        fs.readdirSync(configfile).find(z => {
                            if (z === 'apiAdaptar.ts') {
                                fs.readFile(`${configfile}/${x}`, 'utf8', (err, apiadaptar) => {
                                    fs.writeFile(configfolder + `/apiAdaptar.ts`, apiadaptar, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            } else if (z === 'Constants.ts') {
                                fs.readFile(`${configfile}/${x}`, 'utf8', (err, constantsfile) => {
                                    fs.writeFile(configfolder + `/Constants.ts`, constantsfile, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            } else if (z === 'WinstonLogger.ts') {
                                fs.readFile(`${configfile}/${x}`, 'utf8', (err, loggerfile) => {
                                    fs.writeFile(configfolder + `/WinstonLogger.ts`, loggerfile, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            }
                        })
                    } else if (x === 'apicontroller') {
                        let apicontrollerfolder = this.authGenFiles.apigatewayfolder + `/apicontroller`;
                        if (!fs.existsSync(apicontrollerfolder)) {
                            fs.mkdirSync(apicontrollerfolder);
                        }
                        let apicontrollerfile = `${this.authGenFiles.apigatewaypath}/${file}`;
                        // @ts-ignore
                        fs.readdirSync(apicontrollerfile).find(c => {
                            if (c === 'index.ts') {
                                fs.readFile(`${apicontrollerfile}/${x}`, 'utf8', (err, indexfile) => {
                                    fs.writeFile(apicontrollerfolder + `/index.ts`, indexfile, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            } else if (c === 'camunda.controller.ts') {
                                fs.readFile(`${apicontrollerfile}/${x}`, 'utf8', (err, camundacontroller) => {
                                    fs.writeFile(apicontrollerfolder + `/camunda.controller.ts`, camundacontroller, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            } else if (c === 'login.controller.ts') {
                                fs.readFile(`${apicontrollerfile}/${x}`, 'utf8', (err, logincontroller) => {
                                    fs.writeFile(apicontrollerfolder + `/login.controller.ts`, logincontroller, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            } else if (c === 'proxy.controller.ts') {
                                fs.readFile(`${apicontrollerfile}/${x}`, 'utf8', (err, proxycontroller) => {
                                    fs.writeFile(apicontrollerfolder + `/proxy.controller.ts`, proxycontroller, (err) => {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    public Loginfrontcomponents(callback) {
        fs.readdirSync(`${this.authGenFiles.FrontendLogin}`).forEach((file) => {
            console.log('-------file-----', file);
            if (file === 'login.component.html') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}, 'utf8`, (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.html', loginhtml, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            } else if (file === 'login.component.scss') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}, 'utf8`, (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.scss', loginhtml, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            } else if (file === 'login.component.spec.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}, 'utf8`, (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.spec.ts', loginhtml, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            } else if (file === 'login.component.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}, 'utf8`, (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.component.ts', loginhtml, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            } else if (file === 'loginservice.service.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}, 'utf8`, (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.service.ts', loginhtml, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            } else if (file === 'loginservice.service.spec.ts') {
                fs.readFile(`${this.authGenFiles.FrontendLogin}/${file}, 'utf8`, (err, loginhtml) => {
                    fs.writeFile(this.authGenFiles.Logingenerated + '/login.service.spec.ts', loginhtml, (err) => {
                        if (err) {
                            callback(err);
                        }
                    })
                })
            }
        })
    }
    // AuthProxy
    public authProxyService(callback) {
        fs.readdirSync(`${this.authGenFiles.authProxyPath}`).forEach((file) => {
            console.log('json----file --->>', file)

            if (file === 'package.json') {
                console.log('json----file --->>', this.authGenFiles.proxyFolder);
                console.log('json----file --->>', file)

                fs.readFile(`${this.authGenFiles.authProxyPath}/${file}`, 'utf8', (err, jsonFile) => {
                    console.log('json----file --->>', jsonFile)
                    fs.writeFile(this.authGenFiles.proxyFolder + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            callback(err)
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                console.log('ts----file --->>', file)

                fs.readFile(`${this.authGenFiles.authProxyPath}/${file}`, 'utf8', (err, tsFile) => {
                    console.log('ts----file --->>', tsFile)

                    fs.writeFile(this.authGenFiles.proxyFolder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            callback(err)
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
                                    callback(err)
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
                                    callback(err)
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
                                    callback(err)
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
                                    callback(err)
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
                                    callback(err)
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
                                console.log('sucess -read-- :)  ->>', Signin)
                                if (err) {
                                    callback(err)
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
                                    callback(err)
                                } else if (`${srcFolder}/${x}/Constants.ts`) {
                                    fs.readFile(`${srcFolder}/${x}/Constants.ts`, 'utf8', (err, Constants) => {
                                        fs.writeFile(config + `/Constants.ts`, Constants, (err) => {
                                            if (err) {
                                                callback(err)
                                            } else {
                                                fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                                                    fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                                        callback(err)
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

    public securityManagerService(callback) {
        fs.readdirSync(`${this.authGenFiles.securityPath}`).forEach((file) => {
            if (file === 'package.json') {
                fs.readFile(`${this.authGenFiles.securityPath}/${file}`, 'utf8', (err, jsonFile) => {
                    fs.writeFile(this.authGenFiles.folder + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            callback(err)
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                fs.readFile(`${this.authGenFiles.securityPath}/${file}`, 'utf8', (err, tsFile) => {
                    fs.writeFile(this.authGenFiles.folder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            callback(err)
                        }
                    })
                })
            }
            else if (file === 'src') {
                let src = this.authGenFiles.folder + `/src`
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.securityPath}/${file}`
                // @ts-ignore
                fs.readdirSync(srcFolder).find(x => {
                    if (x === 'server.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, serverFile) => {
                            fs.writeFile(src + `/server.ts`, serverFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })
                        })
                    } else if (x === 'seed.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, seedFile) => {
                            fs.writeFile(src + `/seed.ts`, seedFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })

                        })
                    } else if (x === 'controllers') {
                        let contoller = this.authGenFiles.folder + `/controllers`;
                        if (!fs.existsSync(contoller)) {
                            fs.mkdirSync(contoller);
                        }

                        fs.readFile(`${srcFolder}/${x}/Consentcontrollers.ts`, 'utf8', (err, ConsentcontrollersFile) => {
                            fs.writeFile(contoller + `/Consentcontrollers.ts`, ConsentcontrollersFile, (err) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Signincontrollers.ts`, 'utf8', (err, Signincontrollers) => {
                                        fs.writeFile(contoller + `/Signincontrollers.ts`, Signincontrollers, (err) => {
                                            if (err) {
                                                callback(err)
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    } else if (x === 'routes') {
                        let route = this.authGenFiles.folder + `/routes`;
                        if (!fs.existsSync(route)) {
                            fs.mkdirSync(route);
                        }
                        fs.readFile(`${srcFolder}/${x}/routes.ts`, 'utf8', (err, routeFile) => {
                            fs.writeFile(route + `/routes.ts`, routeFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })

                        })
                    } else if (x === 'service') {
                        let service = this.authGenFiles.folder + `/services`;
                        if (!fs.existsSync(service)) {
                            fs.mkdirSync(service);
                        }
                        fs.readFile(`${srcFolder}/${x}/consentservice.ts`, 'utf8', (err, consentServiceFile) => {
                            fs.writeFile(service + `/consentservice.ts`, consentServiceFile, (err) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Signinservice.ts`, 'utf8', (err, SigninserviceFile) => {
                                        fs.writeFile(service + `/Signinservice.ts`, SigninserviceFile, (err) => {
                                            callback(err)
                                        })
                                    })
                                }
                            })

                        })
                    } else if (x === 'daos') {
                        let dao = this.authGenFiles.folder + `/daos`;
                        if (!fs.existsSync(dao)) {
                            fs.mkdirSync(dao);
                        }
                        fs.readFile(`${srcFolder}/${x}/ConsentDao.ts`, 'utf8', (err, consentDaoFile) => {
                            fs.writeFile(dao + `/ConsentDao.ts`, consentDaoFile, (err) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/SigninDao.ts`, 'utf8', (err, SigninDaoFile) => {
                                        fs.writeFile(dao + `/SigninDao.ts`, SigninDaoFile, (err) => {
                                        })
                                    })
                                }
                            })
                        })
                    } else if (x === 'models') {
                        let model = this.authGenFiles.folder + `/models`;
                        if (!fs.existsSync(model)) {
                            fs.mkdirSync(model);
                        }
                        fs.readFile(`${srcFolder}/${x}/Role.ts`, 'utf8', (err, roleModelFile) => {
                            fs.writeFile(model + `/Role.ts`, roleModelFile, (err) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/User.ts`, 'utf8', (err, userModelFile) => {
                                        fs.writeFile(model + `/User.ts`, userModelFile, (err) => {
                                            callback(err)
                                        })
                                    })
                                }
                            })
                        })
                    } else if (x === 'config') {
                        let config = this.authGenFiles.folder + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/Mongoconfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            fs.writeFile(config + `/Mongoconfig.ts`, mongoconfigFile, (err) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                                        fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                            callback(err)
                                        })
                                    })
                                }
                            })
                        })
                    } else if (x === 'assets') {
                        let assets = this.authGenFiles.folder + `/assets`;
                        if (!fs.existsSync(assets)) {
                            fs.mkdirSync(assets);
                        }
                        fs.readFile(`${srcFolder}/${x}/role.ts`, 'utf8', (err, assetsFile) => {
                            fs.writeFile(assets + `/role.ts`, assetsFile, (err) => {
                                if (err) {

                                    callback(err)
                                }
                            })
                        })
                    }
                })
            } else {
                callback('security file creates')
            }
        })

    }

    //camunda

    public async camundaService(callback) {

        const screens = await this.getMenubuilder();
        console.log('-----screens-----', screens);
        this.workernode.createfile(screens, this.authGenFiles.camundaFolder, (data => {
            console.log('------workerdata----', data);
        }));
        // const workerscreen = await this.workernode.ScreenName(screens,(data=>{
        //     console.log('------workerdata----',data);
        // }));
        fs.readdirSync(`${this.authGenFiles.camundaPath}`).forEach((file) => {

            if (file === 'package.json') {
                fs.readFile(`${this.authGenFiles.camundaPath}/${file}`, 'utf8', (err, jsonFile) => {
                    fs.writeFile(this.authGenFiles.camundaFolder + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            callback(err)
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                fs.readFile(`${this.authGenFiles.camundaPath}/${file}`, 'utf8', (err, tsFile) => {
                    fs.writeFile(this.authGenFiles.camundaFolder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            callback(err)
                        }
                    })
                })
            }
            else if (file === 'src') {
                let assetsfile = this.authGenFiles.camundaFolder + `/assets`;
                var screens = ['Landing', 'Project', 'flow-component', 'flow-manager', 'available-connectors'];
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
                                    callback(err)
                                }
                            })
                        })
                    } else if (x === 'seed.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, seedFile) => {
                            fs.writeFile(src + `/seed.ts`, seedFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })

                        })
                    } else if (x === 'controllers') {
                        let contoller = this.authGenFiles.camundaFolder + `/controllers`;
                        if (!fs.existsSync(contoller)) {
                            fs.mkdirSync(contoller);
                        }

                        fs.readFile(`${srcFolder}/${x}/Camundacontroller.ts`, 'utf8', (err, Camundacontroller) => {
                            fs.writeFile(contoller + `/Camundacontroller.ts`, Camundacontroller, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })
                        })
                    } else if (x === 'routes') {
                        let route = this.authGenFiles.camundaFolder + `/routes`;
                        if (!fs.existsSync(route)) {
                            fs.mkdirSync(route);
                        }
                        fs.readFile(`${srcFolder}/${x}/routes.ts`, 'utf8', (err, routeFile) => {
                            fs.writeFile(route + `/routes.ts`, routeFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })

                        })
                    } else if (x === 'services') {
                        let service = this.authGenFiles.camundaFolder + `/services`;
                        if (!fs.existsSync(service)) {
                            fs.mkdirSync(service);
                        }
                        fs.readFile(`${srcFolder}/${x}/Camundaservice.ts`, 'utf8', (err, Camundaservice) => {
                            fs.writeFile(service + `/Camundaservice.ts`, Camundaservice, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })

                        })
                    } else if (x === 'model') {
                        let model = this.authGenFiles.camundaFolder + `/model`;
                        if (!fs.existsSync(model)) {
                            fs.mkdirSync(model);
                        }
                        fs.readFile(`${srcFolder}/${x}/resource.ts`, 'utf8', (err, resource) => {
                            fs.writeFile(model + `/resource.ts`, resource, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })
                        })
                    } else if (x === 'config') {
                        let config = this.authGenFiles.camundaFolder + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFolder}/${x}/Mongoconfig.ts`, 'utf8', (err, mongoconfigFile) => {
                            fs.writeFile(config + `/Mongoconfig.ts`, mongoconfigFile, (err) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    fs.readFile(`${srcFolder}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                                        fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                            callback(err)
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
                console.log('-------authdata-----', data);
                resolve(data);
            });

        });

    }
}