import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';

const jenkins = require('jenkins')({ baseUrl: 'http://admin:geppetto2019@3.92.72.204:30080/', crumbIssuer: true });


export class DockerService {

    public generate_build_script(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        let destination = projectDetails.destinationUrl + '/docker';
        let templatePath = projectDetails.templateUrl + '/docker';

        let systemEntryCodePath = projectDetails.projectUrl + "/app/client/desktop";

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script to build image
        let generateDockerScript = st.loadGroup(require(templatePath + '/docker_image_script_stg'));
        let dockerScript = generateDockerScript.render("docker_image_script", [projectName.toLowerCase(), systemEntryCodePath]);
        fs.writeFile(destination + '/docker-image.sh', dockerScript, function (err) {
            if (err) throw err;
            console.log('docker image script generated!!')
            // dockerBuildAndPush();
            //triggerJenkinsJob();

        })


        //build geppetto dev invironment
        function triggerJenkinsJob() {
            jenkins.job.build('gep-dev-system-entry-pod', function(err, data) {
                if (err){
                  console.log("Error in gep-dev-system-entry-pod job trigger:",err);
                }
                if(data){
                   console.log("gep-dev-system-entry-pod job triggered successfully:",data);
                }
              });
        }

        function dockerBuildAndPush() {

            exec('sh '+destination + '/docker-image.sh', function (error, stdout, stderr) {
                console.log("stdout----------->",stdout);
                console.log("stderr----------->",stderr);

                if (stderr) {
                    console.log('Error accured in building Image!');
                }
                else {
                    if (stdout) {
                        console.log('Image build and Successfully pushed!');
                     }
                }
                if (error !== null) {
                    console.log('Error accured in exec!');
                    // callback({ "status": "failed", "data": "Error accured in exec!" });
                }

            });

        }
        //callback("Success");

    }





    }