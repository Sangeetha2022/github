import * as fs from 'fs';
import { Common } from '../config/Common';
import { IonicSupportWorker } from '../supportworker/ionicSupportWorker';

export class IonicWorker {
    private ionicSupportWorker = new IonicSupportWorker();

    private ionicFolderpath = 'ionic/img';
    private homeFolderpath = 'ionic/home';
    private loginFolderpath = 'ionic/login';
    private landingFolderpath = 'ionic/landing';
    private appFolderpath = 'ionic/app';
    private loginserviceFolderpath = 'ionic/login-service';
    private appiconFolderpath = 'ionic/icon'

    assetImages(projectDetails, andriodIsoApp, callback) {
        const Details = projectDetails;
        const imgPath = `${andriodIsoApp}/${projectDetails.project.name}/src/assets/imgs`;
        const seedPath = Details.project.templateLocation.authTemplatePath;
        console.log('i am project --->>>', projectDetails.templateName);

        if (projectDetails.templateName === 'HSBC TEMPLATE') {
            const ionicFolderLocation = 'ionic/hsbc/img'
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'CISCO TEMPLATE') {
            const ionicFolderLocation = 'ionic/cisco/imgs';
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'ENJOY THE TRAVEL') {
            const ionicFolderLocation = 'ionic/enjoyTheTravel/imgs';
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'NIGHT VOYAGER') {
            const ionicFolderLocation = 'ionic/nightVoyager/imgs';
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'NIGHT CITY EVENTS') {
            const ionicFolderLocation = 'ionic/nightCityEvent/imgs';
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'RIGHT TEAM') {
            const ionicFolderLocation = 'ionic/rightTeam/imgs';
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'TWO SIDE TEMPLATE') {
            const ionicFolderLocation = 'ionic/twoSideTemplate/imgs';
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'GEPPETTONEW TEMPLATE') {
            const ionicFolderLocation = 'ionic/newGeppettoTemplate/imgs';
            this.generateImg(imgPath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'GEPPETTO TEMPLATE') {
            this.generateImg(imgPath, this.ionicFolderpath, seedPath);

        }
        else if (projectDetails.templateName === "" || projectDetails.templateName === undefined) {
            this.generateImg(imgPath, this.ionicFolderpath, seedPath);
        }

        callback();
    }

    appIcon(projectDetails, andriodIsoApp, callback) {
        const Details = projectDetails;
        const iconPath = `${andriodIsoApp}/${projectDetails.project.name}/resources`;
        console.log("iconPath----->", iconPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateImg(iconPath, this.appiconFolderpath, seedPath);
        callback();
    }

    homeComponent(projectDetails, andriodIsoApp, callback) {
        const Details = projectDetails;
        const homePath = `${andriodIsoApp}/${projectDetails.project.name}/src/pages/home`;
        const seedPath = Details.project.templateLocation.authTemplatePath
        if (projectDetails.templateName === 'HSBC TEMPLATE') {
            const ionicFolderLocation = 'ionic/hsbc/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'CISCO TEMPLATE') {
            const ionicFolderLocation = 'ionic/cisco/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'ENJOY THE TRAVEL') {
            const ionicFolderLocation = 'ionic/enjoyTheTravel/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'NIGHT VOYAGER') {
            const ionicFolderLocation = 'ionic/nightVoyager/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'NIGHT CITY EVENTS') {
            console.log('--night city events')
            const ionicFolderLocation = 'ionic/nightCityEvent/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'RIGHT TEAM') {
            const ionicFolderLocation = 'ionic/rightTeam/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'TWO SIDE TEMPLATE') {
            const ionicFolderLocation = 'ionic/twoSideTemplate/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'GEPPETTONEW TEMPLATE') {
            const ionicFolderLocation = 'ionic/newGeppettoTemplate/home';
            this.generateStaticComponent(homePath, ionicFolderLocation, seedPath);
        }
        if (projectDetails.templateName === 'GEPPETTO TEMPLATE') {
            this.generateStaticComponent(homePath, this.homeFolderpath, seedPath);
        }
        else if (projectDetails.templateName === "" || projectDetails.templateName === undefined) {
            console.log('else--condition-->>')
            this.generateStaticComponent(homePath, this.homeFolderpath, seedPath);
        }
        callback();
    }

    loginComponent(projectDetails, andriodIsoApp, callback) {
        const Details = projectDetails;
        const loginPath = `${andriodIsoApp}/${projectDetails.project.name}/src/pages/login`;
        console.log("logincomponentPath----->", loginPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateStaticComponent(loginPath, this.loginFolderpath, seedPath);
        callback();
    }

    landingComponent(projectDetails, andriodIsoApp, callback) {
        const Details = projectDetails;
        const landingPath = `${andriodIsoApp}/${projectDetails.project.name}/src/landing`;
        console.log("landingcomponentPath----->", landingPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateStaticComponent(landingPath, this.landingFolderpath, seedPath);
        callback();
    }

    appComponent(projectDetails, andriodIsoApp, callback) {
        const Details = projectDetails;
        const appPath = `${andriodIsoApp}/${projectDetails.project.name}/src/app/`;
        console.log("appcomponentPath----->", appPath);
        const seedPath = Details.project.templateLocation.authTemplatePath
        this.generateStaticComponent(appPath, this.appFolderpath, seedPath);
        callback();
    }

    loginservice(projectDetails, andriodIsoApp, callback) {
        const Details = projectDetails;
        const providersPath = `${andriodIsoApp}/${projectDetails.project.name}/src/providers`
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