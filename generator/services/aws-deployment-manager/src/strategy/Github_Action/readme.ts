import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';


export class Readme_Githubaction {
    private filename = 'README.md'
    filePath: any;
    fileData: any;
    screenGenerationPath: any;


    async create_readme(req: Request, callback: CallableFunction) {
        var projectDetails = req.body

        const project_name = projectDetails.project_unique_id
        const project_unique_id = projectDetails.project_unique_id.split("_");
        // console.log("project id",project_name)
        const githubGenerationPath = projectDetails.projectGenerationPath + `/${project_name}/`


        let fileData = {
            project_name: projectDetails.name,
            s3_bucket_name: project_name.replace(/_/g, '-'),
            project_unique_id: project_unique_id[1],
        }
        // file path for local
        let readme_generation = githubGenerationPath + 'devops/cloud/aws/github_actions'
        let templatePath = path.resolve(__dirname, '../../../templates/github_actions');
        let filePath = templatePath + `/github_action_readme.handlebars`;
        let result: any = await this.handleBarsFile(filePath, fileData, readme_generation)
        callback(response)
    }

    handleBarsFile(filePath, fileData, readme_generation) {
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                var source = data;
                var template = Handlebars.compile(source);
                var result = template(fileData);
                Common.createFolders(readme_generation);
                fs.writeFile(readme_generation + `/README.md`, result, (response) => {
                    resolve(response);
                })
            })
        });

    }
}