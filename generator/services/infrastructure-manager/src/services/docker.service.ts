import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';

const jenkins = require('jenkins')({ baseUrl: 'http://geppetto:geppetto2019@207.254.45.42:8080/', crumbIssuer: true });

export class DockerService {

    public generate_build_script_local(projectDetails, backendList, callback: CallableFunction) {

        console.log('backendList app pods local script ----  ', backendList);
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

    public generate_env(projectDetails, backendList, callback: CallableFunction) {

        console.log("----dynamic");
        const temp = { 
            project_name: projectDetails.project_lowercase,
            custom_node: backendList
        }

        console.log('backendList app pods in script coluds are ---  ', backendList);
        let destination = projectDetails.localUrl + '/docker';
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate env file
        let generateDockerScript = st.loadGroup(require(templatePath + '/env_stg'));
        let dockerScript = generateDockerScript.render("env", [temp]);
        fs.writeFile(destination + '/.env', dockerScript, function (err) {
            if (err) throw err;
            console.log('env file is generated !!!')
        })
    }

    public generate_docker_compose(projectDetails, backendList, callback: CallableFunction) {

        console.log("----dynamic");
        const temp = {
            project_name: projectDetails.project_lowercase,
            custom_node: backendList
        }

        console.log('backendList app pods in script coluds are ---  ', backendList);
        let destination = projectDetails.localUrl + '/docker';
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script cloud
        let generateDockerScript = st.loadGroup(require(templatePath + '/docker_compose_stg'));
        let dockerScript = generateDockerScript.render("docker_compose", [temp]);
        fs.writeFile(destination + '/docker-compose.yml', dockerScript, function (err) {
            if (err) throw err;
            console.log('geppetto_build_script for cloud is generated!!')
        })
    }

    public generate_geppetto_compose(projectDetails, callback: CallableFunction) {

        console.log("----generate_geppetto_compose");
        const temp = {
            project_name: projectDetails.name,
        }

        let destination = projectDetails.localUrl + '/docker';
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //geppetto compose script
        let generateDockerScript = st.loadGroup(require(templatePath + '/geppetto_compose_stg'));
        let geppettoScript = generateDockerScript.render("geppetto_compose", [temp]);
        fs.writeFile(destination + '/geppetto_compose.sh', geppettoScript, function (err) {
            if (err) throw err;
            console.log('geppetto_compose_script is generated!!')
        })
    }

    public generate_build_script_cloud(projectDetails, backendList, callback: CallableFunction) {

        console.log('backendList app pods in script coluds are ---  ', backendList);
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

    public ipa_build_jenkins_mobile(projectDetails, callback: CallableFunction) {

        let destination = projectDetails.cloudUrl + '/buildscript';
        console.log("localfolder--->", destination);
        let templatePath = projectDetails.templateUrl + '/docker';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script to build mobile jenkins script
        let generateDockerScript = st.loadGroup(require(templatePath + '/ipa_build_jenkins_stg'));
        let dockerScript = generateDockerScript.render("ipa_build_jenkins", [projectDetails.project_lowercase]);
        var ipa_build_xml = fs.writeFile(destination + '/ipa_build_jenkins.xml', dockerScript, function (err) {
            if (err) throw err;
            console.log('ipa build jenkins script is generated!!');
            createJenkinsJobSystemEntry();
        })

        //create generated project job
        function createJenkinsJobSystemEntry() {
            console.log("destination----->", destination);
            console.log("projectDetails.project_lowercase---->", projectDetails.project_lowercase);

            var project_ipa_build_XML = fs.readFileSync(destination + '/ipa_build_jenkins.xml', 'utf8');

            // check is job is already exist in jenkins
            jenkins.job.exists(projectDetails.project_lowercase, function (err, exists) {
                if (err) throw err;
                console.log('exists or not ', exists);

                // if not exist then we create a new job in jenkins
                if (!exists) {
                    jenkins.job.create(projectDetails.project_lowercase, project_ipa_build_XML, function (err) {
                        if (err) throw err;
                        console.log(projectDetails.project_lowercase + " job created successfully!");
                        triggerJenkinsJobSystemEntry();
                    });
                } else {
                    triggerJenkinsJobSystemEntry();
                }
            });
        }

        //build generated project
        function triggerJenkinsJobSystemEntry() {
            jenkins.job.build(projectDetails.project_lowercase, function (err, data) {
                if (err) {
                    console.log("Error in " + projectDetails.project_lowercase + " job trigger:", err);
                }
                if (data) {
                    console.log(projectDetails.project_lowercase + " job triggered successfully!");
                }
            });
        }
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