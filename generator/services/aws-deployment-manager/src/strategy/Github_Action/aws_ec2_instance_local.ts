import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';


export class Github_Actions_Local {
    private screenName = 'aws_ec2_instance.yml'
    filePath: any;
    fileData: any;
    screenGenerationPath: any;



    async create_ec2_instance_workflows_local(req: Request, callback: CallableFunction) {
        const backendList = [];
        var projectDetails = req.body
        const project_name = projectDetails.project_unique_id
        const project_unique_id = projectDetails.project_unique_id.split("_");
        projectDetails.customBackendList.forEach(backendElement => {
            if (backendElement.isCustomCode) {
                const temp = {
                    name: '',
                    port: '',
                    uppername: '',
                }

                temp.name = backendElement.featureName;
                temp.uppername = backendElement.featureName.toUpperCase();
                temp.port = backendElement.nodePortNumber;
                backendList.push(temp);
            }
        })
        let fileData = {
            project_name: projectDetails.name,
            s3_bucket_name: project_name.replace(/_/g, '-'),
            project_unique_id: project_unique_id[1],
            custom_features: backendList

        }
        // file path for local
        let screenGenerationPath = projectDetails.projectGenerationPath + `/${project_name}/` + 'devops/cloud/aws/github_actions/workflows'
        let templatePath = path.resolve(__dirname, '../../../templates/github_actions');
        let filePath = templatePath + `/ec2_instance_deployment.handlebars`;
        let result: any = await this.handleBarsFile(filePath, fileData, screenGenerationPath, this.screenName)
        callback(response)
    }
    handleBarsFile(filePath, fileData, screenGenerationPath, screenName) {
        Handlebars.registerHelper('surroundWithCurlyBraces', function (text) {
            var result = '{{ ' + text + ' }}';
            return new Handlebars.SafeString(result);
        });
        Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                var source = data;
                var template = Handlebars.compile(source);
                var result = template(fileData);
                Common.createFolders(screenGenerationPath);
                fs.writeFile(screenGenerationPath + `/aws_e2_instance.yml`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
}