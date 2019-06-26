import { Request } from 'express'
import * as fs from 'fs';
import * as path from 'path';
import * as makeDir from 'make-dir'
export class AuthService {

    // /home/decoders/Documents/AuthGep/geppettotest/generator/services/seed/Auth-Proxy
    // /home/decoders/Documents/AuthGep/geppettotest/generator/services/seed/`Camunda`

    //security--path
    private sourcePath: String = path.resolve(__dirname, '../../../securityManager');
    private srcPath: String = path.resolve(__dirname, '../../../securityManager/src');
    private controllerPath: String = path.resolve(__dirname, '../../../securityManager/src/controllers');
    private routePath: String = path.resolve(__dirname, '../../../securityManager/src/routes');
    private servicePath: String = path.resolve(__dirname, '../../../securityManager/src/service');
    private daoPath: String = path.resolve(__dirname, '../../../securityManager/src/daos');
    private modelPath: String = path.resolve(__dirname, '../../../securityManager/src/models');
    private configPath: String = path.resolve(__dirname, '../../../securityManager/src/config');
    private assetsPath: String = path.resolve(__dirname, '../../../securityManager/src/assets');

    //AuthProxy---
    private authProxyPath: String = path.resolve(__dirname, '../../../AuthProxy');
    private proxySrcPath: String = path.resolve(__dirname, '../../../AuthProxy/src');
    private proxyControllerPath: String = path.resolve(__dirname, '../../../AuthProxy/src/controllers');
    private proxyRoutePath: String = path.resolve(__dirname, '../../../AuthProxy/src/routes');
    private proxyServicePath: String = path.resolve(__dirname, '../../../AuthProxy/src/services');
    private proxyDaoPath: String = path.resolve(__dirname, '../../../AuthProxy/src/dao');
    private proxyModelPath: String = path.resolve(__dirname, '../../../AuthProxy/src/model');
    private proxyConfigPath: String = path.resolve(__dirname, '../../../AuthProxy/src/config');

    //camunda--

    private camundaAllPath: String = path.resolve(__dirname, '../../../camunda');
    private camundaSrcPath: String = path.resolve(__dirname, '../../../camunda/src');
    private camundaControllerPath: String = path.resolve(__dirname, '../../../camunda/src/controllers');
    private camundaRoutePath: String = path.resolve(__dirname, '../../../camunda/src/routes');
    private camundaServicePath: String = path.resolve(__dirname, '../../../camunda/src/services');
    private camundaModelPath: String = path.resolve(__dirname, '../../../camunda/src/model');
    private camundaConfigPath: String = path.resolve(__dirname, '../../../camunda/src/config');
    private camundaAssetsPath: String = path.resolve(__dirname, '../../../camunda/src/assets');

    private authGenFiles: any = {
        pathFile: '',
        folder: '',
        proxyFolder: '',
        camundaFolder:'',
        securityPath: '',
        authProxyPath: '',
        camundaPath:'',
        
    }
    

