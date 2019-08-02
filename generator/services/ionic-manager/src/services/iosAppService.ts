import { Request } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';


export class IosAppService {

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
        this.exec(`cd ${this.generationPath.replace(/\s+/g, '\\ ')} && ionic start ${this.projectName} tabs --cordova --type=ionic-angular --no-deps`, (error, stdout, stderr) => {
            console.log('error exec ----->>>>    ', error);
            console.log('stdout exec ----->>>>    ', stdout);
            console.log('stderr exec ----->>>>    ', stderr);
            if (stdout || stderr) {
                callback({ Message: 'ionic app for ios generated successfully' })
            } else {
                callback({ Message: 'cannot able to generate ionic app successfully' })
            }

        });
    }



}

