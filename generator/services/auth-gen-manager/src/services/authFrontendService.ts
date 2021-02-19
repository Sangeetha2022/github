import { Request } from 'express';
import { Common } from '../config/Common';
import { FrontendWorker } from '../worker/frontendWorker';
import { FrontendSupportWorker } from '../Supportworker/frontendSupportWorker'
import * as fs from 'fs';
import * as path from 'path';

export class AuthFrontendService {
    private frontendWorker = new FrontendWorker();
    private frontendSupportWorker = new FrontendSupportWorker();
    private IMAGE_FOLDERNAME = 'assets/img';
    private IMAGE_GENERATION_FOLDERNAME = 'img';


    public async authfrontendservice(req: Request, callback) {
        console.log('entering into services file')
        console.log('auth frontend services are --------------   ', req.body, ' ---req.body.applicationPath-- ', req.body.applicationPath);
        const details = req.body;
        const menus = req.body.screenMenus
        const applicationPath = details.templateResponse.applicationPath;
        const seedTemplatePath = details.seedTemplatePath;
        await this.readImagesAssets(seedTemplatePath, applicationPath);
        this.frontendWorker.createReadMeFile(details, (response) => {
            console.log('1111111111111');
            this.frontendWorker.createErrorReadMeFile(details, (response) => {
                console.log('2222222222222');
                this.frontendWorker.createLoginComponent(details, (response) => {
                    console.log('33333333333333');
                    this.frontendWorker.createSignupComponent((response) => {
                        console.log('444444444444444');
                        this.frontendWorker.createHomeComponent((response) => {
                            console.log('555555555555555');
                            this.frontendWorker.createAuthorizationComponent((response) => {
                                console.log('6666666666666');
                                this.frontendWorker.createManageroleComponent((response) => {
                                    this.frontendWorker.createConfig((response) => {
                                        console.log('77777777777777');
                                        this.frontendWorker.createUserComponent((response) => {
                                            console.log('88888888888888');
                                            this.frontendWorker.createAuthComponent(menus, (response) => {
                                                console.log('9999999999999999');
                                                this.frontendWorker.generateAppFile((response) => {
                                                    console.log('10 10 10 10 10 10 10 10 10 10');
                                                    this.frontendWorker.modifyFiles(() => {
                                                        console.log('11 11 11 11 11 11 11 11 11');
                                                        const date = new Date();
                                                        console.log('RES DATE---->>>>>', date.getHours() + ':', date.getMinutes() + ':', date.getSeconds() + ':' + date.getMilliseconds());
                                                        callback();
                                                    });
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        });
    }

    async readImagesAssets(templatePath, generationPath) {
        await fs.readdirSync(`${templatePath}/${this.IMAGE_FOLDERNAME}`).forEach(async imageElement => {
            await this.generateAssetFile(generationPath, templatePath, imageElement);
        });
    }

    private async generateAssetFile(generationPath, templatePath, imageElement) {
        templatePath = path.resolve(__dirname, templatePath);
        templatePath += `/${this.IMAGE_FOLDERNAME}`;
        generationPath = `${generationPath}/src/assets/${this.IMAGE_GENERATION_FOLDERNAME}`;
        await Common.createFolders(generationPath);
        await this.frontendSupportWorker.writeAssetsImageFile(generationPath, templatePath, imageElement);
    }




    // public authfrontendservice(req: Request, callback) {
    //     console.log('auth frontend services are --------------   ', req.body, ' ---req.query.authPath-- ', req.query.authPath);
    //     this.fileobject.projectId = req.query.projectId;
    //     this.frontendpath = this.fileobject.projectpath = req.query.projectPath;
    //     this.fileobject.pathFile = req.query.authPath;
    //     this.fileobject.FrontendLogin = `${this.fileobject.pathFile}/Login`;
    //     this.fileobject.Logingenerated = this.frontendpath;
    //     console.log('authfrontendservicesrare ----------  ', this.fileobject);
    //     if (this.fileobject.FrontendLogin) {
    //         this.createFolder();
    //         this.Loginfrontcomponents(callback);
    //     }
    //     this.frontendpath = path.resolve(`${this.fileobject.projectpath}`);

    // }

    // createFolder() {

    //     if (!this.fileobject.FrontendLogin) {
    //         if (!fs.existsSync(this.fileobject.FrontendLogin)) {
    //             fs.mkdirSync(this.fileobject.Logingenerated);
    //         }
    //     }

    // }

    // public Loginfrontcomponents(callback) {
    //     fs.readdirSync(`${this.fileobject.FrontendLogin}`).forEach((file) => {
    //         if (file === 'login.component.html') {
    //             fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
    //                 fs.writeFile(this.fileobject.Logingenerated + '/login.component.html', loginhtml, (err) => {
    //                     if (err) {
    //                         return (err);
    //                     }
    //                 })
    //             })
    //         } else if (file === 'login.component.scss') {
    //             fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
    //                 fs.writeFile(this.fileobject.Logingenerated + '/login.component.scss', loginhtml, (err) => {
    //                     if (err) {
    //                         return (err);
    //                     }
    //                 })
    //             })
    //         } else if (file === 'login.component.spec.ts') {
    //             fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
    //                 fs.writeFile(this.fileobject.Logingenerated + '/login.component.spec.ts', loginhtml, (err) => {
    //                     if (err) {
    //                         return (err);
    //                     }
    //                 })
    //             })
    //         } else if (file === 'login.component.ts') {
    //             fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
    //                 fs.writeFile(this.fileobject.Logingenerated + '/login.component.ts', loginhtml, (err) => {
    //                     if (err) {
    //                         return (err);
    //                     }
    //                 })
    //             })
    //         } else if (file === 'loginservice.service.ts') {
    //             fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
    //                 fs.writeFile(this.fileobject.Logingenerated + '/login.service.ts', loginhtml, (err) => {
    //                     if (err) {
    //                         return (err);
    //                     }
    //                 })
    //             })
    //             callback("Login component Generated");
    //         } else if (file === 'loginservice.service.spec.ts') {
    //             fs.readFile(`${this.fileobject.FrontendLogin}/${file}`, 'utf8', (err, loginhtml) => {
    //                 fs.writeFile(this.fileobject.Logingenerated + '/login.service.spec.ts', loginhtml, (err) => {
    //                     if (err) {
    //                         return (err);
    //                     }
    //                 })
    //             })
    //         }
    //     })
    // }

}



