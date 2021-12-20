import * as path from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { Common } from '../config/Common';
import * as st from 'stringtemplate-js';
import * as childProcess from 'child_process';

export class GCAMScreenSupportWorker {

    private exec = childProcess.exec;

    /**
     * 
     * @param screenname 
     * @param templatepath 
     * @param generationpath 
     * File Writing using Handlebars
     */

    public gcamScreenSupportWorker(screenname, generationpath, templatepath, callback) {
        let FilePath = path.resolve(__dirname, `${templatepath}/gcamresources.handlebars`);

        return new Promise(async resolve => {
            await fs.readFile(FilePath, 'utf-8', (err, data) => {
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
                const result = template(screenname);
                Common.createFolders(`${generationpath}/src/assets`);
                fs.writeFile(`${generationpath}/src/assets` + `/resources.ts`, result, (response) => {
                    resolve(response);
                })
            });
        })

    }


}