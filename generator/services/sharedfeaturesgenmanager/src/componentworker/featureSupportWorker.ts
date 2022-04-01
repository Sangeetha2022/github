import * as path from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
// import { Common } from '../config/Common';
// import * as childProcess from 'child_process';

export class FeatureSupportWorker {

    // private exec = childProcess.exec;

    /**
     * 
     * @param featureData 
     * @param templatepath 
     * @param generationpath 
     * File Writing using Handlebars
     */

    public featureSupportWorker(templatepath, featureData, generationpath,  templateFile) {
        return new Promise(async resolve => {
            await fs.readFile(templatepath, 'utf-8', (err, data) => {
                Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
                    switch (operator)
                    {
                        case "==":
                            return (v1==v2)?options.fn(this):options.inverse(this);
                
                        case "!=":
                            return (v1!=v2)?options.fn(this):options.inverse(this);
                
                        case "===":
                            return (v1===v2)?options.fn(this):options.inverse(this);
                
                        case "!==":
                            return (v1!==v2)?options.fn(this):options.inverse(this);
                
                        case "&&":
                            return (v1&&v2)?options.fn(this):options.inverse(this);
                
                        case "||":
                            return (v1||v2)?options.fn(this):options.inverse(this);
                
                        case "<":
                            return (v1<v2)?options.fn(this):options.inverse(this);
                
                        case "<=":
                            return (v1<=v2)?options.fn(this):options.inverse(this);
                
                        case ">":
                            return (v1>v2)?options.fn(this):options.inverse(this);
                
                        case ">=":
                         return (v1>=v2)?options.fn(this):options.inverse(this);
                
                        default:
                            return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
                    }
                });
                const source = data;
                const template = Handlebars.compile(source);
                const result = template(featureData);
                // Common.createFolders(`${generationpath}/src/assets`);
                fs.writeFile(`${generationpath}/config` + `/${templateFile}`, result, (response) => {
                    resolve(response);
                })
            });
        })

    }


}