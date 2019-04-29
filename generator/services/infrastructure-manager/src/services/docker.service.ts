import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';


export class DockerService {

    public generate_build_script_system_entry_pod(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/docker';
        let templatePath = projectDetails.templateUrl + '/docker';

        let systemEntryCodePath = projectDetails.projectUrl + "/app/client/desktop";

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script system-entry-jenkins
        let generateDockerScript = st.loadGroup(require(templatePath + '/jenkins_system_entry_script_stg'));
        let dockerScript = generateDockerScript.render("jenkins_system_entry_script", [projectName.toLowerCase(), systemEntryCodePath]);
        fs.writeFile(destination + '/system-entry-jenkins.xml', dockerScript, function (err) {
            if (err) throw err;
            console.log('system-entry-jenkins script generated!!')
           
        })


    }


    public generate_build_script_app_pod(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/docker';
        let templatePath = projectDetails.templateUrl + '/docker';

        let systemEntryCodePath = projectDetails.projectUrl + "/app/client/desktop";

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script app-pod-jenkins
        let generateDockerScript = st.loadGroup(require(templatePath + '/jenkins_app_pod_script_stg'));
        let dockerScript = generateDockerScript.render("jenkins_app_pod_script", [projectName.toLowerCase(), systemEntryCodePath]);
        fs.writeFile(destination + '/app-pod-jenkins.xml', dockerScript, function (err) {
            if (err) throw err;
            console.log('app-pod-jenkins script generated!!')
           
        })


    }





    }