    public auth(req: Request, callback) {
        console.log('path ---- >>>',req.query.projectPath)
        this.authGenFiles.pathFile = req.query.authPath;
        this.authGenFiles.securityPath = `${this.authGenFiles.pathFile}/securitymanager`;
        this.authGenFiles.authProxyPath = `${this.authGenFiles.pathFile}/Auth-Proxy`;
        this.authGenFiles.camundaPath = `${this.authGenFiles.pathFile}/Camunda`
        this.authGenFiles.folder = this.sourcePath + ``;
        this.authGenFiles.proxyFolder = this.authProxyPath + ``;
        this.authGenFiles.camundaFolder = this.camundaAllPath + ``;

        if(this.authGenFiles){
            if(this.authGenFiles.securityPath){
                this.createFolder();
                this.securityManagerService(callback)
            }
            if(this.authGenFiles.authProxyPath){
                this.createFolder();
                this.authProxyService(callback);
            } 
            if(this.authGenFiles.camundaPath){
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
        } if (this.authGenFiles.camundaPath){

            if (!fs.existsSync(this.authGenFiles.camundaFolder)) {
                fs.mkdirSync(this.authGenFiles.camundaFolder);
            }


        }

    }

    public authProxyService(callback) {
        fs.readdirSync(`${this.authGenFiles.authProxyPath}`).forEach( (file) => {
            console.log('json----file --->>',file)

            if (file ===  'package.json') {
                console.log('json----file --->>',)
                console.log('json----file --->>',file)

                fs.readFile(`${this.authGenFiles.authProxyPath}/${file}`, 'utf8', (err, jsonFile) => {
                    console.log('json----file --->>', jsonFile)
                    fs.writeFile(this.authGenFiles.proxyFolder + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            callback(err)
                        }
                    })
                })
            } else if (file ===  'tsconfig.json') {
                console.log('ts----file --->>',file)

                fs.readFile(`${this.authGenFiles.authProxyPath}/${file}`, 'utf8', (err, tsFile) => {
                    console.log('ts----file --->>',tsFile)

                    fs.writeFile(this.authGenFiles.proxyFolder + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            callback(err)
                        }
                    })
                })
            }
            else if (file ===  'src') {
                let src = this.proxySrcPath + ``
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.authProxyPath}/${file}`
                fs.readdirSync(srcFolder).find( x => {
                    if (x ===  'server.ts') {
                        fs.readFile(`${srcFolder}/${x}`, 'utf8', (err, serverFile) => {
                            fs.writeFile(src + `/server.ts`, serverFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })
                        })
                    } else if (x ===  'controllers') {
                        let contoller = this.proxyControllerPath + ``;
                        if (!fs.existsSync(contoller)) {
                            fs.mkdirSync(contoller);
                        }

                        fs.readFile(`${srcFolder}/${x}/ProxyController.ts`, 'utf8',  (err, ProxyControllersFile) => {
                            fs.writeFile(contoller + `/ProxyController.ts`, ProxyControllersFile, (err) => {
                                if (err) {
                                    callback(err)
                                }
                            })
                        })
                    } else if (x ===  'routes') {
                        let route = this.proxyRoutePath + ``;
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
                    } else if (x ===  'services') {

                        let service = this.proxyServicePath + ``;
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
                    } else if (x ===  'dao') {
                        let dao = this.proxyDaoPath + ``;
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
                    } else if (x ===  'model') {
                        let model = this.proxyModelPath + ``;
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
                    } else if (x ===   'config') {
                        let config = this.proxyConfigPath + ``;
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
        fs.readdirSync(`${this.authGenFiles.securityPath}`).forEach( (file) => {
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
                let src = this.srcPath + ``
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.securityPath}/${file}`
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
                        let contoller = this.controllerPath + ``;
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
                        let route = this.routePath + ``;
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
                        let service = this.servicePath + ``;
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
                        let dao = this.daoPath + ``;
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
                        let model = this.modelPath + ``;
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
                        let config = this.configPath + ``;
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
                        let assets = this.assetsPath + ``;
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
            }else{
                callback('security file creates')
            }
        })

    }

    //camunda

    public camundaService(callback){

        fs.readdirSync(`${this.authGenFiles.camundaPath}`).forEach( (file) => {

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
                let src = this.camundaSrcPath + ``
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFolder = `${this.authGenFiles.camundaPath}/${file}`
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
                        let contoller = this.camundaControllerPath + ``;
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
                        let route = this.camundaRoutePath + ``;
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
                        let service = this.camundaServicePath + ``;
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
                        let model = this.camundaModelPath + ``;
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
                        let config = this.camundaConfigPath + ``;
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
                        let assets = this.camundaAssetsPath + ``;
                        if (!fs.existsSync(assets)) {
                            fs.mkdirSync(assets);
                        }
                        fs.readFile(`${srcFolder}/${x}/screen.ts`, 'utf8', (err, assetsFile) => {
                            fs.writeFile(assets + `/screen.ts`, assetsFile, (err) => {
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
}