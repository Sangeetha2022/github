import { Request } from 'express'
import * as fs from 'fs';
import * as path from 'path';
import * as makeDir from 'make-dir';
import { Common } from '../config/Common';

export class AuthFrontendService {


    private fileobject: any = {
        FrontendLogin: '',
        Logingenerated: '',
        projectpath: '',
        projectId: '',
        pathFile:''

    }

    private frontendpath: any;

    public authfrontendservice(req: Request, callback) {

        this.fileobject.projectId = req.query.projectId;
        this.frontendpath = this.fileobject.projectpath = req.query.projectPath;
        this.fileobject.pathFile = req.query.authPath;
        this.fileobject.FrontendLogin = `${this.fileobject.pathFile}/Login`;
        this.fileobject.Logingenerated = this.frontendpath;

        if (this.fileobject.FrontendLogin) {
            this.createFolder();
            this.Loginfrontcomponents(callback);
        }
        this.frontendpath = path.resolve(`${this.fileobject.projectpath}`);

    }

    createFolder() {

        if (!this.fileobject.FrontendLogin) {
            if (!fs.existsSync(this.fileobject.FrontendLogin)) {
                fs.mkdirSync(this.fileobject.Logingenerated);
            }
        }

    }

    public Loginfrontcomponents(callback) {
        fs.readdirSync(`${this.fileobject.FrontendLogin}`).forEach((file) => {
            if (file === 'login.component.html') {
                fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.fileobject.Logingenerated + '/login.component.html', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'login.component.scss') {
                fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.fileobject.Logingenerated + '/login.component.scss', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'login.component.spec.ts') {
                fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.fileobject.Logingenerated + '/login.component.spec.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'login.component.ts') {
                fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.fileobject.Logingenerated + '/login.component.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            } else if (file === 'loginservice.service.ts') {
                fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.fileobject.Logingenerated + '/login.service.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
                callback("Login component Generated");
            } else if (file === 'loginservice.service.spec.ts') {
                fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
                    fs.writeFile(this.fileobject.Logingenerated + '/login.service.spec.ts', loginhtml, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            }
        })
    }

}



