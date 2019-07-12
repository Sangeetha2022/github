import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';


export class AdminFrontendServcie {

    private adminDetails: any = {
        id: '',
        adminPath: '',
        generatorCode: ''
    }

    public seedPath: any;
    public adminGenerateUi: any;
    public authGuardSeedPath: any
    public authGuardGenerate: any;


    public adminfrontend(req: Request, callback: CallableFunction) {

        this.adminDetails.id = req.query.projectID;
        this.adminDetails.adminPath = req.query.seedpath;//seed
        this.adminDetails.generatorCode = req.query.projectPath;//generator code 
        this.seedPath = `${this.adminDetails.adminPath}/admin`;
        this.authGuardSeedPath = `${this.adminDetails.adminPath}/authGuard`
        this.adminGenerateUi = path.resolve(`${this.adminDetails.generatorCode}/admin`);
        this.authGuardGenerate = path.resolve(`${this.adminDetails.generatorCode}/authGuard`)

        if (this.adminGenerateUi) {
            if (!fs.existsSync(this.adminGenerateUi)) {
                fs.mkdirSync(this.adminGenerateUi);
            }
        }
        if (this.authGuardGenerate) {
            if (!fs.existsSync(this.authGuardGenerate)) {
                fs.mkdirSync(this.authGuardGenerate);
            }
        }

        if (this.seedPath) {
            this.createFolder();
            this.adminFiles(callback)
        }

        if (this.authGuardSeedPath) {
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
    }

    public authGurdFiles(callback) {
        fs.readdirSync(`${this.authGuardSeedPath}`).forEach((file) => {
            console.log('auth file --->>', file)
            if (file === 'auth.guard.spec.ts') {
                fs.readFile(`${this.authGuardSeedPath}/${file}`, 'utf8', (err, authGurdspc) => {

                    fs.writeFile(this.authGuardGenerate + '/auth.guard.spec.ts', authGurdspc, (err) => {

                        if (err) {
                            return (err);
                        }
                    })
                })
            }
            if (file === 'auth.guard.ts') {
                fs.readFile(`${this.authGuardSeedPath}/${file}`, 'utf8', (err, authGurdTs) => {
                    fs.writeFile(this.authGuardGenerate + '/auth.guard.ts', authGurdTs, (err) => {
                        if (err) {
                            return (err);
                        }
                    })
                })
            }
        })
        return callback('Admin files generated');
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
                // return callback('Admin front end generated');
            }
        })

    }

}