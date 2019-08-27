import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import { IonicWorker } from '../worker/ionicWorker'


export class IosAppService {

    private ionicWorker = new IonicWorker();
    private exec = childProcess.exec;
    private projectName = '';
    private generationPath = '';
    private IOS_FOLDERNAME = 'ios';

    public generateIosApp(projectDetails, callback: CallableFunction) {
        console.log('entering into generate AndroidApp ----- ', projectDetails);

        projectDetails.project.name.split(" ").forEach((element, index) => {
            console.log('each foldername are ---------  ', element, '  --indx---  ', index);
            if (index === 0) {
                this.projectName = element;
            } else {
                this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
            }
        })
        this.generationPath = projectDetails.projectGenerationPath;
        Common.createFolders(this.generationPath);
        this.generationPath += `/${this.IOS_FOLDERNAME}`;
        Common.createFolders(this.generationPath);
        // console.log('generation--path---ios--->>', this.generationPath)

        this.exec(`cd ${this.generationPath.replace(/\s+/g, '\\ ')} && ionic start ${this.projectName} tabs --cordova --type=ionic-angular --no-deps`, (error, stdout, stderr) => {
            if (stderr) {
                console.log("stderr", stderr);
            }
            else {
                if (stdout) {
                    this.ionicWorker.homeComponent(projectDetails, this.generationPath, (response) => {
                        this.ionicWorker.loginComponent(projectDetails, this.generationPath, (response) => {
                            this.ionicWorker.landingComponent(projectDetails, this.generationPath, (response) => {
                                this.ionicWorker.appComponent(projectDetails, this.generationPath, (response) => {
                                    this.ionicWorker.loginservice(projectDetails, this.generationPath, (response) => {
                                        this.ionicWorker.assetImages(projectDetails, this.generationPath, (response) => {
                                            this.ionicWorker.appIcon(projectDetails, this.generationPath, (response) => {
                                                this.exec(`cd ${this.generationPath}/${this.projectName} && ionic cordova resources ios -i`, (error, stdout, stderr) => {
                                                    if (stderr) {
                                                        console.log("stderr", stderr)
                                                    }
                                                    else {
                                                        if (stdout) {
                                                            console.log("stdout", stdout);
                                                        }
                                                    }
                                                    if (error !== null) {
                                                        console.log('exec error: ' + error);
                                                    }
                                                });

                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            }
            if (error !== null) {
                console.log('exec error: ' + error);
                callback({ "status": "failed" });
            }
            else {
                callback({ "status": "success" });
            }
        });
    }
}

