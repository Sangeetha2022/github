import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class AdminServcie {
    private adminDetails: any = {
        id: '',
        adminPath: '',
        generatorCode: ''
    }
    private features: any;

    public seedPath: any;
    public adminNodeSeedPath: any;

    public adminGenerateUi: any;
    public adminGenerateNode: any;


    public admin(req: Request, callback: CallableFunction) {
        console.log('------req.query-----', req.query);
        this.adminDetails.id = req.query.projectId;
        this.adminDetails.adminPath = req.query.seedpath;//seed
        this.adminDetails.generatorCode = req.query.projectpath;//generator code 
        this.features = req.query.features; // Will use in the future for generating Admin screens based on the features

        //generate file folder
        this.adminGenerateUi = path.resolve(`${this.adminDetails.generatorCode}/admin`);
        this.adminGenerateNode = path.resolve(`${this.adminDetails.generatorCode}/adminmanager`);


        if (this.adminGenerateNode) {
            if (!fs.existsSync(this.adminGenerateNode)) {
                fs.mkdirSync(this.adminGenerateNode);
            }
        }


        //read files path
        this.seedPath = `${this.adminDetails.adminPath}/admin`;
        this.adminNodeSeedPath = `${this.adminDetails.adminPath}/adminmanager`;


        if (this.adminNodeSeedPath) {
            this.createFolder();
            this.adminNodeFiles(callback)
        }

    }

    public createFolder() {
        if (this.adminNodeSeedPath) {
            if (!fs.existsSync(this.adminGenerateNode)) {
                fs.mkdirSync(this.adminGenerateNode);
            }
        }

    }



    public adminNodeFiles(callback) {
        fs.readdirSync(`${this.adminNodeSeedPath}`).forEach((file) => {
            if (file === 'package.json') {
                fs.readFile(`${this.adminNodeSeedPath}/${file}`, 'utf8', (err, jsonFile) => {
                    fs.writeFile(this.adminGenerateNode + `/package.json`, jsonFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            } else if (file === 'tsconfig.json') {
                fs.readFile(`${this.adminNodeSeedPath}/${file}`, 'utf8', (err, tsFile) => {
                    fs.writeFile(this.adminGenerateNode + `/tsconfig.json`, tsFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            }
            else if (file === 'Dockerfile') {
                fs.readFile(`${this.adminNodeSeedPath}/${file}`, 'utf8', (err, tsFile) => {
                    fs.writeFile(this.adminGenerateNode + `/Dockerfile`, tsFile, (err) => {
                        if (err) {
                            return (err)
                        }
                    })
                })
            }
            else if (file === 'src') {
                let src = this.adminGenerateNode + `/src`
                if (!fs.existsSync(src)) {
                    fs.mkdirSync(src);
                }
                let srcFile = `${this.adminNodeSeedPath}/${file}`;
                // @ts-ignore
                fs.readdirSync(srcFile).find(x => {
                    if (x === 'server.ts') {
                        fs.readFile(`${srcFile}/${x}`, 'utf8', (err, serverFile) => {
                            fs.writeFile(src + `/server.ts`, serverFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    }
                    else if (x === 'seed.ts') {
                        fs.readFile(`${srcFile}/${x}`, 'utf8', (err, seedFile) => {
                            fs.writeFile(src + `/seed.ts`, seedFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    }
                    else if (x === 'apiservices') {
                        let apiService = src + `/apiservices`;
                        if (!fs.existsSync(apiService)) {
                            fs.mkdirSync(apiService);
                        }
                        fs.readFile(`${srcFile}/${x}/index.ts`, 'utf8', (err, indexFile) => {
                            fs.writeFile(apiService + `/index.ts`, indexFile, (err) => {
                                if (err) {
                                    return (err)
                                } else {
                                    fs.readFile(`${srcFile}/${x}/loginmanager.ts`, 'utf8', (err, loginmanagerFile) => {
                                        fs.writeFile(apiService + `/loginmanager.ts`, loginmanagerFile, (err) => {
                                            return (err)
                                        })
                                    })
                                }
                            })
                        })
                    }
                    else if (x === 'routes') {
                        let route = src + `/routes`;
                        if (!fs.existsSync(route)) {
                            fs.mkdirSync(route);
                        }
                        fs.readFile(`${srcFile}/${x}/routes.ts`, 'utf8', (err, routeFile) => {
                            fs.writeFile(route + `/routes.ts`, routeFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    }
                    else if (x === 'controllers') {
                        let controller = src + `/controllers`;
                        if (!fs.existsSync(controller)) {
                            fs.mkdirSync(controller);
                        }
                        fs.readFile(`${srcFile}/${x}/admincontroller.ts`, 'utf8', (err, ConsentcontrollersFile) => {
                            fs.writeFile(controller + `/admincontroller.ts`, ConsentcontrollersFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })
                        })
                    }
                    else if (x === 'service') {
                        let service = src + `/services`;
                        if (!fs.existsSync(service)) {
                            fs.mkdirSync(service);
                        }
                        fs.readFile(`${srcFile}/${x}/adminservice.ts`, 'utf8', (err, consentServiceFile) => {
                            fs.writeFile(service + `/adminservice.ts`, consentServiceFile, (err) => {
                                if (err) {
                                    return (err)
                                }
                            })

                        })
                    }
                    else if (x === 'config') {
                        let config = src + `/config`;
                        if (!fs.existsSync(config)) {
                            fs.mkdirSync(config);
                        }
                        fs.readFile(`${srcFile}/${x}/Winstonlogger.ts`, 'utf8', (err, winstonloggerFile) => {
                            fs.writeFile(config + `/Winstonlogger.ts`, winstonloggerFile, (err) => {
                                if (err) {
                                    return (err)
                                } else {
                                    fs.readFile(`${srcFile}/${x}/Sharedservice.ts`, 'utf8', (err, SharedserviceFile) => {
                                        fs.writeFile(config + `/Sharedservice.ts`, SharedserviceFile, (err) => {
                                            if (err) {
                                                return (err)
                                            } else {
                                                fs.readFile(`${srcFile}/${x}/ApiAdaptar.ts`, 'utf8', (err, ApiAdaptarFile) => {
                                                    fs.writeFile(config + `/ApiAdaptar.ts`, ApiAdaptarFile, (err) => {
                                                        if (err) {
                                                            return (err)
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                });
            }
        })
    }
}