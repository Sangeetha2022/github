import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import { IonicWorker } from '../worker/ionicWorker';
import { exec } from 'child_process';


export class AndroidAppService {
    private ionicWorker = new IonicWorker();
    private projectName = '';
    private generationPath = '';
    private ANDROID_FOLDERNAME = 'android';

    public generateAndroidApp(projectDetails, callback: CallableFunction) {
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
        this.generationPath += `/${this.ANDROID_FOLDERNAME}`;
        Common.createFolders(this.generationPath);
        exec(`cd ${this.generationPath} && ionic start ${this.projectName} sidemenu --cordova --type=ionic-angular --no-deps --no-git`, (error, stdout, stderr) => {
            if (stderr) {
                console.log("stderr", stderr);
            }
            else {
                if (stdout) {
                    this.ionicWorker.homeComponent(projectDetails, (response) => {
                        this.ionicWorker.loginComponent(projectDetails, (response) => {
                            this.ionicWorker.landingComponent(projectDetails, (response) => {
                                this.ionicWorker.appComponent(projectDetails, (response) => {
                                    this.ionicWorker.loginservice(projectDetails, (response) => {
                                        this.ionicWorker.assetImages(projectDetails, (response) => {
                                            this.ionicWorker.appIcon(projectDetails, (response) => {
                                                exec(`cd ${this.generationPath}/${this.projectName} && ionic cordova resources android -i` , (error, stdout, stderr)=> {
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

            //         if (stdout || stderr) {
            //             this.ionicWorker.homeComponent(projectDetails,(response) => {
            //               this.ionicWorker.loginComponent(projectDetails,(response) => {
            //                 this.ionicWorker.landingComponent(projectDetails,(response) => {
            //                   this.ionicWorker.appComponent(projectDetails,(response) => {
            //                     this.ionicWorker.loginservice(projectDetails,(response) => { 
            //                        this.ionicWorker.assetImages(projectDetails,(response) => { 
            //                           this.ionicWorker.appIcon(projectDetails,(response) => { 
            //                           })
            //                         })
            //                       })
            //                     })
            //                   })
            //                })
            //             })
            //             exec(`pwd`), (error, stdout, stderr) => {
            //                 console.log("----inside cd--->")
            //                 console.log('resources exec----->>>>    ', error);
            //                 console.log('resources exec----->>>>    ', stdout);
            //                 console.log('stderesourcesrr exec----->>>>    ', stderr);
            //               }
            //             callback({ Message: 'ionic app for android generated successfully' })
            //         } else {
            //             callback({ Message: 'cannot able to generate ionic app successfully' })
            //         }

        });
    }



}

