import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import { IonicWorker } from '../worker/ionicWorker';
import * as childProcess from 'child_process';


export class AndroidAppService {
    private ionicWorker = new IonicWorker();   
    private exec = childProcess.exec;
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
        this.exec(`cd ${this.generationPath.replace(/\s+/g, '\\ ')} && ionic start ${this.projectName} sidemenu --cordova --type=ionic-angular --no-deps`, (error, stdout, stderr) => {
            console.log('error exec ----->>>>    ', error);
            console.log('stdout exec ----->>>>    ', stdout);
            console.log('stderr exec ----->>>>    ', stderr);
            if (stdout || stderr) {
                this.ionicWorker.homeComponent(projectDetails,(response) => {
                  this.ionicWorker.loginComponent(projectDetails,(response) => {
                    this.ionicWorker.landingComponent(projectDetails,(response) => {
                      this.ionicWorker.appComponent(projectDetails,(response) => {
                        this.ionicWorker.loginservice(projectDetails,(response) => { 
                            this.ionicWorker.assetImages(projectDetails,(response) => { 
                            })
                          })
                        })
                      })
                   })
                })
                callback({ Message: 'ionic app for android generated successfully' })
            } else {
                callback({ Message: 'cannot able to generate ionic app successfully' })
            }

        });
    }



}

