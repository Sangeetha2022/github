import { Request, response } from 'express';
import * as util from 'util';
import { Common } from '../config/Common';
import * as childProcess from 'child_process';
import * as ncp from 'ncp';
import * as asyncLoop from 'node-async-loop';

export class ReactService {
    private exec = childProcess.exec;
    private details = null;
    private generationPath = '';
    private templatePath = '';
    private sharedObj = {
        className: 'Shared',
        variableName: 'DESKTOP_API',
        protocol: 'http',
        link: 'localhost',
        port: 0
    }
    private projectName = '';
    private DEFAULT_FEATURENAME = 'default';
    constructor() {
    }
    async createReactProject(req: Request, callback: CallableFunction) {
        this.details = req.body;
        console.log('entered to the create react project details------', this.details);
        let seedPath = this.details.project.templateLocation.authTemplatePath;
        let reactBaseCodePath = `${seedPath}/reactBase`;
        this.details.project.name.split(" ").forEach((element, index) => {
            if (index === 0) {
                this.projectName = element;
            } else {
                this.projectName += element.charAt(0).toUpperCase() + element.slice(1);
            }
        })
        this.generationPath = this.details.projectGenerationPath;
        Common.createFolders(this.generationPath);
        ncp(reactBaseCodePath, this.generationPath, function (err) {
            if (err) {
                return console.error(err);
            }
            callback('done!');
        });
    }


}
