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


    public adminfrontend(req: Request, callback: CallableFunction) {

        this.adminDetails.id = req.query.projectID;
        this.adminDetails.adminPath = req.query.seedpath;//seed
        this.adminDetails.generatorCode = req.query.projectPath;//generator code 
        this.seedPath = `${this.adminDetails.adminPath}/admin`;
        this.adminGenerateUi = path.resolve(`${this.adminDetails.generatorCode}/admin`);

        if (this.adminGenerateUi) {
            if (!fs.existsSync(this.adminGenerateUi)) {
                fs.mkdirSync(this.adminGenerateUi);
            }
        }


        if (this.seedPath) {
            this.createFolder();
            this.adminFiles(callback)
        }


    }


    public createFolder() {
        if (this.seedPath) {
            if (!fs.existsSync(this.adminGenerateUi)) {
                fs.mkdirSync(this.adminGenerateUi);
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
                return callback('Admin front end generated');
            }
        })

    }

}