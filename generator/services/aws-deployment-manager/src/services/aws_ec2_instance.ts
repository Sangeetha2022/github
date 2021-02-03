import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import { Constant } from '../config/Constant';


export class AwsEc2Instance   {
    private screenName = 'aws_ec2_instance.yml'
    filePath: any;
    fileData: any;
    screenGenerationPath: any;


    async create_ec2_instance_workflows(req: Request, callback: CallableFunction) {
        var projectDetails = req.body
        const project_name = projectDetails.project_unique_id
        const githubGenerationPath = projectDetails.projectGenerationPath + `/${project_name}/`


        let fileData = {
            project_name: projectDetails.name,
            s3_bucket_name: project_name.replace(/_/g, '-')
        }

        // file path for live
        let GithubActionGenerationPath_live = githubGenerationPath + '.github/workflows'
        // file path for local
        let GithubActionGenerationPath_local = githubGenerationPath + 'devops/cloud/aws/github_action'
        let templatePath = path.resolve(__dirname, '../../templates/github_actions');
        let filePath = templatePath + `/ec2_instance_deployment.handlebars`;
        let result: any = await this.handleBarsFile(filePath, fileData, GithubActionGenerationPath_live, GithubActionGenerationPath_local)
        callback(response)
    }

    handleBarsFile(filePath, fileData, GithubActionGenerationPath_live, GithubActionGenerationPath_local) {
        console.log("Going to the handler bars")
        Handlebars.registerHelper('surroundWithCurlyBraces', function (text) {
            var result = '{{' + text + '}}';
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