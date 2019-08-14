import * as fs from 'fs';
import { Common } from '../config/Common';
import { IonicSupportWorker } from '../supportworker/ionicSupportWorker';

export class IonicWorker {
    private ionicSupportWorker = new IonicSupportWorker();
    private projectGenerationPath = '';
    private seedPath = '';
    private authTemplatePath = '';
    private routingMenus: any = [];

    private ionicFolderpath = 'ionic/img';
    private homeFolderpath = 'ionic/home';
    private loginFolderpath = 'ionic/login';
    private landingFolderpath = 'ionic/landing';
    private appFolderpath = 'ionic/app';
    private loginserviceFolderpath = 'ionic/login-service';
    private providersfolder = 'providers'


    assetImages(projectDetails, callback) {
        const Details = projectDetails;
        const imgPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/assets/imgs`;
        console.log("imgPath----->", imgPath);
        const seedPath = Details.project.seedTemplatePath
        this.generateImg(imgPath, this.ionicFolderpath, seedPath);
        callback();
    }

    homeComponent(projectDetails, callback) {
        const Details = projectDetails;
        const homePath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/pages/home`;
        console.log("homecomponentPath----->", homePath);
        const seedPath = Details.project.seedTemplatePath
        this.generateStaticComponent(homePath, this.homeFolderpath, seedPath);
        callback();
    }

    loginComponent(projectDetails, callback) {
        const Details = projectDetails;
        const loginPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/pages/login`;
        console.log("logincomponentPath----->", loginPath);
        const seedPath = Details.project.seedTemplatePath
        this.generateStaticComponent(loginPath, this.loginFolderpath, seedPath);
        callback();
    }

    landingComponent(projectDetails, callback) {
        const Details = projectDetails;
        const landingPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/landing`;
        console.log("landingcomponentPath----->", landingPath);
        const seedPath = Details.project.seedTemplatePath
        this.generateStaticComponent(landingPath, this.landingFolderpath, seedPath);
        callback();
    }

    appComponent(projectDetails, callback) {
        const Details = projectDetails;
        const appPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/app/`;
        console.log("appcomponentPath----->", appPath);
        const seedPath = Details.project.seedTemplatePath
        this.generateStaticComponent(appPath, this.appFolderpath, seedPath);
        callback();
    }

    loginservice(projectDetails, callback) {
        const Details = projectDetails;
        const providersPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/providers`
        Common.createFolders(providersPath);
        const loginservicePath = `${providersPath}/login-service`;
        console.log("loginservicePath----->", loginservicePath);
        const seedPath = Details.project.seedTemplatePath
        this.generateStaticComponent(loginservicePath, this.loginserviceFolderpath, seedPath);
        callback();
    }

    async generateStaticComponent(applicationPath, folderName, seedPath) {
        console.log("applicationPath", applicationPath);
        console.log("folderName", folderName);
        const pageSeedPath = `${seedPath}/${folderName}`;
        console.log("pageSeedPath", pageSeedPath);
        Common.createFolders(applicationPath);
        await fs.readdirSync(`${seedPath}/${folderName}`).forEach(fileElement => {
            this.ionicSupportWorker.generateStaticFile(applicationPath, pageSeedPath, fileElement);
        })
    }

    async generateImg(applicationPath, folderName, seedPath) {
        console.log("applicationPath", applicationPath);
        console.log("folderName", folderName);
        const pageSeedPath = `${seedPath}/${folderName}`;
        console.log("pageSeedPath", pageSeedPath);
        Common.createFolders(applicationPath);
        await fs.readdirSync(`${seedPath}/${folderName}`).forEach(fileElement => {
            this.ionicSupportWorker.generateImgFile(applicationPath, pageSeedPath, fileElement);
        })
    }
}