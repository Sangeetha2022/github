import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

import * as yaml from 'js-yaml';

const jenkins = require('jenkins')({ baseUrl: 'http://admin:admin@localhost:8080/', crumbIssuer: true });


const Destination = deployConfig.AWS.DESTINATION_URL;

export class AndroidService {

    public build_apk(projectDetails, callback: CallableFunction) {


        //create generate apk job
        function createJenkinsJobAndroidBuild() {

            var android_buildXML = fs.readFileSync(projectDetails.destinationUrl+'/android-jenkins-build.xml', 'utf8');

            jenkins.job.create(projectDetails.project_lowercase+"-job", android_buildXML, function (err) {
                //if (err) throw err;
                // else {
                    console.log(projectDetails.project_lowercase + " job created successfully!");
                    triggerJenkinsJobAndroidBuild();
                // }
            });

        }

        //build generate apk
        function triggerJenkinsJobAndroidBuild() {
            jenkins.job.build(projectDetails.project_lowercase+"-job", function (err, data) {
                if (err) {
                    console.log("Error in " + projectDetails.project_lowercase + " job trigger:", err);
                }
                if (data) {
                    console.log(projectDetails.project_lowercase + " job triggered successfully!");
                }
            });
        }
        createJenkinsJobAndroidBuild();

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }



}