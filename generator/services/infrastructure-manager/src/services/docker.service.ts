import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';


export class DockerService {

    public generate_build_script_system_entry_pod(projectDetails, callback: CallableFunction) {


      
        let destination = projectDetails.destinationUrl + '/buildscript';
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script to build docker images
        let generateDockerScript = st.loadGroup(require(templatePath + '/build_script_stg'));
        let dockerScript = generateDockerScript.render("build_script", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/build_script.sh', dockerScript, function (err) {
            if (err) throw err;
            console.log(' script generated!!')
           
        })


    }


    public generate_build_script_app_pod(projectDetails, callback: CallableFunction) {


        
        let destination = projectDetails.destinationUrl + '/jenkins';
        let templatePath = projectDetails.templateUrl + '/docker';

        let systemEntryCodePath = projectDetails.projectUrl + "/app/client/desktop";

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script app-pod-jenkins
        let generateDockerScript = st.loadGroup(require(templatePath + '/jenkins_app_pod_script_stg'));
        let dockerScript = generateDockerScript.render("jenkins_app_pod_script", [projectDetails.project_lowercase, systemEntryCodePath]);
        fs.writeFile(destination + '/app-pod-jenkins.xml', dockerScript, function (err) {
            if (err) throw err;
            console.log('app-pod-jenkins script generated!!')
           
        })


    }





    }