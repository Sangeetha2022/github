import * as fs from 'fs';
import { Common } from '../config/Common';
import { IonicSupportWorker } from '../supportworker/ionicSupportWorker';

export class IonicWorker {
    private ionicSupportWorker = new IonicSupportWorker();


    private hsbc: any = {
        ionicFolderpath: 'ionic/hsbc/img',
        homeFolderpath: 'ionic/hsbc/home',
    }
    private ionicFolderpath = 'ionic/img';
    private homeFolderpath = 'ionic/home';
    private loginFolderpath = 'ionic/login';
    private landingFolderpath = 'ionic/landing';
    private appFolderpath = 'ionic/app';
    private loginserviceFolderpath = 'ionic/login-service';
    private appiconFolderpath = 'ionic/icon'

    assetImages(projectDetails, callback) {
        const Details = projectDetails;
        const imgPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/assets/imgs`;
        const seedPath = Details.project.templateLocation.authTemplatePath;
        console.log('i am project --->>>', projectDetails.templateName);
        if (projectDetails.templateName === 'HSBC TEMPLATE') {
            const ionicFolderLocation = this.hsbc.ionicFolderpath;
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        else {
            this.generateImg(imgPath, this.ionicFolderpath, seedPath);
        }

        callback();
    }

    appIcon(projectDetails, callback) {
        const Details = projectDetails;
        const iconPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/resources`;
        console.log("iconPath----->", iconPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateImg(iconPath, this.appiconFolderpath, seedPath);
        callback();
    }

    homeComponent(projectDetails, callback) {
        const Details = projectDetails;
        const homePath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/pages/home`;
        const seedPath = Details.project.templateLocation.authTemplatePath
        if (projectDetails.templateName === 'HSBC TEMPLATE') {
            const ionicFolderLocation = this.hsbc.homeFolderpath;
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        else {
            this.generateStaticComponent(homePath, this.homeFolderpath, seedPath);
        }
        callback();
    }

    loginComponent(projectDetails, callback) {
        const Details = projectDetails;
        const loginPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/pages/login`;
        console.log("logincomponentPath----->", loginPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateStaticComponent(loginPath, this.loginFolderpath, seedPath);
        callback();
    }

    landingComponent(projectDetails, callback) {
        const Details = projectDetails;
        const landingPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/landing`;
        console.log("landingcomponentPath----->", landingPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateStaticComponent(landingPath, this.landingFolderpath, seedPath);
        callback();
    }

    appComponent(projectDetails, callback) {
        const Details = projectDetails;
        const appPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/app/`;
        console.log("appcomponentPath----->", appPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateStaticComponent(appPath, this.appFolderpath, seedPath);
        callback();
    }

    loginservice(projectDetails, callback) {
        const Details = projectDetails;
        const providersPath = `${projectDetails.projectGenerationPath}/android/${projectDetails.project.name}/src/providers`
        Common.createFolders(providersPath);
        const loginservicePath = `${providersPath}/login-service`;
        console.log("loginservicePath----->", loginservicePath);
        const seedPath = Details.project.templateLocation.authTemplatePath
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