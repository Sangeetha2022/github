import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class AdminServcie {
    private adminDetails: any = {
        id: '',
        adminPath: '',
        generatorCode: ''
    }

    public seedPath: any;
    public adminNodeSeedPath: any;
    public authGurdSeedPath: any

    public adminGenerateUi: any;
    public adminGenerateNode: any;
    public authGurdGenerate: any;


    public admin(req: Request, callback: CallableFunction) {
        this.adminDetails.id = req.query.projectID;
        this.adminDetails.adminPath = req.query.authPath;//seed
        this.adminDetails.generatorCode = req.query.projectPath;//generator code 

        //generate file folder
        this.adminGenerateUi = path.resolve(`${this.adminDetails.generatorCode}/admin`);
        this.adminGenerateNode = path.resolve(`${this.adminDetails.generatorCode}/adminmanager`);
        this.authGurdGenerate = path.resolve(`${this.adminDetails.generatorCode}/authGurd`)


        if (this.adminGenerateUi) {
            if (!fs.existsSync(this.adminGenerateUi)) {
                fs.mkdirSync(this.adminGenerateUi);
            }
        }

        if (this.adminGenerateNode) {
            if (!fs.existsSync(this.adminGenerateNode)) {
                fs.mkdirSync(this.adminGenerateNode);
            }
        }
        if (this.authGurdGenerate) {
            if (!fs.existsSync(this.authGurdGenerate)) {
                fs.mkdirSync(this.authGurdGenerate);
            }
        }

        //read files path
        this.seedPath = `${this.adminDetails.adminPath}/admin`;
        this.adminNodeSeedPath = `${this.adminDetails.adminPath}/adminmanager`;
        this.authGurdSeedPath = `${this.adminDetails.adminPath}/authGurd`


        if (this.seedPath) {
            this.createFolder();
            this.adminFiles(callback)
        }
        if (this.adminNodeSeedPath) {
            this.createFolder();
            this.adminNodeFiles(callback)
        }
        if (this.authGurdSeedPath) {
            this.createFolder();
            this.authGurdFiles(callback)
        }

    }

    public createFolder() {
        if (this.seedPath) {
            if (!fs.existsSync(this.adminGenerateUi)) {
                fs.mkdirSync(this.adminGenerateUi);
            }
        }
        if (this.adminNodeSeedPath) {
            if (!fs.existsSync(this.adminGenerateNode)) {
                fs.mkdirSync(this.adminGenerateNode);
            }
        }

    }

    public adminFiles(callback) {
        fs.readdirSync(`${this.seedPath}`).forEach((file) => {
            if (file === 'admin.component.html') {
                fs.readFile(`${this.seedPath}/${file}`, 'utf8', (err, adminhtml) => {
                    fs.writeFile(this.adminGenerateUi + '/admin.component.html', adminhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            }
            if (file === 'admin.component.scss') {
                fs.readFile(`${this.seedPath}/${file}`, 'utf8', (err, adminscss) => {
                    fs.writeFile(this.adminGenerateUi + '/admin.component.scss', adminscss, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })

            }
            if (file === 'admin.component.spec.ts') {
                fs.readFile(`${this.seedPath}/${file}`, 'utf8', (err, adminSpc) => {
                    fs.writeFile(this.adminGenerateUi + '/admin.component.spec.ts', adminSpc, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })

            }
            if (file === 'admin.component.ts') {
                fs.readFile(`${this.seedPath}/${file}`, 'utf8', (err, adminTs) => {
                    fs.writeFile(this.adminGenerateUi + '/admin.component.ts', adminTs, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            }
            if (file === 'admin.service.ts') {
                fs.readFile(`${this.seedPath}/${file}`, 'utf8', (err, adminService) => {
                    fs.writeFile(this.adminGenerateUi + '/admin.service.ts', adminService, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            }
        })

    }

    public authGurdFiles(callback) {
        fs.readdirSync(`${this.authGurdSeedPath}`).forEach((file) => {
            console.log('auth file --->>', file)
            if (file === 'auth.guard.spec.ts') {
                fs.readFile(`${this.authGurdSeedPath}/${file}`, 'utf8', (err, authGurdspc) => {
                    console.log('auth file -1111111-->>', this.authGurdGenerate)
                    console.log('auth file -1111111-->>', authGurdspc)

                    fs.writeFile(this.authGurdGenerate + '/auth.guard.spec.ts', authGurdspc, (err) => {
                        console.log('auth file -1111111-->>', authGurdspc)

                        if (err) {
                            return (err);
                        }
                    })
                })
            }
            if (file === 'auth.guard.ts') {
                fs.readFile(`${this.authGurdSeedPath}/${file}`, 'utf8', (err, authGurdTs) => {
                    fs.writeFile(this.authGurdGenerate + '/auth.guard.ts', authGurdTs, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            }
        })

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