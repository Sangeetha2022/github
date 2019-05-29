import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';


export class TerraformService {

    public generate_aws_terraform(projectDetails, callback: CallableFunction) {

        let destination =  projectDetails.destinationUrl + '/terraform';
        let templatePath = projectDetails.templateUrl+"/terraform";

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }


        let aws_access_key = "Test_key";
        let aws_secret_key = "Test_key";
        let ssh_key_name = "Test_name"


        //generate aws_terraform for nodes creation
        let generateTerraform = st.loadGroup(require(templatePath + '/aws_terraform_stg'));
        let terraform = generateTerraform.render("aws_terraform", [projectDetails.project_lowercase, aws_access_key, aws_secret_key, ssh_key_name]);

        fs.writeFile(destination + '/terraform.tfvars', terraform, function (err) {
            if (err) throw err;
            console.log('aws terraform generated!!')
            
        })



    }


}