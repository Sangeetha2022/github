import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';


export class SystemEntryService {

    public generate_system_entry_pod(projectDetails, callback: CallableFunction) {


        let projectName = projectDetails.project_name + "_" + projectDetails.user_id
        let destination = projectDetails.destinationUrl + '/system-entry-pod';
        let templatePath = projectDetails.templateUrl + '/system-entry-pod';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        //generate ui deployment
        let generatesySystem_entry_deployment = st.loadGroup(require(templatePath + '/system_entry_deployment_yaml_stg'));
        let systemEntry = generatesySystem_entry_deployment.render("system_entry_deployment_yaml", [projectName]);
        fs.writeFile(destination + '/system-entry-deployment.yaml', systemEntry, function (err) {
            if (err) throw err;
            console.log('system-entry-deployment generated!!')
        })

        //generate ui service
        let generatesySystem_entry_service = st.loadGroup(require(templatePath + '/system_entry_service_yaml_stg'));
        let systemEntrySer = generatesySystem_entry_service.render("system_entry_service_yaml", [projectName]);
        fs.writeFile(destination + '/system-entry-service.yaml', systemEntrySer, function (err) {
            if (err) throw err;
            console.log('system-entry-service generated!!')
        })

        //callback("Success");

    }


}