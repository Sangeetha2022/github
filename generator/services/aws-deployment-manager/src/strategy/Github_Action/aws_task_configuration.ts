import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';

export class Github_Action_Task_Defination {
    async create_fargate_task_defination(req: Request, callback: CallableFunction) {
        const backendList = [];
        var projectDetails = req.body
        console.log('----------- Project Details--->>>', projectDetails)
        const project_name = projectDetails.project_unique_id
        const project_unique_id = projectDetails.project_unique_id.split("_");
        console.log('----- Backend ----', typeof projectDetails.customBackendList)
        let primary_object = [{ featureName: 'mongo', entityModelName: 'mongo', entityFileName: 'mongo', nodePortNumber: '3009', isCustomCode: false }, { featureName: 'apigateway', entityModelName: 'apigateway', entityFileName: 'apigateway', nodePortNumber: '8000' }, { featureName: 'gepfilemanager', entityModelName: 'gepfilemanager', entityFileName: 'gepfilemanager', nodePortNumber: '3015', isCustomCode: false }]
        primary_object.forEach(primaryvalue => {
            console.log('-------------', primaryvalue)
            projectDetails.customBackendList.unshift(primaryvalue)
        })
        console.log('----- primary_object ----', typeof primary_object)
        // projectDetails.customBackendList.push(primary_object)
        console.log('-------- Final --------------', projectDetails.customBackendList)
        console.log('--- Length ---', projectDetails.customBackendList.length)
        projectDetails.customBackendList.forEach(backendElement => {
            // if (backendElement.isCustomCode) {
            const temp = {
                name: '',
                port: '',
                uppername: '',
            }

            temp.name = backendElement.featureName;
            temp.uppername = backendElement.featureName.toUpperCase();
            temp.port = backendElement.nodePortNumber;
            backendList.push(temp);

            // }
        })
        console.log('------ backendList -----', backendList)
        let fileData = {
            project_name: projectDetails.name,
            project_unique_id: project_unique_id[1],
            project_name_id: project_name.replace(/_/g, '-'),
            custom_features: backendList
        }
        console.log('----------------->>>>',fileData)
        // file path for local
        let GithubActionGenerationPath_local = projectDetails.projectGenerationPath + `/${project_name}/` + 'devops/cloud/aws/github_actions/workflows'
        // file path for live
        let GithubActionGenerationPath_live = projectDetails.projectGenerationPath + `/${project_name}/` + '.github/workflows'
        let templatePath = path.resolve(__dirname, '../../../templates/github_actions');
        let filePath = templatePath + `/task_defination.handlebars`;
        let result: any = await this.handleBarsFile(filePath, fileData, GithubActionGenerationPath_local, GithubActionGenerationPath_live, projectDetails)
        callback(result);
    }
    handleBarsFile(filePath, fileData, GithubActionGenerationPath_local, GithubActionGenerationPath_live, projectDetails) {
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
                Common.createFolders(GithubActionGenerationPath_local);
                fs.writeFile(GithubActionGenerationPath_local + `/task-definition.ts`, result, (response) => {
                    resolve(response);
                    if (projectDetails.deploymentTarget.label === 'Live') {
                        fs.writeFile(GithubActionGenerationPath_live + `/task-definition.ts`, result, (response) => {
                            resolve(response);
                        })
                    }
                })
            });
        })
    }
}