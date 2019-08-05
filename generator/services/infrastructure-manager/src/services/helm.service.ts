import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as st from 'stringtemplate-js';
import * as deployConfig from '../config/config.json';
import { exec } from 'child_process';

import * as ncp from 'ncp';


export class HelmService {

    public generate_helm_templates(projectDetails, callback: CallableFunction) {

        let destination = projectDetails.cloudUrl + '/helm';
        let templateStaticPath = projectDetails.helmTemplateUrl + '/static_contents';
        let templateDynamicPath = projectDetails.helmTemplateUrl + '/dynamic_contents';

        let destinationLocal = projectDetails.localUrl + '/helm';
        let localtemplatePath = projectDetails.templateUrl + '/helm';
        let localTemplateStaticPath = localtemplatePath + '/static_contents';
        let localTemplateDynamicPath = localtemplatePath + '/dynamic_contents';

        if (!fs.existsSync(destinationLocal)) {
            fs.mkdirSync(destinationLocal);
        }

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }

        function generate_static_contents() {
            //copy template files for helm
            ncp.limit = 16;
            ncp(templateStaticPath, destination, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('helm templated copy done!');
                generate_dynamic_contents();
            });
        }
        generate_static_contents();

        function generate_dynamic_contents() {

            let generateValueFile = st.loadGroup(require(templateDynamicPath + '/values_yaml_stg'));
            let valueYaml = generateValueFile.render("values_yaml", [projectDetails.project_lowercase]);
            fs.writeFile(destination + '/values.yaml', valueYaml, function (err) {
                if (err) throw err;
                console.log('helm values.yaml generated!!')

            })

            let generateChartFile = st.loadGroup(require(templateDynamicPath + '/chart_yaml_stg'));
            let chartYaml = generateChartFile.render("chart_yaml", [projectDetails.project_lowercase]);
            fs.writeFile(destination + '/Chart.yaml', chartYaml, function (err) {
                if (err) throw err;
                console.log('helm Chart.yaml generated!!')

            })

        }
        function generate_static_contents_local() {
            //copy template files for helm
            ncp.limit = 16;
            ncp(localTemplateStaticPath, destinationLocal, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('helm local template copy  for local!');
                generate_dynamic_contents_local();
            });
        }
        generate_static_contents_local();

        function generate_dynamic_contents_local() {
            console.log("----dynamic");
            let generateValueFile = st.loadGroup(require(localTemplateDynamicPath + '/values_yaml_stg'));
            let valueYaml = generateValueFile.render("values_yaml", [projectDetails.project_lowercase]);
            fs.writeFile(destinationLocal + '/values.yaml', valueYaml, function (err) {
                if (err) throw err;
                console.log('helm values.yaml for local env is generated!!')

            })

            let generateChartFile = st.loadGroup(require(localTemplateDynamicPath + '/chart_yaml_stg'));
            let chartYaml = generateChartFile.render("chart_yaml", [projectDetails.project_lowercase]);
            fs.writeFile(destinationLocal + '/Chart.yaml', chartYaml, function (err) {
                if (err) throw err;
                console.log('helm Chart.yaml for local env generated!!')

            })

        }

    }

}