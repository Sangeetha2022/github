import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';
import { Github_Action_Task_Defination } from './aws_task_configuration'

let GithubActionTaskDefination = new Github_Action_Task_Defination()

export class Github_Actions_Live {
    private screenName = 'aws_ec2_instance.yml'
    filePath: any;
    fileData: any;
    screenGenerationPath: any;


    async create_ec2_instance_workflows_live(req: Request, callback: CallableFunction) {
        const backendList = [];
        var projectDetails = req.body
        const project_name = projectDetails.project_unique_id
        const project_unique_id = projectDetails.project_unique_id.split("_");
        // console.log("project id",project_name)
        const githubGenerationPath = projectDetails.projectGenerationPath + `/${project_name}/`
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
                console.log("backendList----->", backendList);
            }
        })

        let fileData = {
            project_name: projectDetails.name,
            s3_bucket_name: project_name.replace(/_/g, '-'),
            project_unique_id: project_unique_id[1],
            custom_features: backendList
        }
        // file path for live
        let GithubActionGenerationPath_live = githubGenerationPath + '.github/workflows'
        // file path for local
        let GithubActionGenerationPath_local = githubGenerationPath + 'devops/cloud/aws/github_actions/workflows'
        let templatePath = path.resolve(__dirname, '../../../templates/github_actions');
        let filePath = templatePath + `/ec2_instance_deployment.handlebars`;
        let result: any = await this.handleBarsFile(filePath, fileData, GithubActionGenerationPath_live, GithubActionGenerationPath_local)
        callback(response)
        GithubActionTaskDefination.create_fargate_task_defination(req, (res) => {
            callback({ Message: 'github action for live  are generated successfully' })
        })
    }

    handleBarsFile(filePath, fileData, GithubActionGenerationPath_live, GithubActionGenerationPath_local) {
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
                Common.createFolders(GithubActionGenerationPath_live);
                fs.writeFile(GithubActionGenerationPath_live + `/aws_e2_instance.yml`, result, (response) => {
                    Common.createFolders(GithubActionGenerationPath_local);
                    fs.writeFile(GithubActionGenerationPath_local + `/aws_e2_instance.yml`, result, (response) => {
                        resolve(response);
                    })
                })
            });
        })
    }
}