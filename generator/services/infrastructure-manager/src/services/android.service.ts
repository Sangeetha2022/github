import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';


export class AndroidService {

    public generate_build_script_android(projectDetails, callback: CallableFunction) {


       
        let destination = projectDetails.destinationUrl + '/mobile';
        let templatePath = projectDetails.templateUrl + '/mobile';

       
        let jenkinsBasePath = "/var/jenkins_home/workspace";
        let workspace = "/"+projectDetails.project_lowercase+"-job";
        let androidCodePath = "/"+projectDetails.project+"/app/client/mobile/android";
        let gitURL = "https://github.com";
        let Email = "tharani10d@gmal.com";
        let apiToken="";


        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script system-entry-jenkins
        let generateJenkinsScript = st.loadGroup(require(templatePath + '/android_jenkins_build_stg'));
        let dockerScript = generateJenkinsScript.render("android_jenkins_build", [projectDetails.project, jenkinsBasePath,workspace,androidCodePath,gitURL,Email,apiToken]);
        fs.writeFile(destination + '/android-jenkins-build.xml', dockerScript, function (err) {
            if (err) throw err;
            console.log('android-jenkins script generated!!')
           
        })


    }



    }