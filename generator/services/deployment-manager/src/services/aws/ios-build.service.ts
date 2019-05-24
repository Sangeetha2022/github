import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../../config/config.json';

import * as yaml from 'js-yaml';

const jenkins = require('jenkins')({ baseUrl: 'http://admin:admin@localhost:8080/', crumbIssuer: true });


const Destination = deployConfig.AWS.DESTINATION_URL;

export class IPAService {

    public build_ipa(projectDetails, callback: CallableFunction) {

        

        let projectName = projectDetails.project_name + "-" + projectDetails.user_id.substring(0, 5)
        //let destination = Destination + projectName + '/deployment/aws/mobile';
       

        //create generate ipa job
        function createJenkinsJobIPABuild() {

            var ipa_buildXML = fs.readFileSync(projectDetails.destinationUrl+'/ios-jenkins-build.xml', 'utf8');

            jenkins.job.create(projectName.toLowerCase()+"-job", ipa_buildXML, function (err) {
                //if (err) throw err;
                // else {
                    console.log(projectName + " job created successfully!");
                    triggerJenkinsJobIPABuild();
                // }
            });

        }

        //build generate ipa
        function triggerJenkinsJobIPABuild() {
            jenkins.job.build(projectName.toLowerCase()+"-job", function (err, data) {
                if (err) {
                    console.log("Error in " + projectName + " job trigger:", err);
                }
                if (data) {
                    console.log(projectName + " job triggered successfully!");
                }
            });
        }
        createJenkinsJobIPABuild();

        const delay = ms => new Promise(res => setTimeout(res, ms));

    }



}