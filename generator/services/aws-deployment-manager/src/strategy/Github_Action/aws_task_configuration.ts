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
            project_unique_id: project_unique_id[1],
            project_name_id: project_name.replace(/_/g, '-'),
            custom_features: backendList
        }
        // file path for local
        let screenGenerationPath = projectDetails.projectGenerationPath + `/${project_name}/` + 'devops/cloud/aws/github_actions/workflows'
        let templatePath = path.resolve(__dirname, '../../../templates/github_actions');
        let filePath = templatePath + `/task_defination.handlebars`;
        let result: any = await this.handleBarsFile(filePath, fileData, screenGenerationPath)
        callback(response)
    }
    handleBarsFile(filePath, fileData, screenGenerationPath) {
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
                fs.writeFile(screenGenerationPath + `/task-definition.ts`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
}