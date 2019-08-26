import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';


export class DockerService {

    public generate_build_script_local(projectDetails, callback: CallableFunction) {


        let destination = projectDetails.localUrl + '/buildscript';
        console.log("localfolder--->", destination);
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script to build docker images
        let generateDockerScript = st.loadGroup(require(templatePath + '/build_script_stg'));
        let dockerScript = generateDockerScript.render("build_script", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/geppetto_build.sh', dockerScript, function (err) {
            if (err) throw err;
            console.log('geppetto_build_script for local is generated!!')
           
        })


    }

       public generate_build_script_cloud(projectDetails, callback: CallableFunction) {
        
        let destination = projectDetails.cloudUrl + '/buildscript';
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script cloud
        let generateDockerScript = st.loadGroup(require(templatePath + '/build_script_cloud_stg'));
        let dockerScript = generateDockerScript.render("build_script_cloud", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/geppetto_build.sh', dockerScript, function (err) {
            if (err) throw err;
            console.log('geppetto_build_script for cloud is generated!!')   
        })
    }

    public apk_build_mobile(projectDetails, callback: CallableFunction) {

        let destination = projectDetails.cloudUrl + '/buildscript';
        console.log("localfolder--->", destination);
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script to build mobile script
        let generateDockerScript = st.loadGroup(require(templatePath + '/apk_build_stg'));
        let dockerScript = generateDockerScript.render("apk_build", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/apk_build.sh', dockerScript, function (err) {
            if (err) throw err;
            console.log('apk build script is generated!!')
           
        })
    }

    public ipa_build_mobile(projectDetails, callback: CallableFunction) {

        let destination = projectDetails.cloudUrl + '/buildscript';
        console.log("localfolder--->", destination);
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script to build mobile script
        let generateDockerScript = st.loadGroup(require(templatePath + '/ipa_build_stg'));
        let dockerScript = generateDockerScript.render("ipa_build", [projectDetails.project_lowercase]);
        fs.writeFile(destination + '/ipa_build.sh', dockerScript, function (err) {
            if (err) throw err;
            console.log('ipa build script is generated!!')
           
        })
    }


    // public generate_build_script_app_pod(projectDetails, callback: CallableFunction) {


        
    //     let destination = projectDetails.destinationUrl + '/jenkins';
    //     let templatePath = projectDetails.templateUrl + '/docker';

    //     let systemEntryCodePath = projectDetails.projectUrl + "/app/client/desktop";

    //     if (!fs.existsSync(destination)) {
    //         fs.mkdirSync(destination);
    //     }

    //     //generate script app-pod-jenkins
    //     let generateDockerScript = st.loadGroup(require(templatePath + '/jenkins_app_pod_script_stg'));
    //     let dockerScript = generateDockerScript.render("jenkins_app_pod_script", [projectDetails.project_lowercase, systemEntryCodePath]);
    //     fs.writeFile(destination + '/app-pod-jenkins.xml', dockerScript, function (err) {
    //         if (err) throw err;
    //         console.log('app-pod-jenkins script generated!!')
           
    //     })


    // }

    }