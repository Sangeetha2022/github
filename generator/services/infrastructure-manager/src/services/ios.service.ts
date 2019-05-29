import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';


export class IPAService {

    public generate_build_script_ios(projectDetails, callback: CallableFunction) {


       
        let destination = projectDetails.destinationUrl + '/mobile';
        let templatePath = projectDetails.templateUrl + '/mobile';

       
        let jenkinsBasePath = "/Users/administrator/.jenkins/workspace";
        let workspace = "/"+projectDetails.project_lowercase+"-job";
        let IOSCodePath = "/"+projectDetails.project+"/app/client/mobile/ios";
        let gitURL = "https://github.com";
        let certificateLocation = "/Users/administrator/Documents/IonicTest/output/363e98b5-8a62-4070-9d18-b18dbb5cb7bf.mobileprovision";
        let Email = "tharani10d@gmal.com";
        let apiToken="";


        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate script system-entry-jenkins
        let generateDockerScript = st.loadGroup(require(templatePath + '/ios_jenkins_build_stg'));
        let dockerScript = generateDockerScript.render("ios_jenkins_build", [projectDetails.project, jenkinsBasePath,workspace,IOSCodePath,gitURL,certificateLocation,Email,apiToken]);
        fs.writeFile(destination + '/ios-jenkins-build.xml', dockerScript, function (err) {
            if (err) throw err;
            console.log('ios-jenkins script generated!!')
           
        })


    }



    }